import React, { Suspense } from "react";
import { connect } from "react-redux";
import "./App.css";
import { changeLanguage } from "./actions/userAction";
import i18n from './i18n';
import { Row, Col, Container } from 'react-bootstrap';
import { Layout } from "./components";

const Loading = () => (<div>
  <h4>Loading...</h4>
</div>)

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      language: i18n.language
    }
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage() {
    i18n.init(() => {
      this.props.changeLanguage(i18n.language);
    })
  }

  componentDidMount() {
    this.changeLanguage();
  }

  render() {
    return (
      <Suspense fallback={<Loading></Loading>}>
        <Layout toggleLanguage={this.changeLanguage}>
          <Container>
            <Row className="app-header-spacing"></Row>
            <Row><Col>{this.props.children}</Col></Row>
          </Container>
        </Layout>
      </Suspense>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer
});

const mapDispatchToProps = dispatch => ({
  changeLanguage: (obj) => dispatch(changeLanguage(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
