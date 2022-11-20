const axios = require("axios");
const HTTPSUBSCRIPTIONSERVER = "http://localhost:8000/api";

const getSubscribers = function () {
  console.log(`${HTTPSUBSCRIPTIONSERVER}/subscribers/`);
  return axios.get(`${HTTPSUBSCRIPTIONSERVER}/subscribers/`);
};

const getSubscriptions = function () {
  console.log(`${HTTPSUBSCRIPTIONSERVER}/subscriptions/`);
  return axios.get(`${HTTPSUBSCRIPTIONSERVER}/subscriptions/`);
};

const addSubscriber = function (sub) {
    console.log(`${HTTPSUBSCRIPTIONSERVER}/subscribers/add`);
    console.log(sub);
    return axios.post(`${HTTPSUBSCRIPTIONSERVER}/subscribers/add`, sub);
  };

  const deleteSubscriber = function (subId) {
    console.log(`${HTTPSUBSCRIPTIONSERVER}/subscribers/delete/all`);
    console.log("delete subscriber", subId);
    return axios.delete(`${HTTPSUBSCRIPTIONSERVER}/subscribers/delete/all/${subId}`);
  };
  
  const updateSubscriber = function (movie) {
    console.log(`${HTTPSUBSCRIPTIONSERVER}/subscribers/update`);
    console.log(movie);
    return axios.put(`${HTTPSUBSCRIPTIONSERVER}/subscribers/update`, movie);
  };
  

const getMovies = function () {
  console.log(`${HTTPSUBSCRIPTIONSERVER}/movies/`);
  return axios.get(`${HTTPSUBSCRIPTIONSERVER}/movies/`);
};

const addMovie = function (movie) {
  console.log(`${HTTPSUBSCRIPTIONSERVER}/movies/add`);
  console.log(movie);
  return axios.post(`${HTTPSUBSCRIPTIONSERVER}/movies/add`, movie);
};

const addSubscription = function (id,subscription) {
  console.log(`${HTTPSUBSCRIPTIONSERVER}/subscriptions/add/${id}`);
  console.log(subscription);
  return axios.post(`${HTTPSUBSCRIPTIONSERVER}/subscriptions/add/${id}`, subscription);
};

const deleteMovie = function (movieId) {
  console.log(`${HTTPSUBSCRIPTIONSERVER}/movies/delete`);
  console.log("delete movie", movieId);
  return axios.delete(`${HTTPSUBSCRIPTIONSERVER}/movies/delete/${movieId}`);
};

const updateMovie = function (movie) {
  console.log(`${HTTPSUBSCRIPTIONSERVER}/movies/update`);
  console.log(movie);
  return axios.put(`${HTTPSUBSCRIPTIONSERVER}/movies/update`, movie);
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
  updateMovie,
  getSubscribers,
  addSubscriber,
  deleteSubscriber,
  updateSubscriber,
  getSubscriptions,
  addSubscription
};
