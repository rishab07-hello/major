import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import './StudentProfile.scss'
import React from 'react';
import{PersonalProfile} from "../../components/StudentLoginProfile/studentLoginProfile";
import{AiFillInfoCircle} from 'react-icons/ai';
export default function StudentProfile(props) {

  return (
    <div className="here">
    <div className="list" >
        <Sidebar/>
        <div className="listContainer">
            <Navbar/>
            <div class="alert alert-info alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <AiFillInfoCircle style={{color:"white"}}/> Note: Current resume will be taken as your resume when you will apply for job.
                so check your resume before applying.
              </div>
            <PersonalProfile {...props}/>
            </div>
            </div>
            </div>
    
    
  );
}