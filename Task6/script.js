document.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.getElementById("quantity");
    const totalCostSpan = document.getElementById("totalCost");

    function calculateTotal() {
        let totalCost = 0;

        const selectedServiceType = document.querySelector('input[name="serviceType"]:checked');
        if (selectedServiceType) {
            totalCost += parseFloat(selectedServiceType.getAttribute("data-price"));
        }

        const optionsSelect = document.getElementById("optionsSelect");
        if (optionsSelect && optionsSelect.style.display !== "none") {
            const selectedOption = optionsSelect.options[optionsSelect.selectedIndex];
            totalCost += parseFloat(selectedOption.getAttribute("data-price"));
        }

        const propertyCheckbox = document.getElementById("propertyCheckbox");
        if (propertyCheckbox && propertyCheckbox.checked && propertyCheckbox.style.display !== "none") {
            totalCost += parseFloat(propertyCheckbox.getAttribute("data-price"));
        }

        const quantity = parseFloat(quantityInput.value);
        totalCost *= quantity;

        if (!isNaN(totalCost)) {
            totalCostSpan.textContent = totalCost;
        } else {
            totalCostSpan.textContent = "0";
        }
    }

    function updateOptionsAndProperties() {
        const selectedServiceType = document.querySelector('input[name="serviceType"]:checked').value;
        const optionsDiv = document.getElementById('optionsDiv');
        const propertiesDiv = document.getElementById('propertiesDiv');

        if (selectedServiceType === 'type1') {
            optionsDiv.style.display = 'none';
            propertiesDiv.style.display = 'none';
        } else if (selectedServiceType === 'type2') {
            optionsDiv.style.display = 'block';
            propertiesDiv.style.display = 'none';
        } else {
            optionsDiv.style.display = 'none';
            propertiesDiv.style.display = 'block';
        }
    }

    function handleInput() {
        updateOptionsAndProperties();
        calculateTotal();
    }

    document.querySelectorAll('input[name="serviceType"]').forEach(function (radio) {
        radio.addEventListener("change", handleInput);
    });

    document.getElementById("optionsSelect").addEventListener("change", calculateTotal);
    document.getElementById("propertyCheckbox").addEventListener("change", calculateTotal);
    quantityInput.addEventListener("input", calculateTotal);

    handleInput(); 
});
