import React, { Suspense } from "react";
import { connect } from "react-redux";
import "./App.css";
import { useTranslation } from 'react-i18next';
import { simpleAction } from "./actions/simpleAction";
import { Logo } from './components';

function Page() {
  const { t } = useTranslation();
  return (
    <div>{t('title')}</div>
  )
}

class App extends React.Component {

  simpleAction = () => {
    this.props.simpleAction();
  };

  render() {
    return (
      <Suspense fallback="Loading...">
        <Logo></Logo>
        <div className="App">
          <Page></Page>
          <button onClick={this.simpleAction}>Test redux action</button>
          <pre>{JSON.stringify(this.props)}</pre>
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
