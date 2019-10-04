// Функционал добавления и редактирования фото после загрузки
'use strict';

(function () {
  var STEP_OF_CHANGE_VALUE_IMG = 25;
  var MIN_VALUE_NUMBER_IMG = 25;
  var MAX_VALUE_NUMBER_IMG = 100;
  var STEP_OF_CHANGE_NUMBER_FOR_SIZE_IMG = 0.25;
  var INITIAL_VALUE_IMG = 100;
  var INITIAL_NUMBER_FOR_SIZE_IMG = 1;

  var imgUploadSection = document.querySelector('.img-upload');

  window.upload = {
    imgUploadSection: imgUploadSection
  };

  var imgUploadForm = imgUploadSection.querySelector('#upload-select-image');
  var imgEditingForm = imgUploadSection.querySelector('.img-upload__overlay');
  var imgUserDownloader = imgUploadSection.querySelector('#upload-file');
  var imgButtonClose = imgUploadSection.querySelector('#upload-cancel');

  var scaleControlSmaller = imgUploadSection.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadSection.querySelector('.scale__control--bigger');
  var scaleControlValue = imgUploadSection.querySelector('.scale__control--value');

  var imgRadioEffectButton = imgUploadSection.querySelectorAll('.effects__radio');
  var imgEffectChangeButton = imgUploadSection.querySelector('.effect-level__pin');
  var imgEffectLevelLine = imgUploadSection.querySelector('.effect-level__line');

  // определяем, а потом скрываем слайдер редактирования по умолчанию
  var imgSliderEffect = imgUploadSection.querySelector('.img-upload__effect-level');
  imgSliderEffect.style.visibility = 'hidden';

  // задаем начальное значение value размера изображения в 100%
  var scaleControlValueNumber = INITIAL_VALUE_IMG;
  scaleControlValue.setAttribute('value', scaleControlValueNumber + '%');

  // определяем переменную которая хранит размер размер изображения
  var imgUploadPreview = imgUploadSection.querySelector('.img-upload__preview');
  var numberForSize = INITIAL_NUMBER_FOR_SIZE_IMG;

  // определяем переменную которая хранит позицию пина на линейке изменения эффекта
  var positionEffectPin = 0;

  // событие открытия попапа после загрузки фотографии
  imgUserDownloader.addEventListener('change', function () {
    openImageEditing();

    // находим позицию пина на линейке изменения и делаем пропорцию в %
    var posPinX = imgEffectChangeButton.offsetLeft;
    var widthParentPin = imgEffectLevelLine.offsetWidth;
    positionEffectPin = Math.round((posPinX / widthParentPin) * 100);

    // добавляем событие закрытие по кнопке ESC
    document.addEventListener('keydown', buttonClickHandler);
  });

  // функция закрытия по кнопке ESC
  var buttonClickHandler = function (evt) {
    if (evt.target !== window.upload.imgHashTags && evt.target !== window.upload.imgComment) {
      if (evt.keyCode === window.preview.ESC_KEYCODE) {
        closeImageEditing();
      }
    }
  };

  // функция открытия попапа
  var openImageEditing = function () {
    imgEditingForm.classList.remove('hidden');
  };

  // событие закрытия попапа
  imgButtonClose.addEventListener('click', function () {
    closeImageEditing();
  });

  // функция закрытия попапа
  var closeImageEditing = function () {
    imgEditingForm.classList.add('hidden');

    // сброс значения размера value %;
    scaleControlValue.setAttribute('value', INITIAL_VALUE_IMG + '%');
    scaleControlValueNumber = INITIAL_VALUE_IMG;
    // сброс размера картинки scale;
    imgUploadPreview.style.transform = 'scale(' + INITIAL_NUMBER_FOR_SIZE_IMG + ')';
    numberForSize = INITIAL_NUMBER_FOR_SIZE_IMG;
    // сброс полосы регулировки эффекта на оригинал
    imgSliderEffect.style.visibility = 'hidden';
    // сброс фильтра изображения;
    imgUploadPreview.className = 'img-upload__preview';
    imgUploadPreview.style.filter = null;
    // сброс заполненной формы;
    imgUploadForm.reset();
  };

  // событие клика которое уменьшает размер изображения и меняет value %
  scaleControlSmaller.addEventListener('click', function () {
    if (scaleControlValueNumber > MIN_VALUE_NUMBER_IMG) {
      scaleControlValueNumber -= STEP_OF_CHANGE_VALUE_IMG;
      scaleControlValue.setAttribute('value', scaleControlValueNumber + '%');

      numberForSize -= STEP_OF_CHANGE_NUMBER_FOR_SIZE_IMG;
      imgUploadPreview.style.transform = 'scale(' + numberForSize + ')';
    }
  });

  // событие клика которое увеличивает размер изображения и меняет value %
  scaleControlBigger.addEventListener('click', function () {
    if (scaleControlValueNumber < MAX_VALUE_NUMBER_IMG) {
      scaleControlValueNumber += STEP_OF_CHANGE_VALUE_IMG;
      scaleControlValue.setAttribute('value', scaleControlValueNumber + '%');

      numberForSize += STEP_OF_CHANGE_NUMBER_FOR_SIZE_IMG;
      imgUploadPreview.style.transform = 'scale(' + numberForSize + ')';
    }
  });

  // функция которая передает в событие нажатую кнопку, а дальше событие с помощью условий меняет классы изображения, добавляя соответствующие фильтры
  var modifiedImageEffect = function (currentRadioButton) {
    currentRadioButton.addEventListener('click', function () {
      currentRadioButton.checked = true;
      imgUploadPreview.style.filter = null;
      // Скрываем полосу фильтров на позиции - оригинал
      if (imgRadioEffectButton[0].checked) {
        imgSliderEffect.style.visibility = 'hidden';
      } else {
        imgSliderEffect.style.visibility = 'visible';
      }

      if (currentRadioButton.id === 'effect-none') {
        imgUploadPreview.className = 'img-upload__preview';
      } else if (currentRadioButton.id === 'effect-chrome') {
        imgUploadPreview.className = 'img-upload__preview effects__preview--chrome';
        imgUploadPreview.style.filter = 'grayscale(1)';
      } else if (currentRadioButton.id === 'effect-sepia') {
        imgUploadPreview.className = 'img-upload__preview effects__preview--sepia';
        imgUploadPreview.style.filter = 'sepia(1)';
      } else if (currentRadioButton.id === 'effect-marvin') {
        imgUploadPreview.className = 'img-upload__preview effects__preview--marvin';
        imgUploadPreview.style.filter = 'invert(100%)';
      } else if (currentRadioButton.id === 'effect-phobos') {
        imgUploadPreview.className = 'img-upload__preview effects__preview--phobos';
        imgUploadPreview.style.filter = 'blur(3px)';
      } else if (currentRadioButton.id === 'effect-heat') {
        imgUploadPreview.className = 'img-upload__preview effects__preview--heat';
        imgUploadPreview.style.filter = 'brightness(3)';
      }

      // событие отжатия клавиши от пина при котором меняется фильтр эффекта в соответствии с положением пина на линейке (сейчас оно 20%)
      imgEffectChangeButton.addEventListener('mouseup', function () {
        if (imgUploadPreview.className === 'img-upload__preview effects__preview--chrome') {
          imgUploadPreview.style.filter = 'grayscale(' + positionEffectPin / 100 + ')';
        } else if (imgUploadPreview.className === 'img-upload__preview effects__preview--sepia') {
          imgUploadPreview.style.filter = 'sepia(' + positionEffectPin / 100 + ')';
        } else if (imgUploadPreview.className === 'img-upload__preview effects__preview--marvin') {
          imgUploadPreview.style.filter = 'invert(' + positionEffectPin / 100 + '%' + ')';
        } else if (imgUploadPreview.className === 'img-upload__preview effects__preview--phobos') {
          imgUploadPreview.style.filter = 'blur(' + Math.round((positionEffectPin / 4) / 10) + 'px' + ')';
        } else if (imgUploadPreview.className === 'img-upload__preview effects__preview--heat') {
          imgUploadPreview.style.filter = 'brightness(' + Math.round((positionEffectPin / 3) / 10) + ')';
        }
      });
    });
  };

  // цикл который перебирает радиобаттоны и вызывает функцию модификации изображения, добавления ей фильтров
  for (var i = 0; i < imgRadioEffectButton.length; i++) {
    modifiedImageEffect(imgRadioEffectButton[i]);
  }
})();
