const login_url = 'http://127.0.0.1:5000/api/v1/auth/login';

let merrortext = document.querySelector('#merrortext');
let uerrortext = document.querySelector('#uerrortext');
let perrortext = document.querySelector('#perrortext');

document.getElementById('logs').addEventListener('click', login);

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    fetch(login_url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
    },
    body:JSON.stringify({username:username, password:password})
    })
    .then(handleResponse)
    .then((data) => {
        if (data.admin === true){
            localStorage.setItem('token', data.access_token);
            console.log(localStorage.getItem('token'));
            load('admin/viewproducts.html');
        } else {
            localStorage.setItem('token', data.access_token);
            console.log(localStorage.getItem('token'));
            load('attendant/shopping_cart.html');
        }})
    .catch(function (error) {
        if (error.error === 'Username and password did not match'){
            merrortext.style.display = 'block';
            merrortext.innerText = 'Password should contain at least 4 letters and a number';
            setTimeout(function () {
                merrortext.style.display = 'none'
            }, 5000)
        } else {
            if (error.password){
                perrortext.style.display = 'block';
                perrortext.innerText = 'Password should contain at least 4 letters and a number';
                setTimeout(function () {
                perrortext.style.display = 'none'
            }, 5000)
            }
            if (error.username){
                uerrortext.style.display = 'block';
                uerrortext.innerText = 'Username should contain at least 4 letters and a number';
                setTimeout(function () {
                uerrortext.style.display = 'none'
            }, 5000)
            }
            console.log('Request failed', error);
        }
    });
}

function load(url) {
    location.href = url;
}