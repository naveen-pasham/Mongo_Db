const path = require('path');
const Expense=require('../models/expense');



exports.postAddExpense = (req, res, next) => {
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  const expense=new Expense ({
    amount: amount,
    description: description,
    category: category
  });
  expense.save()
    .then(Expensedetails => {
      res.json({Expensedetails});
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getEditExpense= (req, res, next)=>{
    const prodId = req.params.Id;
    Expense.findById(prodId).then(expense=>{
      res.json(expense);
    }).catch(err=>console.log(err));

};

    exports.postEditExpense = (req, res, next) => {
      const Id=req.body.Id;
      const amount = req.body.amount;
      const description = req.body.description;
      const category = req.body.category;
      Expense.findById(Id)
    .then(expense => {
     
      expense.amount = amount;
      expense.description = description;
      expense.category = category;
      return expense.save();
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
  };
  
exports.getExpenses = (req, res, next) => {
  Expense.find().then(result => {
    res.json(result)
  })
  .catch(err => {
    console.log(err);
  });
};

exports.DeleteExpense= (req, res, next)=>{
  const prodId = req.params.Id;
  Expense.findByIdAndDelete(prodId)
    .then(result => {
     res.json({message:'Product Deleted'});
    })
    .catch(err => console.log(err));
};

