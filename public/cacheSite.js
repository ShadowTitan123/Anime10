const cacheName = 'v1';




// Install SW on browser

self.addEventListener('install',e =>{ // attaching listener to current worker
    console.log('Service Worker installed');
});

//Activate SW 

self.addEventListener('activate',e =>{
    console.log('Service Worker activated');

        // Remove Old Caches 
        e.waitUntil(
            caches.keys().then(cacheNames => {   // get all caches
              return Promise.all(
                cacheNames.map(cache => {     // iterate with every cache 
                  if (cache !== cacheName) {  // check if not equal current cache
                    console.log('Service Worker: Clearing Old Cache');
                    return caches.delete(cache);   // return cache after deleting old cache
                  }
                })
              );
            })
          );
})

// Call Fetch Event
self.addEventListener('fetch', e => {  // For every call to server 
    console.log('Service Worker: Fetching');

   // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.

  if (!(e.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol

    e.respondWith(
      fetch(e.request) // get data of what is being requested . eg : index.html file 
        .then(res => {  // on success
          // Make copy/clone of response
          const resClone = res.clone();  
          // Open cahce
          caches.open(cacheName)
          .then(cache => {  
            // Add response to cache
            cache.put(e.request, resClone);  // copying response to our local cache
          });
          return res; // send data back if data available on server
        })
        .catch(err => caches.match(e.request).then(res => res)) // send cached data if not available on server by matching with req to our caches saved
    );
  });