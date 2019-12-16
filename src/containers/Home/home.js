import React from 'react';
import { connect } from "react-redux";
import { Row, Col, Container, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { fetchUserPhotos } from '../../actions/userAction';
import { Card } from '../../components';
import './home.css';
import "animate.css/animate.min.css";
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.onConnectInstaClick = this.onConnectInstaClick.bind(this);
    }

    onConnectInstaClick() {
        const uri = "https://api.instagram.com/oauth/authorize?redirect_uri=https://localhost:3000/auth&scope=user_profile,user_media&response_type=code&app_id=750643575455641";
        window.location.replace(uri);
    }

    componentDidMount() {
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



    render() {
        const photoList = this.getAllPhotoSourceFromAllAlbums();
        return (
            <Container>
                <Row>
                    <Col md="6">
                        <h3>Facebook Feed</h3>
                        <hr />
                        <div className="home-fb-feed-main">
                            <Row>
                                {
                                    photoList.map((l, i) => (
                                        <Card key={i} list={l}></Card>
                                    ))
                                }
                            </Row>
                        </div>
                    </Col>
                    <div className="home-feed-margin"></div>
                    <Col md="5">
                        <h3>Instagram Feed</h3>
                        <hr />
                        <Button onClick={() => { this.onConnectInstaClick() }} color="primary">Connect Instagram</Button>

                    </Col>
                </Row>
            </Container >);
    }
}

const mapDispatchToProps = dispatch => ({
    fetchUserPhotos: () => dispatch(fetchUserPhotos())
});

const mapStateToProps = state => ({
    userDetails: state.userReducer.userDetails
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));