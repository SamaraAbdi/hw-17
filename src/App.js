import React from 'react'
import Card from './components/ui/Card'
import './App.css'
import Expenses from './components/Expenses/Expenses'
import NewExpenses from './components/NewExpenses/NewExpenses'
import { useState, useEffect, useCallback } from 'react'
import { BASE_URl } from './utils/constants'
import ErrorModal from './components/ui/ErrorModal'



function App() {
	const [expenses, setExpenses] = useState([])
	const [error, setError] = useState(null)
	const addExpenseDataHandler = useCallback(async () => {
		try {
			const response = await fetch(`${BASE_URl}/expenses.json`)
			if (!response.ok) {
				throw new Error('Что-то пощло не так!')
			}
			const data = await response.json()
			const loadedExpenses = []
			for (const key in data) {
				loadedExpenses.push({
					id: key,
					title: data[key].title,
					amount: data[key].amount,
					date: new Date(data[key].date),
				})
			}
			setExpenses([...loadedExpenses])
		} catch (err) {
			setError(err.message)
			setTimeout(() => {
				setError(null)
			}, 2000)
		}
	}, [])

	useEffect(() => addExpenseDataHandler(), [addExpenseDataHandler])

	return (
		<Card >
			{error && <ErrorModal message={error} />}
			<NewExpenses onAddExpense={addExpenseDataHandler} />  {/* NewExpenses' ке пропс катары беребиз */}
			<Expenses items={expenses} />
		</Card>
	)
}

export default App;
