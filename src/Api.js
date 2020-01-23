import axios from "axios";

//https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/

// {Search: Array(10), totalResults: "3815", Response: "True"}
// Search: Array(10)
// 0: {Title: "The Big Lebowski",

const apiUrl = "http://www.omdbapi.com/?apikey=9189dcef";


export async function getApiSearch(event, search) {
         return await apiSearch(event, search);
       }


export function ApiSearchFetch(event, search) {
  if (event.key === "Enter") {
    const searchUrl = apiUrl + "&s=" + search;

    return fetch(searchUrl)
      .then(res => res.json()).then(res => res.Search)
  }
}
//need async to get .then on app.js
export async  function apiSearch(event, search) {
  if (event.key === "Enter") {
    let searchUrl = apiUrl + "&s=" + search;
  
    //if no method is provided, GET will be used as the default value.
   await axios(searchUrl).then(({ data }) => {
   //   console.log("ApiResult raw data", data);
      //don't forget {data} to deconstruct down to the data layer else use data.data
      const result = data.Search;
console.log("Api Result search ", result);
      return result; //this is what the json tree is returning data/data/Search/all the results

      //   console.log("Search data", result);
      //     return result;
    });
  }
}
