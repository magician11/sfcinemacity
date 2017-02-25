const cheerio = require('cheerio');
const rp = require('request-promise-native');

const baseUrl = 'https://booking.sfcinemacity.com/visPrintShowTimes.aspx?visLang=1&visCinemaId=';

class SFCinemaCity {

  /*
  Takes a cinema ID and returns an array of objects.

  Each object looks like:

  "title": "FANTASTIC BEASTS AND WHERE TO FIND THEM",
  "showTimes" -> "Fri 16 Dec" -> "E" -> "13:00, 18:40",
  "rating" -> "18"
  */
  static getShowtimes(cinemaId) {
    return new Promise((resolve, reject) => {
      const options = {
        uri: `${baseUrl}${cinemaId}`,
        transform: body => cheerio.load(body),
      };

      rp(options)
      /*
      First extract the movie data from the booking.sfcinemacity.com site
      and return an object that has
      title -> date -> times

      e.g.

      'FANTASTIC BEASTS AND WHERE TO FIND THEM (E/ATMOS) [G]':
      { 'Sun 27 Nov': '17:40, 20:30, 23:20',
      'Mon 28 Nov': '12:00, 14:50, 17:40, 20:30, 23:20',
      'Tue 29 Nov': '12:00, 14:50, 17:40, 20:30, 23:20',
      'Wed 30 Nov': '12:00, 14:50, 17:40, 20:30, 23:20' },
      */
      .then(($) => {
        const movieData = {};
        let currentMovie;
        let currentDate;
        $('#tblShowTimes td').each(function process() {
          if ($(this).hasClass('PrintShowTimesFilm')) {
            currentMovie = $(this).text();
            movieData[currentMovie] = {};
          } else if ($(this).hasClass('PrintShowTimesDay')) {
            currentDate = $(this).text();
          } else if ($(this).hasClass('PrintShowTimesSession')) {
            movieData[currentMovie][currentDate] = $(this).text();
          }
        });

        return movieData;
      })
      /*
      Next coalesce the same movies with different languages and sound systems.
      So we have
      movieTitle -> showTimes -> date -> movietype -> times
      */
      .then((movieData) => {
        // replace special characters with hyphens
        const normaliseKey = key => key.replace(/\/|\./g, '-');

        const coalescedMovieData = {};
        // go through every moving listing
        Object.keys(movieData).forEach((movieName) => {
          /*
          if it starts with JF, then grab the title and rating, and assume Japanese language
          otherwise assume format: title (language) [rating]
          */
          let titleOnBookingSite;
          let movieTitle;
          let language;

          if (movieName.startsWith('JF')) {
            titleOnBookingSite = movieName.match(/(JF )(.+) \[(.+)]/);
            movieTitle = titleOnBookingSite[2];
            language = 'J';
          } else {
            titleOnBookingSite = movieName.match(/(.+) \((.+)\) \[(.+)]/);

            // To catch when the language is not specified e.g. LOGAN [15]
            if (titleOnBookingSite) {
              movieTitle = titleOnBookingSite[1];
              language = normaliseKey(titleOnBookingSite[2]);
            } else {
              titleOnBookingSite = movieName.match(/(.+) \[(.+)]/);
              movieTitle = titleOnBookingSite[1];
              language = 'E';
            }
          }

          if (!coalescedMovieData[movieTitle]) {
            coalescedMovieData[movieTitle] = {};
            coalescedMovieData[movieTitle].title = movieTitle;
            coalescedMovieData[movieTitle].rating = titleOnBookingSite[3];
            coalescedMovieData[movieTitle].showTimes = {};
          }

          // then for that movie listing, go through all the dates it's showing
          Object.keys(movieData[movieName]).forEach((movieDate) => {
            if (!coalescedMovieData[movieTitle].showTimes[movieDate]) {
              coalescedMovieData[movieTitle].showTimes[movieDate] = {};
            }

            // eslint-disable-next-line max-len
            coalescedMovieData[movieTitle].showTimes[movieDate][language] = movieData[movieName][movieDate];
          });
        });

        resolve(Object.values(coalescedMovieData));
      })
      .catch((error) => {
        reject(`SF Cinema City - trouble getting showtimes: ${error}`);
      });
    });
  }
}

module.exports = SFCinemaCity;
