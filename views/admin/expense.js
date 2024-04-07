 // add user 
 function addexpense(event) {
    event.preventDefault();
     const amount=document.getElementById('amount').value;
     const description=document.getElementById('description').value;
     const category=document.getElementById('category').value;
     let Id = document.getElementById('Id').value;
     const rowIndex=document.getElementById('rowIndex').value;
   
     const obj={
       amount,
       description,
       category

     }
     if (Id === '') {
       axios.post('http://localhost:2000/expense/add-expense',obj).then(result=>{
         showNewExpenseOnScreen(result.data.Expensedetails);
       }).catch(err => {
           console.log(err);
      });
     }else{
         updateExpense(Id, amount, description, category,rowIndex);
     }
       resetForm();
   }

   window.addEventListener("DOMContentLoaded",  () =>{
        axios.get('http://localhost:2000/expense/get-expense').then(response=>{
         for(var i=0;i<response.data.length;i++){
           showNewExpenseOnScreen(response.data[i])
         }
       }).catch(err=>console.log(err));
   
});

//edit form
async function editExpense(row) {
 try{
   const rowIndex = row.rowIndex - 1;
   const id= row.cells[0].innerHTML;
   console.log(id)
   const response= await axios.get(`http://localhost:2000/expense/edit-expense/${id}`)
   document.getElementById('amount').value=response.data.amount;
   document.getElementById('description').value=response.data.description;
   document.getElementById('category').value=response.data.category;
   document.getElementById('Id').value = response.data.id;
   document.getElementById('rowIndex').value = rowIndex;
   document.getElementById('addButton').innerHTML="Update Expense";  
     }catch(error){
       console.log(error);
     }
}


//update user
async function updateExpense(Id, amount, description, category,rowIndex){
 try{
   const obj={
       Id,
       amount,
       description,
       category
     }
   const updatedata=await axios.post(`http://localhost:2000/expense/edit-expense`,obj)
 let tableRow =await document.getElementById('expenseTable').getElementsByTagName('tr')[parseInt(rowIndex)+1];
   tableRow.cells[1].innerHTML = obj.amount;
   tableRow.cells[2].innerHTML = obj.description;
   tableRow.cells[3].innerHTML = obj.category;

      }catch(error){
       console.log(error);
      }
}

//delete user

function removeExpense(row) {
   row.parentNode.removeChild(row);
   const id= row.cells[0].innerHTML;
     axios.get(`http://localhost:2000/expense/delete/${id}`) 
   }

   //reset form

   function resetForm(){
    document.getElementById('amount').value='';
   document.getElementById('description').value='';
   document.getElementById('category').value='';
   document.getElementById('Id').value = '';
   document.getElementById('rowIndex').value = '';
   document.getElementById('addButton').innerHTML = 'Add Expense';
}

   function showNewExpenseOnScreen(user){
   let tableBody =  document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
         let row = '<tr><td hidden>'+user._id+'</td><td>' + user.amount + '</td><td>' + user.description + '</td><td>' + user.category + '</td><td><button type="button" class="btn btn-sm btn-primary" onclick="editExpense(this.parentNode.parentNode)">Edit</button> <button type="button" class="btn btn-sm btn-danger" onclick="removeExpense(this.parentNode.parentNode)">Delete</button></td></tr>';
         tableBody.insertAdjacentHTML('beforeend', row);
}