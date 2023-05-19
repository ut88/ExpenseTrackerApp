import "./ExpenseList.css";
import { useEffect, useState } from "react";
const getData=async()=>{
    let response=await fetch(`https://expensetracker-8e330-default-rtdb.firebaseio.com/${localStorage.getItem("email")}.json`)
    let result =await response.json();
    return result
}
const ExpenseList=(props)=>{
   const [data,setData]=useState([]);  
  getData().then((result)=>{
    setData(result);
  })
  const deleteHandler=async(k,data,setData)=>{
    await fetch(`https://expensetracker-8e330-default-rtdb.firebaseio.com/${localStorage.getItem("email")}/${k}.json`,{
        method:'DELETE',
        headers:{
          "Content-Type":"application/json"
        }
      })
      delete data[k]
      setData({...data})
  }
 let showItem=[];
  for(let k in data){
   const {ExpenseDetails,Amount,ExpenseType}=data[k]
    
   showItem.push(<tr className="li" id={k} key={k} >
           <td>{ExpenseDetails}</td>
           <td>{Amount}</td>
           <td>{ExpenseType}</td>
           <td><button onClick={()=>{props.edit(data[k]); deleteHandler(k,data,setData)}}>Edit Expense</button></td>
           <td><button onClick={()=>{deleteHandler(k,data,setData)}}>Delete Expense</button></td> 
   </tr>)
  }


    return(<div className="back">
           <h1>Expense List</h1>
           <table >
            <tr className="li">
                <th><h2>ExpenseDetails</h2></th>
                <th><h2>Amount</h2></th>
                <th><h2>ExpenseType</h2></th>
                <th><h2></h2></th>
                <th><h2></h2></th>
            </tr>
            {showItem}
           </table> 
    </div>)
}

export default ExpenseList;