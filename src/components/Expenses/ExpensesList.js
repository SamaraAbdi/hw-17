import ExpenseItem from './ExpenseItem'
import './ExpensesList.css'
const ExpensesList = (props) => {

    let expensesContent = <h2 className='expenses-list__fallback'>No Expenses Found</h2>
    if (props.expenses.length > 0) {
        expensesContent = props.expenses.map((expense) => (
            <ExpenseItem
                key={expense.id}
                title={expense.title}
                amount={expense.amount}
                date={expense.date}
            />
        ))
    }

    if (props.expenseYear === "All" && props.allExpense.length > 0) {
        expensesContent = props.allExpense.map((expense) => {
            return (
                <ExpenseItem
                    key={expense.id}
                    title={expense.title}
                    amount={expense.amount}
                    date={expense.date}
                />
            )
        })
    }

    return (
        <ul className='expenses-list'>
            {expensesContent}
        </ul>
    )
}
export default ExpensesList