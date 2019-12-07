const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const { resolvers } = require("./resolvers");

const schema = fs.readFileSync(path.resolve(__dirname, "./schema.graphql"), {encoding: "UTF-8"});

const server = new ApolloServer({ typeDefs: gql(schema), resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
