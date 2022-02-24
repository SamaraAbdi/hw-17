import React from 'react'
import './Expenses.css'
import Card from '../ui/Card'
import { useState } from 'react/cjs/react.development'
import ExpensesFilter from './ExpenseFilter'
import ExpensesList from './ExpensesList'
import ExpensesChart from './ExpensesChart'

function Expenses(props) {
	const [filteredYear, setFilteredYear] = useState('2022')
	const filterChangeHandler = (selectedYear) => {
		setFilteredYear(selectedYear)
	}

	const filteredExpenses = props.items.filter((expense) => {
		return expense.date.getFullYear().toString() === filteredYear
	})

	return (
		<>
			<Card className='expense'>
				<ExpensesFilter
					selected={filteredYear}
					onChangeFilter={filterChangeHandler}
				/>
				<ExpensesChart expenses={filteredExpenses} />
				<ExpensesList expenses={filteredExpenses}
					expenseYear={filteredYear}
					allExpense={props.items} />
			</Card>
		</>
	)
}

export default Expenses
