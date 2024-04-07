window.addEventListener("DOMContentLoaded",  () =>{
    axios.get('http://localhost:2000/shop/products').then(response=>{
     //console.log(response)
    
       showNewproductOnScreen(response.data)
     
   }).catch(err=>console.log(err));

});


function showNewproductOnScreen(products){
    let tableBody =  document.getElementById('grid');
   // console.log(tableBody)
  if(products.length>0){
   
    
    for (let i=0;i<products.length;i++) {
        
        let row=` <article class="card product-item">
        <header class="card__header">
            <h1 class="product__title">
                ${products[i].title}
            </h1>
        </header>
        <div class="card__image">
            <img src="${products[i].imageUrl}" alt="${products[i].title}">
        </div>
        <div class="card__content">
            <h2 class="product__price">$
               ${products[i].price}
            </h2>
            <p class="product__description">
               ${products[i].description}
            </p>
        </div>
        <div  class="card__actions">
        
        <button class="btn" onclick="product_Details('${products[i]._id}')">Details</button>
        <button class="btn" onclick="addtocart('${products[i]._id}')">Add to Cart</button>
                        </div>
    </article>`
    tableBody.insertAdjacentHTML('beforeend', row);
    }
  }else{
    let row='<h1>No Products Found</h1>'
    tableBody.insertAdjacentHTML('afterend', row);
  }
        
}

async function product_Details(prodId){
  sessionStorage.setItem('prodId',prodId)
    window.location.href='./product-detail.html'
}

async function addtocart(prodId){
 
const response=await axios.post('http://localhost:2000/shop/cart',{productId:prodId});
console.log(response)
  window.location.href='./cart.html'
 }