import PlacementSidebar from "../../components/sidebar/PlacementSidebar"
import Navbar from "../../components/navbar/Navbar"
import React from 'react';
import{PlacementLoginprofile} from "../../components/StudentLoginProfile/PlacementLoginprofile";
import{AiFillInfoCircle} from 'react-icons/ai';
 const UserProfile=()=> {
  return (
    <div className="here">
    <div className="list" >
        <PlacementSidebar/>
        <div className="listContainer">
            <Navbar/>
            <PlacementLoginprofile/>
            </div>
            </div>
            </div>
    
    
  );
}
export default UserProfile