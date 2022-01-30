// import React, { useState, useRef } from "react";
// // import "./index.css";
// // import { gql } from "apollo-boost";
// import { useQuery, useMutation } from "@apollo/client";
// // import { useAuth } from "../utils/auth";
// import { Button, Label, Icon } from 'semantic-ui-react';
// import { REMOVE_LIKE, ADD_LIKE } from "../utils/mutations";
// import { QUERY_LIKES } from "../utils/queries"





// function Like(props) {
//   // const { isAuthenticated, user } = useAuth();

//   // stores if the currently logged in user has liked the post
//   const [liked, setLiked] = useState(false);
//   // stores the number of likes
//   const [countLikes, setCountLikes] = useState(-1);

//   // will store value of userId for the lifetime of component
//   const userId = useRef(null);

//   // if (isAuthenticated) {
//   //   userId.current = user.sub;
//   // } else {
//     userId.current = "none";
//   // }

//   // like post mutation
//   const [likePost] = useMutation(ADD_LIKE, {
//     variables: { postId: props.postId, userId: userId.current },
//     refetchQueries: [
//       {
//         query: QUERY_LIKES,
//         variables: { id: props.postId, userId: userId.current }
//       }
//     ]
//   });

//   // delete post mutation
//   const [deleteLike] = useMutation(REMOVE_LIKE, {
//     variables: { postId: props.postId, userId: userId.current },
//     refetchQueries: [
//       {
//         query: QUERY_LIKES,
//         variables: { id: props.postId, userId: userId.current }
//       }
//     ]
//   });

//   // fetch number of likes and array with like_id if user has already liked the post or an empty array
//   const { loading, error, data } = useQuery(QUERY_LIKES, {
//     variables: { id: props.postId, userId: userId.current }
//   });

//   // if above useQuery data is not loaded
//   if (loading) return "Loading...";
//   // if data fetch failed
//   if (error) return `Error! ${error.message}`;

//   // countLikes is used to ensure that it should only run for the first time
//   if (countLikes === -1) {
//     // if the user has already liked the post, we know that data has loaded now so we can reference data.Post
//     if (data.Post[0].Likes.length > 0) {
//       setLiked(true);
//     }

//     // store value of number of likes in state, we are putting check conditions to prevent infinite loops
//     setCountLikes(data.Post[0].Likes_aggregate.aggregate.count);
//   }

//   return (
//     <div className="post-like-container">
//       {/* isAuthenticated && */ (
//         <>
//           {!liked && (
//             <Button
//               className="post-like-button-white button-nodec"
//               onClick={() => {
//                 likePost();
//                 setLiked(true);
//                 setCountLikes(countLikes + 1);
//               }}
//             />
//           )}
//           {liked && (
//             <Button
//               className="post-like-button-black button-nodec"
//               onClick={() => {
//                 deleteLike();
//                 setLiked(false);
//                 setCountLikes(countLikes - 1);
//               }}
//             />
//           )}
//         </>
//       )}
//       {countLikes ? <span className="Post-likes">{countLikes} likes</span> : null}
//     </div>
//   );
// }

// export default Like;