import {
  React,
  useRef,
  useEffect,
  useState,
} from 'react';

import './search.scss';

export function Search(props) {
  const searchLabel = useRef(null);
  const searchInput = useRef(null);

  const { fetchFilms } = props;
  const [searchOffsetTop, setSearchOffsetTop] = useState(0);
  const [shouldShowCloseButton, setShouldShowCloseButton] = useState(false);

  function handleSearchFocus() {
    searchLabel.current.classList.add('_active');
  }

  function handleSearchBlur() {
    if (searchInput.current.value.length === 0) {
      searchLabel.current.classList.remove('_active');
    }
  }

  function onSearchSubmit(event) {
    event.preventDefault();
    fetchFilms(searchInput.current.value);
  }

  function onSearchClear() {
    searchInput.current.value = '';
  }

  function updateCloseButton() {
    setShouldShowCloseButton(searchInput.current.value.length > 0);
  }

  useEffect(() => {
    setSearchOffsetTop(searchLabel.current.offsetTop);
    window.addEventListener('scroll', () => {
      console.log('search scroll event');
      if (window.pageYOffset >= searchOffsetTop) {
        searchLabel.current.classList.add('_fixed');
      } else {
        searchLabel.current.classList.remove('_fixed');
      }
    });
  }, [searchOffsetTop]);

  return (
    <>
      <form
        action=""
        onSubmit={onSearchSubmit}
      >
        <label
          className="search-input-label"
          ref={searchLabel}
          htmlFor="search-input"
          data-text="search"
        >
          <div
            className="search-input-icon"
          />
          <input
            className="search-input"
            ref={searchInput}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            onChange={updateCloseButton}
            type="text"
            id="search-input"
            placeholder="Поиск фильмов по жанрам и актерам"
          />
          {shouldShowCloseButton && (
            <button
              className="clear-search"
              onClick={onSearchClear}
              aria-label="clear search"
              type="button"
            />
          )}
        </label>
      </form>
    </>
  );
}
