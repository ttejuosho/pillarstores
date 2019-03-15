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
        addToCart(item, quantity);
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
    
    case "remove":
        removeFromCart(item);
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

function addToCart(item, quantity){
    if (priceList[item] !== undefined){
        var price = getPrice(item);
        if (quantity){ price = price*quantity }
        fs.appendFile("items.txt", ", " + item + " - $" + price, function(err){
            if (err) {
                return console.log(err);
              }
        })
        console.log(item + " - $" + price, "added to cart");
    } else {
        console.log("Item not available in store or out of stock");
    }
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
    var total = 0;
    fs.readFile("items.txt", "utf8", function(err,data){
        if (err) {
            return console.log(err);
          }
          data = data.split(", ");
          for (var i = 0; i < data.length; i++) {
              total = total + parseFloat(data[i].split(" - ")[1].slice(1))
            }
            console.log("Your Pre-tax total is $" + total);
            var discount = total*0.1
            total = total - discount;

            console.log("\nCongratulations!! Your purchase qualifies for a one time 10% discount on groceries.\n");
            console.log("Calculating new total ...\n\n");
            console.log("Applying discount ...\n\n");
            console.log("Please Wait ...\n\n");
            console.log("You new total for this purchase is $" +  total);
            console.log("\nYou saved $" + discount.toFixed(2));
    })
}

function removeFromCart(item){
    fs.readFile("items.txt", "utf8", function(err,data){
        if (err) {
            return console.log(err);
          }
          data = data.split(", ");
          var cartItems = [];
          for (var i = 0; i < data.length; i++) {
              cartItems.push(data[i].split(" - ")[0])
            }
            
            var index = cartItems.indexOf(item);
            cartItems.splice(index, 1);
            fs.writeFile("items.txt", "", function(err){
                if (err) {
                    return console.log(err);
                  }
            })
            cartItems.forEach(function(o){
                console.log(o + " - $" + priceList[o]);
                fs.appendFile("items.txt", o + " - $" + priceList[o] + ", ", function(err){
                    if (err) {
                        return console.log(err);
                      }
                })
            })
    })
}