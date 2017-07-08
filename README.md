# SF Cinemacity

A module to get showtimes for movies from the [SF Cinemacity](sfcinemacity.com) website.

## Usage

First install [Chrome Canary](https://www.google.com/chrome/browser/canary.html) on your machine.

Then install this module: `yarn add sfcinemacity`

Then you can use it in your code, something like

```
const { getShowtimes } = require('sfcinemacity');

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
```

## API

Cinema IDs are:
- Maya Mall in Chiang Mai -> 9936

### getShowtimes

Takes a cinemaId and returns a promise that resolves with an object with the following data structure:

- cinema title (string)
- today's date (string)
- movies showing (array of movies showing)
  - title (string)
  - rating (string)
  - duration (string)
      - cinemas at this theatre showing this movie (array of cinemas)
        - cinema number (string)
        - language of this showing (string)
        - times it's showing (comma separated value of times as a string)
e.g.
```
{
  "cinema": "SFX CINEMA Maya Chiangmai",
  "today": "09 Jul 2017",
  "movies": [
    {
      "title": "Spider-Man: Homecoming",
      "rating": "G",
      "duration": "135 mins",
      "cinemas": [
        {
          "number": "10",
          "language": "ENG",
          "times": "13:10,16:10,19:10,22:10"
        },
        {
          "number": "2",
          "language": "ENG",
          "times": "11:20,14:20,17:20,20:20,23:20"
        },
```

## Support
To get support, just [create a new issue](https://github.com/magician11/sfcinemacity/issues/new).

## LICENSE
ISC
