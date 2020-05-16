import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from '@material-ui/core/TextField';
import './forgotPassword.scss';
import {connect} from "react-redux";



const ForgotPassword = (props) => {

    const [email, setEmail] = useState('');
    const forgotPasswordHandler = () => console.log("Link gönderildi.");

    return (
        <div id="forgotPassword-page" className={props.mode}>
            <div id="forgotPassword-page-general">
                <div id="forgotPassword-container">
                    <FormControl noValidate autoComplete="off">
                        <FormGroup row="false">
                            <div id={"email-container"} className={props.mode}>
                                <TextField
                                    error={false}
                                    id={'email'}
                                    label={'Your E-mail'}

                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div id={'button-container'} className={props.mode}>
                                <Button
                                    id={'forgotPasswordButton'}
                                    variant={'contained'}
                                    className={props.mode}
                                    title={'Gönder'}
                                    onClick={forgotPasswordHandler}
                                >
                                    <b>SEND</b>
                                </Button>
                            </div>
                        </FormGroup>
                    </FormControl>
                </div>
            </div>

        </div>
    );
};

const mapStateToProps = ({applicationReducer}) => {
    const {mode} = applicationReducer;
    return {
        mode,
    };
};
export default connect(mapStateToProps)(ForgotPassword);
