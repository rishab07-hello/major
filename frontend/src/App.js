
import Home from './pages/homes/Home';
import Front2page from './pages/front2page/Front2page';
import Frontpage from './pages/Frontpage/Frontpage';
import StudentProfile from './pages/StudentProfile/StudentProfile';
import NoticePage from './components/notice/notice';
import PlacementNoticePage from './components/notice/PlacementNotice'
import ShowAllCompany from './pages/showAllCompany/showAllCompany';
import PlacementShowAllCompany from './pages/showAllCompany/PlacementShowAllCompany';
import StudentAppliedDrive from './pages/StudentAppliedDrive/StudentAppliedDrive';
import PlacementUpdateStudentPlaced from'./pages/Update/PlacementUpdateStudentPlaced';
import JobStudentApplied from './pages/StudentAppliedDrive/jobstudentApplied';
import PlacementStudentApplied from './pages/PlacementStudentAppliedDrive/PlacementStudentApplied'
import List from './pages/list/List';
import New from  './pages/new/New';
import PostDrive from './pages/PostDrive/PostDrive'
import PostNotice from './pages/PostNotice/PostNotice'
import CurrentCompanyProfile from './pages/currentCompanyProfile/currentCompanyProfile'
import PlacementCurrentCompanyProfile from './pages/currentCompanyProfile/PlacementCurrentCompanyProfile'
import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";
import Signup from './components/Singup/Signup';
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { isEmpty } from "lodash";
import store from "store";
import Signin from './components/Signin/Singin';
import Signout from './components/Signout/Signout';
import PlacementSignin from'./components/PlacementSignIn/PlacementSignIn'
import PlacementSignup from'./components/PlacementSignUp/PlacementSignUp'
import PlacementHome from './pages/homes/PlacementHome';
import UserProfile from './pages/userProfile/UserProfile';
function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [signoutRedirect, setSignoutRedirect] = useState(false);
 

  useEffect(() => {
    if (!isEmpty(store.get("user"))) {
      const user = store.get("user");
      const token = store.get("token");
      setCurrentUser(user);
      setToken(token);
      // toast.success(`Welcome ${user.firstName}`);
    } 
  }, []); 

  const signout = () => {
    store.remove("user");
    store.remove("token");
    setCurrentUser(null);
    setToken(null);
    setSignoutRedirect(true);
  };
  const Authenticate = ({children}) =>{
    // console.log(currentUser);
    return currentUser ? children : <Navigate to="/studentlogin"/>
  }
  const Authenticate1 = ({children}) =>{
    // console.log(currentUser);
    return currentUser ? children : <Navigate to="/TPOlogin"/>
  }
  // console.log(currentUser)
  return (
    <div className="App">
      <div>
        <Toaster />
      </div>
      <BrowserRouter>
      <Routes>

<Route
            path="signout"
            exact
            element={
              <Signout
              signoutRedirect={signoutRedirect}
              signout={signout}
              currentUser={currentUser}
              ></Signout>
            }
          ></Route>

<Route
            path="/login"
            exact
            element={
              <Signin
                setToken={setToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              ></Signin>
            }
          ></Route>

          <Route
            path="signup"
            exact
            element={
            
              <Signup
                setToken={setToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              ></Signup>
            }
          ></Route>

         
          <Route
            path="/showAllCompany"
            exact
            element={
              <Authenticate>
                <ShowAllCompany>              
              <Home
              setToken={setToken}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            ></Home>
            </ShowAllCompany>
            </Authenticate>
            }
          />
           <Route
            path="/studentlogin"
            exact
            element={<Authenticate>              
              <Home
              setToken={setToken}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            ></Home>
         </Authenticate>
            }
          />

<Route
            path="/Noticepage"
            exact
            element={<Authenticate>              
              <NoticePage
              setToken={setToken}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            ></NoticePage>
</Authenticate>
            }
          />

          <Route
            path="/"
            exact
            element={<Front2page/>}
          />
          <Route
            path="/frontpage"
            exact
            element={<Frontpage/>}
          />
          <Route
            path="/studentprofile"
            exact
            element={<Authenticate>              
              <StudentProfile
              setToken={setToken}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            ></StudentProfile>
</Authenticate>
            }
          />

          <Route
            path="users/new"
            exact
            element={
              <Authenticate>

              <New
                setToken={setToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              ></New>

              </Authenticate>
              
            }
          />
          <Route
            path="company/companyprofile"
            exact
            element={
              <Authenticate>

              <CurrentCompanyProfile
                setToken={setToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              ></CurrentCompanyProfile>

              </Authenticate>
              
            }
          />
          <Route
            path="/studentAppliedDrive"
            exact
            element={
              <Authenticate>
              <StudentAppliedDrive
                setToken={setToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              ></StudentAppliedDrive>
              </Authenticate>          
            }
          />

          <Route
          // tpo routes
            path="addUser"
            exact
            element={
              <Authenticate1>
                <List
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                token={token}
                setToken={setToken}
              ></List>
              </Authenticate1>
              
            }
          ></Route>   
           <Route
          // tpo routesaaaaaaaaaaaaaaaaaaaaaaaaaa
            path="/jobStudentApplied"
            exact
            element={
              <Authenticate1>
                <JobStudentApplied
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                token={token}
                setToken={setToken}
              ></JobStudentApplied>
              </Authenticate1>
              
            }
          ></Route>  
          <Route
          
            path="/PostNotice"
            exact
            element={
              <Authenticate1>
                <PostNotice
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                token={token}
                setToken={setToken}
              ></PostNotice>
              </Authenticate1>
              
            }
          ></Route>  

<Route
          // tpo routesaaaaaaaaaaaaaaaaaaaaaaaaaa
            path="/PlacementUpdateStudentPlaced"
            exact
            element={
              <Authenticate1>
                <PlacementUpdateStudentPlaced
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                token={token}
                setToken={setToken}
              ></PlacementUpdateStudentPlaced>
              </Authenticate1>
              
            }
          ></Route> 
 







          <Route
          // tpo routes
            path="/PlacementStudentApplied"
            exact
            element={
              <Authenticate1>
                <PlacementStudentApplied
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                token={token}
                setToken={setToken}
              ></PlacementStudentApplied>
              </Authenticate1>
              
            }
          ></Route>
          <Route
            path="/PostDrive"
            exact
            element={
              <Authenticate1>
                <PostDrive
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                token={token}
                setToken={setToken}
              ></PostDrive>
              </Authenticate1>
              
            }
          ></Route> 
          <Route
            path="company/Placementcompanyprofile"
            exact
            element={
              <Authenticate1>

              <PlacementCurrentCompanyProfile
                setToken={setToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              ></PlacementCurrentCompanyProfile>

              </Authenticate1>
              
            }
          /> 
          <Route
            path="/userprofile"
            exact
            element={
              <Authenticate1>
              <UserProfile
                setToken={setToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              ></UserProfile>

              </Authenticate1>
              
            }
          /> 
          <Route             
            path="/placementlogin"
            exact
            element={
                <PlacementSignin
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                token={token}
                setToken={setToken}
              ></PlacementSignin>
            }
          ></Route>
          <Route
            path="/placementsignup"
            exact
            element={
                <PlacementSignup
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                token={token}
                setToken={setToken}
              ></PlacementSignup>   
            }
          ></Route>

       <Route
            path="/TPOlogin"
            exact
            element={<Authenticate1>              
              <PlacementHome
              setToken={setToken}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            ></PlacementHome>
         </Authenticate1>
            }
          />
          <Route
            path="/PlacementNoticepage"
            exact
            element={<Authenticate1>              
              <PlacementNoticePage
              setToken={setToken}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            ></PlacementNoticePage>
</Authenticate1>
            }
          />
            <Route
            path="/PlacementshowAllCompany"
            exact
            element={<Authenticate1>
            <PlacementShowAllCompany>              
              <Home
              setToken={setToken}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            ></Home>
            </PlacementShowAllCompany>
            </Authenticate1>
            }
          />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;



