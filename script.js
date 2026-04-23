
  // PRODUCT CLASS
class Product {
    constructor(name, price, stock){
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    isAvailable(qty){
        return this.stock >= qty;
    }

    reduceStock(qty){
        if(this.isAvailable(qty)){
            this.stock -= qty;
            return true;
        }
        return false;
    }
}


  // ORDER CLASS

class Order {
    constructor(){
        this.items = [];
    }

    addItem(product, qty){
        if(product.reduceStock(qty)){
            this.items.push({
                name: product.name,
                price: product.price,
                quantity: qty
            });
        } else {
            alert(product.name + " out of stock");
        }
    }

    getTotal(){
        return this.items.reduce((sum, item)=>{
            return sum + item.price * item.quantity;
        },0);
    }
}