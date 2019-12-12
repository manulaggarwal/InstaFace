import React from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'react-bootstrap';
import { Logo, Language } from '../../components';
import { changeLanguage } from '../../actions/userAction';
import './header.css';
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.toggleLanguage = this.toggleLanguage.bind(this);
    }

    toggleLanguage(lng) {
        console.log(lng);
        this.props.toggleLanguage(lng);
    }

    render() {
        return (
            <Row className="header-main">
                <Col md="10">
                    <div className="header-logo">
                        <Logo></Logo>
                    </div>
                </Col>
                <Col md="2" style={{ margin: "auto" }}>
                    <div className="header-language">
                        <Language
                            language={this.toggleLanguage}
                        ></Language>
                    </div>
                </Col>
            </Row>)
    }

}


const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    toggleLanguage: lng => dispatch(changeLanguage(lng))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);