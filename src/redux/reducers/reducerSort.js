import { SET_SORT_BY_YEAR } from '../actions/actionSort'
const initialState = {
	books: [],

	sortByYear: false, // Добавьте поле для хранения информации о сортировке по году выпуска
}
export const setSortByYear = sortByYear => {
	return {
		type: SET_SORT_BY_YEAR,
		payload: sortByYear,
	}
}
const bookReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SORT_BY_YEAR:
			return {
				...state,
				sortByYear: action.payload,
			}
		// ...
	}
}

export default bookReducer
