import { Fragment, useState } from 'react'
import { BASE_URl } from '../../utils/constants';
import BackModal from './BackModal';
import './ExpenseForm.css'
import Modal from './Modal';
import iconLoading from '../../assets/loading.svg'

const ExpenseForm = ({ addExpenseDataHandler }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [showModal, setShowModal] = useState(false)

    const [show, setShow] = useState(false)
    // const [isNewExpense, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isPostData, setIsPostData] = useState(false)
    const [isErrorMessage, setIsErrorMessage] = useState(false)


    // const inputChangeHandler = (event) => {
    //     const currentInput = event.target.name;
    //     if (currentInput === 'title') {
    //         setTitle(event.target.value)
    //     } else if (currentInput === 'amount') {
    //         setAmount(event.target.value)
    //     } else if (currentInput === 'date') {
    //         setDate(event.target.value)
    //     }
    // }
    const titleChangeHandler = (event) => {
        setTitle(event.target.value)
    }

    const amountChangeHandler = (event) => {
        setAmount(event.target.value)
    }

    const dateChangeHandler = (event) => {
        setDate(event.target.value)
    }
    const submitHandler = async (event) => {
        event.preventDefault()
        if (title && amount && date) {
            const currentData = {
                title,
                amount: Number(amount),
                date,
            }
            setIsLoading(true)
            try {
                const request = await fetch(`${BASE_URl}/expenses.json`, {
                    method: 'POST',
                    body: JSON.stringify(currentData),
                    headers: {
                        'Content-type': 'application/json',
                    },
                })
                if (request.ok) {
                    setIsPostData(true)
                    setTimeout(() => {
                        setIsPostData(false)
                    }, 1000)
                } else throw new Error('Something went wrong')
            } catch (err) {
                setIsErrorMessage(true)
            }
            setTitle('')
            setAmount('')
            setDate('')
            addExpenseDataHandler()
            setTimeout(() => {
                setIsLoading(false)
                setShow(false)
            }, 500)
        } else setShowModal(true)
    }
    const cancelBtnHandler = () => {
        setShow(false)
        setIsErrorMessage(false)
    }
    let showExpense = (
        <button onClick={() => setShow(true)}>ADD NEW EXPENSE</button>
    )

    if (show) {
        showExpense = (
            <Fragment>
                {isLoading && (
                    <img src={iconLoading} alt='loading' className='loading-icon' />
                )}
                {!isLoading && (
                    <Fragment>
                        <div className='new-expense__controls'>
                            <div className='new-expense__control'>
                                <label>Title</label>
                                <input name='title' type='text' onChange={titleChangeHandler} value={title} />
                            </div>
                            <div className='new-expense__control'>
                                <label>Amount</label>
                                <input name='amount' type='number' min="0" step="1" onChange={amountChangeHandler} value={amount} />
                            </div>
                            <div className='new-expense__control'>
                                <label>Date</label>
                                <input name='date' type='date' min="2022-01-01" onChange={dateChangeHandler} value={date} />
                            </div>
                        </div>
                        <div className='new-expense__actions'>
                            <button type="submit">Add Expense</button>
                            <button type="submit" onClick={cancelBtnHandler}>Cancel</button>
                        </div>
                    </Fragment>
                )
                }
            </Fragment>
        )

    }
    return (
        <Fragment>
            {isPostData && !show && (
                <h2 className='post_data_text'>Data saved successfully!</h2>
            )}
            {isErrorMessage && !show && (
                <h2 className='post_data_text'>An error occurred while sending data!</h2>
            )}
            <form onSubmit={submitHandler}>
                {showModal && <Modal setModal={setShowModal} />}
                {showModal && <BackModal />}
                {showExpense}
            </form>
        </Fragment>
    )
}
export default ExpenseForm
