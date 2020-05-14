import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from "@material-ui/core/FormGroup";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import './login.scss';

import {AnimationButton} from '../../components/reusable/AnimationButton';

const Login = () => {

    const [email, setEmail] = useState('');
    const [domain, setDomain] = useState({value: 10, children: 'std.iyte.edu.tr'});
    const [password, setPassword] = useState('');

    const loginHandler = () => localStorage.setItem('userData', 'token');

    return (
        <div id='login-page-general'>
            <div className='login-container'>
                <FormControl noValidate autoComplete="off">
                    <FormGroup row={false}>
                        <div id="email-container">
                            <TextField
                                error={false}
                                id="email"
                                label="Your e-mail"
                                variant="outlined"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div id="select-container">
                            <Select
                                labelId="demo-simple-select-label"
                                id="select"
                                onChange={(e,v) => setDomain(v.props)}
                            >
                                <MenuItem value={10}>std.iyte.edu.tr</MenuItem>
                                <MenuItem value={20}>iyte.edu.tr</MenuItem>
                            </Select>
                        </div>
                        <div id='password-container'>
                            <TextField
                                type='password'
                                error={false}
                                id='password'
                                label="Password"
                                variant="outlined"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div id="button-container">
                            <AnimationButton id='loginButton' title='Giriş Yap!' onClick={loginHandler} />
                        </div>
                    </FormGroup>
                </FormControl>
            </div>
        </div>
    )
};

export default Login;