/*
Demo on how to use this module.
Pass in the ID for a cinema and it'll return the showtimes for today for that cinema.
*/

const { getShowtimes } = require('../src/index');

const getMayaMallShowtimes = async () => {
  try {
    const mayaMallId = 9936;
    const movieShowtimes = await getShowtimes(mayaMallId);
    console.log(JSON.stringify(movieShowtimes, null, 2));
  } catch (error) {
    console.log(`Whoops, something went wrong: ${error}`);
  }
};

console.log('Showtimes today for Maya Mall (Chiang Mai, Thailand).');
getMayaMallShowtimes();
