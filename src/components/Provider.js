import React from "react";

function Provider({ result }) {
  return (
    <div className='provider'>
      <img src={result.icon} />
      <a href={result.url}>{result.display_name}</a>
    </div>
  );
}

export default Provider;
