import Apollo from "apollo-server";
import mongoose from "mongoose";
import { typeDefs, resolvers, context } from "./queries.js";

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
    resolvers,
    context
});

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}...`);
    console.log(`Subscriptions available under ${subscriptionsUrl}...`);
});
