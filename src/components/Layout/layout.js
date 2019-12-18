import React from 'react';
import { Header } from '../../containers';
import { Row, Col } from 'react-bootstrap';

export default (props) => (<div>

    <Row>
        <Col md="12">
            <Header></Header>
        </Col>
    </Row>
    <Row>
        <Col md="12">
            {props.children}
        </Col>
    </Row>

</div>)