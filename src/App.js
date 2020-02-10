import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Results from "./components/Results";
import axios from "axios";
import Popup from "./components/Popup";

import { apiSearch, UtellyNEW } from "./Api";

function App() {
  const [state, setState] = useState({
    search: "",
    results: [],
    selected: {},
    apiresults: [],
    provider: []
  });

  const [apiResults, setApiResults] = useState([]);

  const searchCall = async event => {
    if (event.key === "Enter") {
      apiSearch(state.search)
        .then(result => {
          console.log("Api Search  from Api.js ", result);
          setApiResults(result);
          //return result;
        })
        .catch(error => {
          console.log("Api Search error ", error);
          return;
        });
      //console.log("apiResults  ", apiResults);
    }
  };

  async function movieProviders(name) {
    //https://rapidapi.com/utelly/api/utelly/endpoints
    //trying to get data from an api instead of in this module
    UtellyNEW(name)
      .then(result => {
        console.log("Api Utelly  from Api.js ", result);

        // providerForPopup = result;
        setState(prevState => {
          return { ...prevState, provider: result };
        });
      })
      .catch(error => {
        console.log("Api Utelly NEW error", error);
        return;
      });
  }

  //handleInput gets the value from the search box and passes it to state where its stored before pushing to the API above
  const handleInput = event => {
    let search = event.target.value;
    setState(prevState => {
      // object Destructuring assignment syntax ... to deconstruct the state values    ...prevState so we can just replace the search values.
      return { ...prevState, search: search };
    });
  };

  function openPopup(id) {
    const apiUrl = "https://www.omdbapi.com/?apikey=9189dcef";
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
        <h4>Click on a movie to see the plot and where to watch</h4>
      </header>
      <main>
        <Search handleInput={handleInput} search={searchCall} />
        <Results resultData={apiResults} openPopup={openPopup} />

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
