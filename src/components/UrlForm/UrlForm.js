import React, { useState } from 'react';
import { postUrl } from './apiCalls';

function UrlForm({ setUrls, urls, setError}) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const shortUrl = {
      long_url: urlToShorten,
      title: title
    }
    postUrl(shortUrl)
    .then(data =>  {
      setUrls([...urls, data])
      clearInputs();
    })
    .catch(error => {
      setError("Error fetching shortened URLs. Please try again!")
      console.error('Error fetching URLS:', error)
    })
  }
  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  return (
    <form>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type='text'
        placeholder='URL to Shorten...'
        name='longUrl'
        value={urlToShorten}
        onChange={e => setUrlToShorten(e.target.value)}
      />

      <button onClick={e => handleSubmit(e)}>
        Shorten Please!
      </button>
    </form>
  )
}

export default UrlForm;
