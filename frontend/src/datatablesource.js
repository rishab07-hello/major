import axios from 'axios';
import toast from 'react-hot-toast';
export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "Student Name",
      headerName: "Student Name",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.firstName+" "+params.row.lastName}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "Univ_Roll_no",
      headerName: "Roll No",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];
  var abcd=[];
  await axios.get('http://localhost:9000/api/auth/getAllStudentDetails')
          .then(function (response) {
            abcd=response.data.response.result;
          })
          .catch(function (error) {
            toast.error("Error in getting details from student");
    });
  export const userRows = abcd;
  