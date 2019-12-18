import React from 'react';
import { connect } from "react-redux";
import { Row, Col, Image } from 'react-bootstrap';
import { Logo, Language } from '../../components';
import { changeLanguage } from '../../actions/userAction';
import { withRouter } from "react-router-dom";
import './header.css';
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.toggleLanguage = this.toggleLanguage.bind(this);
        this.clickAccount = this.clickAccount.bind(this);
    }

    toggleLanguage(lng) {
        this.props.toggleLanguage(lng);
    }

    clickAccount() {
        this.props.history.push("/account/" + this.props.user.id);
    }

    render() {
        const { isLoggedIn } = this.props || false;
        return isLoggedIn ? (
            <Row className="header-main" className="header-background">
                <Col md="8">
                    <div className="header-logo">
                    <Logo w="60px" h="60px"></Logo>
                    </div>
                </Col>
                <Col md="2">
                    <div onClick={() => { this.clickAccount() }} className="header-user-icon">
                        <Row>
                            <Col md="6" className="header-user-pic">
                                <Image width="24px" height="24px" src={this.props.user.picture.data.url}></Image>
                            </Col>
                            <Col md="6">
                                <span>&nbsp;{this.props.user.name.split(" ")[0]}</span>
                            </Col>
                        </Row>

                    </div>
                </Col>
                <Col md="2" style={{ margin: "auto" }}>
                    <div className="header-language">
                        <Language
                            language={this.toggleLanguage}
                        ></Language>
                    </div>
                </Col>
            </Row>
        ) : (
                <Row className="header-main">
                    <Col md="10">
                        <div className="header-logo">
                            <Logo w="60px" h="60px"></Logo>
                        </div>
                    </Col>
                    <Col md="2" style={{ margin: "auto" }}>
                        <div className="header-language">
                            <Language
                                language={this.toggleLanguage}
                            ></Language>
                        </div>
                    </Col>
                </Row>
            )
    }
}


const mapStateToProps = state => ({
    isLoggedIn: state.userReducer.userDetails.isLogged,
    user: state.userReducer.userDetails
});

const mapDispatchToProps = dispatch => ({
    toggleLanguage: lng => dispatch(changeLanguage(lng))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));