import React, { Component, useState, useEffect } from 'react'
// import axios from 'axios'
import Loading from "./Components/Loading";

const App = () => {

  const [items, setItems] = useState( [] );
  const [searchQuery, setSearchQuery] = useState('');
  const [topiCondition, setTopiCondition] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search');

  const fetchNews = () => {
    setLoading(true);
    fetch(url)
    .then(result => result.json())
    .then(data => {
      console.log(data)
      setItems(data.hits);
      setLoading(false);
    })
    .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
    setTopiCondition(true);
  }
  
  return(
    <div>
      <h2 style={{color:'blue'}}> Science & Tech News </h2>

      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Search Your Topic' value={searchQuery} onChange={handleChange} />
        <button >Search</button>
      </form>

      <div>
        { !loading ? ( <div>
            { topiCondition ? (<div> <h3> Topic - {searchQuery} </h3> </div>) : '' }
            {items.map((n, i) => (
                <p key={i}> {n.title} </p>
            ))};
            </div>
            ): (<Loading message="Waiting for data..... " message_color='red' />)
        }
      </div>
    </div>
  );
}


export default App;
