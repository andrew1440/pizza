// // declaring variables
var pizzaFlavour = [
    "Pepperoni",
    "Butternut Squash",
    "Chicken",
    "Marinara",
    "Bianco"
  ];
  var pizzaSize = ["Regular", "Medium", "Large"];
  var pizzaCrust = ["Thin crust", "Thick crust", "Deep crust", "Stuffed crust"];
  var pizzaTopping = ["onion", "Mushroom", "bacon", "black olives"];
  
  // calling functions
  function getFlavour() {
    var flavour = document.getElementById("pizzaflavour").value;
    return parseInt(flavour);
  }
  function getSize() {
    var size = document.getElementById("pizzasize").value;
    return parseInt(size);
  }
  function getCrust() {
    var crust = document.getElementById("pizzacrust").value;
    return parseInt(crust);
  }
  function getTopping() {
    var topping = document.getElementById("pizzatopping").value;
    return parseInt(topping);
  }
  function getNumber() {
    var number = document.getElementById("number").value;
    return parseInt(number);
  }
  function getAmount() {
    var results =
      (getFlavour() + getSize() + getCrust() + getTopping()) * getNumber();
    alert(
      "You've ordered " +
         getNumber("") +
        " pizza's," +   
        "which amounts to Ksh. " +
        results +
        " Thanks for your order,welcome again!"
    );
    prompt("Enter your location");
    prompt("Enter your name");
    prompt("Enter your phone number")
    alert("Your order will be delivered in a while, delivery fee is  Ksh.150/=");
  }
  