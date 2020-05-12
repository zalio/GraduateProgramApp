import React from "react";
import { connect } from 'react-redux';

import { registerRequest, registerSuccess } from "../../store/actions/auth";

const Dashboard = (props) => {
    return (
        <div>
            <p>Welcome to Dashboard</p>
            <button onClick={() => props.registerRequest()}>Request</button>
            <button onClick={() => props.registerSuccess()}>Success</button>
            <h1>{props.loading === false ? 'False' : 'True'}</h1>
        </div>
    )
};

const mapStateToProps = ({ authReducer }) => {
    const { loading } = authReducer;
    return { loading };
};

const mapDispatchToProps = {
    registerRequest,
    registerSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
