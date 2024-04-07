
window.addEventListener("DOMContentLoaded",  async() =>{
    try{
    const response=await axios.get('http://localhost:2000/shop/orders')
     console.log(response)
    
       showOrderOnScreen(response.data)
    }
 catch(err){
    console.log(err);
 }

});


async function showOrderOnScreen(order){
    let tableBody =  document.getElementById('showorders');
    let ullist=document.getElementById('orders__products');
   // console.log(tableBody)
  if(order.length>0){
   
    
    for (let i=0;i<order.length;i++) {
        let row=`   <li class="orders__item">
        <h1>Order - # ${order[i]._id}</h1>
    </li>`
    tableBody.insertAdjacentHTML('afterbegin', row);
     await  order[i].items.forEach(item=>{
            let row1=` <li class="orders__products-item">${item.title} (${item.quantity})</li>`
            ullist.insertAdjacentHTML('beforeend', row1)
        })
   
   
    }
  }else{

    let row='<h1>Nothing there!</h1>'
    tableBody.insertAdjacentHTML('afterend', row);
  }
        
}

