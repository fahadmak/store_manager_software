let nerrortext = document.querySelector('#nerrortext');
let qerrortext = document.querySelector('#qerrortext');
let perrortext = document.querySelector('#perrortext');

table = document.getElementById('table');

let myHeaders = new Headers({
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization' : 'Bearer '  + localStorage.getItem('token'),
    });

let myInit = {
    method: 'GET',
    headers: myHeaders,
    cache: 'default',
    mode: 'cors'
};


const product_url = 'http://127.0.0.1:5000/api/v1/products';
const myRequest = new Request(product_url, myInit);
function allproducts() {
    fetch(myRequest)
    .then(handleResponse)
    .then((data) => {
        let output = '';
        data.products.forEach(function (product) {
            output += '<ul class="product-columns product-row" id="item' + product.productId + '">\n' +
                '<li class="column columnone" id="id' + product.productId + '">' + product.productId + '</li>\n' +
                '<li class="column columntwo" id="name' + product.productId + '">' + product.name + '</li>\n' +
                '<li class="column columnthree" id="price' + product.productId + '">' + product.price + '</li>\n' +
                '<li class="column columnfour" id="qty' + product.productId + '">\n' +
                '' + product.quantity +
                '</li>\n' +
                '<li class="column columnfive pos">\n' +
                '<button id ="pdt' + product.productId + '" class="btn st mod" onclick="pmod()">Modify</button>\n' +
                '<button id="' + product.productId + '" class="btn st del" onclick="pdel()">Delete</button>\n' +
                '</li>\n' +
                '</ul>';
        });
        table.innerHTML = output
    })
    .catch(function (error) {
        console.log(error);
    });
}

let delInit = {
    method: 'DELETE',
    headers: myHeaders,
    cache: 'default',
    mode: 'cors'
};

function pdel() {
    let del = document.getElementsByClassName('del');
    let x;
    for(i = 0; i < del.length; i++){
        del[i].onclick = function () {
            if(confirm('Are You Want To Delete?')){
                let delete_url = 'http://127.0.0.1:5000/api/v1/products/' + this.id;
                const myRequest = new Request(delete_url, delInit);
                fetch(myRequest)
                .then(handleResponse)
                .then((data) => {
                    let name = this.parentNode.parentNode.children[1].innerHTML;
                    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
                    alert('You have succesfully deleted ' + name);
                    console.log(data)
                })
                .catch(function (error) {
                console.log(error);
                });
            }
        }

    }
}
let modifier = document.getElementById('modifier');
function pmod() {
    let div = document.getElementsByClassName('mod');
    let i;
    for (i = 0; i < div.length; i++) {
        div[i].onclick = function () {
        console.log(this.parentNode.parentNode.id);
        let ul = document.getElementById(this.parentNode.parentNode.id);
        console.log(ul);
        let kids = ul.children;
        console.log(kids[0]);
        document.getElementById('qb').innerText = kids[0].innerHTML;
        document.getElementById('pname').value = kids[1].innerHTML;
        document.getElementById('pprice').value = kids[2].innerHTML;
        document.getElementById('pquantity').value = kids[3].innerHTML;
        modifier.style.display = "block";
        }
    }
}



function edit() {
    let pname = document.getElementById('pname').value;
    let pprice = parseInt(document.getElementById('pprice').value);
    let pquantity = parseInt(document.getElementById('pquantity').value);
    let modInit = {
        method: 'PUT',
        headers: myHeaders,
        cache: 'default',
        mode: 'cors',
        body:JSON.stringify({name:pname, price:pprice, quantity:pquantity})
    };
    let modId = document.getElementById('qb').innerText;
    for (let li of document.querySelectorAll('li')) {
        if (modId === li.innerText) {
            let ul = document.getElementById(li.parentNode.id);
            let modify_url = 'http://127.0.0.1:5000/api/v1/products/' + parseInt(modId);
            const myRequest = new Request(modify_url, modInit);
            fetch(myRequest)
            .then(handleResponse)
            .then((data) => {
                console.log(data);
                window.location.reload();
            })
            .catch(function (error) {
                if (error){
                    console.log(error);
                    nerrortext.style.display = 'block';
                    nerrortext.innerText= 'product name should contain at least letters or a number';
                    setTimeout(function () {
                    nerrortext.style.display = 'none'
                    }, 5000)
                    }
                if (error.error.price){
                    console.log(error.error.price);
                    perrortext.style.display = 'block';
                    perrortext.innerText = 'price should be greater than zero';
                    setTimeout(function () {
                    perrortext.style.display = 'none'
                }, 5000)
                }
                if (error.error.quantity){
                    console.log(error.error.quantity);
                    qerrortext.style.display = 'block';
                    qerrortext.innerText = 'quantity should be greater than zero';
                    setTimeout(function () {
                    qerrortext.style.display = 'none'
                }, 5000)
                }
            })
        }

    }
}

