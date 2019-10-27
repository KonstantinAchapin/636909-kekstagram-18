// Отображает состояния выполнения работы с сервером
'use strict';

// Данные формы успешно отправлены
(function () {
  window.showSuccessWindow = function () {
    var mainContainer = document.querySelector('main');
    var successContainer = document.querySelector('#success').content;
    var uploadImgButton = document.querySelector('#upload-file');

    uploadImgButton.value = '';
    window.closeImageEditing();

    mainContainer.appendChild(successContainer);

    var success = document.querySelector('.success');
    var successButton = document.querySelector('.success__button');

    success.style.display = 'flex';

    var closeSuccessPopup = function (button) {
      button.addEventListener('click', function () {
        success.style.display = 'none';
      });
    };

    closeSuccessPopup(successButton);
    closeSuccessPopup(success);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        success.style.display = 'none';
      }
    });
  };

  // Ошибка отправки данных формы
  window.showFillErrorWindow = function (message) {
    var main = document.querySelector('main');
    var errorContainer = document.querySelector('#error').content;
    var errorMassage = errorContainer.querySelector('.error__title');
    window.closeImageEditing();

    errorMassage.textContent = 'Ошибка: ' + message;
    main.appendChild(errorContainer);

    var error = document.querySelector('.error');
    var errorButtons = document.querySelectorAll('.error__button');

    error.style.display = 'flex';

    var closeError = function (button) {
      button.addEventListener('click', function () {
        error.style.display = 'none';
      });
    };

    closeError(error);
    for (var i = 0; i < errorButtons.length; i++) {
      closeError(errorButtons[i]);
    }

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        error.style.display = 'none';
      }
    });
  };

  // Ошибка загрузки фотографий
  window.showLoadingErrorWindow = function (message) {
    var main = document.querySelector('main');
    var errorContainer = document.querySelector('#error').content;
    var errorMassage = errorContainer.querySelector('.error__title');

    errorMassage.textContent = 'Ошибка: ' + message;

    var errorButtons = errorContainer.querySelectorAll('.error__button');
    errorButtons.forEach(function (item) {
      item.style.visibility = 'hidden';
    });
    main.appendChild(errorContainer);
  };

})();
