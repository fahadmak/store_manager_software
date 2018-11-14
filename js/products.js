table = document.getElementById('table');

var myHeaders = new Headers({
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization' : 'Bearer '  + localStorage.getItem('token'),
    });