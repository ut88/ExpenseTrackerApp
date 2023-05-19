import "./ExpenseForm.css"
import { useRef,useState } from "react";
import ExpenseList from "./ExpenseList";
const ExpenseForm=(props)=>{
  let ExpenseArray=[];
  const detail=useRef();
  const price=useRef();
  const expenseType=useRef(); 
  const [FormInput,setFormInput]=useState();
  if(FormInput){
    detail.current.value=FormInput.ExpenseDetails;
    price.current.value=FormInput.Amount;
    expenseType.current.value=FormInput.ExpenseType;
  }
  const editForm=(data)=>{
     setFormInput(data);
  }
   const ExpenseHandler=async(e)=>{
    e.preventDefault();
    const obj={
      ExpenseDetails:detail.current.value,
      Amount:price.current.value,
      ExpenseType:expenseType.current.value,
    }
        const response= await fetch(`https://expensetracker-8e330-default-rtdb.firebaseio.com/${localStorage.getItem("email")}.json`,{
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json",
            },
          })
          let result = await response.json();
          console.log(result)
   }


    return(<div className="main2">
      <form className="formExpense" onSubmit={ExpenseHandler}>
        <div><h1>Expense Detail</h1><input type="text" ref={detail}  required></input></div>
        <div><h1>Expense Amount</h1><input type="number" ref={price}  required></input></div>
        <div>  <h1>Expense Type</h1>
        <select ref={expenseType}>
            <option value="Invest">Invest</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Travel">Travel</option>
            <option value="Skill Update">Skill updation</option>
            <option value="Accomadation Bill">Accomadation Bill</option>
        </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>
      <ExpenseList edit={editForm} />
    </div>)
}

export default ExpenseForm;