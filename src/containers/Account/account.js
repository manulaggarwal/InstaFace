import React from 'react';
import { connect } from "react-redux";
import { Row, Col, Image, Container } from 'react-bootstrap';

class Account extends React.Component {

    render() {

        return (<Container>
            <Row>
                <Col>
                    <Image src={this.props.user.picture.data.url}></Image>
                </Col>
            </Row>
        </Container>);

    }
}

const mapStateToProps = state => ({
    user: state.userReducer.userDetails
});

// const mapDispatchToProps = dispatch => ({
//     toggleLanguage: lng => dispatch(changeLanguage(lng))
// });

export default connect(mapStateToProps, null)(Account);