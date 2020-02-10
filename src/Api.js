import axios from "axios";

//https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/

// {Search: Array(10), totalResults: "3815", Response: "True"}
// Search: Array(10)
// 0: {Title: "The Big Lebowski",

const apiUrl = "https://www.omdbapi.com/?apikey=9189dcef";

export async function getApiSearch(event, search) {
  return await apiSearch(event, search);
}

export function ApiSearchFetch(event, search) {
  if (event.key === "Enter") {
    const searchUrl = apiUrl + "&s=" + search;

    return fetch(searchUrl)
      .then(res => res.json())
      .then(res => res.Search);
  }
}
//need async to get .then on app.js
export const apiSearch =  search => {
// if (event.key === "Enter") {
    let searchUrl = apiUrl + "&s=" + search;

    return new Promise((resolve, reject) => {

      //if no method is provided, GET will be used as the default value.
      axios.get(searchUrl).then(({ data }) => {
        //   console.log("ApiResult raw data", data);
        //don't forget {data} to deconstruct down to the data layer else use data.data
        const result = data.Search;
        console.log("Api Result search ", result);
        resolve(result);
        return;
        //return result; //this is what the json tree is returning data/data/Search/all the results

        //   console.log("Search data", result);
        //     return result;
      }).catch(err => {
        reject(err.message);
        return;
      });
    })
 // }
}

export async function Utelly(name) {
  //https://rapidapi.com/utelly/api/utelly/endpoints
  const options = {
    headers: {
      "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
      "x-rapidapi-key": "8a2f94d881msh0cee2e1de8e452ep14186ajsnc0a39f09d0de"
    }
  };
  await axios
    .get("https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + name + "&country=uk", options)
    .then(data => {
      var result = data.data.results[0].locations;
      console.log("Utelly result API", result);
      return result;
      //console.log("Api Utelly ", result);

      // providerForPopup = result;
      // setState(prevState => {
      //   return { ...prevState, provider: result };
      // });
    })
    .catch(err => {
      console.log(err);
    });
}


//https://github.com/drminnaar/noteworx-react-mongodb/blob/master/Client/services/note-service.js
export const UtellyNEW = name  => {
  const options = {
    headers: {
      "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
      "x-rapidapi-key": "8a2f94d881msh0cee2e1de8e452ep14186ajsnc0a39f09d0de"
    }
  };
  return new Promise((resolve, reject) => {
    axios
      .get("https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + name + "&country=uk", options)
      .then(data => {
        var result = data.data.results[0].locations;
        resolve(result);
        return;
      })
      .catch(error => {
        reject(error.message);
        return;
      });
  });

};

// { data: { … }, status: 200, statusText: "OK", headers: { … }, config: { … }, … }
// data:
// results: Array(1)
// 0:
// id: "5d97daa59a76a40056de5ad7"
// picture: "https://utellyassets9-1.imgix.net/api/Images/94b2e179ba793b2aa5a3eee71fde46aa/Redirect"
// name: "The Big Lebowski"
// locations: (6)[{ … }, { … }, { … }, { … }, { … }, { … }]
