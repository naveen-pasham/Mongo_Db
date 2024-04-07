window.addEventListener("DOMContentLoaded",  () =>{
    axios.get('http://localhost:2000/admin/products').then(response=>{
    // console.log(response)
    
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
        <div class="card__actions">
        <button class="btn" onclick="edit('${products[i]._id}','${products[i].title}','${products[i].imageUrl}',' ${products[i].price}',' ${products[i].description}')">Edit</button>
           
                <button class="btn" onclick="delete_product('${products[i]._id}','${this.parentNode}')">Delete</button>
        </div>
    </article>`
    tableBody.insertAdjacentHTML('beforeend', row);
    }
  }else{
    let row='<h1>No Products Found</h1>'
    tableBody.insertAdjacentHTML('afterend', row);
  }
        
}


async function edit(id,title,imageUrl,price,description) {
    let obj={
        id,
        title,
        imageUrl,
        price,
        description
    }
    sessionStorage.setItem('editproduct',JSON.stringify(obj))
    window.location.href='./edit-product.html'
      }


      async function delete_product(id, row) {
    //    console.log(row);
    //    row.removechild(row)
      let delete_product= await  axios.get(`http://localhost:2000/admin/delete-product/${id}`)
       // console.log(delete_product)
       
          }