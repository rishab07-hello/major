import React from 'react';
import './home.scss';
import PlacementSidebar from '../../components/sidebar/PlacementSidebar';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import Table from '../../components/table/Table'
const PlacementHome = ()=>{
    return(
        
        <div className="home">
            {/* {console.log(props)} */}
            <PlacementSidebar/>
            <div className="homecontainer">

                    <Navbar/>
                <div className="widgets" style={{color: "black",backgroundColor: "lightblue"}}>
                    Welcome To Placement Dashboard
                </div>
                <div className="charts">
                    <Featured/>
                    
                </div>
                <div className="listContainer">
                    <div className="listTitle">
                         Student Records
                    </div>
                    <Table/>

                </div>
              
                </div>

        </div>
        
    )
}

export default PlacementHome;