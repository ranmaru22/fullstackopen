import Apollo from "apollo-server";
import mongoose from "mongoose";
import { typeDefs, resolvers } from "./queries.js";

const { ApolloServer } = Apollo;

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    },
    () => console.log("Connected to MongoDB...")
);

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}...`));
