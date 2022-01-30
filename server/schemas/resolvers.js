const { AuthenticationError } = require('apollo-server-express');
// const { default: Like } = require('../../client/src/components/Like');
const { User, Thought, Photo } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // users: async () => {
    //   return User.find().populate('thoughts');
    // },
    users: async () => {
      return User.find().populate('photos');
    },
    // user: async (parent, { username }) => {
    //   return User.findOne({ username }).populate('thoughts');
    // },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('photos');
    },
    thoughts: async (parent, { username }) => {
      console.log( thoughts);
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      console.log(thought)
      return Thought.findOne({ _id: thoughtId });
    },
    photos: async (parent, { username }) => {
      console.log("======== writing photos =================");
      console.log(photos)
      const params = username ? { username } : {};
      return Photo.find(params).sort({ createdAt: -1 });
    },
    photo: async (parent, { photoId }) => {
      return Photo.findOne({ _id: photoId });
    },
    // like: async (parent, { likeId }) => {
    //   return Like.findOne({ _id: likeId });
    // },
    // follower: async (parent, { followerId }) => {
    //   return Like.findOne({ _id: followerId });
    // },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addThought: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addPhoto: async (parent, { photoFile }, context) => {
      if (context.user) {
        const photo = await Photo.create({
          photoFile,
          photoAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { photos: photo._id } }
        );

        return photo;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { photoId, commentText }, context) => {
      if (context.user) {
        return Photo.findOneAndUpdate(
          { _id: photoId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addLike: async (parent, { likeId }, context) => {
      if (context.user) {
        return 
        // Like.findOneAndUpdate(
        //   { _id: photoId },
        //   {
        //     new: true,
        //     runValidators: true,
        //   }
        // );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addFollower: async (parent, { followerId }, context) => {
      if (context.user) {
        return Follower.findOneAndUpdate(
          { _id: photoId },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removePhoto: async (parent, { photoId }, context) => {
      if (context.user) {
        const photo = await Photo.findOneAndDelete({
          _id: photoId,
          photoAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { photos: photo._id } }
        );

        return photo;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { thoughtId, commentId }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeLike: async (parent, { photoId, likeId }, context) => {
      if (context.user) {
        return Photo.findOneAndUpdate(
          { _id: photoId },
          {
            $pull: {
              likes: {
                _id: likeId,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
