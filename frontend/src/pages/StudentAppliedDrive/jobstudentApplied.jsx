import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import PlacementSidebar from "../../components/sidebar/PlacementSidebar"
import Navbar from "../../components/navbar/Navbar"
import Spinner from '../../components/Spinner/Spinner';
import { Link } from "react-router-dom";
import axios from "axios";
import{idusedtoshow} from '../../components/datatable/Datatable'
import { useState, useEffect } from "react";

const AppliedCompanyColumns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "Company Name",
      headerName: "Company Name",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={require("../../img/company_img.jpg")} alt="avatar" style={{height:"46px",width:"58px"}} />
            {params.row.Company_Name}
          </div>
        );
      },
    },
    {
      field: "Role",
      headerName: "ROLE",
      width: 200,
    },
  
    {
      field: "CTC",
      headerName: "CTC",
      width: 100,
    },
  ];




const JobStudentApplied = () => {  
    const [appliedCompanyData, setAppliedCompanyData] = useState([]);
    const[loading,setloading]=useState(true);
      const optiond={
        method:'GET',
        url:"http://localhost:9000/api/auth/jobappliedDrive",
        params:{id:idusedtoshow}
      }
    useEffect(() => {
        axios.request(optiond).then(function(response){
            setAppliedCompanyData(response.data.result);
            setloading(false)
        })
      }, []);


      
      const goto=(id)=>{
        // currentIdofCompany=id
      console.log("clicked");
      };
    
      const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 180,
          renderCell: (params) => {
            /// to do left
            var c=1
            return (
              <div className="Notice">
                {c?
                (<Link to="/jobStudentApplied" style={{ textDecoration: "none" }}>
                  <button className="btn btn-success" onClick={()=>goto(params.row._id)}>Marked as Placed</button>
                </Link>):(<button className="btn btn-success" disabled>Placed</button>)
                 }
              </div>
            );
          },
        },
      ];

return(
    <div className="list">
    <PlacementSidebar/>
    <div className="listContainer">
      <Navbar/>
    <div className="datatable">
      <div className="datatableTitle" >
        Applied Company Details
        {loading&&<Spinner/>}
      </div>
      <DataGrid
        className="datagrid"
        rows={appliedCompanyData}
        columns={AppliedCompanyColumns.concat(actionColumn)}
        pageSize={9}
        getRowId={(row) =>row._id}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
    </div>
    </div>

)}
export default JobStudentApplied
