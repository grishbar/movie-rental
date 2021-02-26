import React from 'react';

import { Search } from 'components/search';
import { FilmList } from 'components/film-list';
import { SearchHistory } from 'components/search-history';

import logo from '../../assets/logo.svg';
import './app.scss';

export function App(props) {
  const {
    fetchFilms,
    fetchMoreFilms,
    filmSearch: {
      isFetching, filmList, filmsAmount, filmListPage, pagesCount, keyword, isFetchingMoreFilms,
    },
    filmSearchHistory: { filmHistoryItems },
  } = props;

  return (
    <div className="container">
      <img src={logo} className="main-logo" alt="logo" />
      <Search fetchFilms={fetchFilms} />
      <SearchHistory filmHistoryItems={filmHistoryItems} fetchFilms={fetchFilms} />
      <FilmList
        isFetching={isFetching}
        filmList={filmList}
        filmsAmount={filmsAmount}
        filmListPage={filmListPage}
        pagesCount={pagesCount}
        keyword={keyword}
        fetchMoreFilms={fetchMoreFilms}
        isFetchingMoreFilms={isFetchingMoreFilms}
      />
      <div className="copyright">
        © 2019 Тинькофф Прокат
      </div>
    </div>
  );
}
