const productId = document.querySelector("#ip_id");
const productName = document.querySelector("#ip_name");
const productPrice = document.querySelector("#ip_price");
const productSeries = document.querySelector("#ip_series");
const productAmount = document.querySelector("#ip_amount");
const productImg = document.querySelector("#ip_img");
const productFind = document.querySelector("#ip_find");
const imageChange = document.querySelector("#image_Change");
const checkName = document.querySelector("#rd_name");
const checkSeries = document.querySelector("#rd_series");
const divPagination = document.querySelector(".pagination-box");
const table_products = document.querySelector("#tb-all-products>tbody");
const page_size = 5;
const default_page_number = 1;
var products = [];
const key_data = "product_data";

let srcImage = 'https://lh3.googleusercontent.com/UWBPU_X7CmuQWj8PxKBnGcWXNfxc_RAmxLQm75-U9scQt1HdI_qj3m4Lzv8avIBx02_vyepb_qH_zO9QacIvmBC90ntaf_MkbKny5xqZPsuw7-C7RjKIDH70fGTgBMzC8M-5=s512-c';
imageChange.src = srcImage;

class Product {
    constructor(id, name, price, series, amount, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.series = series;
        this.amount = amount;
        this.image = image;
    }
}

function init() {
    if (getData(key_data) == null) {
        products = [
            new Product(1, "Samsung Galaxy S22 Ultra", 27900000, "Korea", 2000, "https://msmobile.vn/images/products/2022/03/18/large/galaxy-s22-ultra-black_1647574662.png"),
            new Product(2, "Iphone 13 Pro Max", 28490000, "USA", 3000, "https://cdn.shopify.com/s/files/1/0282/8510/8356/products/IPHONE13proMAXgray-pink_1000x1000.png?v=1644409567"),
            new Product(3, "Google Pixel 6 Pro", 18990000, "USA", 600, "https://case-face.co.uk/wp-content/uploads/Google-Pixel-6-Pro-Silicone-Case-Orange.png"),
            new Product(4, "Sony Xperia Pro-I", 39980000, "Japan", 800, "https://www.sony.com.vn/image/5d5ecc984b1e4a3628bbce5f3404b10b?fmt=png-alpha&wid=660&hei=660"),
            new Product(5, "Oppo Find X5 Pro", 32990000, "China", 500, "https://oppolongan.com/images/stories/virtuemart/product/frame39351-640x640.png"),
            new Product(6, "Google Pixel 5", 7000000, "USA", 200, "https://drakemall-files-new.s3.eu-central-1.amazonaws.com/Google%20P-cklty1mpr00c901wph8kv7b24.png"),
            new Product(7, "Iphone 12", 13000000, "USA", 500, "https://ldlphones.com.vn/wp-content/uploads/2022/03/iphone-12-do.png"),
            new Product(8, "Iphone XR", 6000000, "USA", 1000, "https://clickbuy.com.vn/uploads/2019/03/apple-iphone-xr-vang.png"),
            new Product(9, "Xiaomi 12", 15000000, "China", 400, "https://i-sohoa.vnecdn.net/2022/05/04/xiaomi12problack-1651662746.png"),
            new Product(10, "Sony Xperia 1", 5000000, "Japan", 50, "https://media3.scdn.vn/img4/2020/01_02/68zdpwE9dH12PqFN8iba_simg_de2fe0_500x500_maxb.png"),
            new Product(11, "Bphone 3", 7000000, "Viet Nam", 999, "http://hoangkieumobile.com/upload/product/133298263104.png"),
            new Product(12, "Bphone A60", 6000000, "Viet Nam", 999, "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2021/12/14/bphone-b40-1.png"),
        ];
        setData(key_data, products);
    }
    else {
        products = getData(key_data);
    }
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function renderProduct(data, page_number) {
    let pages = data.slice((page_number - 1) * page_size, page_number * page_size);
    let htmls = pages.map(function (product) {
        return ` 
                <tr>
                <td onclick = "showProduct(${product.id})">${product.id}</td>
                <td onclick = "showProduct(${product.id})" style = "text-align:left">${product.name}</td>
                <td onclick = "showProduct(${product.id})" style = "text-align:right">${formatCurrency(Number(product.price))}</td>
                <td onclick = "showProduct(${product.id})">${product.series}</td>
                <td onclick = "showProduct(${product.id})">${product.amount}</td>
                <td onclick = "showProduct(${product.id})">  
                    <img style="width:70px; height:70px;" src="${product.image}" alt="">
                </td>
                <td>
                    <button onclick = "deleteProduct(${product.id})" class="btn btn_delete" type="button">Delete</button>
                </td>
                </tr>
                `;
    });
    table_products.innerHTML = htmls.join("");
}

function changeImage() {
    productImg.value.trim() == "" ? imageChange.setAttribute("src", srcImage) :
        imageChange.setAttribute("src", productImg.value);
}

function getProductIndex(productID) {
    return products.findIndex(function (std) {
        return std.id == productID;
    })
}

function showProduct(productID) {
    let index = getProductIndex(productID);
    productId.value = products[index].id;
    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productSeries.value = products[index].series;
    productAmount.value = products[index].amount;
    productImg.value = products[index].image;
    changeImage();
    showButton();
}

function addProduct() {
    productName.value == "" ? alert("Please enter a product name!")
        : productPrice.value.trim() == "" ? alert("Please enter a product price!")
            : productSeries.value.trim() == "" ? alert("Please enter a product series!")
                : productAmount.value.trim() == "" ? alert("Please enter a product amount!")
                    : productImg.value.trim() == "" ? alert("Please enter a product image!")
                        : products.push(new Product(Number(getLastId()) + 1, productName.value, productPrice.value, productSeries.value, productAmount.value, productImg.value));
    setData(key_data, products);
    renderPagination(page_size, default_page_number);
    renderProduct(products, default_page_number);
    showDivPagination();
    reset();
}

function reset() {
    productId.value = "";
    productName.value = "";
    productPrice.value = "";
    productSeries.value = "";
    productAmount.value = "";
    productImg.value = "";
    productFind.value = "";
    imageChange.src = srcImage;
    hideButton();
    showDivPagination();
    renderProduct(products, default_page_number);
}

function deleteProduct(productID) {
    let confirmed = window.confirm("Are sure to remove this product?");
    let position = getProductIndex(productID)
    if (confirmed) {
        products.splice(position, 1);
    }
    setData(key_data, products);
    renderProduct(products, default_page_number);
    renderPagination(page_size, default_page_number);
    reset();
}

function saveProduct() {
    let index = getProductIndex(productId.value);
    products[index].id = productId.value;
    products[index].name = productName.value;
    products[index].price = productPrice.value;
    products[index].series = productSeries.value;
    products[index].amount = productAmount.value;
    products[index].image = productImg.value;
    setData(key_data, products);
    hideButton();
    renderProduct(products, default_page_number);
    reset();
}

function cancelProduct() {
    let index = getProductIndex(productId.value);
    productId.value = products[index].id;
    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productSeries.value = products[index].series;
    productAmount.value = products[index].amount;
    productImg.value = products[index].image;
    hideButton();
}

function showButton() {
    document.querySelector("#saveProduct").classList.remove('d-none');
    document.querySelector("#cancelProduct").classList.remove('d-none');
}

function hideButton() {
    document.querySelector("#saveProduct").classList.add('d-none');
    document.querySelector("#cancelProduct").classList.add('d-none');
}

function hideDivPagination() {
    divPagination.classList.add('d-none');
}

function showDivPagination() {
    divPagination.classList.remove('d-none');
}

function sortProduct(direct, type) {
    switch (type) {
        case 'id': sortId(direct); break;
        case 'name': sortName(direct); break;
        case 'price': sortPrice(direct); break;
        case 'amount': sortAmount(direct); break;
        case 'series': sortSeries(direct); break;
        default: break;
    }
    renderProduct(products, default_page_number);
}

function sortId(direct) {
    direct == 'asc' ? products.sort((a, b) => (a.id - b.id))
        : products.sort((a, b) => (b.id - a.id));
}

function sortName(direct) {
    direct == 'asc' ? products.sort((a, b) => (a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1))
        : products.sort((a, b) => (a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1));
}

function sortPrice(direct) {
    direct == 'asc' ?products.sort(function(a, b){return a.price - b.price})
    :products.sort(function(a, b){return b.price - a.price});
}

function sortSeries(direct) {
    direct == 'asc' ? products.sort((a, b) => (a.series.toUpperCase() < b.series.toUpperCase() ? -1 : 1))
        : products.sort((a, b) => (a.series.toUpperCase() < b.series.toUpperCase() ? 1 : -1));
}

function sortAmount(direct) {
    direct == 'asc' ?products.sort(function(a, b){return a.amount - b.amount})
    :products.sort(function(a, b){return b.amount - a.amount});
}

function searchProduct() {
    if (checkName.checked) {
        hideDivPagination();
        table_products.innerHTML = findByName(productFind.value);
    }
    if (checkSeries.checked) {
        hideDivPagination();
        table_products.innerHTML = findBySeries(productFind.value);
    }
    if (productFind.value.trim() == ""){
        showDivPagination();
        renderProduct(products, default_page_number);
    } 
}

function findByName(findName) {
    let html = "";
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.toUpperCase().includes(findName.toUpperCase())) {
            html += `<tr  onclick = "showProduct(${products[i].id})">
                        <td>${products[i].id}</td>
                        <td style = "text-align:left">${products[i].name}</td>
                        <td style = "text-align:right">${formatCurrency(Number(products[i].price))}</td>
                        <td>${products[i].series}</td>
                        <td>${products[i].amount}</td>
                        <td>  
                            <img style="width:70px; height:70px;" src="${products[i].image}" alt="">
                        </td>
                        <td>
                            <button onclick = "deleteProduct(${i})" class="btn btn_delete" type="button">Delete</button>
                        </td>
                    </tr>`;
        }
    }
    return html;
}

