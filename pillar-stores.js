// Load the fs package to read and write
var fs = require("fs");

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

    case "mycart":
        getCart();
        break;

    case "total":
        getTotal();
        break;
    
    case "pricelist":
        getPriceList();
        break;
}

function getPriceList(){
    for (var item in priceList){
        console.log(item + " - $" + priceList[item] + " each.");
    }
}

function getPrice(item){
    if (priceList[item] !== undefined){
        return priceList[item];
    } else {
        console.log("Item not available in store or out of stock");
    }
}

function addToCart(item){
    var price = getPrice(item);
    fs.appendFile("items.txt", ", " + item + " - $" + price, function(err){
        if (err) {
            return console.log(err);
          }
    })
    console.log(item + " - $" + price, "was added to cart");
}

function getCart(){
    fs.readFile("items.txt", "utf8", function(err, data){
        if (err) {
            return console.log(err);
          }
          data = data.split(", ");
          console.log("==============================");
          console.log("Here are the Items in you cart");
          console.log("==============================\n");
          for (var i = 0; i < data.length; i++) {
                console.log(data[i]);
          }
          console.log("\n==============================");
    })
}

function getTotal(){
    fs.readFile("items.txt", "utf8", function(err, data){
        if (err) {
            return console.log(err);
          }
          data = data.split(", ");
          var total = 0;
          for (var i = 0; i < data.length; i++) {
              total = total + parseFloat(data[i].split(" - ")[1].slice(1))
            }
            console.log("Your Pre-tax total is $" + total);
    })
}
