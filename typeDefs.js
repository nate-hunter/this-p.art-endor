const { gql } = require('apollo-server');

// module.exports = gql`
//     type User {
//         _id: ID
//         firstName: String
//         lastName: String
//         username: String
//         email: String
//         password: String
//         bio: String
//         img: String 
//     }
// `

module.exports = gql`
    type User {
        _id: ID
        username: String
        email: String
        img: String 
    }

    type Post {
        _id: ID
        createdAt: String
        title: String
        area: String
        content: String
        img: String
        lat: Float
        long: Float
        poster: User
        comments: [Comment]
    }

    type Comment {
        text: String
        cratedAt: String
        poster: User
    }

    type Query {
        me: User
    }
`