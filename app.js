let form = document.querySelector("form");
let button = document.querySelector(".button");
let container = document.querySelector('.container');
form.addEventListener("submit", (e) => {
  e.preventDefault();
  moviess();
});

// waiting for axios to request data
axios.interceptors.request.use(function(config) {
  // Do something before request is sent
  alert('Start Ajax Call');
  return config;
}, function(error) {
  // Do something with request error
  console.log('Error');
  return Promise.reject(error);
});

// When axios ajax get the data and done with the call
axios.interceptors.response.use(function(response) {
  // Do something with response data
  alert('Done with Ajax call');
  return response;
}, function(error) {
  // Do something with response error
  console.log('Error fetching the data');
  return Promise.reject(error);
});

// using axios
let moviess = async () => {
  try {
    // instead of taking searched Query in template literal, we can do below thing as well
    let searchedQuery = form.elements.query.value;
    let config = {params: {q: searchedQuery}};
    let moviesData = await axios.get(`https://api.tvmaze.com/singlesearch/shows`, config);
    console.log(moviesData)
    let img = document.createElement("img");
    let heading = document.createElement("h2");
    let section = document.createElement("div");
    section.classList.add('container__data');
    img.src = moviesData.data.image.medium;
    heading.innerText = moviesData.data.name;
    section.append(img);
    section.append(heading);
    container.append(section);
  } catch (e) {
    alert("Oop,s we can't find this show", e);
  }
};

// using fetch
// let movies = async () => {
//   try{
//     let searchedQuery = form.elements.query.value;
//     let url = `https://api.tvmaze.com/singlesearch/shows?q=${searchedQuery}`;
//     let fetchedURL = await fetch(url);
//     let response = await fetchedURL.json();
//     let img = document.createElement("img");
//     img.src = response.image.medium;
//     document.body.append(img);
//   } catch(e){
//     alert("Oops we can't find this show",e)
//   }
// };
