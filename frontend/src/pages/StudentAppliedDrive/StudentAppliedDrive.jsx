import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Spinner from '../../components/Spinner/Spinner';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const AppliedCompanyColumns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "Company Name",
      headerName: "Company Name",
      width: 300,
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
      width: 230,
    },
  
    {
      field: "CTC",
      headerName: "CTC",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        params.row.active="pending"
        return (
        
          <div className={`cellWithStatus ${params.row.active}`} >
            Pending
          </div>
        );
      },
    },
  ];




const StudentAppliedDrive = (props) => {  
    const [appliedCompanyData, setAppliedCompanyData] = useState([]);
    const[loading,setloading]=useState(true);
      const optiond={
        method:'GET',
        url:"http://localhost:9000/api/auth/appliedDrive",
        params:{id:props.currentUser._id}
      }
    useEffect(() => {
        axios.request(optiond).then(function(response){
            setAppliedCompanyData(response.data.result);
            setloading(false)
        })
      }, []);
return(
    <div className="list">
    <Sidebar/>
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
        columns={AppliedCompanyColumns}
        pageSize={9}
        getRowId={(row) =>row._id}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
    </div>
    </div>

)}
export default StudentAppliedDrive
