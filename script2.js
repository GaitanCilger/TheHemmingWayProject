let carts = document.querySelectorAll('.add-cart');

let products = 
[
    {
        name: 'Coffee Milk Shake',
        tag: 'CoffeeMilkShake',
        price: 15,
        inCart: 0
    },
    {
        name: 'Hazel Nutt',
        tag: 'HazelNutt',
        price: 20,
        inCart: 0
    },
    {
        name: 'Hot Coffee Latte',
        tag: 'HCLatte',
        price: 30,
        inCart: 0
    },
    {
        name: 'Iced Coffee',
        tag: 'IcedC',
        price: 40,
        inCart: 0
    }
]

for(let i = 0; i < carts.length; i++)
{
    carts[i].addEventListener('click', () =>
    {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers()
{
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers)
    {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product)
{
    console.log("Product Clicked Is", product);

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers)
    {
        localStorage.setItem('cartNumbers', productNumbers + 1);
    }
    else
    {
        localStorage.setItem('cartNumbers', 1);
    }

    setItems(product);
    
}

function setItems(product)
{
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null)
    {
        if(cartItems[product.tag] == undefined)
        {
            cartItems =
            {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else
    {
        product.inCart = 1;

        cartItems = 
        {
            [product.tag]: product
        }
    }

    
   
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product)
{
    let cartCost = localStorage.getItem('totalCost'); 

    if(cartCost != null)
    {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else
    {
        localStorage.setItem("totalCost", product.price);
    }
    
}

function displayCart()
{
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost'); 

    if(cartItems && productContainer)
    {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>
            {
                productContainer.innerHTML += 
                `
                    <div class = "product">
                        
                        <img src = "Products/${item.tag}.png" />
                        <span>${item.name}</span>
                    </div> 
                    <div class = "price">
                        $${item.price}.00
                    </div> 
                    <div class = "quantity">
                        <span>${item.inCart}</span>
                    </div> 
                    <div class = "total">
                        $${item.inCart * item.price}.00
                    </div>
                `
            });

            productContainer.innerHTML +=
            `
                <div class = "basketTotalContainer">
                    <button class = "btn-remove">REMOVE ALL</button>
                    <h4 class = "basketTotalTitle">
                        Basket Total
                    </h4>
                    <h4 class = "basketTotal">
                        $${cartCost}.00
                    </h4><br>
                </div>
                <div class = "purchaseBtn">
                    <button class = "btn-purchase">Purchase</button>
                </div>
            `

    }

}

displayCart();


