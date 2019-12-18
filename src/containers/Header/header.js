import React from 'react';
import { connect } from "react-redux";
import { Row, Col, Image } from 'react-bootstrap';
import { Logo, Language } from '../../components';
import { changeLanguage } from '../../actions/userAction';
import { withRouter } from "react-router-dom";
import SearchInput, { createFilter } from 'react-search-input';
import './header.css';
import { searchQuery } from '../../actions/searchAction';

const KEYS_TO_FILTER = ['name', 'caption', 'id', 'media_type'];

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        };
        this.toggleLanguage = this.toggleLanguage.bind(this);
        this.clickAccount = this.clickAccount.bind(this);
        this.searchUpdated = this.searchUpdated.bind(this);
    }

    toggleLanguage(lng) {
        this.props.toggleLanguage(lng);
    }

    clickAccount() {
        this.props.history.push("/account/" + this.props.user.id);
    }

    searchUpdated(term) {
        const searchData = this.createSearchArray();
        let filteredData = [];
        if (searchData.length > 0) {
            filteredData = searchData.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTER));
        }
        this.setState({ searchTerm: term });
        if (term === "") {
            this.props.search({
                searchTerm: term,
                data: [],
                isSearching: false
            })
        } else {
            this.props.search({
                searchTerm: term,
                data: filteredData,
                isSearching: true
            })
        }
    }



    createSearchArray() {
        let a = [];
        if (this.props.user && this.props.user.albums && this.props.user.albums.data) {
            a = a.concat(this.props.user.albums.data);
        }
        if (this.props.user.instaMedia && this.props.user.instaMedia.data) {
            a = a.concat(this.props.user.instaMedia.data);
        }
        return a;
    }

    render() {
        const { isLoggedIn } = this.props || false;
        return isLoggedIn ? (
            <Row className="header-main">
                <Col md="2">
                    <div className="header-logo">
                        <Logo w="60px" h="60px"></Logo>
                    </div>
                </Col>
                <Col md="6">
                    <div className="header-search">
                        <SearchInput placeholder="Search Albums, Media, Caption here..." onChange={this.searchUpdated} className="search-input"></SearchInput>
                    </div>
                </Col>
                <Col md="2">
                    <div onClick={() => { this.clickAccount() }} className="header-user-icon">
                        <Row>
                            <Col md="6" className="header-user-pic">
                                <Image width="24px" height="24px" src={this.props.user.picture.data.url}></Image>
                            </Col>
                            <Col md="6">
                                <span style={{ color: "white" }}>&nbsp;{this.props.user.name.split(" ")[0]}</span>
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
    user: state.userReducer.userDetails,
    lang: state.userReducer.changeLanguage
});

const mapDispatchToProps = dispatch => ({
    toggleLanguage: lng => dispatch(changeLanguage(lng)),
    search: query => dispatch(searchQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));