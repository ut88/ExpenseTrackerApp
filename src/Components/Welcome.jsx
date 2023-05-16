import { useState,useRef, useEffect } from "react"
import "./Welcome.css"
const Welcome=()=>{
 const[compelete,setCompelete]=useState(false)
 const[name,setName]=useState();
 const[url,setUrl]=useState(); 

 const updateHandler=async(e)=>{
   const res=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBDSHLdQOBnM-LGVn3VbOdMm6jjAx-FmtU",{
      method: "POST",
      body: JSON.stringify({
         idToken:localStorage.getItem("Token")}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const {users}=data;
    setName(users[0].displayName);setUrl(users[0].photoUrl)
    setCompelete(!compelete)
 }
    const profilehandler=async(e)=>{
       e.preventDefault();
       try{
        const response=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBDSHLdQOBnM-LGVn3VbOdMm6jjAx-FmtU",{
         method: "POST",
         body: JSON.stringify({
            idToken:localStorage.getItem("Token"),
            displayName:name,
            photoUrl:url,
           returnSecureToken: true,
         }),
         headers: {
           "Content-Type": "application/json",
         },
       });
       const data = await response.json();
       console.log(data); 
     }catch(err){
        console.log(err);
       alert(err);
     }
    }
  

   return(<div className="Main">
    <div className="main">
    <span><h1>Welcome to Expense Tracker</h1><h2>Your profile is incomplete <button onClick={updateHandler}>compelete Now</button></h2></span>
    </div>
    {compelete && (
       <form className="form" onSubmit={profilehandler}>
        <div><h3>Full Name</h3><input type="text"  onChange={(e)=>{setName(e.target.value)}} value={name}></input></div>
        <div><h3>Photo Url</h3><input type="text" onChange={(e)=>{setUrl(e.target.value)}} value={url}></input></div>
        <button type="submit">Update</button>
       </form> 
    )}
    </div>)
}

export default Welcome;