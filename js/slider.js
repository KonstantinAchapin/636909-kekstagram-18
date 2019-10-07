// Слайдер перетаскивания пина для изменения эффекта
'use strict';
(function () {

  var imgEffectButtonHandler = window.upload.imgUploadSection.querySelector('.effect-level__pin');
  var imgEffectLevelLine = window.upload.imgUploadSection.querySelector('.effect-level__line');
  var imgEffectLevelDepth = window.upload.imgUploadSection.querySelector('.effect-level__depth');

  window.slider = {
    imgEffectButtonHandler: imgEffectButtonHandler,
    imgEffectLevelLine: imgEffectLevelLine,
    imgEffectLevelDepth: imgEffectLevelDepth
  };

  imgEffectButtonHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var initialPositionPin = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: initialPositionPin.x - moveEvt.clientX
      };

      initialPositionPin = {
        x: moveEvt.clientX
      };
      imgEffectButtonHandler.style.left = (imgEffectButtonHandler.offsetLeft - shift.x) + 'px';
      imgEffectLevelDepth.style.width = imgEffectButtonHandler.style.left;
      window.imgEffectButtonPosition = parseInt(imgEffectButtonHandler.style.left, 10);

      // вызов функции которая меняет эффект фильтра
      window.setEffectLevelPin(window.imgEffectButtonPosition, imgEffectLevelLine);

      // условие которое ограничивает движение пина
      if (parseInt(imgEffectButtonHandler.style.left, 10) < 0) {
        imgEffectButtonHandler.style.left = 0;
      } else if (parseInt(imgEffectButtonHandler.style.left, 10) > imgEffectLevelLine.offsetWidth) {
        imgEffectButtonHandler.style.left = imgEffectLevelLine.offsetWidth + 'px';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
