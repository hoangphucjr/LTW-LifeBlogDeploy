import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching} = useContext(Context);
  const history = useHistory();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      history.push("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
    }
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input className="loginInput" type="text" placeholder="Enter your username..." ref={userRef}/>
          <label>Password</label>
          <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef}/>
          <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
          <button className="loginRegisterButton">
            <span style={{color:"black", }}>Not a member? </span>
            <Link className="link" to="/register">
              Register
            </Link>
          </button>
          {error && <span style={{color:"red"}}>Wrong username or password!</span>}
        </form>     
      </div>    
    </div>
  );
}