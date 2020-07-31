import Apollo from "apollo-server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Author from "./models/Author.js";
import Book from "./models/Book.js";
import User from "./models/User.js";

const { gql, PubSub, UserInputError, AuthenticationError } = Apollo;
const pubSub = new PubSub();

export const typeDefs = gql(`
    type User {
        username: String!
        passhash: String!
        favoriteGenre: [String]!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int
        id: ID!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String]!
        id: ID!
    }
    
    type Query {
        me: User
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]!
        allAuthors: [Author!]!
        allGenres: [String!]!
    }

    type Mutation {
        createUser(
            username: String!
            password: String!
            favoriteGenre: String
            ): User

        login(
            username: String!
            password: String!
        ): Token

        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String]!
        ): Book

        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }

    type Subscription {
        bookAdded: Book!
    }
`);

export const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),

        authorCount: () => Author.collection.countDocuments(),

        allBooks: async (_, args) => {
            const query = {};
            if (args.author) {
                const author = await Author.findOne({ name: args.author }).exec();
                query.author = author?._id;
            }
            if (args.genre) {
                query.genres = { $in: [args.genre] };
            }
            return Book.find(query).populate("author").exec();
        },

        allAuthors: () => Author.find().exec(),

        allGenres: async () => {
            const allBooks = await Book.find().exec();
            return new Set(allBooks.flatMap(b => b.genres));
        },

        me: (_, __, { currentUser }) => currentUser
    },

    Mutation: {
        createUser: async (_, args) => {
            const salt = await bcrypt.genSalt(10);
            const passhash = await bcrypt.hash(args.password, salt);
            try {
                const newUser = new User({
                    username: args.username,
                    passhash,
                    favoriteGenre: args.favoriteGenre
                });
                const result = await newUser.save();
                return result;
            } catch (err) {
                throw new UserInputError(err.message, {
                    invalidArgs: { ...args, password: "..." }
                });
            }
        },

        login: async (_, args) => {
            const user = await User.findOne({ username: args.username }).exec();
            const correctCredentials =
                !!user && (await bcrypt.compare(args.password, user.passhash));
            if (!correctCredentials) {
                throw new AuthenticationError("Invalid credentials.");
            } else {
                const payload = { username: user.username, id: user._id };
                return { value: jwt.sign(payload, process.env.JWT_SECRET) };
            }
        },

        addBook: async (_, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError("Not authorized.");
            }
            const book = await Book.findOne({ title: args.title }).exec();
            if (book) {
                throw new UserInputError("Book already exists.", { invalidArgs: args });
            } else {
                let author = await Author.findOne({ name: args.author }).exec();
                if (!author) {
                    try {
                        const newAuthor = new Author({ name: args.author });
                        await newAuthor.save();
                        author = newAuthor;
                    } catch (err) {
                        throw new UserInputError(err.message, { invalidArgs: args });
                    }
                }
                try {
                    const newBook = new Book({ ...args, author: author._id });
                    await newBook.save();
                    const result = await Book.findById(newBook._id).populate("author").exec();
                    pubSub.publish("BOOK_ADDED", { bookAdded: result });
                    return result;
                } catch (err) {
                    throw new UserInputError(err.message, { invalidArgs: args });
                }
            }
        },

        editAuthor: (_, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError("Not authorized.");
            }
            try {
                return Author.findOneAndUpdate(
                    { name: args.name },
                    { born: args.setBornTo },
                    { new: true }
                ).exec();
            } catch (err) {
                throw new UserInputError(err.message, { invalidArgs: args });
            }
        }
    },

    Subscription: {
        bookAdded: {
            subscribe: () => pubSub.asyncIterator(["BOOK_ADDED"])
        }
    },

    Author: {
        bookCount: async root => {
            const author = await Author.findOne({ name: root.name }).exec();
            return (await Book.find({ author: author._id }).populate("author").exec()).length;
        }
    }
};

export const context = async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id).exec();
        return { currentUser };
    }
};
