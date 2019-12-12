import React from 'react';
import { connect } from "react-redux";
import { Layout } from '../../components';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {

    render() {
        console.log("Home")
        return (
            <Layout>

            </Layout>);
    }
}

export default connect(null, null)(withRouter(Home));