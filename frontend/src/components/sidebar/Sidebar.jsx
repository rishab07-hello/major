import React from 'react'
import './sidebar.scss'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import HailIcon from '@mui/icons-material/Hail';
import ContactsIcon from '@mui/icons-material/Contacts';
import CampaignIcon from '@mui/icons-material/Campaign';
import WorkIcon from '@mui/icons-material/Work';
import {Link} from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="top">
            <span className='logo'>DASHBOARD</span>
            </div>
            <hr />
        <div className="centre">
        <ul>
            <Link to="/studentlogin" style={{textDecoration: "none" , color: 'inherit'}}>
            <li>
                <DashboardCustomizeIcon className='icons'/>
                <h3> Dashboard</h3>
                </li>
                </Link>
                <Link to="/showAllCompany" style={{textDecoration: "none" , color: 'inherit'}}>
                <li>
                <WorkIcon className='icons'/>
                <h3> Companies</h3>
                </li>
                </Link>
                <Link to="/studentAppliedDrive" style={{textDecoration: "none" , color: 'inherit'}}>
                <li>
                <WorkIcon className='icons'/>
                <h3>Applied Drive</h3>
                </li>
                </Link>

             {/* <Link to="/addUser" style={{textDecoration: "none" , color: 'inherit'}}>   
            <li>
                
            <HailIcon className='icons'/>
                <h3> Students</h3>
                </li>
                </Link> */}
         <Link to="/studentprofile" style={{textDecoration: "none" , color: 'inherit'}}>   
            <li>
            <ContactsIcon className='icons'/>
                <h3> Profile</h3>
                </li>
            </Link>
            
            <a href="http://localhost:100/" style={{textDecoration: "none" , color: 'inherit'}}>   
            <li>
            <CampaignIcon className='icons'/>
                <h3> Resume Builder</h3>
                </li>
            </a>
            <a href="http://127.0.0.1:5000/" style={{textDecoration: "none" , color: 'inherit'}}>   
            <li>
            <CampaignIcon className='icons'/>
                <h3> Resume Scorer</h3>
                </li>
            </a>
            
            <Link to="/Noticepage" style={{textDecoration: "none" , color: 'inherit'}}>
            <li>
                <CampaignIcon className='icons'/>
                <h3>NOTICE</h3>
                </li>
             </Link>
                <Link to="/signout" style={{textDecoration: "none" , color: 'inherit'}}>   
            <li>
                
            <HailIcon className='icons'/>
                <h3> Logout</h3>
                </li>
                </Link>
        </ul>
        </div>
    </div>
  )
}

export default Sidebar  