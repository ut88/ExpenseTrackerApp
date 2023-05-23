import { useState} from "react"
import "./Welcome.css"
const Welcome=(props)=>{
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
    console.log(users)
    console.timeLog(data)
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
  const emailHandler=async()=>{
   const res=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBDSHLdQOBnM-LGVn3VbOdMm6jjAx-FmtU",{
      method: "POST",
      body: JSON.stringify({
         requestType:"VERIFY_EMAIL",
         idToken:localStorage.getItem("Token")}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  }



   return(<div className="Main">
    <div className="main">
    <h1>Welcome to Expense Tracker🎆</h1>
    <h2>Your profile If incomplete <button onClick={updateHandler}>compelete Now</button>.||
    <button onClick={emailHandler}>verify your email</button>
    </h2>
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