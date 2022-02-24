import ExpenseForm from './ExpenseForm'
import './NewExpenses.css'

const NewExpenses = ({ addExpenseDataHandler }) => {
    // const saveExpenseDataHandler =(expenseData)=>{   
    // const dataWithId = {                            
    //     ...expenseData,                             
    //     id: Math.random().toString()                 
    // }
    // props.onAddExpense(dataWithId)                   
    // }
    return (
        <div className='new-expense'>
            <ExpenseForm onSaveExpenseData={addExpenseDataHandler} />
        </div>
    )
}
export default NewExpenses 