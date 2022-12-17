const fs=require('fs');
const path=require('path');
const p=path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports= class cart
{
        constructor(){
            this.products=[];
            this.totalPrice=0;
        };
        static addProduct(id,productPrice)
        {   
            fs.readFile(p, (err,fileContent)=>{
                let cart={product:[],totalPrice:0}; 
                if(!err)
                {
                    // console.log(fileContent)
                    cart=JSON.parse(fileContent);
                }

                const existingProductIndex=cart.product.findIndex(prod => prod.id === id);
                const existingProduct=cart.product[existingProductIndex];
                let updatedProduct;
                if(existingProduct)
                {
                    updatedProduct={...existingProduct};
                    updatedProduct.qty=updatedProduct.qty+1;
                    cart.product=[...cart.product];
                    cart.product[existingProductIndex]=updatedProduct;
                }
                else
                {
                    updatedProduct={id:id,qty:1};
                    cart.product=[...cart.product,updatedProduct]
                }

                cart.totalPrice=cart.totalPrice + +productPrice;
                fs.writeFile(p,JSON.stringify(cart),err=>{
                    console.log(err);
                })
            })
        }

        static deleteProduct(id,productPrice)
        {
            fs.readFile(p,(err,fileContent)=>{
                if(err)
                {
                    return;
                }
                const updatedProduct={...JSON.parse(fileContent)};
                const product=updatedProduct.products.findIndex(prod=>prod.id===id);
                const productqty=product.qty;
                updatedProduct.products=updatedProduct.products.filter(prod=>{prod.id === id})
                updatedProduct.totalPrice=updatedProduct.totalPrice-productPrice*productqty;
                fs.writeFile(p,JSON.stringify(updatedProduct),err=>{
                    console.log(err);
                })
            })  
        }
}