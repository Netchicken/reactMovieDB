import React from "react";
import Provider from './Provider'

function Popup({ searchForPopup, closePopup, provider  }) {
 // console.log("Popup title", searchForPopup.Title);
  console.log("providers", provider);

  return (
    <section className="popup">
      <div className="content">
        <h2>
          {searchForPopup.Title} <span>({searchForPopup.Year})</span>
        </h2>
        <p className="rating">Rating: {searchForPopup.imdbRating}</p>
        <div className="plot">
          <img src={searchForPopup.Poster} />
          <p>{searchForPopup.Plot}</p>
          {typeof provider != "undefined" ? ( //data not passing through
            provider.map(result => <Provider key={result.id} result={result} />)
          ) : (
            <p>No data</p>
          )}
        </div>
        <button className="close" onClick={closePopup}>
          Close
        </button>
      </div>
    </section>
  );
}

export default Popup;
