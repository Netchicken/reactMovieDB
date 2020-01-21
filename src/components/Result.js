//rcfe

// Title: "The Big Lebowski"
// Year: "1998"
// imdbID: "tt0118715"
// Type: "movie"
// Poster: "https://m.media

import React from "react";

function Result({ result }) {
  // console.log("result title ", result.Title);
  // console.log("result Poster ", result.Poster);
  return (

    <div className="result">
      <img src={result.Poster} />
      <h3>{result.Title}</h3>
    </div>
  );
}

export default Result;
