# SF Cinemacity

A module to get showtimes for movies from the
[SF Cinemacity](https://www.sfcinemacity.com/) website.

## Usage

Then install this module: `npm install sfcinemacity`

Then you can use it in your code, something like

```
const { getShowtimes } = require('sfcinemacity');

const getMayaMallShowtimes = async () => {
  try {
    const mayaMallId = 9936;
    // fetch all the showtimes for Maya Mall for tomorrow
    const movieShowtimes = await getShowtimes(mayaMallId, 3);
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
- an optional dayOffset (0 is the default which also means today. 1 would be
  tomorrow)

Returns:

- a promise that resolves with an object with a data structure that looks like
  this:

```
Fetching showtimes for Maya Mall (Chiang Mai, Thailand)
{
  "date": "27 Oct 2019",
  "movieTheatreName": "SFX CINEMA MAYA Chiangmai",
  "movies": [
    {
      "movieTitle": "Terminator Dark Fate",
      "rating": "15",
      "cinemas": [
        {
          "language": "ENG",
          "times": "12:40,15:20,18:00,20:40,23:20"
        }
      ]
    },
    {
      "movieTitle": "Bikeman 2",
      "rating": "13",
      "cinemas": [
        {
          "language": "TH",
          "times": "11:30,14:00,16:30,19:00,21:30"
        }
      ]
    },
    {
      "movieTitle": "Maleficent : Mistress Of Evil",
      "rating": "G",
      "cinemas": [
        {
          "language": "ENG",
          "times": "13:00,15:40,18:20,21:00,23:35"
        }
      ]
    }
  ],
  "movieTheatreId": 9936
}
```

## Support

To get support, just
[create a new issue](https://github.com/magician11/sfcinemacity/issues/new).

## LICENSE

ISC
