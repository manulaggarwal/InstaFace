import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { userDetails, userLogin } from '../../actions/userAction';

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
            <Container>
                <Row>
                    <Col md="12">
                        <LoginTitle></LoginTitle>
                        <hr />
                    </Col>
                </Row>
                <Row className="app-fb-main">
                    <Col md="12" className="app-fb">
                        <div className="app-fb-btn">
                            <button onClick={() => { this.doFbLogin() }} className="form-control">Login with FB</button>
                        </div>
                    </Col>
                </Row>
            </Container>
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