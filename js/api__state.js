// Отображает состояния выполнения работы с сервером
'use strict';

// Данные формы успешно отправлены
(function () {
  window.ifSuccessForm = function () {
    var mainContainer = document.querySelector('main');
    var successContainer = document.querySelector('#success').content;
    var uploadImgButton = document.querySelector('#upload-file');

    uploadImgButton.value = '';
    window.closeImageEditing();

    mainContainer.appendChild(successContainer);

    var success = document.querySelector('.success');
    var successButton = document.querySelector('.success__button');
    var closeSuccessPopup = function (button) {
      button.addEventListener('click', function () {
        success.remove();
      });
    };

    closeSuccessPopup(successButton);
    closeSuccessPopup(success);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        success.remove();
      }
    });
  };

  // Ошибка отправки данных формы
  window.ifErrorForm = function (message) {
    var main = document.querySelector('main');
    var errorContainer = document.querySelector('#error').content;
    var errorMassage = errorContainer.querySelector('.error__title');
    window.closeImageEditing();

    errorMassage.textContent = 'Ошибка: ' + message;
    main.appendChild(errorContainer);

    var error = document.querySelector('.error');
    var errorButton = document.querySelectorAll('.error__button');

    var closeError = function (button) {
      button.addEventListener('click', function () {
        error.remove();
      });
    };

    closeError(error);
    for (var i = 0; i < errorButton.length; i++) {
      closeError(errorButton[i]);
    }

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        error.remove();
      }
    });
  };

  // Ошибка загрузки фотографий
  window.ifErrorInsert = function (message) {
    var main = document.querySelector('main');
    var errorContainer = document.querySelector('#error').content;
    var errorMassage = errorContainer.querySelector('.error__title');

    errorMassage.textContent = 'Ошибка: ' + message;

    var errorButton = errorContainer.querySelectorAll('.error__button');
    errorButton.forEach(function (item) {
      item.style.visibility = 'hidden';
    });
    main.appendChild(errorContainer);
  };

})();
