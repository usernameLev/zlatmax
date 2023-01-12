function formQuantity() {
  document.addEventListener('click', function (e) {
    let targetElement = e.target;
    if (targetElement.closest('.quantity__button')) {
      let value = parseInt(
        targetElement.closest('.quantity').querySelector('input').value,
      );
      if (targetElement.classList.contains('quantity__button_plus')) {
        value++;
      } else {
        --value;
        if (value < 1) value = 1;
      }
      targetElement.closest('.quantity').querySelector('input').value = value;
    }
  });
}

formQuantity();
