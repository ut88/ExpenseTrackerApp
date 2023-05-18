import "./ExpenseForm.css"

const ExpenseForm=()=>{

    return(<div className="main2">
      <form className="formExpense">
        <div><h1>Expense Detail</h1><input type="text"  required></input></div>
        <div><h1>Expense Amount</h1><input type="number"  required></input></div>
        <div>  <h1>Expense Type</h1>
        <select>
            <option>Invest</option>
            <option>Food</option>
            <option>Shopping</option>
            <option>Travel</option>
            <option>Skill updation</option>
            <option>Accomadation Bill</option>
        </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>)
}

export default ExpenseForm;