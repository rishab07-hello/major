import "./table.scss";
import '../../pages/StudentProfile/StudentProfile.scss';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Spinner from '../../components/Spinner/Spinner';
import { useState,useEffect } from "react";
import axios from "axios";
import React from "react";
import{FaHandsHelping} from 'react-icons/fa';

const List = (props) => {
    const[loading,setloading]=useState(true);
    const [currentStudentPlaced, setCurrentStudentPlaced] = useState([]);
    const option = {
        method: 'GET',
        url: "http://localhost:9000/api/auth/TotalStudentplaced",
        params: { id:props.currentUser._id}
      }
    useEffect(() => {
        axios.request(option).then(function (response) {
          setCurrentStudentPlaced(response.data.result);
          setloading(false)
        })
      }, []);
if(currentStudentPlaced.length>0){
  return (
    <div className="here">
    <div class="alert alert-info alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <FaHandsHelping style={{color:"white"}}/> Congratulations on getting placed in following companies..
    </div>
    <TableContainer component={Paper} className="table" style={{marginBottom:"20px"}}>
        <div style={{textAlign:"center"}}>{loading && <Spinner/>}</div>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Company_Name</TableCell>
            <TableCell className="tableCell">Role</TableCell>
            <TableCell className="tableCell">CTC</TableCell>
            <TableCell className="tableCell">Batch</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentStudentPlaced.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row.Company_Name}</TableCell>
              <TableCell className="tableCell">{row.Role}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {<CurrencyRupeeIcon/>}
                  {row.CTC}
                </div>
              </TableCell>
              <TableCell className="tableCell">2023</TableCell>
              <TableCell className="tableCell">
                <span className="status">placed</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
          }
          else{
            return(
                <div className="Notice here">
                    <div className="container">
                    <div class="alert alert-info alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <FaHandsHelping style={{color:"white"}}/>  Believe you can and you are halfway there
              </div>
                   
                    </div> 
                </div>
            )
          }
};

export default List;