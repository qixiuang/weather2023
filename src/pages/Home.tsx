import React, { useState } from 'react';
import Search from '../Components/Search/Search';
import Weather from '../Components/Weather/Weather';
import SearchHistory from '../Components/SearchHistory/SearchHistory';
import { Empty } from 'antd';
import './home.css';

export default function Home() {
  const [cityData, setCityData] = React.useState({});
  const [searchHistory, setSearchHistory] = React.useState({});
  return (
    <div className="App">
      <div id="headerdiv">
      <h1>Weather app</h1>
      </div>
      <div id="searchdiv">
      <Search cityData={cityData} setCityData={setCityData} searchHistory={searchHistory} setSearchHistory={setSearchHistory} />
      </div>
      <Weather cityData={cityData} />
      {Object.keys(searchHistory).length != 0 && (
        <div>
          <SearchHistory searchHistory={searchHistory} setSearchHistory={setSearchHistory} /></div>
      )|| <Empty className="emptyView"/>}
    </div>
  );
}