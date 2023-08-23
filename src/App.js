import React from 'react';
import Pagination from './Pagination';
import Search from './Search';
import Stories from './Stories';
import './App.css';

function App() {

  return (
    <div className="App">
      <Search />
      <Pagination />
      <Stories />
    </div>
  );
}

export default App;
