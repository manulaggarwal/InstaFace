import React, { Suspense } from "react";
import { connect } from "react-redux";
import "./App.css";
import { changeLanguage } from "./actions/userAction";
import i18n from './i18n';
import { withRouter } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import { Layout } from "./components";
import { Login } from "./containers";


const Loading = () => (<div>
  <h4>Loading...</h4>
</div>)

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      language: i18n.language
    }
  }

  componentDidMount() {
    i18n.init(() => {
      this.props.changeLanguage(i18n.language);
    })
  }

  render() {
    return (
      <Suspense fallback={<Loading></Loading>}>
        <Layout>
          <Container>
            <Row className="app-header-spacing"></Row>
            <Row>
              <Col md="12">
                <Login language={this.state.language}></Login>
              </Col>
            </Row>
          </Container>
        </Layout>
      </Suspense>
    );
  }
}

const mapStateToProps = state => ({
  language: state.userReducer
});

const mapDispatchToProps = dispatch => ({
  changeLanguage: (obj) => dispatch(changeLanguage(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
