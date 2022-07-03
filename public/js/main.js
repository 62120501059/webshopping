let carts=document.querySelectorAll('.add-cart');

let products =[
    {
        name:'SUMSUNG',
        tag:' washing machine1',
        price: 7500 ,
        inCart : 0
    },
    {
        name:"TOSHIBA",
        tag:"washing machine2",
        price: 13000 ,
        inCart : 0
    },
    {
        name:"SUMSUNG(2)",
        tag:"washing machine3",
        price: 16000 ,
        inCart : 0
    },
    {
        name:"LG",
        tag:"washing machine4",
        price: 18000 ,
        inCart : 0
    },
    {
        name:"SAMSUNG(3)",
        tag:"washing machine5",
        price: 10000 ,
        inCart : 0
    },
    {
        name:"LG(2)",
        tag:"washing machine6",
        price: 18000 ,
        inCart : 0
    },
    {
        name:"SONY",
        tag:"TV1",
        price: 19000 ,
        inCart : 0
    },
    {
        name:"SUMSUNG TV",
        tag:"TV2",
        price: 20000 ,
        inCart : 0
    },
    {
        name:"SUMSUNG TV(2)",
        tag:"TV3",
        price: 22000 ,
        inCart : 0
    },
    {
        name:"LG TV ",
        tag:"TV4",
        price: 31000 ,
        inCart : 0
    },
    {
        name:'SUMSUNG TV(3)',
        tag:'TV5',
        price: 90000 ,
        inCart : 0
    },
    {
        name:"SKYWORTH",
        tag:"TV6",
        price: 60000 ,
        inCart : 0
    },
    {
        name:"HATARI",
        tag:"Fan1",
        price: 3000 ,
        inCart : 0
    },
    {
        name:"HATARI(2)",
        tag:"Fan2",
        price: 5000 ,
        inCart : 0
    },
    {
        name:"HATARI(2)",
        tag:"Fan3",
        price: 4000 ,
        inCart : 0
    },
    {
        name:"ASTINA",
        tag:"Fan4 ",
        price: 990 ,
        inCart : 0
    },
    {
        name:"MITSUBISHI ELECTRIC",
        tag:"Fan5",
        price: 1500 ,
        inCart : 0
    },
    {
        name:"MITSUBISHI ELECTRIC(2)",
        tag:"Fan6",
        price: 1400 ,
        inCart : 0
    }  
];

for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null)
    {
        if(cartItems[product.tag] == undefined )
        {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1 ;
        cartItems = {
            [product.tag] : product
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is ",cartCost);
    console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost" , cartCost + product.price);
    }else {
        localStorage.setItem("totalCost" , product.price);
    }
}

function displayCart()
{
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="container-product">
            <div class = "product">         
                <img src="/Pic/${item.tag}.png">
                <span>${item.name}</span>
            </div>
            <div class = "price">${item.price}</div>
            <div class = "quantity>
                
                <span>${item.inCart}</span>
                
            </div>
            <div class = "total">
                ${item.inCart * item.price}฿
            </div>
            </div>
        `;
        }); 
        
        productContainer.innerHTML += `
            <div class = "basketTotalContainer">
                <h4 class = "basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class = "basketTotal">
                    ${cartCost}฿
                </h4>
        `;        
    } 
    
}

onLoadCartNumbers();
displayCart();
    
   
function startCheckout() {
    alert("ชำระสินค้าเรียบร้อย");
    localStorage.clear();
    location.reload(); 
}