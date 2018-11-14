const login_url = 'http://127.0.0.1:5000/api/v1/auth/login';

let merrortext = document.querySelector('#merrortext');
let uerrortext = document.querySelector('#uerrortext');
let perrortext = document.querySelector('#perrortext');

document.getElementById('logs').addEventListener('click', login);

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

}

function load(url) {
    location.href = url;
}