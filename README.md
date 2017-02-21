# SF Cinemacity

A module to get showtimes for movies from the [SF Cinemacity](sfcinemacity.com) booking system.

## Usage

`yarn add sfcinemacity`

Then you can use it something like

```
const sfcinemacity = require('sfcinemacity');

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
```

## API

Cinema IDs are:
- Maya Mall in Chiang Mai -> 9936

### getShowtimes

Takes a cinemaId and returns a promise that resolves with an array of objects with the properties:

- title (string)
- rating (string)
- showTimes
  - date (key)
    - language (key)
      - showtimes (string)

e.g.
```
{
   "title": "JOHN WICK : CHAPTER 2",
   "rating": "18",
   "showTimes": {
     "Tue 21 Feb": {
       "E": "22:30, 23:20"
     },
     "Wed 22 Feb": {
       "E": "12:20, 15:05, 17:50, 20:00, 20:35, 22:30, 23:20",
       "F": "13:00, 15:45, 18:30, 21:15",
       "T": "11:25, 13:45, 16:30, 19:15, 22:00"
     }
   }
 },
```

## LICENSE
ISC
