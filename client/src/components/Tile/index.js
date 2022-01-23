import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import millie from '../../images/millie.JPG'
import im2 from '../../images/im1.png'
import { Card, Icon, Image } from 'semantic-ui-react'

function Tile({ thought, showUsername }) {
    return (
        <Card key={thought._id}>
            <Card.Content>
                <Image className="ui avatar image" src={millie} wrapped ui={false} />User Name
                {/* <Card.Header>Millie</Card.Header> */}
            </Card.Content>
            <Image src={im2} wrapped ui={false} />
            {/* <Card.Content> */}

            {/* <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                </Card.Meta> */}

            {/* <Card.Description>
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
                </Card.Description> */}
            {/* </Card.Content> */}

            <Card.Content extra>
                <span className="right floated">
                    <a>
                        <Icon name='like' />4 Likes
                    </a>
                </span>
                <a>
                    <Link className="submit button" to="/commentform">
                        <Icon name='comment' />4 Comments
                    </Link>

                </a>
            </Card.Content>
            {/* 
            <Card.Content extra>

                <Input placeholder="Add Comment..." />

            </Card.Content> */}


        </Card >


        // <div class="ui grid">
        //     <div class="three column row">
        //         <div class="column">
        //             <div className="ui card" key={thought._id} >
        //                 <div className="content">
        //                     <img className="ui avatar image" src={millie}></img>Millie
        //                 </div>
        //                 <div className="image">
        //                     <img src={im2} alt="emily"></img>
        //                 </div>
        //                 <div className="content">
        //                     <span className="right floated">
        //                         <Icon name='like' />4 Likes
        //                     </span>
        //                     <i className="comment icon"></i>
        //                     3 comments
        //                 </div>
        //                 <div className="extra content">
        //                     <div className="ui large transparent left icon input">
        //                         <i className="heart outline icon"></i>
        //                         <input type="text" placeholder="Add Comment..."></input>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>

        //     </div>
        // </div>
    )
}

export default Tile

/* <div className="right floated meta">
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
            </div> */