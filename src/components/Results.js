import React from "react";
import Result from "./Result";

//rfce

//{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
//data:
//Search: Array(10)
//0: {Title: "The Big Lebowski", Year: "1998", imdbID: "tt0118715", Type: "movie", Poster: "https:/

function Results({ resultData }) {
  console.log("resultData ", resultData);
  return (
    <section className="results">
      {resultData.map(result => (
        <Result key={result.imdbID} result={result} />
      ))}
    </section>
  );
}

export default Results;
