import { React } from 'react';

import './search-history.scss';

export function SearchHistory(props) {
  const {
    filmHistoryItems,
    fetchFilms,
  } = props;

  return (
    <>
      <div className="film-history-container">
        {filmHistoryItems.map((film, index) => (
          <div
            key={film.id}
            className="film-history-item"
            onClick={() => fetchFilms(film.filmName)}
            onKeyDown={() => fetchFilms(film.filmName)}
            role="button"
            tabIndex={3 + index}
          >
            {film.filmName}
          </div>
        ))}
      </div>
    </>
  );
}
