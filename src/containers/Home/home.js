import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

class Home extends React.Component {

    render() {
        console.log("Home")
        return null;
    }
}

export default connect(null, null)(withRouter(Home));