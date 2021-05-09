const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

require('dotenv').config();

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true 
    })
    .then(() => console.log('--> MongoDB connected'))
    .catch(error => console.log('There was an error connecting to MongoDB', error))

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server
    .listen({ port: 4000 })
    .then(({ url }) =>{
        console.log(`--> Server listening on ${url}`)
    })
