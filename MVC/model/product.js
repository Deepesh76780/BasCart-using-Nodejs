const fs=require('fs');
// const products=[];
const path=require('path');
const p=path.join(path.dirname(process.mainModule.filename),'data','products.json')

const getProductsFromFile=(cb)=>{
    // const p=path.join(path.dirname(process.mainModule.filename),'data','products.json')
        fs.readFile(p,(err,data)=>{
            if(err){
                // return [];
                cb([]);
            }else{
                    cb(JSON.parse(data));
            }})
}       

module.exports=class Product{
    constructor(t){
        this.title=t;
    }   
    save(){
        getProductsFromFile(products=>{
            // let products=[] 
            // if(!err){
            //     products=JSON.parse(data);
            // }
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err)
            });
        });
        // products.push(this);
        // fs.readFile(p,(err,data)=>{
        //     // console.log(data);
        // });
    }
    static fetchAll(cb){
            getProductsFromFile(cb);
        //  return  products;
    }
}