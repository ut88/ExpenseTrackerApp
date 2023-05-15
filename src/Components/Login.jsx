import classes from "./Login.module.css";
import { useState,useRef } from "react";
const Login=()=>{ 
  const [confirm ,setConfirm]=useState(true);
  const [login,setLogin]=useState(false);
  const enterEmail=useRef();
  const enterPassword=useRef();
  const submitHandler=async(e)=>{
    e.preventDefault();
    const Email = enterEmail.current.value;
    const Password = enterPassword.current.value;
    let url;
    if(login){
      url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDSHLdQOBnM-LGVn3VbOdMm6jjAx-FmtU";
    }
    else{
      url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDSHLdQOBnM-LGVn3VbOdMm6jjAx-FmtU";
    }
     const response=await fetch(url,{
      method: "POST",
      body: JSON.stringify({
        email: Email,
        password: Password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data); 
    if(data.idToken){
    console.log("Login Succesful")
    localStorage.setItem("email", Email.replace("@", "").replace(".", ""));
    }
  }

   return(<div className={classes.main}>
   <form className={classes.form1} onSubmit={submitHandler}>
     <h1>Sign up</h1>
     <div>
      <h3>Email Id</h3>
     <input type="email" placeholder="Enter Your Email" ref={enterEmail} required></input>
     </div>
     <div>
     <h3>Password</h3>
     <input type="password" placeholder="Enter Your Password" ref={enterPassword} required></input>
     </div>
     {confirm &&(<div>
     <h3>Confirm Password</h3>
     <input type="password" placeholder="Enter Your Confirm Password" required></input>
     </div>)}
     <button type="submit" >{(login)?<h3>Sign In</h3>:<h3>SignUp</h3>}</button>
  </form>
  <button className={classes.button} onClick={()=>{setConfirm(!confirm);setLogin(!login)}}>{(confirm)?<h2>Have an account?Login</h2>:<h2>New Account</h2>}</button>
  </div>)
}

export default Login;