var express = require('express');
const multer = require('multer');
const Sequelize = require('sequelize-values')();
const uuid = require('node-uuid');
const sequelize = require('sequelize');

var router = express.Router();
const models = require("../models");



const storage = multer.diskStorage({
  destination: '../shopping-cart/src/images',
  filename(req, file, cb) {
    cb(null, `${uuid.v4()}.${file.originalname.split('.').pop()}`);
  },
});
const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
  const file = req.file; // file passed from client
  const meta = req.body; // all other values passed from the client, like name, etc..
  req.body.image = req.file.filename
  models.sequelize.transaction().then(function(t) {
    return models.Product.create(req.body, {transaction: t}).then(product => {
      return models.Stock.create({inventory:0, status:'Active', UserId:req.body.UserId, 
      	ProductId: product.id}, {transaction: t}).then(stock => [product, stock])
    }).then(function(product, stock) {
      t.commit();
      var data = Sequelize.getValues(product[0]);
      data['inventory'] = 0;
      return res.json(data);
    }).catch(function(err){ 
      console.log(err);
      t.rollback();
      return res.json({message: err})
    })
  })
});

router.get('/', function(req,res){
  models.Product.findAll({include: [{model: models.Stock, attributes: ['inventory'], nested: true}],}).then(function(products) {
    var product = Sequelize.getValues(products);
    console.log(product);
    product = product.map(p => {
      p['inventory'] = p['Stock']['inventory'] || 0;
      delete p['Stock'];
      return p;
    })
    res.json(product);
  })
})

router.put('/product/:id', function(req,res) {
    console.log(req.body,req.params.id);
    models.Product.update(req.body,{where: {id:req.params.id}}).then(product => {
      console.log("updated Product is", Sequelize.getValues(product))
      res.json(Sequelize.getValues(product));
    }).catch(error => {
      res.json({error:error});
    });
})

module.exports = router;