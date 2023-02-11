
import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {idusedtoshow} from '../datatable/Datatable'
import Spinner from '../../components/Spinner/Spinner';
const PlacementLoginprofile = () => {
    const [currentStudentData, setCurrentStudentData] = useState([]);
    const[loading,setloading]=useState(true);
    const option={
      method:'GET',
      url:"http://localhost:9000/api/auth/viewstudent",
      params:{id:idusedtoshow}
    }
  useEffect(() => {
      axios.request(option).then(function(response){
          setCurrentStudentData(response.data.result);
          setloading(false)
      })
    }, []);
  return (
    <div className='hh'>
    <div className=" col-md-9 bg-white padding-2">
    <div className="nn" style={{textAlign:'center'}}>
    <div style={{textAlign:'center'}}>{loading && <Spinner/>}</div>
    <img src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" width="200" height="200" alt='not able to load'/>
    </div>
    <h2 style={{textAlign:'center'}}>Student Profile</h2>
    
    <div className="row">
                      <div className="col-md-6 latest-job ">
                        <div className="form-group">
                          <label htmlFor="fname">Name</label>
                          <input type="text" className="form-control input-lg" id="fname" name="fname" placeholder="First Name" value={currentStudentData.firstName} required=""/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="lname">Last Name</label>
                          <input type="text" className="form-control input-lg" id="lname" name="lname" placeholder="Last Name" value={currentStudentData.lastName} required=""/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email address</label>
                          <input type="email" className="form-control input-lg" id="email" placeholder="Email" value={currentStudentData.email} readonly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="fathername">Father Name</label>
                          <input id="address" name="fathername" className="form-control input-lg" value={currentStudentData.FatherName} readonly></input>
                        </div>
                        <div className="form-group">
                          <label htmlFor="mother">Mother Name</label>
                          <input type="text" className="form-control input-lg" id="mother" value={currentStudentData.MotherName} placeholder="city" readonly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="state">State</label>
                          <input type="text" className="form-control input-lg" id="state" name="state" placeholder="state" value="state" readonly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="Marks">HSC Marks</label>
                          <input type="text" className="form-control input-lg" id="Marks" name="hsc" placeholder="Percentage/CGPA" value={currentStudentData.High_School} readonly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="Marks">SSC Marks</label>
                          <input type="text" className="form-control input-lg" id="Marks" name="ssc" placeholder="Percentage/CGPA" value={currentStudentData.Secondary_School} readonly/>
                        </div>
                      </div>
                      <div className="col-md-6 latest-job ">
                        <div className="form-group">
                          <label htmlFor="contactno">Contact Number</label>
                          <input type="text" className="form-control input-lg" id="contactno" name="contactno" placeholder="Contact Number" value="92713"readonly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="qualification">Highest Qualification</label>
                          <input type="text" className="form-control input-lg" id="qualification" name="qualification" placeholder="Highest Qualification" value="btech" readonly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="stream">Stream</label>
                          <input type="text" className="form-control input-lg" id="stream" name="stream" placeholder="stream" value="cse" readonly/>
                        </div>
                        <div className="form-group">
                          <label>Backlog</label>
                          <input className="form-control input-lg" rows="4" name="skills" value={currentStudentData.backlog} readonly></input>
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="Marks">Cgpa</label>
                          <input type="text" className="form-control input-lg" id="Marks" name="ug" placeholder="Percentage/CGPA" value={currentStudentData.cgpa} readonly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="Marks">University_Roll_No</label>
                          <input type="text" className="form-control input-lg" id="Marks" name="pg" placeholder="Percentage/CGPA" value={currentStudentData.Univ_Roll_no} readonly/>
                        </div>
                        <div className="form-group">
                          <label>Current Resume</label>
                          <input type="text" name="resume" className="form-control input-lg" value={currentStudentData.resume}/>
                
                          </div> 
          
                      </div>
                    </div>
    </div>
    </div>
  );
}
export  {PlacementLoginprofile}