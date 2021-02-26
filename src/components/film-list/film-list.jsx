import { React, useEffect } from 'react';
import ReactLoading from 'react-loading';

import { FilmCard } from './film-card';

import './film-list.scss';

export function FilmList(props) {
  const {
    filmList,
    isFetching,
    filmsAmount,
    fetchMoreFilms,
    filmListPage,
    pagesCount,
    keyword,
    isFetchingMoreFilms,
  } = props;

  // функция для получения склонения слова, написана отвратительно,
  // но разбираться в ней никогда не придется
  function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20)
      ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY > document.body.clientHeight - 100
          && filmListPage < pagesCount && !isFetchingMoreFilms) {
        console.log('fetch more films');
        fetchMoreFilms(keyword, filmListPage + 1);
      }
    };

    window.onscroll = () => {
      handleScroll();
    };
  }, [fetchMoreFilms, keyword, filmListPage, pagesCount, isFetchingMoreFilms]);

  function getFilmName(film) {
    if (film.nameRu) {
      return film.nameRu;
    }
    if (film.nameEn) {
      return film.nameEn;
    }

    return 'без названия';
  }

  return (
    <>
      {!isFetching && filmsAmount > 0 && (
        <div className="film-list-title">
          Нашли
          &nbsp;
          {filmsAmount}
          &nbsp;
          {declOfNum(filmsAmount, ['фильм', 'фильма', 'фильмов'])}
        </div>
      )}
      {!isFetching && filmsAmount === 0 && (
        <div className="film-list-title">
          Мы не поняли о чем речь ¯\_(ツ)_/¯
        </div>
      )}
      {!isFetching && (
        <div className="film-cards-container">
          {filmList.map((film) => (
            <FilmCard
              key={film.filmId + Date.now()}
              filmRating={film.rating ? film.rating : 'нет рейтинга'}
              filmName={getFilmName(film)}
              filmGenre={film.genres[0] ? film.genres[0].genre : ''}
              filmYear={film.year ? film.year : ''}
              filmPosterUrl={film.posterUrl}
            />
          ))}
          {isFetchingMoreFilms
          && <ReactLoading type="bubbles" color="#fff" className="more-film-loader" />}
        </div>
      )}
      {isFetching
      && <ReactLoading type="spin" color="#fff" className="film-loader" />}
    </>
  );
}
