
let editproduct=JSON.parse(sessionStorage.getItem('editproduct'))


    document.getElementById('addButton').addEventListener('click',(event)=>{
        addexpense(event);
      })
      
          // add user 
            function addexpense(event) {
           event.preventDefault();
            const title=document.getElementById('title').value;
            const imageUrl=document.getElementById('imageUrl').value;
            const price=document.getElementById('price').value;
            const description=document.getElementById('description').value;
            const rowIndex=document.getElementById('rowIndex').value;
        //  console.log(title)
            const obj={
              title,
              imageUrl,
              price,
              description
      
            }
         //   console.log(obj)
            if (rowIndex === '') {
              axios.post('http://localhost:2000/admin/add-product',obj).then(result=>{
                console.log(result)
                window.location.href='./products.html'
              }).catch(err => {
                  console.log(err);
             });
             
            }else{
                updateProduct(rowIndex, title, imageUrl, price,description);
            }
             resetForm();
          }
      
     
      
     // edit form
     if(editproduct!=''){
     
          //console.log(editproduct.price)
          document.getElementById('title').value=editproduct.title;
          document.getElementById('imageUrl').value=editproduct.imageUrl;
          document.getElementById('price').value=parseInt(editproduct.price);
          document.getElementById('description').value = editproduct.description;
          document.getElementById('rowIndex').value = editproduct.id;
          document.getElementById('addButton').innerHTML="Update";  
          sessionStorage.removeItem('editproduct')
    
  }
      
    //  update user
      async function updateProduct(Id,title,imageUrl,price,description){
        try{
         // console.log(Id)
          const obj={
              Id,
              title,
              imageUrl,
              price,
              description
            }
          const updatedata=await axios.post(`http://localhost:2000/admin/edit-product`,obj)
         // sessionStorage.removeItem('editproduct')
          window.location.href='./products.html'
             }catch(error){
              console.log(error);
             }
      }
    
          //reset form
      
          function resetForm(){
           document.getElementById('title').value='';
          document.getElementById('description').value='';
          document.getElementById('price').value='';
          document.getElementById('imageUrl').value='';
           document.getElementById('rowIndex').value = '';
          document.getElementById('addButton').innerHTML = 'Add Expense';
          
       }
      
    