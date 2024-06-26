import React from 'react'
import './sidebar.scss'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import SettingsIcon from '@mui/icons-material/Settings';
import HailIcon from '@mui/icons-material/Hail';
import ContactsIcon from '@mui/icons-material/Contacts';
import CampaignIcon from '@mui/icons-material/Campaign';
import WorkIcon from '@mui/icons-material/Work';
import {Link} from "react-router-dom";


const PlacementSidebar = () => {
  return (
    <div className="sidebar">
        <div className="top">
            <span className='logo'>DASHBOARD</span>
            </div>
            <hr />
        <div className="centre">
        <ul>
            <Link to="/TPOlogin" style={{textDecoration: "none" , color: 'inherit'}}>
            <li>
                <DashboardCustomizeIcon className='icons'/>
                <h3> Dashboard</h3>
                </li>
                </Link>
                <Link to="/PlacementshowAllCompany" style={{textDecoration: "none" , color: 'inherit'}}>
                <li>
                <WorkIcon className='icons'/>
                <h3> Companies</h3>
                </li>
                </Link>
                <Link to="/PostDrive" style={{textDecoration: "none" , color: 'inherit'}}>
                <li>
                <WorkIcon className='icons'/>
                <h3>Post Drive</h3>
                </li>
                </Link>
                <Link to="/details" style={{textDecoration: "none" , color: 'inherit'}}>
                <li>
                <WorkIcon className='icons'/>
                <h3>Student placed</h3>
                </li>
                </Link>
                
                <Link to="/PostNotice" style={{textDecoration: "none" , color: 'inherit'}}>
                <li>
                <WorkIcon className='icons'/>
                <h3>Post Notice</h3>
                </li>
                </Link>

             <Link to="/addUser" style={{textDecoration: "none" , color: 'inherit'}}>   
            <li>       
            <HailIcon className='icons'/>
                <h3> Students details</h3>
                </li>
                </Link>            
            <Link to="/PlacementNoticepage" style={{textDecoration: "none" , color: 'inherit'}}>
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

export default PlacementSidebar