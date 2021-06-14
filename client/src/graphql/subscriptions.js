import gql from 'graphql-tag';


export const POST_CREATED_SUBSCRIPTION = gql`
    subscription {
        postCreated {
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
`;

export const POST_UPDATED_SUBSCRIPTION = gql`
    subscription {
        postUpdated {
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
`;

export const POST_DELETED_SUBSCRIPTION = gql`
    subscription {
        postDeleted {
            _id
        }
    }
`;