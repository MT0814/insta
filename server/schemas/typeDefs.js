const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
    photos: [Photo]!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Photo {
    _id: ID
    photoFile: String   
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Like {
    _id: ID   
  }

  type Follower {
    _id: ID   
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    photos(username: String): [Photo]
    photo(photoId: ID!): Photo
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addPhoto(photoFile: String!): Photo
    addComment(photoId: ID!, commentText: String!): Photo
    addLike(photoId: ID!): Photo
    addFollower(photoId: ID!): Photo   
    removeThought(thoughtId: ID!): Thought
    removePhoto(photoId: ID!): Photo
    removeLike(photoId: ID!): Photo
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
