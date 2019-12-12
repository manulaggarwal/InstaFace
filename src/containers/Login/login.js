import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { userDetails } from '../../actions/userAction';

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
    }

    responseFacebook(response) {
        if (response.userID) {
            const { email, picture, userID, name } = response;
            this.props.storeUserDetails({ email, picture, userID, name, isLogged: true });
        }
        this.props.history.push("/home");
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col md="12">
                        <LoginTitle></LoginTitle>
                        <hr />
                    </Col>
                </Row>
                <Row className="app-fb-main">
                    <Col md="12" className="app-fb">
                        <FacebookLogin
                            appId={process.env.REACT_APP_FB_APP_ID}
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                        />
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    storeUserDetails: data => dispatch(userDetails(data))
});

const mapStateToProps = state => ({
    language: state.userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));