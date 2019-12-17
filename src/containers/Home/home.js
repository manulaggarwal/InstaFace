import React from 'react';
import { connect } from "react-redux";
import { Row, Col, Container, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { fetchUserPhotos, instaToken, instaLogin } from '../../actions/userAction';
import { Card } from '../../components';
import './home.css';
import "animate.css/animate.min.css";
import { getCookie } from '../../util/instaUtil';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.onConnectInstaClick = this.onConnectInstaClick.bind(this);
    }

    onConnectInstaClick() {
        this.props.instaToken();
    }

    componentDidMount() {
        let cookie = getCookie("insta_access_token");
        if (cookie) {
            this.props.instaLogin(cookie);
        }
        this.props.fetchUserPhotos();
    }

    getAllPhotoSourceFromAllAlbums() {
        const { albums } = this.props.userDetails;
        let photoList = [];
        if (albums) {
            albums.data.map(v => v.photos !== undefined ? v.photos.data.map(p => {
                let imgData = p.images[p.images.length - 1];
                photoList.push({ source: imgData.source, width: imgData.width, height: imgData.height, likes: p.likes.summary.total_count });
                return true;
            }) : [])
        }
        return photoList;
    }

    getUserInstagramPhoto() {
        const { instaMedia } = this.props.userDetails;
        let instaList = [];
        instaMedia && instaMedia.data && instaMedia.data.map(m => {
            instaList.push({ source: m.media_url, mediaType: m.media_type, caption: m.caption })
            return true;
        })
        return instaList;
    }

    render() {
        const photoList = this.getAllPhotoSourceFromAllAlbums();
        const isInstaConnected = !!this.props.userDetails.instaProfile;
        const instaMedia = isInstaConnected ? this.getUserInstagramPhoto() : [];
        return (
            <Container>
                <Row>
                    <Col md={isInstaConnected ? "6" : "12"}>
                        <div className="home-top-bar">
                            <span className="home-top-title">Facebook Feed</span>
                            {
                                isInstaConnected ? null : (
                                    <span className="home-top-insta-connect">
                                        <Button onClick={() => { this.onConnectInstaClick() }} color="primary">Connect Instagram</Button>
                                    </span>
                                )
                            }

                            <hr />
                        </div>
                        <div className="home-fb-feed-main">
                            <hr />
                            <Row>
                                {
                                    photoList.map((l, i) => (
                                        <Card isInstaConnected={isInstaConnected} key={i} list={l}></Card>
                                    ))
                                }
                            </Row>
                        </div>
                    </Col>
                    {
                        isInstaConnected ? (
                            <Col md="6">
                                <h3>Instagram Feed</h3>
                                <hr />
                                <div className="home-fb-feed-main">
                                    <Row>
                                        {
                                            instaMedia.map((l, i) => (
                                                <Card loadingInstaPhotos={true} isInstaConnected={isInstaConnected} key={i} list={l}></Card>
                                            ))
                                        }
                                    </Row>
                                </div>
                            </Col>
                        ) : null
                    }

                </Row>
            </Container >);
    }
}

const mapDispatchToProps = dispatch => ({
    fetchUserPhotos: () => dispatch(fetchUserPhotos()),
    instaToken: () => dispatch(instaToken()),
    instaLogin: (cookie) => dispatch(instaLogin(cookie))
});

const mapStateToProps = state => ({
    userDetails: state.userReducer.userDetails
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));