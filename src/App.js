import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Results from "./components/Results";
import axios from "axios";

function App() {
  const [state, setState] = useState({
    search: "",
    results: [],
    selected: {}
  });
  const apiUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=9189dcef";

  const searchCall = event => {
    if (event.key === "Enter") {

  let searchUrl = apiUrl + "&s=" + state.search;
      console.log(searchUrl);
      
      axios(searchUrl).then(data => {
        let result = data.data.Search; //this is what the json tree is returning data/data/Search/all the results
          console.log("raw data", data);
        console.log("Search data", result);

        setState(prevState => {
          return { ...prevState, results: result }; //pass results to state
        });
      });

      console.log("State Results", state.results);
    }
  };
  //handleInput gets the value from the search box and passes it to state where its stored before pushing to the API above
  const handleInput = event => {
    let search = event.target.value;
    setState(prevState => {
      // object Destructuring assignment syntax ... to deconstruct the state values    ...prevState so we can just get out the search.
      return { ...prevState, search: search };
    });
    
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={searchCall}></Search>
        <Results resultData={state.results} />
      </main>
    </div>
  );
}

export default App;
