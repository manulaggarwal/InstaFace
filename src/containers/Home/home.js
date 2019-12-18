import React from 'react';
import { connect } from "react-redux";
import { Row, Col, Container, Button, Modal, Image } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchUserPhotos, instaToken, instaLogin } from '../../actions/userAction';
import { Card } from '../../components';
import './home.css';
import "animate.css/animate.min.css";
import { getCookie } from '../../util/instaUtil';

function ConnectTitle() {
    const { t } = useTranslation();
    return (<span>{t('connect')}</span>)
}

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalData: {}
        }
        this.onConnectInstaClick = this.onConnectInstaClick.bind(this);
        this.onFBPhotoClick = this.onFBPhotoClick.bind(this);
        this.onInstaPhotoClick = this.onInstaPhotoClick.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
    }

    onModalClose() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    onConnectInstaClick() {
        this.props.instaToken();
    }

    componentDidMount() {
        let cookie = getCookie("insta_access_token");
        if (cookie && !this.props.userDetails.hasOwnProperty("instaMedia")) {
            this.props.instaLogin(cookie);
        }
        this.props.fetchUserPhotos();
    }

    getAllPhotoSourceFromAllAlbums(data) {
        const albums = this.props.userDetails.albums;
        let photoList = [];
        if (albums) {
            albums.data.map(v => v.photos !== undefined ? v.photos.data.map(p => {
                let imgData = p.images[p.images.length - 1];
                photoList.push({ name: v.name, source: imgData.source, primaryImage: p.images[0].source, primaryImageWidth: p.images[0].width, primaryImageHeight: p.images[0].height, width: imgData.width, height: imgData.height, likes: p.likes.summary.total_count });
                return true;
            }) : [])
        }
        return photoList;
    }

    getUserInstagramPhoto() {
        const { instaMedia } = this.props.userDetails;
        let instaList = [];
        instaMedia && instaMedia.data && instaMedia.data.map(m => {
            instaList.push({ source: m.media_url, primaryImage: m.media_url, mediaType: m.media_type, caption: m.caption })
            return true;
        })
        return instaList;
    }

    loadModalAndData(data) {
        this.setState({
            showModal: !this.state.showModal,
            modalData: data
        })
    }

    onInstaPhotoClick(pic) {
        this.loadModalAndData(pic);
    }

    onFBPhotoClick(pic) {
        this.loadModalAndData(pic);
    }

    showSearchResults(results, isInstaConnected) {
        const lists = results.data || [];
        let a = [];
        for (const list of lists) {
            if (list.name) {
                if (list.photos) {
                    for (const photo of list.photos.data) {
                        let imgData = photo.images[photo.images.length - 1];
                        a.push({ name: list.name, source: imgData.source, primaryImage: photo.images[0].source, primaryImageWidth: photo.images[0].width, primaryImageHeight: photo.images[0].height, width: imgData.width, height: imgData.height, likes: photo.likes.summary.total_count })
                    }
                }
            } else {
                a.push({ source: list.media_url, primaryImage: list.media_url, mediaType: list.media_type, caption: list.caption });
            }
        }

        return <Container>
            <Row>
                <Col md={isInstaConnected ? "6" : "12"}>
                    <div className="home-top-bar">
                        <span className="home-top-title">You searched for <strong>'{results.searchTerm}'</strong></span>
                        {
                            isInstaConnected ? null : (
                                <span className="home-top-insta-connect">
                                    <Button onClick={() => { this.onConnectInstaClick() }} color="primary"><ConnectTitle></ConnectTitle>&nbsp;Instagram&nbsp;<i className="fab fa-instagram"></i></Button>
                                </span>
                            )
                        }

                        <hr />
                    </div>
                    <div className="home-fb-feed-main">
                        <hr />
                        <Row>
                            {
                                a.map((l, i) => (
                                    <Card onClick={() => { this.onFBPhotoClick(l) }} isInstaConnected={isInstaConnected} key={i} list={l}></Card>
                                ))
                            }
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    }

    render() {
        const photoList = this.getAllPhotoSourceFromAllAlbums();
        const isInstaConnected = !!this.props.userDetails.instaProfile;
        const instaMedia = isInstaConnected ? this.getUserInstagramPhoto() : [];
        if (!!this.props.searchDetails.isSearching) {
            return this.showSearchResults(this.props.searchDetails, isInstaConnected);
        }
        return (
            <Container>
                <Row>
                    <Col md={isInstaConnected ? "6" : "12"}>
                        <div className="home-top-bar">
                            <span className="home-top-title">Facebook Feed</span>
                            {
                                isInstaConnected ? null : (
                                    <span className="home-top-insta-connect">
                                        <Button onClick={() => { this.onConnectInstaClick() }}><ConnectTitle></ConnectTitle>&nbsp;Instagram&nbsp;<i className="fab fa-instagram"></i></Button>
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
                                        <Card onClick={() => { this.onFBPhotoClick(l) }} isInstaConnected={isInstaConnected} key={i} list={l}></Card>
                                    ))
                                }
                            </Row>
                        </div>
                    </Col>
                    {
                        isInstaConnected ? (
                            <Col md="6">
                                <span className="home-top-title">Instagram Feed</span>
                                <hr />
                                <div className="home-fb-feed-main">
                                    <Row>
                                        {
                                            instaMedia.map((l, i) => (
                                                <Card onClick={() => { this.onInstaPhotoClick(l) }} loadingInstaPhotos={true} isInstaConnected={isInstaConnected} key={i} list={l}></Card>
                                            ))
                                        }
                                    </Row>
                                </div>
                            </Col>
                        ) : null
                    }

                </Row>
                <Modal size="lg" dialogClassName="modal-90w" centered show={this.state.showModal} onHide={this.onModalClose}>
                    <Modal.Body>
                        <div style={{ overflow: "auto", textAlign: "center" }}>
                            <Image src={this.state.modalData.primaryImage} width={this.state.modalData.primaryImageWidth || 'auto'} height={this.state.modalData.primaryImageHeight || 'auto'}></Image>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{ flex: "1", justifyContent: "left" }}>
                            {
                                this.state.modalData.name ? (<span><span>{this.state.modalData.likes}&nbsp;&nbsp;Like(s)</span><span style={{ float: "right" }}>Album:&nbsp;{this.state.modalData.name}</span></span>) : <span>{this.state.modalData.caption}</span>
                            }
                        </div>
                    </Modal.Footer>
                </Modal>
            </Container >);
    }
}

const mapDispatchToProps = dispatch => ({
    fetchUserPhotos: () => dispatch(fetchUserPhotos()),
    instaToken: () => dispatch(instaToken()),
    instaLogin: (cookie) => dispatch(instaLogin(cookie))
});

const mapStateToProps = state => ({
    userDetails: state.userReducer.userDetails,
    searchDetails: state.searchReducer.search
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));