import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useState,useEffect} from 'react';
import PlacementSidebar from "../../components/sidebar/PlacementSidebar"
import Navbar from "../../components/navbar/Navbar"
import Spinner from '../../components/Spinner/Spinner'

const companyColumns = [
    { field: "_id", headerName: "ID", width: 70 },
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
      width: 230,
    },
  
    {
      field: "CTC",
      headerName: "CTC",
      width: 100,
    },
    {
      field: "active",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.active}`} >
            {params.row.active}
          </div>
        );
      },
    },
  ];
  var currentIdofCompany;
const Details = () => {  
      const [companyData, setCompanyData] = useState([]);
      const[loading,setloading]=useState(true);
    useEffect(() => {
        axios.get("http://localhost:9000/api/auth/getAllPlacedCompanyDetails").then(function(response){
            setCompanyData(response.data.response.result);
            setloading(false)
        })
      }, []);
  const handleDelete = (_id) => {
    setCompanyData(companyData.filter((item) => item._id !== _id));
  };
  
  const goto=(id)=>{
    currentIdofCompany=id
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/PlacementStudentPlaced" style={{ textDecoration: "none" }}>
              <div className="viewButton" onClick={()=>goto(params.row._id)}>View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="list">
    <PlacementSidebar/>
    <div className="listContainer">
      <Navbar/>
    <div className="datatable">
      <div className="datatableTitle">
        Company Details
        {loading&&<Spinner/>}
      </div>
      <DataGrid
        className="datagrid"
        rows={companyData}
        columns={companyColumns.concat(actionColumn)}
        pageSize={9}
        getRowId={(row) =>  row._id}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
    </div>
    </div>
  );
}
export default Details;
export {currentIdofCompany}
