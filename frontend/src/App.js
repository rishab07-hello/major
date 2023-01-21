
import Home from './pages/homes/Home';
import Front2page from './pages/front2page/Front2page';
import Frontpage from './pages/Frontpage/Frontpage';
import StudentProfile from './pages/StudentProfile/StudentProfile';
import NoticePage from './components/notice/notice'
import ShowAllCompany from './pages/showAllCompany/showAllCompany'
import List from './pages/list/List';
import New from  './pages/new/New';
import CurrentCompanyProfile from './pages/currentCompanyProfile/currentCompanyProfile'
import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";
import Signup from './components/Singup/Signup';
import { useState, useEffect } from "react";

import { Toaster } from "react-hot-toast";

import { isEmpty } from "lodash";

import store from "store";
import Signin from './components/Signin/Singin';
import Signout from './components/Signout/Signout';
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
    return currentUser ? children : <Navigate to="/login"/>
  }
  // console.log(currentUser)
  return (
    <div className="App">
      <div>
        <Toaster />
      </div>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/"/>
        <Route index element={<Authenticate><Home/></Authenticate>}/>
        <Route path="login" element={ <Login/> } />
        <Route path="addUser" element={ <Authenticate><List/></Authenticate> } />
        <Route path="users/new" element={ <Authenticate><New/></Authenticate> } />
        <Route path="signup" element={ <Signup/> } /> */}

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
            path="login"
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
            path="/showAllCompany"
            exact
            element={<ShowAllCompany>              
              <Home
              setToken={setToken}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            ></Home>
            </ShowAllCompany>
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
            path="addUser"
            exact
            element={
              <Authenticate>
                <List
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                token={token}
                setToken={setToken}
              ></List>
              </Authenticate>
              
            }
          ></Route>

          {/* <Route
            path="verify/email"
            exact
            element={
              <Email
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                token={token}
                setToken={setToken}
              ></Email>
            }
          ></Route> */}


      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;



