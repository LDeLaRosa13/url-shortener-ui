import React from 'react';
import './UrlContainer.css';
import PropTypes from 'prop-types';

const UrlContainer = props => {
  const urlEls = props.urls.map(url => {
    return (
      <div className="url" key={url.id}>
        <h3>{url.title}</h3>
        <a href={url.short_url} target="_blank">{url.short_url}</a>
        <p>{url.long_url}</p>
      </div>
    )
  });

  return (
    <section>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;

UrlContainer.propTypes = {
  urls: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      short_url: PropTypes.string.isRequired,
      long_url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

