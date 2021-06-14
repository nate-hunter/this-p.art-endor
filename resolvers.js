const { gql, AuthenticationError, PubSub } = require('apollo-server');
const Post = require('./models/Post');

const pubsub = new PubSub();

const POST_CREATED = "POST_CREATED";
const POST_DELETED = "POST_DELETED";
const POST_UPDATED = "POST_UPDATED";

const user = {
    _id: "1",
    username: "testPanda",
    email: "testPanda@panda.com",
    img: "https://endor-tree-storage.nyc3.digitaloceanspaces.com/makapuu-01.jpg"
}


const authenticated = next => (root, args, context, info) => {  // `authenticated()` is a higher order function;  how does 'next' work here?
    if (!context.currentUser) {
        throw new AuthenticationError('Please log in to continue');
    }
    return next(root, args, context, info);  // How does `next()` make it possible to execute the resolver function?
}

module.exports = {
    Query: {
        me: authenticated(async (root, args, context, info) => context.currentUser),
        getPosts: async (root, args, context) => {
            const posts = await Post.find({}).populate('poster').populate('comments.poster');
            // console.log('posts:', posts)
            return posts;
        }
    }, 
    Mutation: {
        createPost: authenticated(async (root, args, context, info) => {
            const newPost = await new Post({
                ...args.input,
                poster: context.currentUser._id
            }).save();
            const postCreated = await Post.populate(newPost, 'poster');
            pubsub.publish(POST_CREATED, { postCreated });
            return postCreated;

        }),
        deletePost: authenticated(async (root, args, context) => {
            const postDeleted = await Post.findOneAndDelete({ _id: args.postId }).exec()  // exec() returns a promise
            pubsub.publish(POST_DELETED, { postDeleted });
            return postDeleted;
        }),
        createComment: authenticated(async (root, args, context) => {
            const commentText = args.text;
            const currentUser = context.currentUser._id;
            const newComment = { text: commentText, poster: currentUser};
            
            const postUpdated = await Post.findOneAndUpdate(
                { _id: args.postId },  //  Finds the post by the post's id
                { $push: { comments: newComment }},  // Describes how to update the 'document'
                { new: true }  // Returns the latest 'document'
            )
                .populate('poster')
                .populate('comments.poster');
                console.log('post updated in mutation 1', postUpdated, { postUpdated })
                pubsub.publish(POST_UPDATED, { postUpdated });
                console.log('post updated in mutation 2', postUpdated, { postUpdated })
            return postUpdated;

        })
    },
    Subscription: {  // Utilizes the 'publisher/subsriber' pattern
        postCreated: {
            subscribe: () => pubsub.asyncIterator(POST_CREATED)
        },
        postDeleted: {
            subscribe: () => pubsub.asyncIterator(POST_DELETED)
        },
        postUpdated: {
            subscribe: () => {
                console.log('post updated')
                return pubsub.asyncIterator(POST_UPDATED)}
        }
    }
}