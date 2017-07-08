const CDP = require('chrome-remote-interface');
const chromeLauncher = require('chrome-launcher');
const cheerio = require('cheerio');

const getShowtimes = cinemaId => {
  return new Promise(async (resolve, reject) => {
    const launchChrome = () =>
      chromeLauncher.launch({ chromeFlags: ['--disable-gpu', '--headless'] });

    const chrome = await launchChrome();
    const protocol = await CDP({ port: chrome.port });

    const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

    // See API docs: https://chromedevtools.github.io/devtools-protocol/
    const { Page, Runtime, DOM } = protocol;
    await Promise.all([Page.enable(), Runtime.enable(), DOM.enable()]);

    Page.navigate({
      url: `https://www.sfcinemacity.com/showtime/cinema/${cinemaId}`
    });

    // wait until the page says it's loaded...
    Page.loadEventFired(async () => {
      try {
        await timeout(3000); // give the JS some time to load

        // first set the language to English
        const result = await Runtime.evaluate({
          expression:
            "document.querySelector('.lang-switcher li:nth-of-type(2) a').click()"
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

        // perform queries
        const movies = [];
        $('.showtime-box').each((i, movieNode) => {
          const movie = {
            title: $(movieNode).find('.movie-detail .name').text(),
            rating: $(movieNode)
              .find('.movie-detail .movie-detail-list .list-item')
              .first()
              .text()
              .split('Rate: ')[1],
            duration: $(movieNode)
              .find('.movie-detail .movie-detail-list .list-item')
              .last()
              .text()
              .split(' ')[1]
          };

          const cinemas = [];
          $(movieNode).find('.showtime-item').each((i, cinemaNode) => {
            cinemas.push({
              number: $(cinemaNode).find('.theater-no').text(),
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
            });
          });

          movies.push({
            title: $(movieNode).find('.movie-detail .name').text(),
            rating: $(movieNode)
              .find('.movie-detail .movie-detail-list .list-item')
              .first()
              .text()
              .split('Rate: ')[1],
            duration: `${$(movieNode)
              .find('.movie-detail .movie-detail-list .list-item')
              .last()
              .text()
              .split(' ')[1]} mins`,
            cinemas
          });
        });
        resolve({
          cinema: $('.showtime-cinema-name').text(),
          today: $('.slick-slide.selected .date').text(),
          movies
        });
      } catch (err) {
        console.log(err);
      }
    });
  });
};

module.exports = {
  getShowtimes
};
