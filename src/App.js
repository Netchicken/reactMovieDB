import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Results from "./components/Results";
import axios from "axios";
import Popup from "./components/Popup";

import { apiSearch, getApiSearch, ApiSearchFetch } from "./Api";

function App() {
  const [state, setState] = useState({
    search: "",
    results: [],
    selected: {},
    apiresults: []
  });

const [apiResults, setApiResults] = useState([]);
const [weather, setWeather] = useState({});
const [fiveDays, setFiveDays] = useState({});


  const loadSearch =  event => {
   apiSearch(event, state.search).then(result =>{
 setApiResults(result);
    }) ;
   // console.log("FromApiResult", FromApiResult);
     
    console.log("apiResults  ", apiResults);
  };



      //-------------------------------------
    const apiUrl = "http://www.omdbapi.com/?apikey=9189dcef";
  const searchCall = async event => {
    if (event.key === "Enter") {
      // from api test
      loadSearch(event);


      let searchUrl = apiUrl + "&s=" + state.search;
      console.log(searchUrl);

      axios(searchUrl).then(({ data }) => {
        //don't forget {data} to deconstruct down to the data layer else use data.data
        let result = data.Search; //this is what the json tree is returning data/data/Search/all the results
        //  console.log("raw data", data);
        console.log("Search data", result);

        setState(prevState => {
          return { ...prevState, results: result }; //pass results to state
        });
      });

      //  console.log("State Results", state.results);
    }
  };

  const movieProviders = name => {
    //https://rapidapi.com/utelly/api/utelly/endpoints

    fetch(
      "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" +
        name +
        "&country=uk",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
          "x-rapidapi-key": "2ec3201157mshcffc98743b72f00p199711jsnde5247a04caa"
        }
      }
    )
      .then(response => {
        console.log("providers", response);

        setState(prevState => {
          return { ...prevState, provider: response }; //pass results to state
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  //handleInput gets the value from the search box and passes it to state where its stored before pushing to the API above
  const handleInput = event => {
    let search = event.target.value;
    setState(prevState => {
      // object Destructuring assignment syntax ... to deconstruct the state values    ...prevState so we can just get out the search.
      return { ...prevState, search: search };
    });
  };
  const openPopup = id => {
    console.log("openPopup ", id);
    let searchUrl = apiUrl + "&i=" + id;
    console.log("openPopup ", searchUrl);
    axios(searchUrl).then(({ data }) => {
      let result = data;
      console.log("openPopup search ", result);
      setState(prevState => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={searchCall} />
        <Results resultData={state.results} openPopup={openPopup} />

        {typeof state.selected.Title != "undefined" ? ( //if its not equal to undefined show popup
          <Popup
            selected={state.selected}
            closePopup={closePopup}
            movieProviders={movieProviders}
          /> //show popup
        ) : (
          false //otherwise show nothing
        )}
      </main>
    </div>
  );
}

export default App;
