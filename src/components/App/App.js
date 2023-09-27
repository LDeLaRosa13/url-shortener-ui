import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../UrlForm/apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUrls()
    .then((data) => {
      setUrls(data.urls)
    })
    .catch((error) => {
      setError("Error fetching shortened URLs. Please try again!")
      console.error('Error fetching URLS:', error)
    })
  }, [])

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm setUrls={setUrls} urls={urls} setError={setError}  />
      </header>

      <UrlContainer urls={urls}/>
    </main>
  );
}

export default App;
