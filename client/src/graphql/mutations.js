export const CREATE_POST_MUTATION = `
    mutation($title: String!, $img: String!, $content: String!, $lat: Float!, $lon: Float!) {
        createPost(input: {
            title: $title,
            img: $img, 
            content: $content,
            lat: $lat,
            lon: $lon
        }) {
            _id
            createdAt
            title
            img
            content
            lat
            lon
            poster {
                _id
                username
                email
                img
            }
        }
    }
`;

export const DELETE_POST_MUTATION = `
    mutation($postId: ID!) {
        deletePost(postId: $postId) {
            _id
        }
    }
`;

export const CREATE_COMMENT_MUTATION = ` 
    mutation($postId: ID!, $text: String!) {
        createComment(postId: $postId, text: $text) {
            _id
            createdAt
            title
            content
            img
            lat
            lon
            poster {
                _id
                username
            }
            comments {
                text
                createdAt
                poster {
                    username
                    img
                }
            }
        }
    }
`
