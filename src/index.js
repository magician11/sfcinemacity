const puppeteer = require('puppeteer');

const getShowtimes = async (movieTheatreId, dayOffset = 0) => {
  const browser = await puppeteer.launch({ slowMo: 110 });
  const page = await browser.newPage();
  try {
    /* Go to the IMDB Movie page and wait for it to load */
    await page.goto(
      `https://www.sfcinemacity.com/showtime/cinema/${movieTheatreId}`,
      { waitUntil: 'networkidle0' } // wait until all content is loaded, especially the JS
    );
    // choose English
    await page.click('.lang-switcher li:nth-of-type(2) a');
    const dataSelector = `[data-slick-index="${dayOffset}"]`;
    await page.waitFor(dataSelector);
    // choose the day we want to extract
    await page.click(dataSelector);

    const movieTheatreData = await page.evaluate(() => {
      const movies = [];
      document.querySelectorAll('.showtime-box').forEach(movieElement => {
        const cinemas = [];
        movieElement
          .querySelectorAll('.showtime-item')
          .forEach(showtimeElement => {
            cinemas.push({
              language: showtimeElement
                .querySelector('.right-section .list-item')
                .innerText.trim(),
              times: showtimeElement
                .querySelector('.time-list')
                .innerText.replace(/\n/g, ',')
            });
          });
        movies.push({
          movieTitle: movieElement.querySelector('.movie-detail .name')
            .innerText,
          rating: movieElement
            .querySelector('.movie-detail .movie-detail-list .list-item')
            .innerText.substring(6),
          cinemas
        });
      });

      return {
        date: document.querySelector('.slick-slide .selected .date').innerText,
        movieTheatreName: document.querySelector('.showtime-cinema-name')
          .innerText,
        movies
      };
    });

    movieTheatreData.movieTheatreId = movieTheatreId;

    await browser.close();

    return movieTheatreData;
  } catch (err) {
    await browser.close();
    throw `Error scraping movie data from SF Cinema City: ${err}`;
  }
};

module.exports = {
  getShowtimes
};
