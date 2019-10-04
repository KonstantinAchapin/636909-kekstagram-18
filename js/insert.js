// Заполняет разметку фотографиями на основе объектов из массива
'use strict';

(function () {
  // контейнер для вставки превьюшки фото
  var picturesContainer = document.querySelector('.pictures');

  // функция заполняет DOM элемент из свойств и значений объектов ранее созданного массива arrayObjectsPictures[]
  var getPictureElement = function (arrayIndex) {
    var picture = document.querySelector('#picture');
    picture.content.querySelector('.picture__img').src = 'photos/' + window.creature.arrayObjectsPictures[arrayIndex].url + '.jpg';
    picture.content.querySelector('.picture__comments');
    picture.content.querySelector('.picture__likes').textContent = window.creature.arrayObjectsPictures[arrayIndex].likes;
    picture.content.querySelector('.picture__comments').textContent = window.creature.arrayObjectsPictures[arrayIndex].comments.length;
    return document.querySelector('#picture').content.querySelector('.picture');
  };

  // цикл вызывает функцию заполнения объекта и добавляет элементы в разметку
  for (var i = 0; i <= window.creature.NUMBER_OF_MOK_OBJECT; i++) {
    var template = getPictureElement(i);
    var element = template.cloneNode(true);
    picturesContainer.appendChild(element);
  }
})();
