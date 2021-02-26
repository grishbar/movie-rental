import {
  ADD_NEW_FILM_HISTORY_ITEM,
  REMOVE_FILM_HISTORY_ITEM,
} from 'actions/action-types';

const initialState = {
  filmHistoryItems: [],
};

/*
  filmHistoryItems: [
    {
      filmName: 'some name',
      id: 1,
    },
    {
      filmName: 'some name',
      id: 2,
    },
  ];
*/

function nextSearchHistoryItemID(filmHistoryItems) {
  const newId = filmHistoryItems.reduce(
    (maxId, filmHistoryItem) => Math.max(filmHistoryItem.id, maxId), -1,
  );
  return newId + 1;
}

const filmSearchHistory = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_FILM_HISTORY_ITEM:
      if (state.filmHistoryItems.find((film) => film.filmName === action.filmName)) {
        return {
          ...state,
        };
      }
      return {
        filmHistoryItems: [
          {
            filmName: action.filmName,
            id: nextSearchHistoryItemID(state.filmHistoryItems),
          },
          ...state.filmHistoryItems,
        ],
      };
    case REMOVE_FILM_HISTORY_ITEM:
      return {
        ...state,
        filmHistoryItems: [...state.filmHistoryItems],
      };
    default:
      return state;
  }
};

export default filmSearchHistory;
