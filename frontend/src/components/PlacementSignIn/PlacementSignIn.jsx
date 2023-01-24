import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
// import { Redirect } from 'react-router';
import axios from 'axios';
import store from 'store';


import toast from 'react-hot-toast';


function PlacementSignin(props) {
    const [signinData, setSigninData] = useState({});
    const [redirect, setRedirect] = useState(false);

    const handleSigninInput = (key, value) => {
        setSigninData({...signinData, [key] : value});
    }
    
    const handleSigninSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/api/auth/placementsignin', signinData)
          .then(function (response) {
            console.log("i have sigined in here");
            store.set('user', response.data.response);
            store.set('token', response.data.token);
            props.setCurrentUser(response.data.response);
            props.setToken(response.data.token);
            setRedirect(true);
            console.log(response);
            toast.success('Welcome back! 👋')
          })
          .catch(function (error) {
            console.log(error);
            toast.error("Sign In Error , check id or password :(")
          });
    }
    return (
    <div className="studentin">
    <div className="formContainer1" >
    <h1>Placement Portal</h1>
    <form onSubmit={handleSigninSubmit}>
   
        <div className="headingsContainer">
            <h3>TPO LOGIN</h3>
            <br></br>
            <p>Sign in with your username and password</p>
        </div>

   
        <div className="mainContainer">
          
            <label htmlFor="username">Your email</label>
            <input type="email" placeholder="Enter Email" name="email" onChange={(e) => {handleSigninInput("email", e.target.value)}} required/>

            <br></br><br></br>

            <label htmlFor="pswrd">Your password</label>
            <input type="password" placeholder="Enter Password" name="password" onChange={(e) => {handleSigninInput("password", e.target.value)}}required/>

       
            <div className="subcontainer">
                <label>
                Remember me<input type="checkbox" checked="checked" name="remember" readOnly/> 
                </label>
                <p className="forgotpsd"> <a href="/forgot">Forgot Password?</a></p>
            </div>
            <button type="submit">Login</button><br></br><br></br>
            <p className="register">Not a member?  <Link to="/placementsignup">Register here!</Link></p>
        </div>
    </form>
    
            {redirect || props.currentUser ? <Navigate to='/TPOlogin'/> : null}
            </div>
            </div>
    )
}

export default PlacementSignin;