document.getElementById('add-btn').addEventListener('click', makeproduct);

const category_url = 'http://127.0.0.1:5000/api/v1/categories';

const catRequest = new Request(category_url, myInit);
cats = document.getElementById('all-cats');


function makeproduct(){
    fetch(catRequest)
    .then(handleResponse)
    .then((data) => {
        let output = '<option id="options" selected disabled>Choose a category</option>';
        data.categories.forEach(function (category) {
            output += '<option value="' + category.categoryId + '">' + category.name +'</option>';
        });
        cats.innerHTML = output;
        let add = document.getElementById('add');
        add.style.display = 'block'

    })
    .catch(function (error) {
        alert('There are no categories available');
    });
}

let anerrortext = document.querySelector('#anerrortext');
let aqerrortext = document.querySelector('#aqerrortext');
let aperrortext = document.querySelector('#aperrortext');
let acerrortext = document.querySelector('#acerrortext');

function addproduct() {
    let categoryselect = document.getElementById('all-cats');
    let category_id = parseInt(categoryselect.options[categoryselect.selectedIndex].value);
    let aname = document.getElementById('aname').value;
    let aprice = parseInt(document.getElementById('aprice').value);
    let aquantity = parseInt(document.getElementById('aquantity').value);
    let addInit = {
        method: 'POST',
        headers: myHeaders,
        cache: 'default',
        mode: 'cors',
        body:JSON.stringify({category_id: category_id, name:aname, price:aprice, quantity:aquantity})
    };
    let add_url = 'http://127.0.0.1:5000/api/v1/products';
    const addRequest = new Request(add_url, addInit);
    fetch(addRequest)
    .then(handleResponse)
    .then((data) => {
        window.location.reload();
        console.log(data);
        return 'product' + data.name + ' has been added';
    })
    .catch(function (error) {
        console.log(error);
        if (error.error.category_id){
            acerrortext.style.display = 'block';
            acerrortext.innerText= 'Please select a category';
            setTimeout(function () {
            acerrortext.style.display = 'none'
            }, 5000)
            }
        if (error.error.name){
            console.log(error.error.name);
            anerrortext.style.display = 'block';
            anerrortext.innerText= 'product name should contain at least letters or a number';
            setTimeout(function () {
            anerrortext.style.display = 'none'
            }, 5000)
            }
        if (error.error.price){
            console.log(error.error.price);
            aperrortext.style.display = 'block';
            aperrortext.innerText = 'price should be greater than zero';
            setTimeout(function () {
            aperrortext.style.display = 'none'
        }, 5000)
        }
        if (error.error.quantity){
            console.log(error.error.quantity);
            aqerrortext.style.display = 'block';
            aqerrortext.innerText = 'quantity should be greater than zero';
            setTimeout(function () {
            aqerrortext.style.display = 'none'
        }, 5000)
        }
    });

}


function allusers() {
    let userInit = {
        method: 'GET',
        headers: myHeaders,
        cache: 'default',
        mode: 'cors'
    };
    const users_url = 'http://127.0.0.1:5000/api/v1/auth/users';
    const userRequest = new Request(users_url, userInit);
    fetch(userRequest)
    .then(handleResponse)
    .then((data) => {
        let state;
        let output = '';
        data.users.forEach(function (user) {
            if (user.user_id > 1) {
                if (user.is_admin === true){
                console.log(user);
                output += '<ul class="product-columns product-row" id="item' + user.user_id + '">' +
                    '<li class="column columnone" id="id' + user.user_id + '">' + user.user_id + '</li>' +
                    '<li class="column columntwo" id="name' + user.user_id + '">' + user.name + '</li>' +
                    '<li class="column columnthree" id="username' + user.user_id + '">' + user.username + '</li>' +
                    '<li class="column columnfour" id="status' + user.user_id + '">' +
                    '<input id ="status' + user.user_id + '" class="apple-switch promo" onclick="promote()" type="checkbox" checked>' +
                    '</li>' +
                    '<li class="column columnsix pos">' +
                    // '<button id ="user' + user.user_id + '" class="btn st mod" onclick="pmod()">Modify</button>' +
                    '<button id="' + user.user_id + '" class="btn st del" onclick="udel()">Delete</button>' +
                    '</li>' +
                    '</ul>';
            }
            if (user.is_admin === false){
                console.log(user);
                output += '<ul class="product-columns product-row" id="item' + user.user_id + '">' +
                    '<li class="column columnone" id="id' + user.user_id + '">' + user.user_id + '</li>' +
                    '<li class="column columntwo" id="name' + user.user_id + '">' + user.name + '</li>' +
                    '<li class="column columnthree" id="username' + user.user_id + '">' + user.username + '</li>' +
                    '<li class="column columnfour" id="status' + user.user_id + '">' +
                    '<input id ="status' + user.user_id + '" class="apple-switch promo" onclick="promote()" type="checkbox">' +
                    '</li>' +
                    '<li class="column columnsix pos">' +
                    '<button id="' + user.user_id + '" class="btn st del" onclick="udel()">Delete</button>' +
                    '</li>' +
                    '</ul>';
            }
            table.innerHTML = output;
            }

        });

    })
    .catch(function (error) {
        console.log(error);
    });
}

