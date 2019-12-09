import React, { Suspense } from "react";
import { connect } from "react-redux";
import "./App.css";
import { useTranslation } from 'react-i18next';
import { simpleAction } from "./actions/simpleAction";
import { Header } from './containers';
import FacebookLogin from 'react-facebook-login';

function Page() {
  const { t } = useTranslation();
  return (
    <div>{t('title')}</div>
  )
}

const Loading = () => (<div>
  <span>Loading...</span>
</div>)

class App extends React.Component {

  simpleAction = () => {
    this.props.simpleAction();
  };

  responseFacebook = (response) => {
    console.log(response);
  }

  facebookLoginClick = (e) => {
    console.log(e);
  }

  render() {
    return (
      <Suspense fallback={<Loading></Loading>}>
        <Header></Header>
        <div className="App">
          <Page></Page>
          <FacebookLogin
            appId={process.env.REACT_APP_FB_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            onClick={this.facebookLoginClick}
            callback={this.responseFacebook} />
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
