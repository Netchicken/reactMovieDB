//rfce   = create a react functional component https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets
import React from "react";

//instead of going search(props) and then getting out the props.handleInput, we can DESTRUCTURE the props (pull them apart) and instead just get out the one we want. We do this by just adding {} in the search

//onKeyPress={search} is only looking for the enter key press int eh search function


function search({ handleInput, search }) {
  return (
    <section className="searchbox-wrap">
      <input
        type="text"
        placeholder="Search for a movie ... "
        className="searchbox"
              onChange={handleInput}
              onKeyPress={search}
      />
    </section>
  );
}

export default search;
