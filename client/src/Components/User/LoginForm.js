import React from "react";
import classes from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import URL from "../API/userAPI";
import * as APIService from "../API/APImethods";
import validator from "validator";
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length < 5;
function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [failureLogin, setFailureLogin] = useState(false);
    const [InvalidLogin, setInvalidLogin] = useState(false);
    const [disableButton, setDisableButton] = useState(true);
    const [formInputsValidity, setFormInputsValidity] = useState({
        email: true,
        password: true,
    });
    const LoginUser = async () => {
        setIsLoading(true);
        let data = {
            email: email,
            password: password,
        };
        const response = await APIService.postAPI(URL.loginURL, data);
        if (response.status === 200) {
            sessionStorage.setItem("userid", response.data.id);
            sessionStorage.getItem("userid");
            setEmail("");
            setPassword("");
            setDisableButton(true);
            window.location.href = "/collection";
        } else if (response.status === 204) {
            setInvalidLogin(true);
            setDisableButton(true);
            await setTimeout(() => {
                setInvalidLogin(false);
            }, 3000);
        } else {
            setFailureLogin(true);
            setDisableButton(true);
            await setTimeout(() => {
                setFailureLogin(false);
            }, 3000);
        }
        setIsLoading(false);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const enteredEmailIsValid = !isEmpty(email) && validator.isEmail(email);
        const enteredPasswordIsValid = !isFiveChars(password);

        setFormInputsValidity({
            email: enteredEmailIsValid,
            password: enteredPasswordIsValid,
        });

        const formIsValid = enteredPasswordIsValid && enteredEmailIsValid;
        if (!formIsValid) {
            setDisableButton(true);
            console.log("Enter All Details");
        } else {
            LoginUser();
        }
    };
    if (sessionStorage.getItem("userid") != null) {
        window.location.href = "/collection";
    }
    return (
        <section>
            <div className={classes.imageBox}>
                <img
                    src="https://images.pexels.com/photos/5546891/pexels-photo-5546891.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="todo"
                />
            </div>
            <div className={classes.contentBox}>
                <div className={classes.formBox}>
                    {isLoading && (
                        <p className={classes.successMsg}>Loading....</p>
                    )}
                    {InvalidLogin && (
                        <p className={classes.successMsg}>
                            Invalid Username and password.
                        </p>
                    )}
                    {failureLogin && (
                        <p className={classes.successMsg}>
                            Something went wrong.Try again later.
                        </p>
                    )}
                    <h2>Login</h2>
                    <form>
                        <div className={classes.inputBox}>
                            <span>Email</span>
                            <input
                                type="text"
                                value={email}
                                autoComplete="off"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setDisableButton(false);
                                }}
                            />
                            {!formInputsValidity.email && (
                                <p className={classes.InvalidErrMsg}>
                                    Enter a valid Email ID
                                </p>
                            )}
                        </div>
                        <div className={classes.inputBox}>
                            <span>Password</span>
                            <input
                                type="password"
                                value={password}
                                autoComplete="off"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setDisableButton(false);
                                }}
                            />
                            {!formInputsValidity.password && (
                                <p className={classes.InvalidErrMsg}>
                                    Password must be greater than 6 character
                                </p>
                            )}
                        </div>
                        <div className={classes.submitBox}>
                            <button
                                type="submit"
                                value="Login"
                                onClick={submitHandler}
                                disabled={disableButton}
                            >
                                Login
                            </button>
                        </div>
                        <div className={classes.submitBox}>
                            <p>
                                Don't have a account?
                                <Link to="/registration">Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;
