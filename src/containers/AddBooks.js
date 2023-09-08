import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
	addBooks,
	deleteBooks,
	deleteAllBooks,
} from '../redux/actions/actionAddBooks'
import FlipMove from 'react-flip-move'

const AddBooks = ({ libraryData, addBook, deleteBook, deleteAll }) => {
	/* console.log(libraryData) */

	const initialState = {
		title: '',
		author: '',
	}

	const [newData, setNewData] = useState(initialState)

	const handleSubmit = e => {
		e.preventDefault()
		if (newData.title !== '' && newData.author !== '') {
			addBook(newData)
		}

		setNewData(initialState)
	}

	const displayData =
		libraryData.length > 0 ? (
			<FlipMove>
				{libraryData.map(data => {
					return (
						<li
							key={data.id}
							className='list-group-item list-group-item-light d-flex justify-content-between'
						>
							<span>
								<strong>Заголовок: </strong>
								{data.title}
							</span>
							<span>
								<strong>Автор: </strong>
								{data.author}
							</span>
							<span
								onClick={() => deleteBook(data.id)}
								className='btn btn-danger'
							>
								x
							</span>
						</li>
					)
				})}
			</FlipMove>
		) : (
			<p className='text-center'>Нет данных для отображения</p>
		)

	const deleteAllBooksBtn = libraryData.length > 0 && (
		<div className='d-flex justify-content-center'>
			<button onClick={() => deleteAll()} className='btn btn-danger my-4'>
				Удалить все книги
			</button>
		</div>
	)

	return (
		<main role='main'>
			<div className='jumbotron jumbotron-fluid'>
				<div className='container-fluid text-center bg-light p-3'>
					<h1 className='display-4'>Книги</h1>
					<p>Добавьте книгу в свою библиотеку</p>

					<form className='form-inline d-flex justify-content-center'>
						<div className='form-group mr-3'>
							<input
								value={newData.title}
								type='text'
								className='form-control'
								placeholder='Название'
								required
								onChange={e =>
									setNewData({ ...newData, title: e.target.value })
								}
							/>
						</div>
						<div className='form-group mx-3'>
							<input
								value={newData.author}
								type='text'
								className='form-control'
								placeholder='Автор'
								required
								onChange={e =>
									setNewData({ ...newData, author: e.target.value })
								}
							/>
						</div>
						<div className='form-group ml-3'>
							<button
								className='btn btn-outline-secondary'
								onClick={handleSubmit}
							>
								Добавить книгу
							</button>
						</div>
					</form>
				</div>
			</div>

			<div className='container mt-5 w-50'>
				<div className='row'>
					<div className='col-md-12'>
						<ul className='list-group'>{displayData}</ul>
						{deleteAllBooksBtn}
					</div>
				</div>
			</div>
		</main>
	)
}

const mapStateToProps = state => {
	return {
		libraryData: state.library,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addBook: param => dispatch(addBooks(param)),
		deleteBook: id => dispatch(deleteBooks(id)),
		deleteAll: () => dispatch(deleteAllBooks()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBooks)
