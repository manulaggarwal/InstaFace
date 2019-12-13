import React from 'react';
import { Col, Image } from 'react-bootstrap';
import ScrollAnimation from 'react-animate-on-scroll';
import './cards.css';

const Cards = (props) => (
    <Col className="card-fb-feed-photo" md="12">
        <ScrollAnimation animateIn="fadeIn" >
            <Image src={props.list.source} width="225" height="225"></Image>
            <div>
                <span>Likes: {props.list.likes}</span>
            </div>
        </ScrollAnimation>
    </Col>
);

export default Cards;