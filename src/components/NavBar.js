import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
	return (
		<header>
			<div className='container__header d-flex flex-column flex-md-row p-3 border-bottom bg-secondary text-white'>
				<h4 className='mr-md-auto'>
					<a href='/' className='text-decoration-none text-white'>
						BOOKS
					</a>
				</h4>
				<nav className='container__navlink btn-group'>
					<Link to='/' className='btn btn-light'>
						Добро пожаловать
					</Link>
					<Link to='/search' className='btn btn-light'>
						Исследовать
					</Link>
					<div className='d-flex justify-content-flex-end'>
						<h4>Фильтр по категории:</h4>
						<select
						// value={category}
						// onChange={e => handleCategoryChange(e.target.value)}
						>
							<option value='all'>Все</option>
							<option value='art'>Искусство</option>
							<option value='biography'>Биография</option>
							<option value='computers'>Компьютеры</option>
							<option value='history'>История</option>
							<option value='medical'>Медицина</option>
							<option value='poetry'>Поэзия</option>
						</select>
					</div>
				</nav>
			</div>
		</header>
	)
}

export default NavBar
