// Получение данных с сервера и отправка их в другие модули
'use strict';
(function () {
  window.getPictures = function (data) {
    var arrayPhotoObjects = data;

    window.renderPictures(arrayPhotoObjects);
    window.filterPictures(arrayPhotoObjects);
    window.previewPictures(arrayPhotoObjects);
  };

  window.load(window.getPictures, window.ifErrorInsert);
})();
