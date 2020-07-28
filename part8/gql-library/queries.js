import Apollo from "apollo-server";
import Author from "./models/Author.js";
import Book from "./models/Book.js";

const { gql, UserInputError } = Apollo;

// let books = [
//     {
//         title: "Clean Code",
//         published: 2008,
//         author: "Robert Martin",
//         genres: ["refactoring"]
//     },
//     {
//         title: "Agile software development",
//         published: 2002,
//         author: "Robert Martin",
//         genres: ["agile", "patterns", "design"]
//     },
//     {
//         title: "Refactoring, edition 2",
//         published: 2018,
//         author: "Martin Fowler",
//         genres: ["refactoring"]
//     },
//     {
//         title: "Refactoring to patterns",
//         published: 2008,
//         author: "Joshua Kerievsky",
//         genres: ["refactoring", "patterns"]
//     },
//     {
//         title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//         published: 2012,
//         author: "Sandi Metz",
//         genres: ["refactoring", "design"]
//     },
//     {
//         title: "Crime and punishment",
//         published: 1866,
//         author: "Fyodor Dostoevsky",
//         genres: ["classic", "crime"]
//     },
//     {
//         title: "The Demon ",
//         published: 1872,
//         author: "Fyodor Dostoevsky",
//         genres: ["classic", "revolution"]
//     }
// ];

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
        allBooks: () => Book.find({}).populate("author").exec(),
        allAuthors: () => Author.find().exec()
    },

    Mutation: {
        addBook: async (_, args) => {
            const book = await Book.findOne({ title: args.title }).exec();
            if (book) {
                throw new UserInputError("Book already exists.");
            } else {
                let author = await Author.findOne({ name: args.author }).exec();
                console.log(author);
                if (!author) {
                    console.log("new author");
                    const newAuthor = new Author({ name: args.author });
                    await newAuthor.save();
                    author = newAuthor;
                    console.log(author);
                }
                const newBook = new Book({ ...args, author: author._id });
                await newBook.save();
                return Book.findById(newBook._id).populate("author");
            }
        },

        editAuthor: (_, args) => {
            const author = authors.find(a => a.name === args.name);
            if (!author) {
                return null;
            } else {
                const patch = { ...author, born: args.setBornTo };
                authors = authors.map(a => (a.id === patch.id ? patch : a));
                return patch;
            }
        }
    },

    Author: {
        bookCount: root => books.filter(b => b.author === root.name).length
    }
};
