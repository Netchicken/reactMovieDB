import React from "react";
import Provider from './Provider'

function Popup({ selected, closePopup, movieProviders  }) {
 // console.log("Popup title", selected.Title);
  console.log("providers", movieProviders);

  return (
    <section className="popup">
      <div className="content">
        <h2>
          {selected.Title} <span>({selected.Year})</span>
        </h2>
        <p className="rating">Rating: {selected.imdbRating}</p>
        <div className="plot">
          <img src={selected.Poster} />
          <p>{selected.Plot}</p>
          
          {typeof movieProviders != "undefined" ? ( //data not passing through
            movieProviders.map(result => <Provider key={result.id} result={result} />)
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
