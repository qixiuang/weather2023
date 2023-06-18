import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';
import $ from 'jquery';
import './search.css'

var appid = "91f93a5007bc09ef2250199c5d950fa6";

function getLocation() {
  $.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?') 
        .done (function(location)
        {
          $('.country').html(location.country_name);
          $('.city').html(location.city);
          var lat = location.latitude;
          var lon = location.longitude;
          var weatherLink = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + appid + "&callback=?";
          $('body').append(weatherLink);
          $.ajax({
              url: weatherLink,
              dataType: "jsonp",
              success: function(response) {
                  $('body').append(response);
              }
          });  
        });
}

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

function getTemperatureDetailsLongLat(longitude: number, latitude:number) {
  $.ajax({
      url: "http://api.openweathermap.org/data/3.0/onecall",
      type: "GET",
      dataType: "JSON",
      data: {
          lat: latitude,
          lon: longitude,
          appid: "91f93a5007bc09ef2250199c5d950fa6"
      },
      success: function(data) {
          alert(data);
      },
      error: function(data, textStatus, errorThrown) {
          //Do Something to handle error
          alert(textStatus);
      }
  });
}


function preprocessData(data:any, searchHistory: any) {
  var newarr = [];
  var newobj : any = {}
  console.log(data.name)
  newobj["name"] = data.name
  newarr.push(newobj)
  if (Object.keys(searchHistory).length != 0) {
    searchHistory.forEach((searchHistory:any) => {
      var newobj : any = {}
      newobj["name"] = searchHistory.name
      newarr.push(newobj)
    })
  }
  
  return newarr



}

// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=91f93a5007bc09ef2250199c5d950fa6
function getTemperatureByLocation(location:string, onCityData: any,searchHistory:any,onAddHistory:any) {
  $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather",
      type: "GET",
      dataType: "JSON",
      data: {
          q: location,
          appid: "91f93a5007bc09ef2250199c5d950fa6"
      },
      success: function(data) {
        onCityData(data)
        let processed = preprocessData(data, searchHistory)
        onAddHistory(processed)
      },
      error: function(data, textStatus, errorThrown) {
          //Do Something to handle error
          alert(textStatus);
      }
  });
}

$(document).ready(function() {
  getLocation();
});

function useChange() {
  const [state, setState] = React.useState(0);
  function change(value: any) {
    setState(value);
  }

  return { change, state };
}

// getTemperatureByLocation("London,uk")

interface MyComponentProps {
  cityData: object;
  setCityData: (name: object) => void;
  searchHistory: object;
  setSearchHistory: (name: object) => void;
}


const Search = (props: MyComponentProps): JSX.Element => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currCityData, setCurrCityData] = useState({});

    const { cityData, setCityData,searchHistory, setSearchHistory } = props;

    
	useEffect(() => {
	}, []);


    const state = useChange();


    const onSearchInputChanged = (e: any) => {
      setSearchTerm(e.target.value);
    };

    const onCityData = (name: object) => {
      setCityData(name);
    };

    const onAddHistory = (name: object) => {
      setSearchHistory(name);
    };
  

    return (
      <div>
            <Input onChange={onSearchInputChanged} type="text" name="city" id="searchinput" placeholder="City Name" />
            <Button shape="circle" icon={<SearchOutlined />} onClick={() => getTemperatureByLocation(searchTerm, onCityData,searchHistory,onAddHistory)} id="submitLocation" type="primary"></Button>
      </div>
    );
  };

  export default Search;