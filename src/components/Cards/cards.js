import React from 'react';
import { Col, Image } from 'react-bootstrap';
import ScrollAnimation from 'react-animate-on-scroll';
import './cards.css';

const Cards = (props) => (
    <Col className="card-fb-feed-photo" md={props.isInstaConnected ? "6" : "3"}>
        <ScrollAnimation animateIn="fadeIn" >
            {
                props.list.mediaType === "VIDEO" ? (
                    <video width="225" height="225" controls>
                        <source src={props.list.source} type="video/mp4"></source>
                    </video>
                ) : (
                        <Image alt=":(" src={props.list.source} width="225" height="225"></Image>
                    )
            }


            <div>
                {
                    props.loadingInstaPhotos ? (<span>Likes: {props.list.caption}</span>) : (
                        <span>Likes: {props.list.likes}</span>
                    )
                }

            </div>
        </ScrollAnimation>
    </Col>
);

export default Cards;