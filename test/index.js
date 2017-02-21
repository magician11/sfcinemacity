/* eslint-disable no-console */

const sfcinemacity = require('../lib/index');

const mayaMallId = 9936;

console.log(`Movie data for Maya Mall (Chiang Mai, Thailand) as of ${new Date().toString()}`);

sfcinemacity.getShowtimes(mayaMallId)
.then((movieShowtimes) => {
  console.log('*Movie Showtimes*');
  console.log(JSON.stringify(movieShowtimes, null, 2));
})
.catch((error) => {
  console.log(`Whoops, something went wrong: ${error}`);
});
