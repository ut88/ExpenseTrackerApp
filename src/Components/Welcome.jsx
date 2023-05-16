import { useState,useRef } from "react"
import "./Welcome.css"
const Welcome=()=>{
    const FullName=useRef();
    const PhotoUrl=useRef();
 const[compelete,setCompelete]=useState(false)
    const profilehandler=async(e)=>{
       e.preventDefault();
       const name=FullName.current.value;
       const photoUrl=PhotoUrl.current.value;
       try{
        const response=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBDSHLdQOBnM-LGVn3VbOdMm6jjAx-FmtU",{
         method: "POST",
         body: JSON.stringify({
            idToken:localStorage.getItem("Token"),
            displayName:name,
            photoUrl:photoUrl,
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
    <span><h1>Welcome to Expense Tracker</h1><h2>Your profile is incomplete <button onClick={()=>{setCompelete(!compelete)}}>compelete Now</button></h2></span>
    </div>
    {compelete && (
       <form className="form" onSubmit={profilehandler}>
        <div><h3>Full Name</h3><input type="text" ref={FullName}></input></div>
        <div><h3>Photo Url</h3><input type="text" ref={PhotoUrl}></input></div>
        <button type="submit">Update</button>
       </form> 
    )}
    </div>)
}

export default Welcome;