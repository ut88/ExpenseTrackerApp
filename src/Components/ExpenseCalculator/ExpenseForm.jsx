import "./ExpenseForm.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { PremiumActions } from "../store/Premium";
const ExpenseForm = (props) => {
  const dispatch=useDispatch();
  const preAmount = useSelector((state) => state.Premium.amount);
  const detail = useRef();
  const price = useRef();
  const expenseType = useRef();
  const[data,setData]=useState([]);
  useEffect(()=>{
    const response=async()=>{
      const result=await fetch(`https://expensetracker-8e330-default-rtdb.firebaseio.com/${localStorage.getItem("email")}.json`)
      const res= await result.json();
      let Totalamount=0
      for(let k in res){
        res[k].id=k;
        Totalamount= Totalamount+Number(res[k].Amount)
      } 
      dispatch(PremiumActions.getAmount(Totalamount)) 
      setData(Object.values(res))
    } 
    response()
  },[])
  const deleteHandler=async(item)=>{  
    const response = await fetch(`https://expensetracker-8e330-default-rtdb.firebaseio.com/${localStorage.getItem("email")}/${item.id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(PremiumActions.getAmount(preAmount -Number(item.Amount)))
    const newData=data.filter((obj)=>{
      return obj!==item
    })
    setData(newData)
  }
  const reEdit=(obj)=>{
    detail.current.value=obj.ExpenseDetails
    price.current.value=obj.Amount
    expenseType.current.value=obj.ExpenseType
    dispatch(PremiumActions.getAmount(preAmount -Number(obj.Amount)))
  }
  const ExpenseHandler = async (e) => {
    e.preventDefault();

    const obj = {
      ExpenseDetails: detail.current.value,
      Amount: price.current.value,
      ExpenseType: expenseType.current.value,
    };
    dispatch(PremiumActions.getAmount(preAmount +Number(obj.Amount)))
    const response = await fetch(
      `https://expensetracker-8e330-default-rtdb.firebaseio.com/${localStorage.getItem(
        "email"
      )}.json`,
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let result = await response.json();
    setData((pre)=>{
      return [...pre,{...obj,id:result.name}]
    })
    console.log(result)
  };

  function makecsv(data) {
    return data.map((item) => {
        return [item.ExpenseDetails, item.Amount, item.ExpenseType]
      })
      .join("\n");
  }
  var blob1 = new Blob([makecsv(data)]);
  return (
    <div className="main2">
      <form className="formExpense" onSubmit={ExpenseHandler}>
        <div>
          <h1>Expense Detail</h1>
          <input type="text" ref={detail} required></input>
        </div>
        <div>
          <h1>Expense Amount</h1>
          <input type="number" ref={price} required></input>
        </div>
        <div>
          {" "}
          <h1>Expense Type</h1>
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
      <div className="back">
      <h1>Expense List</h1>
      <table>
        <thead>
          <tr className="li">
            <th>
              <h2>ExpenseDetails</h2>
            </th>
            <th>
              <h2>Amount</h2>
            </th>
            <th>
              <h2>ExpenseType</h2>
            </th>
            <th>
              <h2></h2>
            </th>
            <th>
              <h2></h2>
            </th>
          </tr>
        </thead>
        <tbody>{data.map((item)=>{
        return (<tr className="li" key={item.id} id={item.id} >
        <td>{item.ExpenseDetails}</td>
        <td>{item.Amount}</td>
        <td>{item.ExpenseType}</td>
        <td>
          <button
            onClick={() => {
              reEdit(item)
              deleteHandler(item);
            }}
          >
            Edit Expense
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              deleteHandler(item);
            }}
          >
            Delete Expense
          </button>
        </td>
      </tr>)
      })}</tbody>
      </table>
      <button className="button2">
        <a download="file1.csv" href={URL.createObjectURL(blob1)}>
          ⬇️Download ExpenseList
        </a>
      </button>
    </div>
    </div>
  );
};

export default ExpenseForm;
