import classes from './Modal.module.css'

const Modal = ({ setModal }) => {
	const buttonHandler = () => {
		setModal(false)
	}
	return (
		<div className={classes.modal_window}>
			<h1 className={classes.modal_text}>Be sure to fill in all fields!!!</h1>
			<button className={classes.close_btn} onClick={buttonHandler}>Ok</button>
		</div>
	)
}
export default Modal;
