// Слайдер перетаскивания пина для изменения эффекта
'use strict';

(function () {
  window.upload.imgEffectButtonHandler.addEventListener('mousedown', function (evt) {
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
      window.upload.imgEffectButtonHandler.style.left = (window.upload.imgEffectButtonHandler.offsetLeft - shift.x) + 'px';
      window.upload.imgEffectLevelDepth.style.width = window.upload.imgEffectButtonHandler.style.left;
      window.imgEffectButtonPosition = parseInt(window.upload.imgEffectButtonHandler.style.left, 10);

      // вызов функции которая меняет эффект фильтра
      window.setEffectLevelPin(window.imgEffectButtonPosition, window.upload.imgEffectLevelLine);

      // условие которое ограничивает движение пина
      if (parseInt(window.upload.imgEffectButtonHandler.style.left, 10) < 0) {
        window.upload.imgEffectButtonHandler.style.left = 0;
      } else if (parseInt(window.upload.imgEffectButtonHandler.style.left, 10) > window.upload.imgEffectLevelLine.offsetWidth) {
        window.upload.imgEffectButtonHandler.style.left = window.upload.imgEffectLevelLine.offsetWidth + 'px';
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
