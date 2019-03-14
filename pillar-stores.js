var action = process.argv[2];
var item = process.argv[3];
var quantity = process.argv[4];

var priceList = {
    "milk": 2.45,
    "sugar": 3.78,
    "eggs": 6.50,
    "cereal": 12.54,
    "beef": 8.59,
    "chicken": 9.35,
    "turkey": 9.04,
    "cookies": 4.59,
    "bagles": 11.36
}

switch (action){
    case "price":
    getPrice(item);
    break;
    case "buy":
        addToCart(item);
        break;
}

function getPrice(item){
    if (priceList[item] !== undefined){
        return priceList[item];
    } else {
        console.log("Item not available in store or out of stock");
    }
}

function addToCart(){

}