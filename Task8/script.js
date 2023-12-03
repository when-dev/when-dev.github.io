document.addEventListener("DOMContentLoaded", function () {
  const quantityInput = document.getElementById("quantity");
  const totalCostSpan = document.getElementById("totalCost");

  function calculateTotal() {
    let totalCost = 0;

    const selectedServiceType = document.querySelector(
      'input[name="serviceType"]:checked'
    );
    if (selectedServiceType) {
      totalCost += parseFloat(selectedServiceType.getAttribute("data-price"));
    }

    const optionsSelect = document.getElementById("optionsSelect");
    if (optionsSelect && optionsSelect.style.display !== "none") {
      const selectedOption = optionsSelect.options[optionsSelect.selectedIndex];
      totalCost += parseFloat(selectedOption.getAttribute("data-price"));
    }

    const propertyCheckbox = document.getElementById("propertyCheckbox");
    if (
      propertyCheckbox &&
      propertyCheckbox.checked &&
      propertyCheckbox.style.display !== "none"
    ) {
      totalCost += parseFloat(propertyCheckbox.getAttribute("data-price"));
    }

    let quantity = parseFloat(quantityInput.value);

    if (isNaN(quantity) || quantity < 0) {
      quantity = 0;
    }

    totalCost *= quantity;

    if (!isNaN(totalCost)) {
      totalCostSpan.textContent = totalCost;
    } else {
      totalCostSpan.textContent = "0";
    }
  }

  function updateOptionsAndProperties() {
    const selectedServiceType = document.querySelector(
      'input[name="serviceType"]:checked'
    ).value;
    const optionsDiv = document.getElementById("optionsDiv");
    const propertiesDiv = document.getElementById("propertiesDiv");

    if (selectedServiceType === "type1") {
      optionsDiv.style.display = "none";
      propertiesDiv.style.display = "none";
    } else if (selectedServiceType === "type2") {
      optionsDiv.style.display = "block";
      propertiesDiv.style.display = "none";
    } else {
      optionsDiv.style.display = "none";
      propertiesDiv.style.display = "block";
    }
  }

  function handleInput() {
    updateOptionsAndProperties();
    calculateTotal();
  }

  document
    .querySelectorAll('input[name="serviceType"]')
    .forEach(function (radio) {
      radio.addEventListener("change", handleInput);
    });

  document
    .getElementById("optionsSelect")
    .addEventListener("change", calculateTotal);
  document
    .getElementById("propertyCheckbox")
    .addEventListener("change", calculateTotal);
  quantityInput.addEventListener("input", calculateTotal);

  handleInput();
});

$(document).ready(function () {
  $(".slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          centerMode: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 658,
        settings: {
          centerMode: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

const openFormBtn = document.getElementById("openFormBtn");
const closeFormBtn = document.getElementById("closeFormBtn");
const popup = document.getElementById("popup");
const contactForm = document.getElementById("contactForm");
const messageContainer = document.getElementById("messageContainer");

// Открытие формы
openFormBtn.addEventListener("click", function () {
  popup.style.display = "flex";
  // Меняем URL с использованием History API
  history.pushState({ page: "contact-form" }, "Contact Form", "?form=contact");
});

// Закрытие формы
closeFormBtn.addEventListener("click", function () {
  popup.style.display = "none";
  // Возвращаемся к предыдущему URL
  history.back();
});

// Обработка отправки формы
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Отправка данных на сервер
  // В данном примере используем formcarry.com как сервер для сохранения форм
  fetch("https://formcarry.com/s/SZlKfSn8w1", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // or 'application/json', depending on formcarry.com requirements
    },
    body: new FormData(contactForm),
  })
    .then((response) => response.json())
    .then((data) => {
      contactForm.reset();

      messageContainer.textContent = "Форма успешно отправлена!";
    })
    .catch((error) => {
      messageContainer.textContent = "Произошла ошибка при отправке формы.";
    });
});

// Сохранение данных формы в LocalStorage
window.addEventListener("beforeunload", function () {
  const formData = {};
  for (const input of contactForm.elements) {
    if (input.name) {
      formData[input.name] = input.value;
    }
  }
  localStorage.setItem("formData", JSON.stringify(formData));
});

// Восстановление данных формы при загрузке страницы
window.addEventListener("DOMContentLoaded", function () {
  const formData = localStorage.getItem("formData");
  if (formData) {
    const parsedData = JSON.parse(formData);
    for (const input of contactForm.elements) {
      if (input.name && parsedData[input.name]) {
        input.value = parsedData[input.name];
      }
    }
  }
});

// Обработка кнопки "Назад" в браузере
window.addEventListener("popstate", function (event) {
  if (event.state && event.state.page === "contact-form") {
    popup.style.display = "flex";
  } else {
    popup.style.display = "none";
  }
});
