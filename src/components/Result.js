//rcfe

// Title: "The Big Lebowski"
// Year: "1998"
// imdbID: "tt0118715"
// Type: "movie"
// Poster: "https://m.media

import React from "react";

function Result({ result, openPopup, movieProviders }) {
  //this took 2 hours to fix! needed { }
 //  console.log("result title ", result.Title);
  // console.log("result Poster ", result.Poster);
   //console.log("Popup ID ", result.imdbID);
  return (
    <div className="result" onClick={() => openPopup(result.imdbID) }>
      <img src={result.Poster} />
      <h3>{result.Title}</h3>
    </div>
  );
}

export default Result;
