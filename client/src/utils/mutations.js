import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_PHOTO = gql`
  mutation addPhoto($photoFile: String!){
    addPhoto(photoFile: $photoFile) {
      _id
      photoFile
      photoAuthor
      createdAt
      comments {
        _id
        commentText
      }
      likes {
        _id
      }
      followers {
        follower_id
        following_id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($photoId: ID!, $commentText: String!) {
    addComment(photoId: $photoId, commentText: $commentText) {
      _id
      photoFile
      photoAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

