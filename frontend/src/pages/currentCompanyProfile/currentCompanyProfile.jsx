import { currentIdofCompany } from "../showAllCompany/showAllCompany"
import "./currentCompanyProfile.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { useState, useEffect } from "react";
import Spinner from '../../components/Spinner/Spinner';
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CurrentCompanyProfile = (props) => {  

  const [currentCompanyData, setCurrentCompanyData] = useState([]);
      const[loading,setloading]=useState(true);
      const option={
        method:'GET',
        url:"http://localhost:9000/api/auth/currentCompanyInfo",
        params:{id:{currentIdofCompany}}
      }
    useEffect(() => {
        axios.request(option).then(function(response){
            setCurrentCompanyData(response.data.result.result);
            setloading(false)
        })
      }, [currentIdofCompany]);


    const eligible=async()=>{
      const detailsofboth={
        method:'GET',
        url:"http://localhost:9000/api/auth/checkEligible",
        params:{"studentdetails":props.currentUser,"companydetails": currentCompanyData}
      }
      await axios.request(detailsofboth)
      .then(function (response) {
        if(response.data.result==1){
        toast.success('Your are Eligible for the drive👋', {
          position: toast.POSITION.TOP_CENTER
        });
        }
        else{
         toast.error("You are not eligible for drive",{
          position: toast.POSITION.TOP_CENTER
         });
        }

      })
      .catch(function (error) {
        console.log(error);
        toast.error("Error in checking eligiblity",error);
      });
    }



    const Apply=async()=>{
        console.log("apply");
        const detailsofboth={
          method:'POST',
          url:"http://localhost:9000/api/auth/registerstudent",
          params:{"studentdetails":props.currentUser,"companydetails": currentCompanyData}
        }
      await axios.request(detailsofboth)
      .then(function (response) {
        if(response.data.result==0){
        toast.success('Your have successfully applied for drive👋', {
          position: toast.POSITION.TOP_CENTER
        });
        }
        else if(response.data.result==-1){
          toast.success('You have Already applied for this  Job post👋', {
            position: toast.POSITION.TOP_CENTER
          });
          }
        
        else{
         toast.error("You are not eligible for drive",{
          position: toast.POSITION.TOP_CENTER
         });
        }

      })
      .catch(function (error) {
        console.log(error);
        toast.error("Error in applying for drive",error);
      });
    }
    return(
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div style={{textAlign:"center"}}>
        {loading&&<Spinner/>}
        </div>
        <div className="companyview">
         
        <div className="first hold-transition skin-green sidebar-mini" >
       <div className="wrapper">
    <div className="content-wrapper" style={{marginLeft: "0px"}}>
        <section id="candidates" className="content-header">
            <div className="container">
              <div className="row">
                <div className="class col-md-2"></div>
                <div className="col-md-8 bg-white padding-2">
                  <div className="pull-left mx-32">
                    <h2><b>{currentCompanyData.Company_Name}</b></h2>
                    
                  </div>
                  <div className="pull-right">
                    <Link to="/showAllCompany" className=" darkness btn btn-default btn-lg btn-flat"><i className="fa fa-arrow-circle-left"></i> Back</Link>
                  </div>
                  <div className="clearfix"></div>
                  <hr></hr>
                  <div>
                    <p><span className="margin-right-10"><i className="fa fa-location-arrow text-green"> Role: </i>{currentCompanyData.Role}</span><span className="margin-right-10"> <i className="fa fa-money text-green"> CTC:</i>{currentCompanyData.CTC}</span> <span className="margin-right-10"><i className="fa fa-calendar text-green"> Drive Date:</i>5pm</span><span className="margin-right-10"><i className="fa fa-location-calendar text-green"> Eligibility: </i>50%</span></p>
                    
                  </div>
                  <div className="textwritten">
                  <ToastContainer/>  
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, cum dolorem nobis itaque assumenda molestias reiciendis labore? Nesciunt sequi quos voluptate aperiam quidem quas dolore maiores nisi rerum! Unde, error?Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci nam accusantium iusto ut officiis rerum tenetur assumenda minima, nulla aperiam perspiciatis unde, beatae temporibus maiores sapiente tempore laudantium ratione amet!
                  </div>
                             
                    <div>
                      <a onClick={()=>eligible()}  className="lightness btn btn-primary pull-right btn-flat margin-top-50">Check Eligibility</a>
                    </div>
                    <div>
                      <a onClick={()=>Apply()}  className="lightness btn btn-success btn-flat margin-top-50">Apply</a>
                    </div>
                </div>

              </div>
            </div>
          </section>
          </div>
          </div>
          </div>
          </div>
       </div>
       </div>
    )
}
export default  CurrentCompanyProfile