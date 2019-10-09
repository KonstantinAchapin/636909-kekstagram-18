// Загружает файлы с удаленного сервера
'use strict';
(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.ifErrorInsert = function (message) {
    // Подправил попап для этого случая его возникновения, что бы интереснее было
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
