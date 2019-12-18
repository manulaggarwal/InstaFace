import React from 'react';
import { connect } from "react-redux";
import { Row, Col, Container, Button } from 'react-bootstrap';
import { userLogout } from "../../actions/userAction";

class Account extends React.Component {

    constructor(props) {
        super(props);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick() {
        window.FB.logout();
        this.props.doLogout(); 
        window.location.replace("/login");
    }

    render() {
        const userDetails = this.props.user;
        return (<Container>
            <Row>
                <Col>
                    <h2>Account Info</h2>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>
                        <span>Name:</span><span>&nbsp;&nbsp;{userDetails.name}</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>
                        <span>Email:</span><span>&nbsp;&nbsp;{userDetails.email}</span>
                    </div>
                </Col>
            </Row>
            <Row style={{marginTop: "25px"}}>
                <Col >
                    <Button onClick={()=>{this.onLogoutClick()}}>Logout</Button>
                </Col>
            </Row>
        </Container>);
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.userDetails
});

 const mapDispatchToProps = dispatch => ({
     doLogout: () => dispatch(userLogout())
 });

export default connect(mapStateToProps, mapDispatchToProps)(Account);