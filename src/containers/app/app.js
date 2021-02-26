import { connect } from 'react-redux';
import { App } from 'components/app';
import { fetchFilms, fetchMoreFilms } from 'actions/fetch-films';

const AppContainer = connect(
  (state) => {
    const {
      filmSearchHistory,
      filmSearch,
    } = state;
    return {
      filmSearchHistory,
      filmSearch,
    };
  },
  {
    fetchFilms,
    fetchMoreFilms,
  },
)(App);

export default AppContainer;
