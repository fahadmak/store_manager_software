const login_url = 'https://store-challenge-3-api.herokuapp.com/api/v1/auth/login';

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
            localStorage.setItem('user_id', data.user_id);
            login_p.action = 'admin/products.html';
            login_p.submit();

        } else {
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user_id', data.user_id);
            login_p.action = 'attendant/shopping_cart.html';
            login_p.submit();
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
    window.location.href = url;
}
