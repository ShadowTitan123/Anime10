// Check if Service Worker Supported in Browser

if (navigator.serviceWorker) {


    //Check for Load Event 
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('cacheSite.js') // registering/specifying sw to store this js file in browser
            .then((reg) => {
                console.log('Service Worker Registered');
        
            })
            .catch((err) => {
                console.log("Error : " + err);
            })
    })
}