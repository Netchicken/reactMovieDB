import React, { useState } from "react";
import "./App.css";
import Search from "./components/search";
import Results from "./components/Results";
import axios from "axios";
import Popup from "./components/Popup";

import { Utelly, apiSearch, getApiSearch, ApiSearchFetch } from "./Api";

function App() {
  const [state, setState] = useState({
    search: "",
    results: [],
    selected: {},
    apiresults: [],
    provider: []
  });

  const [apiResults, setApiResults] = useState([]);
  //const [state.selected, setstate.selected] = useState({});
  //const [providerForPopup, setproviderForPopup] = useState([]);
  //const [fiveDays, setFiveDays] = useState({});

  var providerForPopup = [];
  var providerTitle = "";

  const loadSearch = event => {
    apiSearch(event, state.search).then(result => {
      setApiResults(result);
    });
    // console.log("FromApiResult", FromApiResult);

    // console.log("apiResults  ", apiResults);
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
          return {
            ...prevState,
            results: result
          }; //pass results to state clear out providers
        });
       
      });

      //  console.log("State Results", state.results);
    }
  };

  function movieProviders(name) {
    //https://rapidapi.com/utelly/api/utelly/endpoints
    console.log("movieProviders name", name);
    // Utelly(name)
    const options = {
      headers: {
        "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": "8a2f94d881msh0cee2e1de8e452ep14186ajsnc0a39f09d0de"
      }
    };
    axios
      .get("https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + name + "&country=uk", options)
      .then(data => {
        const result = data.data.results[0].locations;
        console.log("Api Utelly ", result);
       
        providerForPopup = result;
        setState(prevState => {
          return { ...prevState, provider: result };
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  //handleInput gets the value from the search box and passes it to state where its stored before pushing to the API above
  const handleInput = event => {
    let search = event.target.value;
    setState(prevState => {
      // object Destructuring assignment syntax ... to deconstruct the state values    ...prevState so we can just get out the search.
      return { ...prevState, search: search };
    });
  };

  function openPopup(id) {
    // console.log("openPopup ", id);
    let searchUrl = apiUrl + "&i=" + id;
    console.log("openPopup searchURL", searchUrl);
    axios(searchUrl).then(({ data }) => {
      let result = data;
      console.log("openPopup search result", result);

      // setstate.selected(result);
      // providerTitle = result.Title;

      setState(prevState => {
        return { ...prevState, selected: result };
      });
      movieProviders(result.Title); //get the provider data for the movie selected
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Movie Database</h1>
        <h4>Click on movie to see plot and provider</h4>
      </header>
      <main>
        <Search handleInput={handleInput} search={searchCall} />
        <Results resultData={state.results} openPopup={openPopup} />

        {typeof state.selected.Title != "undefined" ? ( //if its not equal to undefined show popup
          <Popup selected={state.selected} closePopup={closePopup} movieProviders={state.provider} /> //show popup
        ) : (
          false //otherwise show nothing
        )}
      </main>
    </div>
  );
}

export default App;
