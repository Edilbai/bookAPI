import { SET_SORT_BY_YEAR } from '../constants'

export const setSortByYear = sortByYear => {
	return {
		type: SET_SORT_BY_YEAR,
		payload: sortByYear,
	}
}
