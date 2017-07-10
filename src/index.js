const CDP = require('chrome-remote-interface');
const chromeLauncher = require('chrome-launcher');
const cheerio = require('cheerio');

const getShowtimes = (movieTheatreId, dayOffset = 0) => {
  return new Promise(async (resolve, reject) => {
    // First scrape the showtime data using Google Chrome from the SF Cinemacity website
    const launchChrome = () =>
      chromeLauncher.launch({ chromeFlags: ['--disable-gpu', '--headless'] });

    const chrome = await launchChrome();
    const protocol = await CDP({ port: chrome.port });

    const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

    // See API docs: https://chromedevtools.github.io/devtools-protocol/
    const { Page, Runtime, DOM } = protocol;
    await Promise.all([Page.enable(), Runtime.enable(), DOM.enable()]);

    Page.navigate({
      url: `https://www.sfcinemacity.com/showtime/cinema/${movieTheatreId}`
    });

    // wait until the page says it's loaded...
    Page.loadEventFired(async () => {
      try {
        await timeout(3000); // give the JS some time to load

        // first set the language to English
        await Runtime.evaluate({
          expression:
            "document.querySelector('.lang-switcher li:nth-of-type(2) a').click()"
        });

        // click the date we want to get showtimes for
        await Runtime.evaluate({
          expression: `document.querySelector('[data-slick-index="${dayOffset}"]').click()`
        });

        // get the page source
        const rootNode = await DOM.getDocument({ depth: -1 });
        const pageSource = await DOM.getOuterHTML({
          nodeId: rootNode.root.nodeId
        });
        protocol.close();
        chrome.kill();

        // load the page source into cheerio
        const $ = cheerio.load(pageSource.outerHTML);

        // now proess that HTML
        const movieTheatreData = {
          movies: {}
        };
        $('.showtime-box').each((i, movieNode) => {
          // Set the title of this cinema, today's date, and the object of movies.
          movieTheatreData.movieTheatreName = $('.showtime-cinema-name').text();
          movieTheatreData.date = $('.slick-slide.selected .date').text();

          /*
            Build up the leaf nodes of the tree, namely for a cinema for a movie,
            what language is it showing in and what are the showtimes.
          */
          const cinemas = {};
          $(movieNode).find('.showtime-item').each((i, cinemaNode) => {
            cinemas[$(cinemaNode).find('.theater-no').text()] = {
              language: $(cinemaNode)
                .find('.right-section .list-item')
                .first()
                .text()
                .split(' ')[1]
                .slice(0, -1),
              times: $(cinemaNode)
                .find('.time-list .time-item')
                .map((i, el) => $(el).text())
                .get()
                .join()
            };
          });

          /*
            Then create the full movie object with the movie name as the key, and with the properties
            of the rating, the duration, and the cinemas showing the movie at this theatre.
          */
          movieTheatreData.movies[
            $(movieNode).find('.movie-detail .name').text()
          ] = {
            rating: $(movieNode)
              .find('.movie-detail .movie-detail-list .list-item')
              .first()
              .text()
              .split('Rate: ')[1],
            cinemas
          };
        });

        resolve(movieTheatreData);
      } catch (err) {
        console.log(err);
      }
    });
  });
};

module.exports = {
  getShowtimes
};
