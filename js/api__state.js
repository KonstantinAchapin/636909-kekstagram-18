// Отображает состояния выполнения работы с сервером
'use strict';

// Данные формы успешно отправлены
(function () {
  window.ifSuccessForm = function () {
    window.closeImageEditing();
    var main = document.querySelector('main');
    var successContainer = document.querySelector('#success').content;

    main.appendChild(successContainer);

    var success = document.querySelector('.success');
    var successButton = document.querySelector('.success__button');
    var closeSuccess = function (button) {
      button.addEventListener('click', function () {
        success.remove();
      });
    };
    closeSuccess(successButton);
    closeSuccess(success);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        success.remove();
      }
    });
  };

  // Ошибка отправки данных формы
  window.ifErrorForm = function (message) {
    window.closeImageEditing();
    var main = document.querySelector('main');
    var errorContainer = document.querySelector('#error').content;
    var errorMassage = errorContainer.querySelector('.error__title');

    errorMassage.textContent = 'Ошибка: ' + message;
    main.appendChild(errorContainer);

    var error = document.querySelector('.error');
    var errorButton = document.querySelectorAll('.error__button');

    var closeError = function (button) {
      button.addEventListener('click', function () {
        error.remove();
      });
    };

    error.addEventListener('click', function () {
      error.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        error.remove();
      }
    });

    for (var i = 0; i < errorButton.length; i++) {
      closeError(errorButton[i]);
    }
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
