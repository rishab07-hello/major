import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import store from 'store';
import toast from 'react-hot-toast';
function PlacementSignup(props) {
    const [signupData, setSignupData] = useState({});
    const [redirect, setRedirect] = useState(false);
    const handleSignupInput = (key, value) => {
        setSignupData({...signupData, [key] : value});
    }
    const handleSignupSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/api/auth/placementsignup', signupData)
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


    return (
        <div className='formContainer1'>
            <h1 className="authPageHeading">Sign up For TPO</h1>
            <form className='signinForm' onSubmit={handleSignupSubmit}>
                <div class="formGroup">
                    <div class="fieldTitle">Email</div>
                    <input
                    type="text" class="input" name="email" onChange={(e) => {handleSignupInput("email", e.target.value)}} required></input>
                </div>

                <div class="formGroup">
                    <div class="fieldTitle">Password</div>
                    <input
                    type="password" class="input" name="password" onChange={(e) => {handleSignupInput("password", e.target.value)}} required></input>
                </div>
                <button class="submitBtn" type="submit">Create an account</button>
                <div class="authMeta">Already have an account? <Link to="/placementlogin">Sign in</Link></div>
            </form>
            {redirect || props.currentUser ? <Navigate to='/TPOlogin' /> : null}
        </div>
    )
}

export default PlacementSignup
