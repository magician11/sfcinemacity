# SF Cinemacity

A module to get showtimes for movies from the
[SF Cinemacity](https://www.sfcinemacity.com/) website.

## Usage

First install [Chrome Canary](https://www.google.com/chrome/browser/canary.html)
on your machine.

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

* Maya Mall in Chiang Mai -> 9936

### getShowtimes

Parameters:

* a movieTheatreId (see the IDs above)
* an optional dayOffset (0 is the default which also means today. 1 would be
  tomorrow)

Returns:

* a promise that resolves with an object with a data structure that looks like
  this:

```
{
  "date": "23 Feb 2018",
  "movieTheatreName": "SFX CINEMA MAYA Chiangmai",
  "movieTheatreId": 9936,
  "movies": [
    {
      "movieTitle": "Call Me by Your Name",
      "rating": "15",
      "cinemas": [
        {
          "language": "ENG",
          "times": "19:00"
        }
      ]
    },
    {
      "movieTitle": "Black Panther",
      "rating": "13",
      "cinemas": [
        {
          "language": "ENG",
          "times": "12:00,15:00,18:00,21:00"
        },
        {
          "language": "ENG",
          "times": "11:20,14:20,17:20,20:20,23:20"
        },
        {
          "language": "ENG",
          "times": "12:50,15:50,18:50,21:50"
        },
        {
          "language": "TH",
          "times": "13:30,16:30,19:30,22:30"
        }
      ]
    },
    {
      "movieTitle": "The Long Excuse",
      "rating": "18",
      "cinemas": [
        {
          "language": "JP",
          "times": "19:00"
        }
      ]
    }
  ]
}
```

## Support

To get support, just
[create a new issue](https://github.com/magician11/sfcinemacity/issues/new).

## LICENSE

ISC
