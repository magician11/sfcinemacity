# SF Cinemacity

A module to get showtimes for movies from the [SF Cinemacity](sfcinemacity.com) booking system.

## Usage

`yarn add sfcinemacity`

Then you can use it something like

```
const sfcinemacity = require('sfcinemacity');

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
```

## API

All methods take a cinemaId, and returns a promise that resolves with the set of results for the next week from the SF Cinemacity booking system.

Those cinema IDs are:
- Maya Mall in Chiang Mai -> 9936

### getMovieTitlesAndRatings

Takes the cinemaId and returns an array of objects with the properties:

- title (string)
- rating (string)

e.g.
```
{
  "title": "FANTASTIC BEASTS AND WHERE TO FIND THEM",
  "rating": "G"
}
```

### getShowtimes

Takes the cinemaId and returns an array of objects with the properties:

- title (string)
- showTimes
  - date (key)
    - language (key)
      - showtimes (string)

e.g.
```
{
  "title": "ROGUE ONE A STAR WARS STORY",
  "showTimes": {
    "Fri 16 Dec": {
      "E": "13:50, 15:50, 16:40, 19:30, 21:30, 22:20",
      "E-ATMOS": "12:00, 14:50, 17:40, 20:30, 23:20",
      "F": "12:30, 15:20, 18:10, 21:00",
      "T": "14:20, 17:10, 20:00, 22:50"
    },
    "Sat 17 Dec": {
      "E": "11:00, 13:50, 16:40, 19:30, 22:20",
      "E-ATMOS": "12:00, 14:50, 17:40, 20:30, 23:20",
      "F": "12:30, 15:20, 18:10, 21:00",
      "T": "11:30, 14:20, 17:10, 20:00, 22:50"
    },
    "Sun 18 Dec": {
      "E": "11:00, 13:50, 16:40, 19:30, 22:20",
      "E-ATMOS": "12:00, 14:50, 17:40, 20:30, 23:20",
      "F": "12:30, 15:20, 18:10, 21:00",
      "T": "11:30, 14:20, 17:10, 20:00, 22:50"
    },
    "Mon 19 Dec": {
      "E": "13:50, 16:40, 19:30, 22:20",
      "E-ATMOS": "12:00, 14:50, 17:40, 20:30, 23:20",
      "F": "12:30, 15:20, 18:10, 21:00",
      "T": "11:30, 14:20, 17:10, 20:00, 22:50"
    },
    "Tue 20 Dec": {
      "E": "13:50, 16:40, 19:30, 22:20",
      "E-ATMOS": "12:00, 14:50, 17:40, 20:30, 23:20",
      "F": "12:30, 15:20, 18:10, 21:00",
      "T": "11:30, 14:20, 17:10, 20:00, 22:50"
    },
    "Wed 21 Dec": {
      "E": "13:50, 16:40, 19:30, 22:20",
      "E-ATMOS": "12:00, 14:50, 17:40, 20:30, 23:20",
      "F": "12:30, 15:20, 18:10, 21:00",
      "T": "11:30, 14:20, 17:10, 20:00, 22:50"
    }
  }
},
```

## LICENSE
ISC
