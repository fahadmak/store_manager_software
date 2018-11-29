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



function allproducts() {
    const product_url = 'http://127.0.0.1:5000/api/v1/products';
    const myRequest = new Request(product_url, myInit);
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

function available() {
    fetch(myRequest)
    .then(handleResponse)
    .then((data) => {
        let output = '';
        data.products.forEach(function (product) {
            if (product.quantity > 1){
                output += '<ul class="product-columns product-row" id="item' + product.productId + '">\n' +
                '<li class="column column1" id="names' + product.productId + '">' + product.name + '</li>\n' +
                '<li class="column column2" id="prices' + product.productId + '">' + product.price + '</li>\n' +
                '<li class="column column3" id="qtys' + product.productId + '">\n' +
                '' + product.quantity +
                '</li>\n' +
                '<li class="btn-layout column column4">\n' +
                '<input class="msn" placeholder="QTY" onkeyup="check_quantity()" type="text" id="qtya' + product.productId + '">\n' +
                '<button id="cart' + product.productId + '" class="btn btn-cart" onclick="add_cart_item()">Add to Cart</button>\n' +
                '</li>\n' +
                '</ul>';
            }

        });
        document.getElementById("sold").innerHTML = output
    })
    .catch(function (error) {
        console.log(error);
    });
}

function check_quantity() {
    let qre = document.getElementsByClassName('msn');
    let i;
    for(i = 0; i < qre.length; i++) {
        qre[i].onkeyup = function () {
            let re = /^[1-9]\d*$/g;
            if (!re.test(this.value)){
                alert('should decimal');
                this.value = '';
                return false
            }
            let input_id = this.id.replace(/[^\d.]/g,'');
            let input_quantity = parseInt(this.value);
            let stock_level = parseInt(document.getElementById('qtys' + input_id).innerText);
            console.log(input_id);
            console.log(input_quantity);
            console.log(stock_level);
            if (input_quantity >= stock_level){
                alert("Try a lower quantity" + ' less than ' + stock_level);
                this.value = '';
                return false
            }
        }
    }
}

function add_cart_item() {
    let item = document.getElementsByClassName('btn-cart');
    let output;
    for(let i = 0; i < item.length; i++) {
        item[i].onclick = function () {
            let input_id = parseInt(this.id.replace(/[^\d.]/g,''));
            let qty = document.getElementById("qtya" + input_id).value;
            let price = parseInt(document.getElementById('prices' + input_id).innerText);
            let pdt_name = document.getElementById('names' + input_id).innerText;
            let quantity = parseInt(qty);
            let cost_price = quantity * price;
            console.log(price);
            console.log(quantity);
            if (qty === '' ){
                alert("Include input");
                return false
            }
            let products = JSON.parse(localStorage.getItem('pdtsinfo')) || [];
            var m = products.findIndex(product => product.product_id===input_id);
            if (m !== -1){
                alert("Already in the cart");
                return false
            }
            products.push({product_id: input_id, quantity: quantity});
            output += '<ul class="product-columns product-row" id="stack' + input_id + '">' +
                    '<li class="column columntwo">' +  pdt_name + '</li>' +
                    '<li class="column columnthree">' + quantity + '</li>' +
                    '<li class="column columnfour">' + cost_price +
                    '</li>' +
                    '</ul>';
            document.getElementById("empty").innerHTML = "";
            document.getElementById("bought").innerHTML = output;
            document.getElementById('create').style.display = "block";
            localStorage.setItem('pdtsinfo', JSON.stringify(products));
            console.log(localStorage.getItem('pdtsinfo'));
        }
    }
}

function createRecord() {
    let saleInit = {
        method: 'POST',
        headers: myHeaders,
        cache: 'default',
        mode: 'cors',
        body:JSON.stringify({cart: JSON.parse(localStorage.getItem('pdtsinfo'))})
    };
    let sale_url = 'http://127.0.0.1:5000/api/v1/sales';
    const addRequest = new Request(sale_url, saleInit);
    fetch(addRequest)
    .then(handleResponse)
    .then((data) => {
        // window.location.reload();
        console.log(data);
        let products = [];
        localStorage.setItem('pdtsinfo', JSON.stringify(products));
        document.getElementById("bought").innerHTML = "";
        document.getElementById('create').style.display = "none";
        window.location.reload();
        return 'product' + data.name + ' has been added';
    })
    .catch(function (error) {
        console.log(error);
    })
}

function item_delete() {

    let input_id = parseInt(event.srcElement.id.replace(/[^\d.]/g, ''));
    let element = document.getElementById("stack" + input_id);
    let products = JSON.parse(localStorage.getItem('pdtsinfo'));
    var m = products.findIndex(product => product.product_id===input_id);
    if (m !== -1){
        products.splice(m, 1);
        localStorage.setItem('pdtsinfo', JSON.stringify(products));
        console.log(localStorage.getItem('pdtsinfo'));
        localStorage.removeItem('pdtinfo');
        document.getElementById("bought").removeChild(element)

    }

}

function single_user(user_id) {
    let user_url = 'http://127.0.0.1:5000/api/v1/users/' + user_id;
    const userRequest = new Request(user_url, myInit);
    let name;
    fetch(userRequest)
    .then(handleResponse)
    .then((data) => {
        name = data.user.username;
        console.log(name);
    })
    .catch(function (error) {
        console.log(error);
    });
    return 6;
}


function single_user_records() {
    let sales_url = 'http://127.0.0.1:5000/api/v1/sales/' + localStorage.getItem('user_id');
    const saleRequest = new Request(sales_url, myInit);
    let output;
    fetch(saleRequest)
    .then(handleResponse)
    .then((data) => {
        let sales = data.sales;
        for (let i = 0; i < sales.length; i++) {
            output += '<ul class="product-columns product-row" id="item' + sales[i].sale_id + '">' +
                '<li class="column columnone" id="saleid' + sales[i].sale_id + '">' + sales[i].sale_id + '</li>' +
                '<li class="column columntwo" id="date' + sales[i].sale_id + '">' + sales[i].sale_date + '</li>' +
                '<li class="column columnthree" id="blank' + sales[i].sale_id + '">' + "" + '</li>' +
                '<li class="column columnfour" id="total' + sales[i].sale_id + '">' + sales[i].total + '</li>' +
                '<li class="column columnfive">' + '</li>' +
                '</ul>';
        }
        document.getElementById("record").innerHTML = output
    })
    .catch(function (error) {
        console.log(error);
    });
}

function user_records() {
    let all_sales_url = 'http://127.0.0.1:5000/api/v1/sales';
    const allSaleRequest = new Request(all_sales_url, myInit);
    let output;
    fetch(allSaleRequest)
    .then(handleResponse)
    .then((data) => {
        let sales = data.sales;
        for (let i = 0; i < sales.length; i++) {
            output += '<ul class="product-columns product-row" id="item' + sales[i].sale_id + '">' +
                '<li class="column columnone" id="saleid' + sales[i].sale_id + '">' + sales[i].sale_id + '</li>' +
                '<li class="column columntwo" id="date' + sales[i].sale_id + '">' + sales[i].sale_date + '</li>' +
                '<li class="column columnthree" id="blank' + sales[i].sale_id + '">' + "" + '</li>' +
                '<li class="column columnfour" id="total' + sales[i].sale_id + '">' + sales[i].total + '</li>' +
                '<li class="column columnfive">' + '</li>' +
                '</ul>';
        }
        document.getElementById("record").innerHTML = output
    })
    .catch(function (error) {
        console.log(error);
    });
}

function allcategories() {
    const category_url = 'http://127.0.0.1:5000/api/v1/categories';
    const myRequest = new Request(category_url, myInit);
    fetch(myRequest)
    .then(handleResponse)
    .then((data) => {
        let output = '';
        data.categories.forEach(function (category) {
            output += '<ul class="product-columns product-row" id="item' + category.categoryId + '">\n' +
                '<li class="column columnone" id="id' + category.categoryId + '">' + category.categoryId + '</li>\n' +
                '<li class="column columntwo" id="name' + category.categoryId + '">' + category.name + '</li>\n' +
                '<li class="column columnthree" id="price' + category.categoryId + '">' + "" + '</li>\n' +
                '<li class="column columnfour" id="qty' + category.categoryId + '">\n' +
                '' + "" +
                '</li>\n' +
                '<li class="column columnfive pos">\n' +
                '<button id ="pdt' + category.categoryId + '" class="btn st mod" onclick="category_modify()">Modify</button>\n' +
                '<button id="' + category.categoryId + '" class="btn st del" onclick="category_delete()">Delete</button>\n' +
                '</li>\n' +
                '</ul>';
        });
        table.innerHTML = output
    })
    .catch(function (error) {
        console.log(error);
    });
}


function categorybox() {
    document.getElementById('add-category').style.display = "block";
}


function addcategory() {
    let acerrortext = document.getElementById('acerrortext');
    let name = document.getElementById('cname').value;
    let addInit = {
        method: 'POST',
        headers: myHeaders,
        cache: 'default',
        mode: 'cors',
        body:JSON.stringify({category_name:name})
    };
    let category_url = 'http://127.0.0.1:5000/api/v1/categories';
    const addRequest = new Request(category_url, addInit);
    fetch(addRequest)
    .then(handleResponse)
    .then((data) => {
        window.location.reload();
        console.log(data);
        return 'product' + data.name + ' has been added';
    })
    .catch(function (error) {
        console.log(error.error);
        if (error.error){
            console.log(error.error);
            acerrortext.style.display = 'block';
            acerrortext.innerText= 'category name should contain at least letters or a number';
            setTimeout(function () {
            acerrortext.style.display = 'none'
            }, 5000)
        }

    });

}


function category_delete() {
    let del = document.getElementsByClassName('del');
    for(let i = 0; i < del.length; i++){
        del[i].onclick = function () {
            if(confirm('Are You Want To Delete?')){
                let delete_url = 'http://127.0.0.1:5000/api/v1/categories/' + this.id;
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


function category_modify() {
    let modify = document.getElementById('modify');
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
            document.getElementById('catname').value = kids[1].innerHTML;
            modify.style.display = "block";
        }
    }
}



function category_edit() {
    let pname = document.getElementById('catname').value;
    let modInit = {
        method: 'PUT',
        headers: myHeaders,
        cache: 'default',
        mode: 'cors',
        body:JSON.stringify({category_name:pname})
    };
    let modId = document.getElementById('qb').innerText;
    for (let li of document.querySelectorAll('li')) {
        if (modId === li.innerText) {
            let ul = document.getElementById(li.parentNode.id);
            let modify_url = 'http://127.0.0.1:5000/api/v1/categories/' + parseInt(modId);
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
            })
        }

    }
}
