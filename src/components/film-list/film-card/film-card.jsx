import { React } from 'react';

import './film-card.scss';

export function FilmCard(props) {
  const {
    filmRating,
    filmName,
    filmGenre,
    filmYear,
    filmPosterUrl,
  } = props;

  return (
    <div className="film-card">
      <img
        src={filmPosterUrl}
        alt="film poster"
        className="film-card__poster"
      />
      <div className="film-card__content">
        <div className="film-card__rating">
          { filmRating }
        </div>
        <div className="film-card__name">
          { filmName }
        </div>
        <div className="film-card__bottom">
          <div className="film-card__genre">
            { filmGenre }
          </div>
          <div className="film-card__year">
            { filmYear }
          </div>
        </div>
      </div>
    </div>
  );
}
