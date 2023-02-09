import React from 'react';
import './home.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import Table1 from '../../components/table/table1'


const Home = (props)=>{
    return(
        <div className="home">
            <Sidebar/>
            <div className="homecontainer">
                    <Navbar/>
                <div className="widgets" style={{color: "black",backgroundColor: "lightblue"}}>
                    Welcome To Placement Dashboard
                </div>
                <div className="listContainer" style={{marginBottom:"20px"}}>
                    <div className="listTitle">
                           <h1 style={{textAlign:"center"}}>Placed Companies</h1>
                    </div>
                    <Table1 {...props}/>
                </div>
                <div className="charts">
                    <Featured/>
                    
                </div>
               
              
                </div>

        </div>
        
    )
}

export default Home;