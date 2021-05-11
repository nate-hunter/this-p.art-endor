const { gql, AuthenticationError } = require('apollo-server');
const Post = require('./models/Post');

const user = {
    _id: "1",
    username: "testPanda",
    email: "testPanda@panda.com",
    img: "https://endor-tree-storage.nyc3.digitaloceanspaces.com/makapuu-01.jpg"
}


const authenticated = next => (root, args, context, info) => {  // how does 'next' work here?
    if (!context.currentUser) {
        throw new AuthenticationError('Please log in to continue');
    }
    return next(root, args, context, info);  // How does `net()` make it possible to execute the resolver function?
}

module.exports = {
    Query: {
        me: authenticated((root, args, context, info) => context.currentUser)
    }
}