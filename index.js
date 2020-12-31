const Hapi = require('@hapi/hapi');
const Path = require('path');
const cheerio = require('cheerio');
const axios = require('axios').default;
const HapiAxios = require('hapi-axios');


// MongoDB Connection by specifying db name
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/hapi', { useNewUrlParser: true, useUnifiedTopology: true });

// // schema and collection definition 
// const Task = mongoose.model('Tasks', { name: String, createdAt: Date });


// Start Hapi Server

const init = async () => {

  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }

  });

  await server.register({
    plugin: HapiAxios,
    options: {
      instances: [
        {
          name: 'AnimeNews',
          axios: {
            baseURL: 'https://www.cbr.com/',
          },

        },
        {
          name: 'MangaNews',
          axios: {
            baseURL: 'https://bleedingcool.com/',
          },


        },

        {
          name: 'UpcomingAnime',
          axios: {
            baseURL: 'https://myanimelist.net/',
          },


        },

        {
          name: 'TrendingAnime',
          axios: {
            baseURL: 'https://www.ranker.com/',
          },


        },
      ],
    },
  });

  await server.start(); // function will not continue until it returns a promise 
  console.log('Server running on %s', server.info.uri);

  await server.register(require('@hapi/inert'));  // Static file and directory handlers plugin for hapi.js.

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true
      }
    }
  });






  //Routes 

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

      return h.file('index.html');
    }
  });


  // @ Get Latest Anime News 
  // Scrapped From : https://www.cbr.com/

  server.route({
    handler: async (request, h) => {
      const { AnimeNews } = request.server.plugins['hapi-axios']; // adding a axios plugin to make get request
      const { data } = await AnimeNews.get('category/anime-news/');
      const $ = cheerio.load(data);

      var OutputNews;
      let headlines = [];
      // Looping The Scrapped Latest News 
      $('.w-content article').each((i, el) => {
        tit = $(el).find('h3').text().replace(/^\s+|\s+$|\s+(?=\s)/g, "");
        time = $(el).find('.bc-excerpt').text();
        redirect_link = $(el).find('a').attr('href');
        img_path = $(el).find('picture source').attr('data-srcset');
        Author = $(el).find('.bc-details a').text();
        Time = $(el).find('.bc-details time').text();
        // console.log(img_path);
        OutputNews =
        {
          'title': `slNo ${i}:  ` + tit,
          'Description': time,
          'redirect_link': redirect_link,
          'Image_Path': img_path,
          'Author': Author,
          'Time': Time
        }
        headlines.push(OutputNews);
      })

      headlines.length = 10;  // Setting the Limit of The Array to 10 
      JSON.stringify(headlines);
      return headlines;
    },
    method: 'GET',
    path: '/GetLatestAnimeNews',
  });



  // @ Get Latest Manga News 
  // Scrapped From : https://bleedingcool.com/

  server.route({
    handler: async (request, h) => {
      const { MangaNews } = request.server.plugins['hapi-axios']; // adding a axios plugin to make get request
      const { data } = await MangaNews.get('comics/manga/');

      const $ = cheerio.load(data);
      const titles = $('#primary');
      const output = titles.find('h2').text();

      let headlines = [];

      $('#primary article').each((i, el) => {
        tit = $(el).find('h2').text();
        redirect_link = $(el).find('h2 a').attr('href');
        Description = $(el).find('.entry-content').text();
        img_path = $(el).find('.post-thumbnail img').attr('data-opt-src');

        headlines.push(
          {
            'title': `slNo ${i}:  ` + tit,
            'description': Description,
            'redirect_link': redirect_link,
            'img_path': img_path
          }


        );
      })
      headlines.length = 10;
      JSON.stringify(headlines);
      return headlines;
    },
    method: 'GET',
    path: '/GetLatestMangaNews',
  });




  // @ Get Upcoming Anime 
  // Scrapped From : https://myanimelist.net/

  server.route({
    handler: async (request, h) => {
      const { UpcomingAnime } = request.server.plugins['hapi-axios']; // adding a axios plugin to make get request
      const { data } = await UpcomingAnime.get('topanime.php?type=upcoming');

      const $ = cheerio.load(data);
      const titles = $('#primary');
      const output = titles.find('h2').text();

      let headlines = [];

      $('tbody .ranking-list').each((i, el) => {
        tit = $(el).find('h3').text();
        redirect_link = $(el).find('h3 a').attr('href');
        Description = $(el).find('.information').text().replace(/^\s+|\s+$|\s+(?=\s)/g, "");
        img_path = $(el).find('.word-break img').attr('data-src');

        headlines.push(
          {
            'title': `slNo ${i}:  ` + tit,
            'description': Description,
            'redirect_link': redirect_link,
            'img_path': img_path
          }


        );
      })

      headlines.length = 10;
      JSON.stringify(headlines);
      return headlines;
    },
    method: 'GET',
    path: '/GetUpcomingAnime',
  });




  // @ Get Trending Anime 
  // Scrapped From : https://www.ranker.com/

  server.route({
    handler: async (request, h) => {
      const { TrendingAnime } = request.server.plugins['hapi-axios']; // adding a axios plugin to make get request
      const { data } = await TrendingAnime.get('list/most-popular-anime-today/ranker-anime');

      const $ = cheerio.load(data);
      const titles = $('#primary');
      const output = titles.find('h2').text();

      let headlines = [];

      $('.gridItem_main__3gWq0 ').each((i, el) => {
        tit = $(el).find('h2').text();
        redirect_link = $(el).find('.wikiScrape_main__2Ky8I a').attr('href');
        img_path = $(el).find('.Media_main__2rXtI img').attr('src');

        //if Src tag not found , Check for data-src
        if (img_path === undefined) {
          img_path = $(el).find('.Media_main__2rXtI img').attr('data-src');
        }

        headlines.push(
          {
            'title': `slNo ${i}:  ` + tit,
            //  'description': Description,
            'redirect_link': redirect_link,
            'img_path': img_path
          }


        );
      })
      
      
      headlines.length = 10;
      JSON.stringify(headlines);
      return headlines;
    },
    method: 'GET',
    path: '/GetTrendingAnime',
  });




  // server.route({
  //   method: 'POST',
  //   path: '/create',
  //   handler: (request, h) => {
  //     const task = request.payload.task;  // using payload to access body params 
  //     const TaskToEnter = new Task({
  //       name: task,
  //       createdAt: new Date()
  //     })
  //     TaskToEnter.save().then(() => console.log('Task entered'));
  //     return h.file('index.html');
  //   }
  // });



}



// On Failure

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();