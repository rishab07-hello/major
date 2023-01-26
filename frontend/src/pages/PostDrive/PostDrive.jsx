import React from 'react';
import axios from 'axios';
import { useState,useEffect} from 'react';
import PlacementSidebar from "../../components/sidebar/PlacementSidebar"
import Navbar from "../../components/navbar/Navbar"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PostDrive = () => {  
    const [signinData, setSigninData] = useState({});
    const handleSignupInput = (key, value) => {
        setSigninData({ ...signinData, [key]: value });
    }
    const create = async () => {
        console.log("clicked");
        let details = signinData;
        await axios.post('http://localhost:9000/api/auth/createdrivepost', details)
            .then(function (response) {
              setTimeout(() => console.log('wait 3 seconds'), 10000);
                toast.success('drive posted👋', {
                  position: toast.POSITION.TOP_CENTER
                });
                setTimeout(() => console.log('wait 3 seconds'), 10000);
              

            })
            .catch(function (error) {
                toast.error("Error in Uploading drive");
            });
    }
    return (
        <div>
        <div className="list">
    <PlacementSidebar/>
    <div className="listContainer">
      <Navbar/>
      <div className='hh'>
    <div className=" col-md-9 bg-white padding-2" style={{paddingBottom:"113px"}}>
    <div className="nn" style={{textAlign:'center'}}>
    </div>
    
    <h2 style={{textAlign:'center'}}>Post Drive</h2>
    <form className='signinForm'>
    <div className="row">
                      <div className="col-md-6 latest-job ">
                        <div className="form-group">
                        <ToastContainer/>  
                          <label htmlFor="fname">Company Name</label>
                          <br></br>
                          <input
                            type="text" className="form-control input-lg" name="Company_Name" onChange={(e) => { handleSignupInput("Company_Name", e.target.value) }} required></input>
                        </div>
                        <div className="form-group">
                          <label htmlFor="lname">Role</label>
                          <br></br>
                          <input
                            type="text" className="form-control input-lg" name="Role" onChange={(e) => { handleSignupInput("Role", e.target.value) }} required></input>
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">CTC</label>
                          <br></br>
                          <input
                            type="text" className="form-control input-lg" name="CTC" onChange={(e) => { handleSignupInput("CTC", e.target.value) }} required></input>
                        </div>
                        <div className="form-group">
                          <label htmlFor="address">Required cgpa</label>
                          <br></br>
                          <input
                            type="text" className="form-control input-lg" name="RequiredCgpa" onChange={(e) => { handleSignupInput("RequiredCgpa", e.target.value) }} required></input>
                        </div>
                        <div className="form-group">
                          <label htmlFor="city">Required_high_school</label>
                          <br></br>
                          <input
                            type="text" className="form-control input-lg" name="Required_high_school" onChange={(e) => { handleSignupInput("Required_high_school", e.target.value) }} required></input>
                        </div>
                        <div className="form-group">
                          <label htmlFor="state">Required_secondary_school</label>
                          <br></br>
                          <input
                            type="text" className="form-control input-lg" name="Required_secondary_school" onChange={(e) => { handleSignupInput("Required_secondary_school", e.target.value) }} required></input>
                        </div>        
                      </div>
                      <div className="col-md-6 latest-job ">
                        <div className="form-group">
                          <label htmlFor="contactno">company_Role_Description</label>
                          <br></br>
                          <textarea
                            type="text" className="form-control input-lg" name="company_Role_Description" style={{width: "561px", height:"116px"}} onChange={(e) => { handleSignupInput("company_Role_Description", e.target.value) }} required></textarea>
                        </div>
                        <div className="form-group">
                          <label htmlFor="qualification">Required Backlog</label>
                          <br></br>
                          <input
                            type="text" className="form-control input-lg" name="Required_backlog" onChange={(e) => { handleSignupInput("Required_backlog", e.target.value) }} required></input>
                        </div>
                        <button className="submitBtn" type="submit"  onClick={()=>create()}>UPLOAD DRIVE</button>
                        
                      </div>
                    </div>
                    </form>
    </div>
    </div>
    </div>
    </div>
    </div>
    )
}
export default PostDrive