import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBooks } from '../redux/actions/actionFetchBooks'
import { addBooks } from '../redux/actions/actionAddBooks'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setSortByYear } from '../redux/actions/actionSort'
toast.configure()

const SearchBooks = () => {
	const [title, setTitle] = useState('')

	const state = useSelector(state => state.search)
	const dispatch = useDispatch()

	console.log(state)

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(fetchBooks(title))
	}

	const handleSave = (title, author) => {
		const bookTosave = { title: title, author: author }
		dispatch(addBooks(bookTosave))
		toast.info('Зарегистрированная книга', {
			position: toast.POSITION.TOP_RIGHT,
		})
	}

	const displayFetchedBooks = state.isLoading ? (
		<div className='d-flex justify-content-center'>
			<div className='spinner-border text-info' role='status'>
				<span className='sr-only'></span>
			</div>
		</div>
	) : state.error !== '' ? (
		<p>{state.error}</p>
	) : (
		state.fetchedBooks.map(data => {
			return (
				<div className='card mb-2' key={data.id}>
					<div className='card-header'>
						<h5 className='mb-0'>
							<button
								className='btn btn-link collapsed'
								data-toggle='collapse'
								data-target={`#${data.id}`}
								aria-expanded='false'
							>
								{data.volumeInfo.title}
							</button>
						</h5>
					</div>

					<div id={data.id} className='collapse' data-parent='#accordion'>
						<div className='card-body'>
							{data.volumeInfo.hasOwnProperty('imageLinks') && (
								<img
									src={data.volumeInfo.imageLinks.thumbnail}
									alt={data.volumeInfo.title}
								/>
							)}

							<br />
							<h4 className='card-title'>Название: {data.volumeInfo.title}</h4>
							<h5 className='card-title'>Автор: {data.volumeInfo.authors}</h5>
							<h5 className='card-title'>
								Категория: {data.volumeInfo.categories}
							</h5>
							<h5 className='card-title'>
								Год выпуска: {data.volumeInfo.publishedDate}
							</h5>
							<p className='card-text'>
								Описание:{' '}
								{data.volumeInfo.description
									? data.volumeInfo.description
									: 'без описания'}
							</p>
							<a
								className='btn btn-outline-secondary'
								target='_blank'
								rel='noopener noreferrer'
								href={data.volumeInfo.previewLink}
							>
								Дополнительная информация
							</a>
							<button
								className='btn btn-outline-secondary m-3'
								onClick={() =>
									handleSave(data.volumeInfo.title, data.volumeInfo.authors)
								}
							>
								Сохранять
							</button>
						</div>
					</div>
				</div>
			)
		})
	)

	return (
		<main role='main'>
			<div className='jumbotron jumbotron-fluid'>
				<div className='container-fluid text-center bg-light p-3'>
					<h1 className='display-4'>BOOKS</h1>
					<p>Укажите тему книги для поиска в Google API</p>

					<form
						onSubmit={handleSubmit}
						className='form-inline d-flex justify-content-center'
					>
						<div className='form-group mr-3'>
							<input
								type='text'
								className='form-control'
								placeholder='Что искать?
'
								required
								value={title}
								onChange={e => setTitle(e.target.value)}
							/>
						</div>
						<div className='form-group ml-3'>
							<button className='btn btn-outline-secondary'>Исследовать</button>
						</div>
					</form>
					<div>
						<label>
							<input
								type='checkbox'
								// checked={sortByYear}
								// onChange={e => handleSortByYearChange(e.target.checked)}
							/>
							Сортировать по году выпуска
						</label>
					</div>
				</div>
			</div>

			<div className='container'>
				<div id='accordion'>{displayFetchedBooks}</div>
			</div>
		</main>
	)
}

export default SearchBooks
