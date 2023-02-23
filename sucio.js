
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    
    var xmlDoc = this.responseXML;

    var products = xmlDoc.getElementsByTagName("producto");
    
    var selectElement = document.getElementById("productSelect");

    selectElement.innerHTML = "";

    for (var i = 0; i < products.length; i++) {
      var productId = products[i].getAttribute("id");
      var productDescription = products[i].getElementsByTagName("descripcion")[0].childNodes[0].nodeValue;
      var optionElement = document.createElement("option");
      optionElement.value = productId;
      optionElement.textContent = productId + " - " + productDescription;
      selectElement.appendChild(optionElement);
    }
  }
};
xhttp.open("GET", "productos.xml", true);
xhttp.send();

var productSelectElement = document.getElementById("productSelect");
productSelectElement.addEventListener("change", function() {
  var productId = this.value;
  var quantityElement = document.getElementById("quantityInput");
  quantityElement.value = "";
  if (productId) {
    quantityElement.disabled = false;
  } else {
    quantityElement.disabled = true;
  }
});
