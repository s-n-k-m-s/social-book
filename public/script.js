// logout button overlay

let logout = document.getElementById('logout');
let logoutOverlay = document.getElementById('logout-overlay');
let logoutForm = document.getElementById('logout-form');

logout.addEventListener('click', function() {
    logoutOverlay.style.display = 'block';
});