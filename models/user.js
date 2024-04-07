const getDb=require('../util/database').getDb;
const mongodb = require('mongodb');

class User{
  constructor(username,email,cart,id){
    this.username=username;
    this.email=email;
    this.cart=cart;   // {items:[]}
    this._id=id
     }

   save(){
    const db=getDb();
   
    return  db.collection('users').insertOne(this)
    .then(result=>{
      //console.log(result);
      return result
      
    }).catch(err=>{
      console.log(err)
    })

  }

  addToCart(product){
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
    const db=getDb();

    return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)},{$set:{cart:updateCart}});

  }

    getCart(){
      const db=getDb();
        const productIds= this.cart.items.map(i=>{
          return i.productId;
        });
        return db.collection('products').find({_id: {$in: productIds}}).toArray().then(products=>{
          return products.map(p=>{
            return {
              ...p,
              quantity: this.cart.items.find(i=>{
                return i.productId.toString()===p._id.toString()
              }).quantity
            };
          });
        }).catch(err=>console.log(err));
    }

static findById(prodId){
  const db=getDb();
    return db.collection('users')
    .findOne({_id: new mongodb.ObjectId(prodId)})
    .then(user=>{
     // console.log(user);
      return user
      
    }).catch(err=>{
      console.log(err)
    })
}


}

module.exports = User;