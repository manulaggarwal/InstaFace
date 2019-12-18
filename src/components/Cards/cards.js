import React from 'react';
import { Col, Image } from 'react-bootstrap';
import ScrollAnimation from 'react-animate-on-scroll';
import './cards.css';

const Cards = (props) => (
    <Col className="card-fb-feed-photo" >
        <ScrollAnimation animateIn="fadeIn" >
            {
                props.list.mediaType === "VIDEO" ? (
                    <video width="225" height="225" controls>
                        <source src={props.list.source} type="video/mp4"></source>
                    </video>
                ) : (
                        <Image onClick={props.onClick} alt=":(" src={props.list.source} width={props.list.width || '300px'} height={props.list.height || 'auto'}></Image>
                    )
            }
            <div>
                {
                    props.loadingInstaPhotos ? (<span>{props.list.caption}</span>) : null
                }
            </div>
        </ScrollAnimation>
    </Col>
);

export default Cards;