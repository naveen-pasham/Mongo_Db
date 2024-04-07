

const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const userSchema= new Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  cart:{
    items:[
      {
        productId:{type: Schema.Types.ObjectId,ref:'Product', required:true},
        quantity: {type:Number, required:true}
      }
    ]
  }
})

 userSchema.methods.addToCart= function(product){
  const cartProductIndex= this.cart.items.findIndex(cp=>{
         // console.log(product)
          return cp.productId.toString()===product._id.toString();
        });
    
        let newQuantity=1;
    
        const updatedCartItems=[...this.cart.items]
    
        if(cartProductIndex>=0){
          newQuantity=this.cart.items[cartProductIndex].quantity+1;
          updatedCartItems[cartProductIndex].quantity=newQuantity;
        }else{
          updatedCartItems.push({productId:product._id, quantity:newQuantity}); 
        }
    
        const updateCart= {items: updatedCartItems};
        this.cart=updateCart;

        return this.save()
}

userSchema.methods.deleteItemFromCart= function(productId){
  const updatedCartItems= this.cart.items.filter(item=>{
         return item.productId.toString()!==productId.toString();
       });
       
       this.cart.items=updatedCartItems
       return this.save()
}

module.exports=mongoose.model('User',userSchema);















// const getDb=require('../util/database').getDb;
// const { name } = require('ejs');
// const mongodb = require('mongodb');

// class User{
//   constructor(username,email,cart,id){
//     this.username=username;
//     this.email=email;
//     this.cart=cart;   // {items:[]}
//     this._id=id
//      }

//    save(){
//     const db=getDb();
   
//     return  db.collection('users').insertOne(this)
//     .then(result=>{
//       //console.log(result);
//       return result
      
//     }).catch(err=>{
//       console.log(err)
//     })

//   }

//   addToCart(product){
//     const cartProductIndex= this.cart.items.findIndex(cp=>{
//      // console.log(product)
//       return cp.productId.toString()===product._id.toString();
//     });

//     let newQuantity=1;

//     const updatedCartItems=[...this.cart.items]

//     if(cartProductIndex>=0){
//       newQuantity=this.cart.items[cartProductIndex].quantity+1;
//       updatedCartItems[cartProductIndex].quantity=newQuantity;
//     }else{
//       updatedCartItems.push({productId:product._id, quantity:newQuantity}); 
//     }

//     const updateCart= {items: updatedCartItems};
//     const db=getDb();

//     return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)},{$set:{cart:updateCart}});

//   }

//     getCart(){
//       const db=getDb();
//         const productIds= this.cart.items.map(i=>{
//           return i.productId;
//         });
//         return db.collection('products').find({_id: {$in: productIds}}).toArray().then(products=>{
//           return products.map(p=>{
//             return {
//               ...p,
//               quantity: this.cart.items.find(i=>{
//                 return i.productId.toString()===p._id.toString()
//               }).quantity
//             };
//           });
//         }).catch(err=>console.log(err));
//     }

// deleteItemFromCart(productId){
//   const updatedCartItems= this.cart.items.filter(item=>{
    
//      return item.productId.toString()!==productId.toString();
//    });
//    const db=getDb();
//    return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)},{$set:{cart:{items:updatedCartItems}}});

// }

// addOrder(){
//   const db=getDb();
//   return this.getCart().then(products=>{
//     const order={
//       items:products,
//       user:{
//         _id: new mongodb.ObjectId(this._id),
//         name:this.username
//       }
//     };
//     return  db.collection('orders').insertOne(order)
//   })
//   .then(result=>{
//     //console.log(result);
//     this.cart={items:[]};
//     // return result
//     return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)},{$set:{cart:{items:[]}}});

//   }).catch(err=>{
//     console.log(err)
//   })
// }

//   getOrders(){
//     const db=getDb();
//     return db.collection('orders').find({'user._id': new mongodb.ObjectId(this._id)}).toArray()
//     .then(products=>{
//       return products;
//     }).catch(err=> console.log(err));
//   }



// static findById(prodId){
//   const db=getDb();
//     return db.collection('users')
//     .findOne({_id: new mongodb.ObjectId(prodId)})
//     .then(user=>{
//      // console.log(user);
//       return user
      
//     }).catch(err=>{
//       console.log(err)
//     })
// }


// }

// module.exports = User;
