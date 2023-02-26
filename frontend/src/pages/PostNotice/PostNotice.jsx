import React from 'react';
import axios from 'axios';
import { useState,useEffect} from 'react';
import PlacementSidebar from "../../components/sidebar/PlacementSidebar"
import Navbar from "../../components/navbar/Navbar"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PostNotice = (props) => {  
    const [signinData, setSigninData] = useState({});
    const handleSignupInput = (key, value) => {
        setSigninData({ ...signinData, [key]: value });
    }
    const create = async () => {
        console.log("clicked");
        let details = signinData;
        const detailsofboth={
            method:'POST',
            url:"http://localhost:9000/api/auth/createNoticepost",
            params:{"details":details,"Tpo": props.currentUser}
          }
        await axios.request(detailsofboth)
        .then(function (response) {
              setTimeout(() => console.log('wait 3 seconds'), 10000);
                toast.success('drive posted👋', {
                  position: toast.POSITION.TOP_CENTER
                });
                // setTimeout(() => console.log('wait 3 seconds'), 10000);
              

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
      <ToastContainer/>  
    <div className=" col-md-9 bg-white padding-2" style={{paddingBottom:"113px"}}>
    <div className="nn" style={{textAlign:'center'}}>
    </div>
    
    <h2 style={{textAlign:'center'}}>Post Notice</h2>
    <form className='signinForm'>
    <div className="row" style={{textAlign:"center",padding: "26px 32px 51px 423px"}}>
                      <div className="col-md-6 latest-job ">
                        <div className="form-group">
                       
                          <label htmlFor="fname">Title of Notice</label>
                          <br></br>
                          <input
                            type="text" className="form-control input-lg" name="Title" onChange={(e) => { handleSignupInput("Title", e.target.value) }} required></input>
                        </div>
                        <div className="form-group">
                          <label htmlFor="lname">Description</label>
                          <br></br>
                          <input
                            type="text" className="form-control input-lg" name="Description" onChange={(e) => { handleSignupInput("Description", e.target.value) }} required></input>
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">URL for full Notice</label>
                          <br></br>
                          <input
                            type="text" className="form-control input-lg" name="url" onChange={(e) => { handleSignupInput("url", e.target.value) }} required></input>
                        <br></br>
                        <div class="Notice" style={{textAlign:"center"}}>
                            <div class="container">
                        <button className="btn btn-success" type="submit" onClick={()=>create()}>UPLOAD NOTICE</button>
                        </div>
                        </div>
                      </div>
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
export default PostNotice;