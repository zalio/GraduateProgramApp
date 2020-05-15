import React, {useState, useEffect} from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from "@material-ui/core/FormGroup";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import './register.scss';


import {AnimationButton} from '../../components/reusable/AnimationButton';

const Register = () => {

    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [domain, setDomain] = useState({value: 10, children: 'std.iyte.edu.tr'});
    const [role, setRole] = useState({value: 1, children: 'Student'});
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const registerHandler = () => console.log("Kayıt olundu.");

    return (
        <div id='register-page-general'>
            <div className={'register-container'}>
                <FormControl noValidate autoComplete={"off"}>
                    <FormGroup row={false}>
                        <div id={"email-container"}>
                            <TextField
                            error={false}
                            id={'email'}
                            label={'Your E-mail'}
                            variant={'standard'}
                            value={email}
                            onChange={e => setEmail(e.target.value)}

                            />
                        </div>
                        <div id={'select-container'}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="select"
                                onChange={(e,v) => setDomain(v.props)}>

                                <MenuItem value={10}>std.iyte.edu.tr</MenuItem>
                                <MenuItem value={20}>iyte.edu.tr</MenuItem>
                            </Select>

                        </div>
                        <div id={"department-container"}>
                            <TextField
                                error={false}
                                id={'department'}
                                label={'Your Department'}
                                variant={'standard'}
                                value={department}
                                onChange={e => setDepartment(e.target.value)}

                            />
                        </div>
                        <div id='password-container'>
                            <TextField
                                type='password'
                                error={false}
                                id='password'
                                label="Password"
                                variant="standard"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div id='password-container'>
                            <TextField
                                type='password'
                                error={false}
                                id='repassword'
                                label="Password again"
                                variant="standard"
                                value={rePassword}
                                onChange={e => setRePassword(e.target.value)}
                            />
                        </div>
                        <div id="select-container">
                            <Select
                                labelId="demo-simple-select-label2"
                                id="selectRole"
                                onChange={(e,v) => setRole(v.props)}
                            >
                                <MenuItem value={1}>Student</MenuItem>
                                <MenuItem value={2}>Teacher</MenuItem>
                                <MenuItem value={3}>Admin</MenuItem>
                            </Select>
                        </div>
                        <div id={'button-container'}>
                            <AnimationButton
                            id={'registerButton'}
                            title={'Kayıt ol'}
                            onClick={registerHandler}
                            />
                        </div>

                    </FormGroup>
                </FormControl>
            </div>
        </div>
    );
};

export default Register;
