let prodId=sessionStorage.getItem('prodId')
window.addEventListener("DOMContentLoaded",  async() =>{
    try{
    let product=await axios.get(`http://localhost:2000/shop/products/${prodId}`);
   // console.log(product)
       showproductDetailsOnScreen(product.data);
    }
  catch(err){
    console.log(err);
  }

});

async function showproductDetailsOnScreen(product){
    let divelement=  document.getElementById('proddetails');
    let elementdata=`<h1>${product.title}</h1>
    <hr>
    <div>
        <img src="${product.imageUrl}" alt="${product.title}">
    </div>
    <h2>${product.price}</h2>
    <p>${product.description}</p>
   
        <button class="btn" onclick="addtocart('${product._id}')">Add to Cart</button>
       `
     divelement.insertAdjacentHTML('beforeend',elementdata);
    
 }


 async function addtocart(prodId){
 
  const response=await axios.post('http://localhost:2000/shop/cart',{productId:prodId});
  console.log(response)
    window.location.href='./cart.html'
   }