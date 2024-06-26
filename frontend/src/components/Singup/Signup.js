import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import axios from 'axios';
import store from 'store';

import '../Signin/signin.css';


import toast from 'react-hot-toast';



function Signup(props) {
    const [signupData, setSignupData] = useState({});
    const [redirect, setRedirect] = useState(false);


    const handleSignupInput = (key, value) => {
        setSignupData({...signupData, [key] : value});
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/api/auth/signup', signupData)
          .then(function (response) {
            console.log(response);
            setRedirect(true);
            props.setCurrentUser(response.data.response);
            store.set('user', response.data.response);
            store.set('token', response.data.token);
            props.setToken(response.data.token);
            toast.success('Welcome!👋')
          })
          .catch(function (error) {
            console.log(error);
            toast.error("Oops, something went wrong :(")
          });
    }

    const googleSuccessHandler = (response) => {
        console.log('i am on')
        axios.post('http://localhost:9000/api/auth/social/google', {
        tokenId: response.tokenId
        })
        .then(function (response) {
            store.set('user', response.data.response);
            store.set('token', response.data.token);
            props.setToken(response.data.token);
            props.setCurrentUser(response.data.response);
            setRedirect(true);
            console.log(response);
            toast.success('Welcome! 👋')
        })
        .catch(function (error) {
            console.log(error);
            toast.error("Singup Error :(")
        });
    }

    const googleFailureHandler = (response) => {
        console.log(response);
        toast.error("Oops, something went wrong :(")
    } 

    console.log(redirect);
    console.log(props.currentUser);

    return (
        <div className='formContainer1'>
            <h1 className="authPageHeading">Sign up For student</h1>

            <form className='signinForm' onSubmit={handleSignupSubmit}>

                <div class="formGroup">
                    <div class="fieldTitle">First Name:</div>
                    <input
                    type="text" class="input" name="firstName" onChange={(e) => {handleSignupInput("firstName", e.target.value)}} required></input>
                </div>

                <div class="formGroup">
                    <div class="fieldTitle">Last Name</div>
                    <input
                    type="text" class="input" name="lastName" onChange={(e) => {handleSignupInput("lastName", e.target.value)}} required></input>
                </div>

                <div class="formGroup">
                    <div class="fieldTitle">Email</div>
                    <input
                    type="text" class="input" name="email" onChange={(e) => {handleSignupInput("email", e.target.value)}} required></input>
                </div>

                <div class="formGroup">
                    <div class="fieldTitle">Country code</div>
                    <input
                    type="text" class="input" name="countryCode" onChange={(e) => {handleSignupInput("countryCode", e.target.value)}} required></input>
                </div>

                <div class="formGroup">
                    <div class="fieldTitle">Phone</div>
                    <input
                    type="text" class="input" name="phone" onChange={(e) => {handleSignupInput("phone", e.target.value)}} required></input>
                </div>

                <div class="formGroup">
                    <div class="fieldTitle">Password</div>
                    <input
                    type="password" class="input" name="password" onChange={(e) => {handleSignupInput("password", e.target.value)}} required></input>
                </div>
                <div class="formGroup">
                    <div class="fieldTitle">fatherName</div>
                    <input
                    type="text" class="input" name="FatherName" onChange={(e) => {handleSignupInput("FatherName", e.target.value)}} required></input>
                </div>
                <div class="formGroup">
                    <div class="fieldTitle">MotherName</div>
                    <input
                    type="text" class="input" name="MotherName" onChange={(e) => {handleSignupInput("MotherName", e.target.value)}} required></input>
                </div>
                <div class="formGroup">
                    <div class="fieldTitle">Univ_Roll_no</div>
                    <input
                    type="text" class="input" name="Univ_Roll_no" onChange={(e) => {handleSignupInput("Univ_Roll_no", e.target.value)}} required></input>
                </div>
                <div class="formGroup">
                    <div class="fieldTitle">High_School</div>
                    <input
                    type="text" class="input" name="High_School" onChange={(e) => {handleSignupInput("High_School", e.target.value)}} required></input>
                </div>
                <div class="formGroup">
                    <div class="fieldTitle">Secondary_School</div>
                    <input
                    type="text" class="input" name="Secondary_School" onChange={(e) => {handleSignupInput("Secondary_School", e.target.value)}} required></input>
                </div>
                <div class="formGroup">
                    <div class="fieldTitle">Backlog</div>
                    <input
                    type="text" class="input" name="backlog" onChange={(e) => {handleSignupInput("backlog", e.target.value)}} required></input>
                </div>
                <div class="formGroup">
                    <div class="fieldTitle">resume</div>
                    <input
                    type="text" class="input" name="resume" onChange={(e) => {handleSignupInput("resume", e.target.value)}} required></input>
                </div>
                <div class="formGroup">
                    <div class="fieldTitle">Cgpa</div>
                    <input
                    type="text" class="input" name="cgpa" onChange={(e) => {handleSignupInput("cgpa", e.target.value)}} required></input>
                </div>
                <button class="submitBtn" type="submit">Create an account</button>
                <div class="authMeta">Already have an account? <Link to="/login">Sign in</Link></div>
            </form>
            {redirect || props.currentUser ? <Navigate to='/studentlogin' /> : null}
        </div>
    )
}

export default Signup
