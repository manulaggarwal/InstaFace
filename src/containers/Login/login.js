import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Container, Button, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { userDetails, userLogin } from '../../actions/userAction';
import { Logo } from '../../components';
import titleLogo from '../../components/Logo/logo_resize.png';
import loginPageImage from './hero.jpg';
import './login.css'

function LoginTitle() {
    const { t } = useTranslation();
    return (
        <h3><strong>{t('login-title')}</strong></h3>
    )
}

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: props.language || 'en'
        }
        this.responseFacebook = this.responseFacebook.bind(this);
        this.doFbLogin = this.doFbLogin.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.isUserLoggedIn) {
            this.props.history.push("/home");
        }
    }

    responseFacebook(response) {
        if (response.userID) {
            const { email, picture, userID, name } = response;
            this.props.storeUserDetails({ email, picture, userID, name, isLogged: true });
        }
        this.props.history.push("/home");
    }

    doFbLogin() {
        const fields = {
            fields: "name, email, picture"
        }
        this.props.loginUser(fields);
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row className="app-fb-main" style={{ textAlign: "center" }}>
                        <Col md="12" >
                            <Image style={{width: "35%"}} alt="insta_logo" src={titleLogo}></Image>
                            <div className="login-logo-title">
                                <h1>InstaFace</h1>
                            </div>
                            <div className="login-logo-tag">
                                <span>One stop media search for Facebook and Instagram.</span>
                            </div>
                        </Col>
                        <Col md="12" className="app-fb">
                            <div className="app-fb-btn">
                                <Button className="login-fb-btn" color="primary" onClick={() => { this.doFbLogin() }} >Login with <i className="fab fa-facebook-f"></i></Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Row>
                    <Col md="12">
                        <Image className="login-hero-image" alt="Login Hero Image" src={loginPageImage}></Image>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    storeUserDetails: data => dispatch(userDetails(data)),
    loginUser: fields => dispatch(userLogin(fields))
});

const mapStateToProps = state => ({
    isUserLoggedIn: state.userReducer.userDetails,
    language: state.userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));