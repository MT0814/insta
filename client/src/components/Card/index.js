import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Card({ thought, showUsername }) {
    return (
        <div className="ui card" key={thought._id} >
            <div className="content">
                <div className="right floated meta">
                    {showUsername ? (
                        <Link
                            className="text-light"
                            to={`/profiles/${thought.thoughtAuthor}`}
                        >
                            {thought.thoughtAuthor} <br />
                            <span style={{ fontSize: '1rem' }}>
                                had this thought on {thought.createdAt}
                            </span>
                        </Link>
                    ) : (
                        <>
                            <span style={{ fontSize: '1rem' }}>
                                You had this thought on {thought.createdAt}
                            </span>
                        </>
                    )}
                </div>
                <img className="ui avatar image" src="/images/avatar/large/elliot.jpg"></img> Elliot
            </div>
            <div className="image">
                <img></img>
            </div>
            <div className="content">
                <span className="right floated">
                    <i className="heart outline like icon"></i>
                    17 likes
                </span>
                <i className="comment icon"></i>
                3 comments
            </div>
            <div className="extra content">
                <div className="ui large transparent left icon input">
                    <i className="heart outline icon"></i>
                    <input type="text" placeholder="Add Comment..."></input>
                </div>
            </div>
        </div>
        //     <div key={thought._id} className="card mb-3">
        //     <h4 className="card-header bg-primary text-light p-2 m-0">
        //       {showUsername ? (
        //         <Link
        //           className="text-light"
        //           to={`/profiles/${thought.thoughtAuthor}`}
        //         >
        //           {thought.thoughtAuthor} <br />
        //           <span style={{ fontSize: '1rem' }}>
        //             had this thought on {thought.createdAt}
        //           </span>
        //         </Link>
        //       ) : (
        //         <>
        //           <span style={{ fontSize: '1rem' }}>
        //             You had this thought on {thought.createdAt}
        //           </span>
        //         </>
        //       )}
        //     </h4>
        //     <div className="card-body bg-light p-2">
        //       <p>{thought.thoughtText}</p>
        //     </div>
        //     <Link
        //       className="btn btn-primary btn-block btn-squared"
        //       to={`/thoughts/${thought._id}`}
        //     >
        //       Join the discussion on this thought.
        //     </Link>
        //   </div>
    )
}

export default Card