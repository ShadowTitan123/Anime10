HomepageNews =  ()=>{

    const NewsBlock = document.getElementById('NewsAppend');
    let Appender = '';
    axios.get('/GetLatestAnimeNews')
    .then((res)=>{
            console.log(res.data);
            const Headlines = res.data;
           
            Headlines.forEach(news => {
                Appender += ` <a href="${news.redirect_link.trim()}" >
                <div class="col-12 news-card">
                  <div class="row">
                    <div class="col-8 col-md-9 col-lg-9 col-sm-9">
                      <div class="d-flex flex-row justify-content-start news-card-title">
                        <h5>${news.SlNo}</h5>
                        <img src="${news.Image_Path}" alt="" />
                        <h4> ${news.title}</h4>
                      </div>
                      <h6 class="mb-4">
                      ${news.Description}
                      </h6>
                      <div class="source-details">
                        <p class="text-muted">
                          <span class="media-source">${news.Source}</span>
                          <span>${news.Time}</span>
                        </p>
                      </div>
                    </div>
                    <div class="col-4 col-lg-3 col-md-3 col-sm-3 m-auto ml-lg-auto mr-lg-0 pt-5 pt-lg-0">
                      <img alt="image" class="img-fluid" src="${news.Image_Path}" />
                    </div>
                  </div>
                </div>
              </a>`
                
            });
            NewsBlock.innerHTML = Appender;
    })
    .catch((err)=>{
        console.log(err.message);
    })
}


AnimeNews = ()=>{
    console.log("AnimeNews Api Here");
}


TrendingAnime = ()=>{
    console.log("TrendingAnime Api Here");
}


UpcomingAnime = ()=>{
    console.log("UpcomingAnime Api Here");
}


MangaNews = ()=>{
    console.log("Manga News Api Here");
}