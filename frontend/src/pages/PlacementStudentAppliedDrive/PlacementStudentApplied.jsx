import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import{ CSVLink } from 'react-csv'

import axios from 'axios';
import { useState,useEffect} from 'react';
import PlacementSidebar from "../../components/sidebar/PlacementSidebar"
import Navbar from "../../components/navbar/Navbar"
import Spinner from '../../components/Spinner/Spinner'
import { currentIdofCompany } from "../showAllCompany/PlacementShowAllCompany"
const companyColumns = [
    {
      field: "Student Name",
      headerName: "Student Name",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" style={{height:"46px",width:"46px"}} />
            {params.row.firstName+" "+params.row.lastName}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
  
    {
      field: "Univ_Roll_no",
      headerName: "Univ_Roll_no",
      width: 100,
    },
    {
        field: "cgpa",
        headerName: "Cgpa",
        width: 100,
      },
      {
        field: "High_School",
        headerName: "High_School",
        width: 100,
      },
      {
        field: "Secondary_School",
        headerName: "Secondary_School",
        width: 100,
      },
      {
        field: "backlog",
        headerName: "Backlog",
        width: 100,
      },
    {
      field: "resume",
      headerName: "Resume",
      width: 160,
     
    },
  ];
const PlacementStudentApplied = () => {  
      const [companyStudentData, setCompanyStudentData] = useState([]);
      const[loading,setloading]=useState(true);
      const option={
        method:'GET',
        url:"http://localhost:9000/api/auth/liststudentRegister",
        params:{id:{currentIdofCompany}}
      }
    useEffect(() => {
        axios.request(option).then(function(response){
            // console.log(response.data.result)
            setCompanyStudentData(response.data.result);
            setloading(false)
        })
      }, []);

  return (
    <div className="list">
    <PlacementSidebar/>
    <div className="listContainer">
      <Navbar/>
    <div className="datatable">
    <div className="Notice">
        <CSVLink data={companyStudentData} filename="details" className="btn btn-success btn-sm" style={{float:"right"}}>EXPORT TO EXECL</CSVLink>
        </div>
      <div className="datatableTitle">
        Company Details
        
        {loading&&<Spinner/>}
      </div>
      <DataGrid
        className="datagrid"
        rows={companyStudentData}
        columns={companyColumns}
        pageSize={9}
        getRowId={(row) =>  row.email}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
    </div>
    </div>
  );
}
export default PlacementStudentApplied;
