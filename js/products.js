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

function allproducts() {
    fetch(myRequest)
    .then(handleResponse)
    .then((data) => {
        var output = '';
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
