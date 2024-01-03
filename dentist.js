window.onload = function() {
    if ((!sessionStorage.getItem('loggedInUser')) || (sessionStorage.getItem('accountType') !== 'Dentist')) {
        window.location.href = 'login.html';
    }
};



