import React from 'react';

import { DataGrid } from "@mui/x-data-grid";
import PlacementSidebar from "../../components/sidebar/PlacementSidebar"
import Navbar from "../../components/navbar/Navbar"
import Spinner from '../../components/Spinner/Spinner';
import { Link } from "react-router-dom";
import axios from "axios";
import{idusedtoshow} from '../../components/datatable/Datatable'
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
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
  const navigate=useNavigate()
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


      
      const goto=async(id)=>{
        const option={
          method:'POST',
          url:"http://localhost:9000/api/auth/StudentPlaced",
          params:{id:idusedtoshow,id1:id}
        }
        await axios.request(option).then(function(response){
          toast.success('Student placed👋', {
            position: toast.POSITION.TOP_CENTER
          });
        }).catch(function (error) {
          toast.error("Error in Uploading drive");
      });
    
      setTimeout(() => {
        // 👇 Redirects to jobStudentApplied page, note the `replace: true`
        navigate(-1)
      }, 1000);


      };
    
      const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 180,
          renderCell: (params) => {
            
            return (
              <div className="Notice">
              
                <Link to="/jobStudentApplied" style={{ textDecoration: "none" }}>
                  <button className="btn btn-success" onClick={()=>goto(params.row._id)}>Marked as Placed</button>
                </Link>
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
      <ToastContainer/>
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
