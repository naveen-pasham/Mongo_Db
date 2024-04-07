

window.addEventListener("DOMContentLoaded",  async() =>{
    try{
    const response=await axios.get('http://localhost:2000/shop/cart')
    // console.log(response)
    
       showCartOnScreen(response.data)
    }
 catch(err){
    console.log(err);
 }

});


function showCartOnScreen(products){
    let tableBody =  document.getElementById('cartlist');
   // console.log(tableBody)
  if(products.length>0){
   
    
    for (let i=0;i<products.length;i++) {
        let row=`  <li class="cart__item">
        <h1>${products[i].productId.title}</h1>
        <h2>Quantity: ${products[i].quantity}</h2>
       
            <button class="btn danger" onclick="deleteCartItem('${products[i].productId._id}')">Delete</button>
       
    </li>`
    tableBody.insertAdjacentHTML('beforeend', row);
    }
  }else{

    let row='<h1>No Products Found</h1>'
    tableBody.insertAdjacentHTML('afterend', row);
  }
        
}


async function deleteCartItem(id){
    const response=await axios.post('http://localhost:2000/shop/cart-delete-item',{prodId:id});
   // console.log(response)
   window.location.href='./cart.html'
}

document.getElementById('ordernow').addEventListener('click', ()=>{
    order();
})
async function order(){
    const response= await axios.post('http://localhost:2000/shop/create-order')
    console.log(response)
}

