// Получение данных с сервера и получение их другими модулями
'use strict';
(function () {
  window.getPictures = function (data) {
    var arrayPhotoObjects = data;

    window.renderPictures(arrayPhotoObjects);
    window.filterPictures(arrayPhotoObjects);
    window.previewPictures(arrayPhotoObjects);
  };

  window.load(window.getPictures, window.showLoadingErrorWindow);
})();
