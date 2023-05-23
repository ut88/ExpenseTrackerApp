import "./ExpenseList.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PremiumActions } from "./store/Premium";
const getData=async()=>{
    let response=await fetch(`https://expensetracker-8e330-default-rtdb.firebaseio.com/${localStorage.getItem("email")}.json`)
    let result =await response.json();
    return result
}
const ExpenseList=(props)=>{
   const dispatch=useDispatch();
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
      TotalAmount=TotalAmount-parseInt(data[k].Amount);
      delete data[k]
      setData({...data})
  }
 let showItem=[];
 let TotalAmount=0;
   for(let k in data){
   const {ExpenseDetails,Amount,ExpenseType}=data[k]
    TotalAmount=TotalAmount+parseInt(Amount);
   showItem.push(<tr className="li" id={k} key={k} >
           <td>{ExpenseDetails}</td>
           <td>{Amount}</td>
           <td>{ExpenseType}</td>
           <td><button onClick={()=>{props.edit(data[k]); deleteHandler(k,data,setData)}}>Edit Expense</button></td>
           <td><button onClick={()=>{deleteHandler(k,data,setData)}}>Delete Expense</button></td> 
   </tr>)
  }
  localStorage.setItem("Amount",TotalAmount)
  if(localStorage.getItem("Amount")>=10000){
    dispatch(PremiumActions.yes())
    }
    else{
    dispatch(PremiumActions.no())
    }


    return(<div className="back">
           <h1>Expense List</h1>
           <table >
            <thead>
            <tr className="li">
                <th><h2>ExpenseDetails</h2></th>
                <th><h2>Amount</h2></th>
                <th><h2>ExpenseType</h2></th>
                <th><h2></h2></th>
                <th><h2></h2></th>
            </tr>
            </thead>
            <tbody>
            {showItem}
            </tbody>
           </table> 
    </div>)
}

export default ExpenseList;