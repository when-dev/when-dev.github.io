function calculateTotal() {
    const productSelect = document.getElementById("productSelect");
    const selectedProduct =
      productSelect.options[productSelect.selectedIndex].value;

    const quantity = parseFloat(document.getElementById("quantity").value);

    let price = 0;
    switch (selectedProduct) {
      case "product1":
        price = 10;
        break;
      case "product2":
        price = 20;
        break;
      case "product3":
        price = 30;
        break;
      default:
        price = 0;
    }

    const totalCost = price * quantity;

    document.getElementById("totalCost").textContent = totalCost;
  }