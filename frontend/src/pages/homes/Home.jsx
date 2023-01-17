import React from 'react';
import './home.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widgets/Widget';
import Featured from '../../components/featured/Featured';
import Table from '../../components/table/Table'


const Home = ()=>{
    return(
        <div className="home">
            <Sidebar/>
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

export default Home;