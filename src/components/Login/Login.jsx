import { Button, TextField } from '@material-ui/core';
import React, {useState} from 'react';
import "./Login.css";
import user from "./auth.json";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setError]  = useState("");

    const userIdHandler = (e) => {
        setUserId(e.target.value);
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let auth = user.filter((it) => it.user === userId && it.pass === password);
        if(auth.length > 0){
            sessionStorage.setItem("login" , `${userId}`);
            navigate("/home");
        }else{
            if(password.length < 8){
                setError({passwordError: "Password must be min 8 chars"});
                setPassword("");
            }else{
                setError({passwordError: "Incorrect Password"})
                setPassword("");
            }
        }
    }

    const errorHandler = () => {
        setError({passwordError : ""});
        setError({usernameError : ""});
    }

    const cancelHandler = (e) => {
        e.preventDefault();
        setUserId("");
        setPassword("");
    }
  return (
    <div className='login-main'>
        <div className='login-login'>
            <h1>Log In</h1>
            <div className='login-form'>
                <form onSubmit = {submitHandler}>
                    <TextField variant = "outlined" type= "text" value = {userId} onChange = {userIdHandler} label = "User Id" required />
                    <br/>
                    <br/>
                    <TextField id = "outlined-error-helper-text" variant = "outlined" label = "password" type = "password" value = {password}
                    error = {errors.passwordError}
                    onChange = {passwordHandler}
                    onClickCapture = {errorHandler}
                    helperText = {errors.passwordError ? errors.passwordError : ""}
                    required />
                    <div className='login-buttons'>
                        <Button color = "secondary"
                        variant = "contained"
                        type=  "submit"
                        style = {{marginRight: "20px"}}
                        >Submit</Button>
                        <Button color = 'primary'
                        variant = "contained"
                        onClick = {cancelHandler}>Cancel</Button>

                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login