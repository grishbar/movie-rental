import { createStore, applyMiddleware, combineReducers } from 'redux';
import filmSearch from 'reducers/film-search';
import filmSearchHistory from 'reducers/film-search-history';
import thunk from 'redux-thunk';

// let preloadedState;
// const persistedTodosString = localStorage.getItem('todos')
//
// if (persistedTodosString) {
//   preloadedState = {
//     todos: JSON.parse(persistedTodosString)
//   }
// }

// export const store = createStore(rootReducer, preloadedState);

const rootReducer = combineReducers({
  filmSearch,
  filmSearchHistory,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
