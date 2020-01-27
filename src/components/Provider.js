import React from "react";

function Provider({ result }) {
  return (
    <div className="result">
      <img src={result.locations.icon} />
      <a href={result.locations.url}>{result.locations.display_name}</a>
    </div>
  );
}

export default Provider;
