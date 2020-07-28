import Apollo from "apollo-server";
import Author from "./models/Author.js";
import Book from "./models/Book.js";

const { gql, UserInputError } = Apollo;

export const typeDefs = gql(`
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
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: ID!
            genres: [String]!
        ): Book

        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
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

        allAuthors: () => Author.find().exec()
    },

    Mutation: {
        addBook: async (_, args) => {
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
                    return Book.findById(newBook._id).populate("author");
                } catch (err) {
                    throw new UserInputError(err.message, { invalidArgs: args });
                }
            }
        },

        editAuthor: (_, args) => {
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

    Author: {
        bookCount: async root => {
            const author = await Author.findOne({ name: root.name }).exec();
            return (await Book.find({ author: author._id }).populate("author").exec()).length;
        }
    }
};
