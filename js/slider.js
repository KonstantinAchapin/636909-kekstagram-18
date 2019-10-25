// Слайдер перетаскивания пина для изменения эффекта
'use strict';
(function () {

  var RADIX_PARAMETR_PARSEINT = 10;
  var MIN_PIN_POSITION = 0;

  var imgEffectButtonHandler = document.querySelector('.effect-level__pin');
  var imgEffectLevelLine = document.querySelector('.effect-level__line');
  var imgEffectLevelDepth = document.querySelector('.effect-level__depth');

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

      imgEffectLevelDepth.style.width = imgEffectButtonHandler.style.left;
      imgEffectButtonHandler.style.left = (imgEffectButtonHandler.offsetLeft - shift.x) + 'px';

      window.imgEffectButtonPosition = parseInt(imgEffectButtonHandler.style.left, RADIX_PARAMETR_PARSEINT);

      // вызов функции которая меняет эффект фильтра
      window.setEffectLevelPin(window.imgEffectButtonPosition, imgEffectLevelLine);

      // условие которое ограничивает движение пина
      if (parseInt(imgEffectButtonHandler.style.left, RADIX_PARAMETR_PARSEINT) < MIN_PIN_POSITION) {
        imgEffectButtonHandler.style.left = MIN_PIN_POSITION;
      } else if (parseInt(imgEffectButtonHandler.style.left, RADIX_PARAMETR_PARSEINT) > imgEffectLevelLine.offsetWidth) {
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
