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

    type Query {
        me: User
    }
`