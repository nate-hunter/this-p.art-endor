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
        lon: Float
        poster: User
        comments: [Comment]
    }

    type Comment {
        text: String
        createdAt: String
        poster: User
    }

    type Query {
        me: User
        getPosts: [Post!]
    }

    input CreatePostInput {
        title: String
        content: String 
        img: String
        lat: Float
        lon: Float
    }

    type Mutation {
        createPost(input: CreatePostInput!): Post
        deletePost(postId: ID!): Post 
        createComment(postId: ID!, text: String!): Post
    }

`