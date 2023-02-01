import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import StudentAppliedDrive from '../../pages/StudentAppliedDrive/StudentAppliedDrive';

var idusedtoshow=0;
const Datatable = () => {
  const [data, setData] = useState(userRows);
  
  
  const goto=(id)=>{
  idusedtoshow=id;
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/userprofile" style={{ textDecoration: "none" }}>
              <div className="viewButton" onClick={()=>goto(params.row._id)}>View</div>
            </Link>
            <Link to="/jobStudentApplied" style={{ textDecoration: "none" }}>
            <div
              className="deleteButton"
              onClick={() => goto(params.row._id)}
            >
              Applied Company
            </div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <> 
    <div className="datatable">
     
      <div className="datatableTitle">
        Student Details
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        // getRowId={(row) =>  row._id}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
    </>
  );
};

export default Datatable;
export {idusedtoshow};