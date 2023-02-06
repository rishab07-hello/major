import { currentIdofCompany } from "../showAllCompany/PlacementShowAllCompany"
import PlacementSidebar from "../../components/sidebar/PlacementSidebar"
import Navbar from "../../components/navbar/Navbar"
import { useState, useEffect } from "react";
import Spinner from '../../components/Spinner/Spinner';
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
const PlacementUpdateStudentPlaced = (props) => {  
  const navigate=useNavigate()
  const [currentCompanyData, setCurrentCompanyData] = useState([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentAllEmail,setCurrentAllEmail]=useState([])
  const changeemail=(event)=>{
    setCurrentEmail(event.target.value);
  }
      const[loading,setloading]=useState(true);
      var emails=[]
      const option={
        method:'GET',
        url:"http://localhost:9000/api/auth/currentCompanyInfo",
        params:{id:{currentIdofCompany}}
      }
    useEffect(() => {
        axios.request(option).then(function(response){
            setCurrentCompanyData(response.data.result.result);
            setloading(false)
        })
      }, [currentIdofCompany]);

  
  const done=async()=>{
    // console.log(emails)
    const optiond={
      method:'POST',
      url:"http://localhost:9000/api/auth/PostPlacedStudent",
      params:{id:currentIdofCompany,email:currentAllEmail}
    }
    await axios.request(optiond).then(function(response){
      toast.success('Uploaded Result👋', {
        position: toast.POSITION.TOP_CENTER
      });
      setTimeout(() => {
        // 👇 Redirects to jobStudentApplied page, note the `replace: true`
        navigate(-1)
      }, 1500);
    }).catch(function (error) {
      toast.error("Error in Uploading Result",{
        position: toast.POSITION.TOP_CENTER
      });
  });
  }
  const addEMAIL=()=>{
    setCurrentAllEmail([...currentAllEmail, currentEmail]);
     toast.success('Email Added👋', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000 
    });
    
  }

    return(
    <div className="list">
      <PlacementSidebar/>
      <div className="listContainer">
        <Navbar/>
        <div style={{textAlign:"center"}}>
        {loading&&<Spinner/>}
        
        <h2 style={{textAlign:'center'}}>Update Placed Student</h2>
        <ToastContainer/>
        <div className='hh'>
        
    <div className="row" style={{textAlign: "center",
    marginLeft: "100px",
    marginRight: "100px",
    marginTop: "20px",
    paddingLeft:"310px"
    }}>
        <div class="Notice">
         <button type="submit" className="btn btn-success" style={{marginTop:"10px",float:"right",marginRight:"10px"}} onClick={done}>
           Submit
         </button>
        </div>
                      <div className="col-md-6 latest-job ">
                        <div className="form-group" style={{textAlign:"center",marginTop:"20px"}}>
                        
                          <label htmlFor="fname">Company Name</label>
                          <input type="text" style={{textAlign:"center"}} className="form-control input-lg"  name="fname" placeholder="First Name" value={currentCompanyData.Company_Name} readOnly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="lname">ROLE</label>
                          <input type="text" className="form-control input-lg" style={{textAlign:"center"}}  name="lname" placeholder="Last Name" value={currentCompanyData.Role} readOnly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">CTC</label>
                          <input type="email" className="form-control input-lg"style={{textAlign:"center"}}   placeholder="Email" value={currentCompanyData.CTC} readOnly/>
                        </div>
                        <div className="form-group" id="email">
                          <label htmlFor="email">Placed student Email</label>
                          <input type="email" className="form-control input-lg"style={{textAlign:"center"}}   placeholder="Email"  id="email" onChange={changeemail} /> 
                         
                        
      <div class="Notice">
      <button type="button" className="btn btn-success" onClick={()=>addEMAIL()}>
        Add EMAIL
      </button>
        </div>
        </div>          
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}
export default  PlacementUpdateStudentPlaced