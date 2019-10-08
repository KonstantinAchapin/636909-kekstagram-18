// Заполняет разметку фотографиями на основе объектов из массива
'use strict';

(function () {
  // контейнер для вставки превьюшек фото
  var imgContainer = document.querySelector('.pictures');
  var imgItem = document.querySelector('#picture').content.querySelector('.picture');

  // функция заполняет DOM элемент из свойств и значений объектов ранее созданного массива arrayObjectsPictures[]
  var fillPictureElement = function (arrayIndex) {
    var imgElement = imgItem.cloneNode(true);
    imgElement.querySelector('.picture__img').src = 'photos/' + window.creature.arrayObjectsPictures[arrayIndex].url + '.jpg';
    imgElement.querySelector('.picture__comments');
    imgElement.querySelector('.picture__likes').textContent = window.creature.arrayObjectsPictures[arrayIndex].likes;
    imgElement.querySelector('.picture__comments').textContent = window.creature.arrayObjectsPictures[arrayIndex].comments.length;
    return imgElement;
  };

  var fragment = document.createDocumentFragment();
  var renderImg = function (array) {
    // цикл вызывает функцию заполнения объекта и добавляет элементы в разметку
    for (var i = 0; i <= window.creature.NUMBER_OF_MOK_OBJECT; i++) {
      fragment.appendChild(array(i));
    }
  };
  renderImg(fillPictureElement);
  imgContainer.appendChild(fragment);

  // window.load('https://js.dump.academy/kekstagram/data', renderImg, window.ifError); // В ЭТОМ ВЫЗОВЕ ЧТО БРАТЬ ПАРАМЕТРОМ ДЛЯ ПЕРЕДАЧИ МАССИВА? Я ХОТЕЛ В renderImg ПЕРЕДАТЬ МАССИВ data И УЖЕ ПРИ ВЫЗОВЕ renderImg(fillPictureElement) ПЕРЕДАТЬ ЕГО ВМЕСТЕ С НОМЕРОМ arrayIndex В ФУНКЦИЮ fillPictureElement, ГДЕ ЗАМЕНИТЬ window.creature.arrayObjectsPictures НА ПАРАМЕТР data С МАССИВОМ. НО ЕСЛИ Я ПЫТАЮСЬ ФУНКЦИИ renderImg ПЕРЕДАТЬ МАССИВ ТО НАТЫКАЮСЬ НА ТО ЧТО У НЕЁ УЖЕ ЕСТЬ ПАРАМЕТР array И КАК ТУТ ИСПОЛЬЗОВАТЬ ЕЩЁ И ПАРАМЕТР data НЕ ПОЙМУ? С fillPictureElement ТАКАЯ ЖЕ ИСТОРИЯ? ЧУВСТВУЮ ЧТО ТУТ ВСЕ ПРОСТО, НО ПОНЯТЬ НЕ МОГУ ...
})();
