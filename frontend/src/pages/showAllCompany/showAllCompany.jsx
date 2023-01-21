import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useState,useEffect} from 'react';
import Sidebar from "../../components/sidebar/Sidebar"
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
const ShowAllCompany = () => {  
      const [companyData, setCompanyData] = useState([]);
      const[loading,setloading]=useState(true);
    useEffect(() => {
        axios.get("http://localhost:9000/api/auth/getAllCompanyDetails").then(function(response){
            setCompanyData(response.data.response.result);
            setloading(false)
        })
      }, []);
  const handleDelete = (_id) => {
    setCompanyData(companyData.filter((item) => item._id !== _id));
  };
  
  const goto=(id)=>{
    currentIdofCompany=id
  console.log("clicked");
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/company/companyprofile" style={{ textDecoration: "none" }}>
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
    <Sidebar/>
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
export default ShowAllCompany;
export {currentIdofCompany}
// const ShowAllCompany = () => {
//     const [signinData, setSigninData] = useState({});
//     const handleSignupInput = (key, value) => {
//         setSigninData({ ...signinData, [key]: value });
//     }
//     const create = async () => {
//         console.log("clicked");
//         let details = signinData;
//         await axios.post('http://localhost:9000/api/auth/createdrivepost', details)
//             .then(function (response) {
//                 toast.success('DRIVE UPLOADED!👋')
//             })
//             .catch(function (error) {
//                 toast.error("Error in Uploading drive");
//             });
//     }
//     return (
//         <div>
//             <div className='formContainer1'>
//                 <h1 className="authPageHeading"> POST Company</h1>

//                 <form className='signinForm'>

//                     <div className="formGroup">
//                         <div className="fieldTitle">Company Name:</div>
//                         <input
//                             type="text" className="input" name="Company_Name" onChange={(e) => { handleSignupInput("Company_Name", e.target.value) }} required></input>
//                     </div>

//                     <div className="formGroup">
//                         <div className="fieldTitle"> Role:</div>
//                         <input
//                             type="text" className="input" name="Role" onChange={(e) => { handleSignupInput("Role", e.target.value) }} required></input>
//                     </div>

//                     <div className="formGroup">
//                         <div className="fieldTitle">CTC</div>
//                         <input
//                             type="text" className="input" name="CTC" onChange={(e) => { handleSignupInput("CTC", e.target.value) }} required></input>
//                     </div>
//                     <div className="formGroup">
//                         <div className="fieldTitle">company_Role_Description:</div>
//                         <input
//                             type="text" className="input" name="company_Role_Description" onChange={(e) => { handleSignupInput("company_Role_Description", e.target.value) }} required></input>
//                     </div>

//                     <div className="formGroup">
//                         <div className="fieldTitle">RequiredCgpa</div>
//                         <input
//                             type="text" className="input" name="RequiredCgpa" onChange={(e) => { handleSignupInput("RequiredCgpa", e.target.value) }} required></input>
//                     </div>

//                     <div className="formGroup">
//                         <div className="fieldTitle">Required_high_school</div>
//                         <input
//                             type="text" className="input" name="Required_high_school" onChange={(e) => { handleSignupInput("Required_high_school", e.target.value) }} required></input>
//                     </div>

//                     <div className="formGroup">
//                         <div className="fieldTitle">Required_secondary_school</div>
//                         <input
//                             type="text" className="input" name="Required_secondary_school" onChange={(e) => { handleSignupInput("Required_secondary_school", e.target.value) }} required></input>
//                     </div>
//                     <div className="formGroup">
//                         <div className="fieldTitle">Required_backlog</div>
//                         <input
//                             type="text" className="input" name="Required_backlog" onChange={(e) => { handleSignupInput("Required_backlog", e.target.value) }} required></input>
//                     </div>
//                     <button className="submitBtn" type="submit" onClick={()=>create()}>UPLOAD DRIVE</button>
//                 </form>
//             </div>
//         </div>
//     )
// }
// export default ShowAllCompany;