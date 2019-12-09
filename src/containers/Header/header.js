import React from 'react';
import { connect } from "react-redux";
import { Logo, Language } from '../../components';
import './header.css';
class Header extends React.Component {

    render() {
        return (<div className="header-main">
            <div className="header-logo">
                <Logo></Logo>
            </div>
            <div className="header-language">
                <Language></Language>
            </div>
        </div>)
    }

}


const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);