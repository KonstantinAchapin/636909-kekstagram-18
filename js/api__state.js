// Отображает состояния выполнения работы с сервером
'use strict';

// Данные формы успешно отправлены
(function () {
  window.showSuccessWindow = function () {
    var mainContainer = document.querySelector('main');
    var successFragment = document.querySelector('#success').content;
    var uploadImgButton = document.querySelector('#upload-file');

    uploadImgButton.value = '';
    window.closeImageEditing();

    mainContainer.appendChild(successFragment);

    var successContainer = document.querySelector('.success');
    var successButton = document.querySelector('.success__button');

    var closePopupSuccess = function () {
      successContainer.style.display = 'none';
      document.removeEventListener('keydown', closePopupSuccessKeydown);
    };

    var closePopupSuccessKeydown = function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        closePopupSuccess();
      }
    };

    document.addEventListener('keydown', closePopupSuccessKeydown);

    successContainer.style.display = 'flex';

    var addCloseSuccessPopupHandler = function (button) {
      button.addEventListener('click', function () {
        closePopupSuccess();
      });
    };

    addCloseSuccessPopupHandler(successButton);
    addCloseSuccessPopupHandler(successContainer);
  };

  // Ошибка отправки данных формы
  window.showFillErrorWindow = function (message) {
    var main = document.querySelector('main');
    var errorFragment = document.querySelector('#error').content;
    var errorMassage = errorFragment.querySelector('.error__title');
    window.closeImageEditing();

    errorMassage.textContent = 'Ошибка: ' + message;
    main.appendChild(errorFragment);

    var errorContainer = document.querySelector('.error');
    var errorButtons = document.querySelectorAll('.error__button');

    errorContainer.style.display = 'flex';

    var closePopupError = function () {
      errorContainer.style.display = 'none';
      document.removeEventListener('keydown', closePopupErrorKeydown);
    };

    var addCloseErrorPopupHandler = function (button) {
      button.addEventListener('click', function () {
        closePopupError();
      });
    };

    var closePopupErrorKeydown = function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        closePopupError();
      }
    };

    document.addEventListener('keydown', closePopupErrorKeydown);

    addCloseErrorPopupHandler(errorContainer);
    for (var i = 0; i < errorButtons.length; i++) {
      addCloseErrorPopupHandler(errorButtons[i]);
    }
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
