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
import { useForm } from "react-hook-form";
const PlacementUpdateStudentPlaced = (props) => {  
  const [currentCompanyData, setCurrentCompanyData] = useState([]);
  
      const[loading,setloading]=useState(true);
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


  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const { register, handleSubmit } = useForm();
  const addEMAIL = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };
  const removeEmail = (index) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index)
    ]);
    setCounter((prevCounter) => prevCounter - 1);
  };
  const done=()=>{
    var emails=[]
    for(let i=0;i<counter;i++)
    {
    const myElement = document.getElementById(`friends[${i}].email`).value;
    emails.push(myElement)
    }
    console.log(emails)
  }

    return(
    <div className="list">
      <PlacementSidebar/>
      <div className="listContainer">
        <Navbar/>
        <div style={{textAlign:"center"}}>
        {loading&&<Spinner/>}
        
        <h2 style={{textAlign:'center'}}>Update Placed Student</h2>
        
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
                          <input type="text" style={{textAlign:"center"}} className="form-control input-lg"  name="fname" placeholder="First Name" value={currentCompanyData.Company_Name} readonly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="lname">ROLE</label>
                          <input type="text" className="form-control input-lg" style={{textAlign:"center"}}  name="lname" placeholder="Last Name" value={currentCompanyData.Role} readOnly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">CTC</label>
                          <input type="email" className="form-control input-lg"style={{textAlign:"center"}}   placeholder="Email" value={currentCompanyData.CTC} readonly/>
                        </div>
                        <div className="form-group" id="email">
                          <label htmlFor="email">Placed student Email</label>
                         
                          {indexes.map((index) => {
        const fieldName = `friends[${index}]`;
        return (
          <fieldset name={fieldName} key={fieldName}>
            <label>
              EMAIL:
              <input type="email" className="form-control input-lg"style={{textAlign:"center"}}   placeholder="Email" id={`${fieldName}.email`}/>
            </label>
            <div className="Notice">
            <button type="button" className="btn btn-danger"onClick={removeEmail(index)}>
              Remove
            </button>
            </div>
          </fieldset>
        );
      })}
      <div class="Notice">
      <button type="button" className="btn btn-success" onClick={addEMAIL}>
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