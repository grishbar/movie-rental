import {
  FILM_FETCHING_COMPLETED,
  START_FILM_FETCHING,
  FILM_FETCHING_FAILED,
  FETCH_MORE_FILMS,
  START_FETCH_MORE_FILMS,
} from 'actions/action-types';

const initialState = {
  filmList: [],
  isFetching: false,
  isFetchingMoreFilms: false,
  error: undefined,
  filmsAmount: undefined,
  filmListPage: 1,
  pagesCount: 1,
  keyword: '',
};

const filmSearch = (state = initialState, action) => {
  switch (action.type) {
    case START_FILM_FETCHING:
      return {
        ...state,
        isFetching: true,
        isFetchingMoreFilms: false,
        error: undefined,
        filmList: [],
        filmsAmount: 0,
        filmListPage: 1,
        pagesCount: 1,
        keyword: action.keyword,
      };
    case FILM_FETCHING_COMPLETED:
      return {
        ...state,
        isFetching: false,
        isFetchingMoreFilms: false,
        error: undefined,
        filmList: action.filmList,
        filmsAmount: action.filmsAmount,
        filmListPage: 1,
        pagesCount: action.pagesCount,
      };
    case FILM_FETCHING_FAILED:
      return {
        ...state,
        isFetching: false,
        isFetchingMoreFilms: false,
        error: action.error,
        filmList: [],
        filmsAmount: 0,
        filmListPage: 1,
        pagesCount: 1,
      };
    case START_FETCH_MORE_FILMS:
      return {
        ...state,
        isFetching: false,
        isFetchingMoreFilms: true,
        filmListPage: state.filmListPage + 1,
      };
    case FETCH_MORE_FILMS:
      console.log('FETCH_MORE_FILMS');
      console.log([...state.filmList, ...action.filmList]);
      return {
        ...state,
        isFetchingMoreFilms: false,
        filmList: [...state.filmList, ...action.filmList],
      };
    default:
      return state;
  }
};

export default filmSearch;
