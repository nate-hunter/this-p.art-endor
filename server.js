const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { findOrCreateUser } = require('./controllers/userController');

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
    resolvers,
    context: async ({ req }) => {
        let authToken = null;
        let currentUser = null;
        try {
            authToken = req.headers.authorization;
            // console.log('req', req.headers);
            if (authToken) {
                // find or create user:
                currentUser = await findOrCreateUser(authToken);
            }
        } catch (error) {
            console.log(`Unable to authenticate user with token ${authToken}`)
        }
        return { currentUser };
    }
});

server
    .listen({ port: 4000 })
    .then(({ url }) =>{
        console.log(`--> Server listening on ${url}`)
    })
