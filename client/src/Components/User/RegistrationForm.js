import React, { useState } from "react";
import URL from "../API/userAPI";
import * as APIService from "../API/APImethods";
import validator from "validator";
import classes from "./RegistrationForm.module.css";
import { Link } from "react-router-dom";
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length < 5;
function RegistrationForm() {
    const [formInputsValidity, setFormInputsValidity] = useState({
        username: true,
        email: true,
        password: true,
    });
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [disableButton, setDisableButton] = useState(true);
    const [successReg, setSuccessReg] = useState(false);
    const [FailureReg, setFailureReg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const registerUser = async () => {
        setIsLoading(true);
        let data = {
            username: usernameReg,
            email: emailReg,
            password: passwordReg,
        };
        const response = await APIService.postAPI(URL.registerURL, data);
        if (response.status === 200) {
            setSuccessReg(true);
            setDisableButton(true);
            await setTimeout(() => {
                setSuccessReg(false);
                setEmailReg("");
                setPasswordReg("");
                setUsernameReg("");
                window.location.href = "/login";
            }, 2000);
        } else {
            setFailureReg(true);
            setDisableButton(true);
            await setTimeout(() => {
                setFailureReg(false);
            }, 6000);
        }
        setIsLoading(false);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const enteredUsernameIsValid = !isEmpty(usernameReg);
        const enteredEmailIsValid =
            !isEmpty(emailReg) && validator.isEmail(emailReg);
        const enteredPasswordIsValid = !isFiveChars(passwordReg);

        setFormInputsValidity({
            username: enteredUsernameIsValid,
            email: enteredEmailIsValid,
            password: enteredPasswordIsValid,
        });

        const formIsValid =
            enteredPasswordIsValid &&
            enteredUsernameIsValid &&
            enteredEmailIsValid;

        if (!formIsValid) {
            setDisableButton(true);
            console.log("Enter All Details");
        } else {
            registerUser();
        }
    };

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
                    {successReg && (
                        <p className={classes.successMsg}>
                            User Registered Successfully
                        </p>
                    )}
                    {FailureReg && (
                        <p className={classes.successMsg}>
                            Something went wrong.Try again later..
                        </p>
                    )}
                    <h2>Registration</h2>
                    <form>
                        <div className={classes.inputBox}>
                            <span>Username</span>
                            <input
                                type="text"
                                value={usernameReg}
                                autoComplete="off"
                                onChange={(e) => {
                                    setUsernameReg(e.target.value);
                                    setDisableButton(false);
                                }}
                            />
                            {!formInputsValidity.username && (
                                <p>Please enter a valid username</p>
                            )}
                        </div>
                        <div className={classes.inputBox}>
                            <span>Email</span>
                            <input
                                type="email"
                                value={emailReg}
                                autoComplete="off"
                                onChange={(e) => {
                                    setEmailReg(e.target.value);
                                    setDisableButton(false);
                                }}
                            />
                            {!formInputsValidity.email && (
                                <p>Enter a valid Email ID</p>
                            )}
                        </div>
                        <div className={classes.inputBox}>
                            <span>Password</span>
                            <input
                                type="password"
                                value={passwordReg}
                                autoComplete="off"
                                onChange={(e) => {
                                    setPasswordReg(e.target.value);
                                    setDisableButton(false);
                                }}
                            />
                            {!formInputsValidity.password && (
                                <p>Password must be greater than 6 character</p>
                            )}
                        </div>
                        <div className={classes.submitBox}>
                            <button
                                type="submit"
                                onClick={submitHandler}
                                disabled={disableButton}
                            >
                                Register
                            </button>
                        </div>
                        <div className={classes.submitBox}>
                            <p>
                                Already have a account?{" "}
                                <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default RegistrationForm;
