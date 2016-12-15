/* eslint-disable no-console */

const sfcinemacity = require('../lib/index');

const mayaMallId = 9936;

console.log(`Movie data for Maya Mall (Chiang Mai, Thailand) as of ${new Date().toString()}`);

const prettyPrint = jsonObj => console.log(JSON.stringify(jsonObj, null, 2));

sfcinemacity.getMovieTitlesAndRatings(mayaMallId)
.then((movieTitles) => {
  console.log('*Movie Titles*');
  prettyPrint(movieTitles);
  return sfcinemacity.getShowtimes(mayaMallId);
})
.then((movieShowtimes) => {
  console.log('*Movie Showtimes*');
  prettyPrint(movieShowtimes, null, 2);
})
.catch((error) => {
  console.log(`Whoops, something went wrong: ${error}`);
});
