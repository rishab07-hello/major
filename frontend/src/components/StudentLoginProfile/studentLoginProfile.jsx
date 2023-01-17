
import React from 'react';
import  './studentLoginProfile.scss'
import { useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import store from 'store';
const PersonalProfile = (props) => {
  const resumeonchange=(event)=>{
    setresumeupdate(event.target.value);
  }
  const ChangeResumeUrl=(e)=>{
    e.preventDefault();
    var a={
      "resume":resumeupdate,
      "id":props.currentUser._id
    }

    axios.post('http://localhost:9000/api/auth/changeResume', a)
          .then(function (response) {
            var r=response.data.response.q;
            props.currentUser.resume=r;
            var newstudent=props.currentUser;
            props.setCurrentUser(newstudent);
            store.set('user',props.currentUser);
            setresumeupdate(r)
            toast.success('Resume Updated Success! 👋')
          })
          .catch(function (error) {
            console.log(error);
            toast.error("Error in updating resume",error);
          });
  }
  
  const [resumeupdate, setresumeupdate] = useState(props.currentUser.resume)
  
  return (
    <div className='hh'>
    <div className=" col-md-9 bg-white padding-2">
    <div className="nn" style={{textAlign:'center'}}>
    <img src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" width="200" height="200" alt='not able to load'/>
    </div>
    <h2 style={{textAlign:'center'}}>Student Profile</h2>
    <div className="row">
                      <div className="col-md-6 latest-job ">
                        <div className="form-group">
                          <label htmlFor="fname">Name</label>
                          <input type="text" className="form-control input-lg" id="fname" name="fname" placeholder="First Name" value={props.currentUser.firstName} required=""/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="lname">Last Name</label>
                          <input type="text" className="form-control input-lg" id="lname" name="lname" placeholder="Last Name" value={props.currentUser.lastName} required=""/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email address</label>
                          <input type="email" className="form-control input-lg" id="email" placeholder="Email" value="xyz" readonly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="address">Address</label>
                          <textarea id="address" name="address" className="form-control input-lg" rows="5" placeholder="Address" readonly>hello</textarea>
                        </div>
                        <div className="form-group">
                          <label htmlFor="city">City</label>
                          <input type="text" className="form-control input-lg" id="city" name="city" value="ktd" placeholder="city" readonly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="state">State</label>
                          <input type="text" className="form-control input-lg" id="state" name="state" placeholder="state" value="state" readonly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="Marks">HSC Marks</label>
                          <input type="text" className="form-control input-lg" id="Marks" name="hsc" placeholder="Percentage/CGPA" value="99" readonly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="Marks">SSC Marks</label>
                          <input type="text" className="form-control input-lg" id="Marks" name="ssc" placeholder="Percentage/CGPA" value="100" readonly/>
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
                          <label>Skills</label>
                          <textarea className="form-control input-lg" rows="4" name="skills" readonly>awesome</textarea>
                        </div>
                        <div className="form-group">
                          <label>About Me</label>
                          <textarea className="form-control input-lg" rows="4" name="aboutme" readonly>hello</textarea>
                        </div>
                        <div className="form-group">
                          <label htmlFor="Marks">UG Marks</label>
                          <input type="text" className="form-control input-lg" id="Marks" name="ug" placeholder="Percentage/CGPA" value="most" readonly/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="Marks">PG Marks</label>
                          <input type="text" className="form-control input-lg" id="Marks" name="pg" placeholder="Percentage/CGPA" value="100" readonly/>
                        </div>
                        <div className="form-group">
                          <label>Current Resume</label>
                          <input type="text" name="resume" className="form-control input-lg" value={resumeupdate} onChange={resumeonchange}/>
                
                          </div> 
                          <button className="btn btn-default" onClick={ChangeResumeUrl}>Change Resume url</button>
                      </div>
                    </div>
    </div>
    </div>
  );
}
export { PersonalProfile}