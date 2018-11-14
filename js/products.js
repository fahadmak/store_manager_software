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

            table.innerHTML = output;
        })
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

let modInit = {
        method: 'PUT',
        headers: myHeaders,
        cache: 'default',
        mode: 'cors',
        body:JSON.stringify({name:pname, price:pprice, quantity:pquantity})
    };

function edit() {
    let pname = document.getElementById('pname').value;
    let pprice = parseInt(document.getElementById('pprice').value);
    let pquantity = parseInt(document.getElementById('pquantity').value);
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
                    ul.children[1].innerHTML = pname;
                    ul.children[2].innerHTML = pprice;
                    ul.children[3].innerHTML = pquantity;
                    modifier.style.display = "none";
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

    }
}
