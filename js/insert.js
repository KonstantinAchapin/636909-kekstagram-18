// Заполняет разметку фотографиями на основе полученных с сервера данных
'use strict';
(function () {
  // контейнер для вставки превьюшек фото

  var imgContainer = document.querySelector('.pictures');
  var imgItem = document.querySelector('#picture').content.querySelector('.picture');

  var getPictureElement = function (item) {
    var imgElement = imgItem.cloneNode(true);
    imgElement.querySelector('.picture__img').src = item.url;
    imgElement.querySelector('.picture__comments');
    imgElement.querySelector('.picture__likes').textContent = item.likes;
    imgElement.querySelector('.picture__comments').textContent = item.comments.length;
    return imgElement;
  };

  window.renderPictures = function (data) {
    // создаем фрагмент
    var fragment = document.createDocumentFragment();
    // проходим циклом по полученным данным
    for (var i = 0; i < data.length; i++) {
      var picture = getPictureElement(data[i]);
      fragment.appendChild(picture);
    }
    // добавляем в DOM;
    imgContainer.appendChild(fragment);

    // определяем в переменную массив отображенных в данный момент картинок
    window.thumbnailImages = document.querySelectorAll('.picture');
  };
})();
