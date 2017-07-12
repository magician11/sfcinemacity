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
  "date": "13 Jul 2017",
  "movieTheatreName": "SFX CINEMA Maya Chiangmai",
  "movieTimes": {
    "47 Meters Down": {
      "rating": "13",
      "cinemas": [
        {
          "cinemaNumber": "7",
          "language": "ENG",
          "times": "12:10,16:30,20:50,23:00"
        },
        {
          "cinemaNumber": "7",
          "language": "TH",
          "times": "14:20,18:40"
        }
      ]
    },
    "Kill Switch": {
      "rating": "13",
      "cinemas": [
        {
          "cinemaNumber": "3",
          "language": "ENG",
          "times": "16:50,21:10"
        }
      ]
    },
    "Wish Upon": {
      "rating": "15",
      "cinemas": [
        {
          "cinemaNumber": "3",
          "language": "ENG",
          "times": "12:30,14:40,19:00,23:20"
        }
      ]
    },
    "War for the Planet of the Apes": {
      "rating": "G",
      "cinemas": [
        {
          "cinemaNumber": "10",
          "language": "ENG",
          "times": "12:00,15:00,18:00,21:00"
        },
        {
          "cinemaNumber": "4",
          "language": "TH",
          "times": "13:30,16:30,19:30,22:30"
        },
        {
          "cinemaNumber": "5",
          "language": "ENG",
          "times": "11:30,14:15,17:15,20:15,23:15"
        },
        {
          "cinemaNumber": "6",
          "language": "ENG",
          "times": "12:45,15:45,18:45,21:45"
        }
      ]
    },
    "Spider-Man: Homecoming": {
      "rating": "G",
      "cinemas": [
        {
          "cinemaNumber": "2",
          "language": "ENG",
          "times": "11:50,14:45,17:40,20:35,23:25"
        },
        {
          "cinemaNumber": "1",
          "language": "ENG",
          "times": "13:20,16:15,19:10,22:05"
        },
        {
          "cinemaNumber": "8",
          "language": "TH",
          "times": "12:40,15:35,18:30,21:25"
        },
        {
          "cinemaNumber": "9",
          "language": "TH",
          "times": "11:25,14:05,17:00,19:55,22:50"
        }
      ]
    }
  }
}
```

## Support
To get support, just [create a new issue](https://github.com/magician11/sfcinemacity/issues/new).

## LICENSE
ISC
