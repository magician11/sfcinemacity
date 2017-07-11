# SF Cinemacity

A module to get showtimes for movies from the [SF Cinemacity](https://www.sfcinemacity.com/) website.

## Usage

First install [Chrome Canary](https://www.google.com/chrome/browser/canary.html) on your machine.

Then install this module: `yarn add sfcinemacity`

Then you can use it in your code, something like

```
const { getShowtimes } = require('sfcinemacity');

const getMayaMallShowtimes = async () => {
  try {
    const mayaMallId = 9936;
    // fetch all the showtimes for Maya Mall for tomorrow
    const movieShowtimes = await getShowtimes(mayaMallId, 1);
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

Parameters:
- a movieTheatreId (see the IDs above)
- an optional dayOffset (0 is the default which also means today. 1 would be tomorrow)

Returns:
- a promise that resolves with an object with a data structure that looks like this:

```
{
  "movieTimes": {
    "Spider-Man: Homecoming": {
      "rating": "G",
      "cinemas": [
        {
          "cinemaNumber": "10",
          "language": "ENG",
          "times": "13:10,16:10,19:10,22:10"
        },
        {
          "cinemaNumber": "2",
          "language": "ENG",
          "times": "11:20,14:20,17:20,20:20,23:20"
        },
        {
          "cinemaNumber": "1",
          "language": "ENG",
          "times": "13:35,16:35,19:35,22:35"
        },
        {
          "cinemaNumber": "4",
          "language": "TH",
          "times": "12:30,15:30,18:30,21:30"
        },
        {
          "cinemaNumber": "5",
          "language": "TH",
          "times": "11:10,14:00,17:00,20:00,23:00"
        },
        {
          "cinemaNumber": "6",
          "language": "ENG",
          "times": "12:50,15:50,18:50,21:50"
        },
        {
          "cinemaNumber": "8",
          "language": "ENG",
          "times": "13:20,16:20,19:20,22:20"
        },
        {
          "cinemaNumber": "9",
          "language": "ENG",
          "times": "12:05,15:05,18:05,21:05"
        }
      ]
    },
    "Transformers : The Last Knight": {
      "rating": "G",
      "cinemas": [
        {
          "cinemaNumber": "7",
          "language": "TH",
          "times": "11:20,17:10,23:10"
        },
        {
          "cinemaNumber": "7",
          "language": "ENG",
          "times": "14:10,20:10"
        }
      ]
    },
    "Despicable Me 3": {
      "rating": "13",
      "cinemas": [
        {
          "cinemaNumber": "3",
          "language": "TH",
          "times": "11:40,19:00"
        },
        {
          "cinemaNumber": "3",
          "language": "ENG",
          "times": "13:50,21:10"
        }
      ]
    },
    "Wonder Woman": {
      "rating": "G",
      "cinemas": [
        {
          "cinemaNumber": "3",
          "language": "ENG",
          "times": "16:00,23:10"
        }
      ]
    }
  },
  "movieTheatreName": "SFX CINEMA Maya Chiangmai",
  "date": "12 Jul 2017"
}
```

## Support
To get support, just [create a new issue](https://github.com/magician11/sfcinemacity/issues/new).

## LICENSE
ISC
