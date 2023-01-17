import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
const ShowAllCompany = () => {
    const [signinData, setSigninData] = useState({});
    const handleSigninInput = (key, value) => {
        setSigninData({...signinData, [key] : value});
    }
    const create=async()=>{
        console.log("clicked");
        let details=signinData;
       await axios.post('http://localhost:9000/api/auth/createdatabase', details)
        .then(function (response) {
          console.log("done");
        })
        .catch(function (error) {
          toast.error("Error in creating database");
        });
    }
    return(
        <div> 
            <h1>hello how are you</h1>
            <input type="text" className="input" name="company_name" onChange={(e) => {handleSigninInput("company_name", e.target.value)}} required></input>
            {/* <input type="text" className="input" name="company_name1" onChange={(e) => {handleSigninInput("company_name1", e.target.value)}} required></input> */}
            <button type="submit" onClick={()=>create()}>submit</button>
        
        </div>
    )
}
export default ShowAllCompany;