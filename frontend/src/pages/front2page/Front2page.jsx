import React from 'react';
import './Front2page.scss'
import NavScrollExample from "../../components/navbar/frontNavbar"
import Heading from "../../components/frontpageheading/frontpageheading"
import { Link } from 'react-router-dom';
import{BiLogIn} from 'react-icons/bi';
const Front2page= () => {
    return (
        <div className='hhlogin'>
            <NavScrollExample/>    
        <section className="text-gray-600 body-font ">
        <div className="header"><Heading/></div>
        <div className="container px-5 py-24">
            <div className="flex flex-wrap -m-4">
                <div className="p-4 split left">
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden" style={{backgroundColor:'white'}}>
                        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={require("../../img/login-2.jpg")} style={{height:'50%'}} alt="student"/>
                        <div className="p-6">
                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{textAlign:'center'}}>Are you a </h2>
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{textAlign:'center',fontSize: '20px'}}>Student?</h1>
                            <p className="leading-relaxed mb-3" style={{textAlign:'center',fontSize: '20px'}}>Students can Login from below link</p>
                            <div className="flex items-center flex-wrap " style={{textAlign:'center',fontSize: '20px',padding: "0px 0px 0px 258px"}}>
                                <Link to="/studentlogin" className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Student Login</Link>
                                <BiLogIn />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 split right">
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden" style={{backgroundColor:'white'}}>
                        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={require("../../img/login-1.jpg")} style={{height:'50%'}} alt="TPO"/>
                        <div className="p-6">
                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{textAlign:'center'}}>Are you from the</h2>
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{textAlign:'center',fontSize: '20px'}}>Placement Cell ?</h1>
                            <p className="leading-relaxed mb-3" style={{textAlign:'center',fontSize: '20px'}}>The placement coordinators(TPO) Login from below link.</p>
                            <div className="flex items-center flex-wrap" style={{textAlign:'center',fontSize: '20px',padding: "0px 0px 0px 258px"}}>
                                <Link to="login-company.php" className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">TPO Login
                                </Link>
                                <BiLogIn />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    </section>
    </div>
    )
}
export default Front2page;