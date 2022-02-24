import React from 'react'
import styles from './ErrorModal.module.css'

const ErrorModal = ({ message }) => {
	return (
		<div className={styles.ErrorModal}>
			<h1>{message}</h1>
		</div>
	)
}

export default ErrorModal
