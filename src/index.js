const CDP = require('chrome-remote-interface');
const chromeLauncher = require('chrome-launcher');
const cheerio = require('cheerio');

const getShowtimes = (movieTheatreId, dayOffset = 0) => {
  return new Promise(async (resolve, reject) => {
    // First scrape the showtime data using Google Chrome from the SF Cinemacity website
    const launchChrome = () =>
      chromeLauncher.launch({
        chromeFlags: ['--disable-gpu', '--headless', '--no-sandbox']
      });

    const chrome = await launchChrome();
    const protocol = await CDP({ port: chrome.port });

    const timeout = ms =>
      new Promise(resolveTimeout => setTimeout(resolveTimeout, ms));

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

        // first set the language option to English, to convert the content to English
        await Runtime.evaluate({
          expression:
            "document.querySelector('.lang-switcher li:nth-of-type(2) a').click()"
        });

        // click the date we want to get showtimes for
        await Runtime.evaluate({
          expression: `document.querySelector('[data-slick-index="${
            dayOffset
          }"]').click()`
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

        // now process that HTML
        const movieTheatreData = {
          date: $('.slick-slide.selected .date').text(),
          movieTheatreName: $('.showtime-cinema-name').text(),
          movieTheatreId,
          movies: []
        };

        // for each movie showing on this day at this movie theatre..
        $('.showtime-box').each((movieIndex, movieNode) => {
          // collate all the cinemas it's showing at (the showtimes and language per cinema)
          const cinemas = [];
          $(movieNode)
            .find('.showtime-item')
            .each((cinemaIndex, cinemaNode) => {
              cinemas.push({
                language: $(cinemaNode)
                  .find('.right-section .list-item')
                  .first()
                  .text()
                  .split(' ')[1]
                  .slice(0, -1),
                times: $(cinemaNode)
                  .find('.time-list .time-item')
                  .map((index, el) => $(el).text())
                  .get()
                  .join()
              });
            });

          // then finally capture the title, the rating, and the cinema showtimes collated above
          movieTheatreData.movies.push({
            movieTitle: $(movieNode)
              .find('.movie-detail .name')
              .text(),
            rating: $(movieNode)
              .find('.movie-detail .movie-detail-list .list-item')
              .first()
              .text()
              .split('Rate: ')[1],
            cinemas
          });
        });

        resolve(movieTheatreData);
      } catch (err) {
        reject(`Error scraping movie data from SF Cinema City: ${err}`);
      }
    });
  });
};

module.exports = {
  getShowtimes
};
