// Слайдер перетаскивания пина для изменения эффекта
'use strict';
(function () {
  var ifError = function (message) {
    console.error(message);
  };

  var dataUsers = [];
  window.dataUsers = dataUsers;

  var ifSuccess = function (data) {
    var usersData = data;
    console.log(usersData)
    // ВЫВОДИТ МАССИВ ЗАГРУЖЕННЫХ ОБЪЕКТОВ В КОНСОЛЬ, НО ТОЛЬКО ВНУТРИ ФУНКЦИИ ТАК КАК ЭТО ЛОКАЛЬНАЯ ПЕРЕМЕННАЯ! КАК МНЕ МАССИВ ОБЪЕКТОВ usersData ВЫВЕСТИ В ГЛОБАЛЬНУЮ ПЕРЕМЕННУЮ? НАПРИМЕР В dataUsers, ЧТО-БЫ ПОТОМ ИСПОЛЬЗОВАТЬ В ДРУГИХ ФУНКЦИЯХ ЧЕРЕЗ WINDOWS.! УЖЕ ПЕРЕПРОБОВАЛ ПЕРЕОПРЕДЕЛЯТЬ ЧЕРЕЗ ИЗМЕНЕНИЕ ПЕРЕМЕННОЙ ВНУТРИ ФУНКЦИИ, ЧЕРЕЗ RETURN И Т.П., НИЧЕГО НЕ ПОМОГАЕТ, ВЫВОДИТ ИЛИ UNDEFINED ИЛИ NULL!y
  };

  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

    xhr.timeout = 10000; // 10s

    xhr.open('GET', url);
    xhr.send();
  };

  window.load('https://js.dump.academy/kekstagram/data', ifSuccess, ifError);
})();
