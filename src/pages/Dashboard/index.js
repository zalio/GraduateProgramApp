import React from "react";
import { connect } from 'react-redux';
import {AnimationButton} from '../../components/reusable/AnimationButton';
import './dashboard.scss';

import Login from "../Login";

import { registerRequest, registerSuccess } from "../../store/actions/auth";

const Dashboard = (props) => {
    return (
        <div>
            Welcome to Ege
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
