/*
Demo on how to use this module.
Pass in the ID of a movie theatre and an optional day offset to get those showtimes.
*/

const { getShowtimes } = require('../src/index');

const getMayaMallShowtimes = async () => {
  try {
    const mayaMallId = 9936;
    // fetch all the showtimes for tomorrow
    const movieShowtimes = await getShowtimes(mayaMallId, 1);
    if (movieShowtimes === null) {
      console.log('No showtimes were found for this day.');
    } else {
      console.log(JSON.stringify(movieShowtimes, null, 2));
    }
  } catch (error) {
    console.log(`Whoops, something went wrong: ${error}`);
  }
};

console.log('Fetching showtimes for Maya Mall (Chiang Mai, Thailand).');
getMayaMallShowtimes();
