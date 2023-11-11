import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../ContextAPI/UserTokenContext_API";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate = useNavigate();
  const {userToken, setUserToken} = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = async (e)=>{
    e.preventDefault();
    console.log(userName, password);
    const loginData = {user_name: userName, password: password};
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, loginData);
    const data = response.data;
    console.log(data);
    setUserToken(data.token);
  }

  useEffect(()=>{
    if(userToken){
      navigate("/dashboard");
    }
  },[userToken])

  return (
    <>
    <div className="row my-5 mx-5">
      <div className="col-6">
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">LOGIN</h3>
        </div>
        {/* <!-- /.card-header --> */}
        {/* <!-- form start --> */}
        <form onSubmit={loginSubmit}>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">User Name</label>
              <input onChange={(e)=>setUserName(e.target.value)}
              type="username" className="form-control" id="exampleInputEmail1" placeholder="Enter Username" />
            </div>
            <div className="form-group my-2">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input onChange={(e)=>setPassword(e.target.value)}
              type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            Test: 
            UserName - Rittij123,
            Password - rittij123
          </div>
          {/* <!-- /.card-body --> */}

          <div className="card-footer">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
      </div>
      </div>
    </>
  )
}

export default LoginPage;