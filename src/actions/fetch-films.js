import {
  FILM_FETCHING_COMPLETED,
  FILM_FETCHING_FAILED,
  START_FILM_FETCHING,
  ADD_NEW_FILM_HISTORY_ITEM,
  START_FETCH_MORE_FILMS,
  FETCH_MORE_FILMS,
} from './action-types';

export const fetchFilms = (keyword) => (dispatch, getState) => {
  const { isFetching, keyword: lastKeyword } = getState().filmSearch;
  if (isFetching || lastKeyword === keyword) {
    return;
  }
  dispatch({ type: START_FILM_FETCHING, keyword });

  // не очень правильно так делать запросы в экшене, нужно будет вынести в отдельную папку api,
  // где будут указаны url для api, передаваемые заголовки и прочее
  fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}`, {
    headers: {
      'X-API-KEY': 'ae811827-8e3c-4293-b613-e2c95bfa6dd6',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(
        {
          type: FILM_FETCHING_COMPLETED,
          filmList: data.films,
          filmsAmount: data.searchFilmsCountResult,
          pagesCount: data.pagesCount,
        },
      );
      if (data.searchFilmsCountResult > 0) {
        dispatch({ type: ADD_NEW_FILM_HISTORY_ITEM, filmName: keyword });
      }
    })
    .catch((err) => {
      dispatch({ type: FILM_FETCHING_FAILED, error: err });
    });
};

// возможно дублирование экшена сверху но мне кажется, так красивей будет
// чем сделать один тяжело читаемый экшен с кучей условий
export const fetchMoreFilms = (keyword, pageNumber) => (dispatch, getState) => {
  const { isFetchingMoreFilms } = getState().filmSearch;
  if (isFetchingMoreFilms) {
    return;
  }
  dispatch({ type: START_FETCH_MORE_FILMS });

  // не очень правильно так делать запросы в экшене, нужно будет вынести в отдельную папку api,
  // где будут указаны url для api, передаваемые заголовки и прочее
  fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${pageNumber}`, {
    headers: {
      'X-API-KEY': 'ae811827-8e3c-4293-b613-e2c95bfa6dd6',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(
        {
          type: FETCH_MORE_FILMS,
          filmList: data.films,
        },
      );
    })
    .catch((err) => {
      dispatch({ type: FILM_FETCHING_FAILED, error: err });
    });
};