function findBySeries(findSeries) {
    let html = "";
    for (let i = 0; i < products.length; i++) {
        if (products[i].series.toUpperCase().includes(findSeries.toUpperCase())) {
            html += `<tr onclick = "showProduct(${products[i].id})">
                        <td >${products[i].id}</td>
                        <td style = "text-align:left">${products[i].name}</td>
                        <td style = "text-align:right">${products[i].price}</td>
                        <td>${products[i].series}</td>
                        <td>${products[i].amount}</td>
                        <td>  
                            <img style="width:70px; height:70px;" src="${products[i].image}" alt="">
                        </td>
                        <td>
                            <button onclick = "deleteProduct(${i})" class="btn btn_delete" type="button">Delete</button>
                        </td>
                    </tr>`;
        }
    }
    return html;
}

function renderPagination(page_size, page_number) {
    let total_page = Math.ceil(products.length / page_size)
    let pagination = document.querySelector(".pagination-box>ul");
    pagination.innerHTML = "";
    for (let i = 1; i <= total_page; i++) {
        pagination.innerHTML += `<li class="page-item ${page_number == i ? 'active' : ''}"><button onclick='paging(${i})'>${i}</button></li>`
    }
}

function paging(page_number) {
    current_page = page_number;
    renderPagination(page_size, page_number)
    renderProduct(products, page_number);
}

function formatCurrency(number) {
    return number.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}

function getLastId() {
    let productTemp = [...products];
    let maxId = productTemp.sort(function (pdt1, pdt2) {
        return pdt2.id - pdt1.id;
    })[0].id;
    return maxId;
}

function ready() {
    init();
    renderPagination(page_size, default_page_number);
    renderProduct(products, default_page_number);
}

ready();    