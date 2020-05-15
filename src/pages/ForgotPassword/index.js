import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from "@material-ui/core/FormGroup";
import TextField from '@material-ui/core/TextField';
import './forgotPassword.scss';

import {AnimationButton} from '../../components/reusable/AnimationButton';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const forgotPasswordHandler = () => console.log("Link gönderildi.");

        return (
            <div id="forgotPassword-page-general">
                <div className="forgotPassword-container">
                    <FormControl noValidate autoComplete="off">
                        <FormGroup row="false">
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
                            <div id={'button-container'}>
                                <AnimationButton
                                    id={'forgotPasswordButton'}
                                    title={'Gönder'}
                                    onClick={forgotPasswordHandler}
                                />
                            </div>
                        </FormGroup>
                    </FormControl>
                </div>
            </div>
        );
};

export default ForgotPassword;
