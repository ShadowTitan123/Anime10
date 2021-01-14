HomepageNews = () => {
  const NewsBlock = document.getElementById("NewsAppend");
  let Appender = "";
  axios
    .get("/GetLatestAnimeNews")
    .then((res) => {
      console.log(res.data);
      const Headlines = res.data;

      Headlines.forEach((news) => {
        Appender += ` <div class="col-12 news-card">
                <a href="${news.redirect_link.trim()}" >
                  <div class="row">
                    <div class="col-12 col-md-9 col-lg-9 col-sm-9">
                      <div class="news-card-title">
                        <div class="d-flex flex-row justify-content-start">
                          <h5>${news.SlNo}.</h5>
                          <img src="${news.Image_Path}" alt="" />
                          <h4> ${news.title}</h4>
                        </div>
                        <div class="news-desc">
                          <h6 class="mt-3 mb-4">
                           ${news.Description}
                          </h6>
                        </div>
                      </div>
                      <div class="source-details">
                        <p class="text-muted">
                          <span class="media-source">${news.Source}</span>
                          <span>${news.Time}</span>
                        </p>
                      </div>
                    </div>
                    <div class="col-12 col-lg-3 col-md-3 col-sm-3 m-auto ml-lg-auto mr-lg-0 pt-lg-0 img-sec">
                      <img alt="image" class="img-fluid" src="${news.Image_Path}" />
                    </div>
                  </div>
                </div>
              </a>`;
      });
      NewsBlock.innerHTML = Appender;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

AnimeNews = () => {
  console.log("AnimeNews Api Here");
};

TrendingAnime = () => {
  console.log("TrendingAnime Api Here");
  const NewsBlock = document.getElementById("NewsAppend");
  let Appender = "";
  axios
    .get("/GetTrendingAnime")
    .then((res) => {
      console.log(res.data);
      const Headlines = res.data;

      Headlines.forEach((news) => {
        Appender += ` <div class="col-12 news-card">
                <a href="${news.redirect_link.trim()}">
                  <div class="row">
                    <div class="col-12 col-md-9 col-lg-9 col-sm-9">
                      <div class="news-card-title">
                        <div class="d-flex flex-row justify-content-start">
                          <h5>${news.SlNo}.</h5>
                          <img src="${news.Image_Path}" alt="" />
                          <h4> ${news.title}</h4>
                        </div>
                        <div class="news-desc">
                          <h6 class="mt-3 mb-4">
                           <a class="text-primary" href="${news.redirect_link.trim()}"><img src="./assets/images/news.png" /> View Full Story</a>
                          </h6>
                        </div>
                      </div>
                      <div class="source-details">
                        <p class="text-muted">
                          <span class="media-source">${news.Source}</span>
                          <span>${news.Time}</span>
                        </p>
                      </div>
                    </div>
                    <div class="col-12 col-lg-3 col-md-3 col-sm-3 m-auto ml-lg-auto mr-lg-0 pt-lg-0 img-sec">
                      <img alt="image" class="img-fluid" src="${news.Image_Path}" />
                    </div>
                  </div>
                </div>
              </a>`;
      });
      NewsBlock.innerHTML = Appender;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

UpcomingAnime = () => {
  console.log("UpcomingAnime Api Here");
  const NewsBlock = document.getElementById("NewsAppend");
  let Appender = "";
  axios
    .get("/GetUpcomingAnime")
    .then((res) => {
      console.log(res.data);
      const Headlines = res.data;

      Headlines.forEach((news) => {
        const ReleaseDate = news.Time;
        const FormatedDate = ReleaseDate.split("-")[0].split(")")[1];

        Appender += ` <div class="col-sm-12 col-md-12 col-lg-6 news-card my-4">
                <a href="${news.redirect_link.trim()}" >
                  <div class="row">
                    <div class="col-12">
                      <div class="news-card-title">
                        <div class="d-flex flex-row justify-content-start">
                          <h5>${news.SlNo}.</h5>
                          <img src="${news.Image_Path}" alt="" />
                          <h4 class="card-display-title"> ${news.title}</h4>
                        </div>
                        <div class="news-desc">
                          <h6 class="mt-3 mb-4">
                          <span> Releasing On : </span><a class="release-link" href="${news.redirect_link.trim()}">  ${FormatedDate} </a>
                          </h6>
                        </div>
                      </div>
                      <div class="source-details">
                        <p class="text-muted">
                          <span class="media-source">${news.Source}</span>
                          <span>${news.Time.split("-")[0]}</span>
                        </p>
                      </div>
                    </div>
                  
                  </div>
                </div>
              </a>`;
      });
      NewsBlock.innerHTML = Appender;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

MangaNews = () => {
  console.log("Manga News Api Here");
  const NewsBlock = document.getElementById("NewsAppend");
  let Appender = "";
  axios
    .get("/GetLatestMangaNews")
    .then((res) => {
      console.log(res.data);
      const Headlines = res.data;

      Headlines.forEach((news) => {
        Appender += ` <div class="col-lg-6 col-sm-12 news-card manga-news-card height-card px-3" style="background-image:url(${news.Image_Path});">
                <a href="${news.redirect_link.trim()}" >
                  <div class="row">
                    <div class="col-12 col-sm-12 col-lg-12">
                      <div class="news-card-title">
                        <div class="d-flex flex-row justify-content-start">
                          <h5>${news.SlNo}.</h5>
                          <h4> ${news.title}</h4>
                        </div>
                        <div class="news-desc">
                        <h6 class="mt-3 mb-4">
                        ${news.Description}
                       </h6>
                        </div>
                      </div>
                      <div class="source-details">
                        <p class="text-muted">
                          <span class="media-source">${news.Source}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>`;
      });
      NewsBlock.innerHTML = Appender;
    })
    .catch((err) => {
      console.log(err.message);
    });
};