// let anerrortext = document.querySelector('#anerrortext');
// let aqerrortext = document.querySelector('#aqerrortext');
// let aperrortext = document.querySelector('#aperrortext');
// let acerrortext = document.querySelector('#acerrortext');

function adduser() {
    let name = document.getElementById('name').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let addInit = {
        method: 'POST',
        headers: myHeaders,
        cache: 'default',
        mode: 'cors',
        body:JSON.stringify({name:name, username:username, password:password})
    };
    let add_url = 'http://127.0.0.1:5000/api/v1/auth/signup';
    const addRequest = new Request(add_url, addInit);
    fetch(addRequest)
    .then(handleResponse)
    .then((data) => {
        window.location.reload();
        console.log(data);
        return 'product' + data.name + ' has been added';
    })
    .catch(function (error) {
        console.log(error);
        // if (error.error.category_id){
        //     acerrortext.style.display = 'block';
        //     acerrortext.innerText= 'Please select a category';
        //     setTimeout(function () {
        //     acerrortext.style.display = 'none'
        //     }, 5000)
        //     }
        // if (error.error.name){
        //     console.log(error.error.name);
        //     anerrortext.style.display = 'block';
        //     anerrortext.innerText= 'product name should contain at least letters or a number';
        //     setTimeout(function () {
        //     anerrortext.style.display = 'none'
        //     }, 5000)
        //     }
        // if (error.error.price){
        //     console.log(error.error.price);
        //     aperrortext.style.display = 'block';
        //     aperrortext.innerText = 'price should be greater than zero';
        //     setTimeout(function () {
        //     aperrortext.style.display = 'none'
        // }, 5000)
        // }
        // if (error.error.quantity){
        //     console.log(error.error.quantity);
        //     aqerrortext.style.display = 'block';
        //     aqerrortext.innerText = 'quantity should be greater than zero';
        //     setTimeout(function () {
        //     aqerrortext.style.display = 'none'
        // }, 5000)
        // }
    });

}

function udel() {
    let del = document.getElementsByClassName('del');
    let i;
    for(i = 0; i < del.length; i++){
        del[i].onclick = function () {
            users_id = localStorage.getItem('user_id');
            if (users_id > 1){
                alert('no permission');
                return false
            }
            if(confirm('Are You Want To Delete?')){
                let delete_url = 'http://127.0.0.1:5000/api/v1/auth/users/' + this.id;
                const myRequest = new Request(delete_url, delInit);
                fetch(myRequest)
                .then(handleResponse)
                .then((data) => {
                    let name = this.parentNode.parentNode.children[1].innerHTML;
                    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
                    alert('You have succesfully deleted ' + name);
                    console.log(data)
                })
                .catch(function (error) {
                console.log(error);
                });
            }
        }

    }
}


function promote() {

    let promo = document.getElementsByClassName('promo');
    let i;
    for(i = 0; i < promo.length; i++){
        promo[i].onchange = function () {
            users_id = localStorage.getItem('user_id');
            if (users_id > 1){
                alert('no permission');
                window.location.reload();
                return false
            }
            if(confirm('Are You Sure Want To Promote the User?')){
                let url_id = this.id.replace(/[^\d.]/g,'');
                let promote_url = 'http://127.0.0.1:5000/api/v1/auth/promote/' + url_id;
                let admin_status;
                let message;
                if (this.checked){
                    admin_status = true;
                    message = 'You are now admin'
                } else {
                    admin_status = false;
                    message = 'you are attendant'
                }
                let promoteInit = {
                        method: 'PUT',
                        headers: myHeaders,
                        cache: 'default',
                        mode: 'cors',
                        body:JSON.stringify({is_admin: admin_status})
                    };
                const myRequest = new Request(promote_url, promoteInit);
                fetch(myRequest)
                .then(handleResponse)
                .then((data) => {
                    alert(name + ' ' + message);
                    console.log(data);

                })
                .catch(function (error) {
                console.log(error);
                });
            }
        }

    }
}



function userbox() {
    document.getElementById('addUser').style.display = "block";
}


