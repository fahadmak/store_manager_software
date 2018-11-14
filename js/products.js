table = document.getElementById('table');

var myHeaders = new Headers({
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization' : 'Bearer '  + localStorage.getItem('token'),
    });

var myInit = {
    method: 'GET',
    headers: myHeaders,
    cache: 'default',
    mode: 'cors'
};


const product_url = 'http://127.0.0.1:5000/api/v1/products';
const myRequest = new Request(product_url, myInit);