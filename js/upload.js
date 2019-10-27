// Функционал добавления и редактирования фото после загрузки
'use strict';

(function () {
  var STEP_OF_CHANGE_VALUE_IMG = 25;
  var MIN_VALUE_NUMBER_IMG = 25;
  var MAX_VALUE_NUMBER_IMG = 100;
  var STEP_OF_CHANGE_NUMBER_FOR_SIZE_IMG = 0.25;
  var INITIAL_VALUE_IMG = 100;
  var INITIAL_NUMBER_FOR_SIZE_IMG = 1;

  var NUMBER_PROPORTION_FOR_VALUE = 100;
  var INITIAL_NUMBER_FOR_VALUE = 100;

  var FILTER_INVERT_PROPORTION_NUMBER = 100;
  var FILTER_BLUR_PROPORTION_NUMBER = 3;
  var FILTER_BRIGHTNESS_PROPORTION_NUMBER_FIRST = 0.5;
  var FILTER_BRIGHTNESS_PROPORTION_NUMBER_SECOND = 2;


  var imgUploadSection = document.querySelector('.img-upload');

  var imgUploadForm = imgUploadSection.querySelector('#upload-select-image');
  var imgEditingForm = imgUploadSection.querySelector('.img-upload__overlay');
  var imgDownloaderHandler = imgUploadSection.querySelector('#upload-file');
  var imgButtonCloseHandler = imgUploadSection.querySelector('#upload-cancel');

  var scaleControlSmallHandler = imgUploadSection.querySelector('.scale__control--smaller');
  var scaleControlBigHandler = imgUploadSection.querySelector('.scale__control--bigger');
  var scaleControlValue = imgUploadSection.querySelector('.scale__control--value');

  var effectLevelValue = document.querySelector('.effect-level__value');

  var imgRadioEffectButtons = imgUploadSection.querySelectorAll('.effects__radio');


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
  var imgEffectButtonPosition = 0;

  // задаем начальное значение input value шкалы изменения эффекта
  effectLevelValue.setAttribute('value', INITIAL_NUMBER_FOR_VALUE);

  window.upload = {
    imgUploadSection: imgUploadSection,
    imgEffectButtonPosition: imgEffectButtonPosition,
    imgEditingForm: imgEditingForm
  };

  // событие открытия попапа после загрузки фотографии
  imgDownloaderHandler.addEventListener('change', function () {
    openImageEditing();

    // добавляем событие закрытие по кнопке ESC
    document.addEventListener('keydown', buttonClickHandler);
  });

  // функция закрытия по кнопке ESC
  var buttonClickHandler = function (evt) {
    if (evt.target !== window.form.imgHashTag && evt.target !== window.form.imgComment) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        window.closeImageEditing();
        document.removeEventListener('keydown', buttonClickHandler);
      }
    }
  };

  // функция открытия попапа
  var openImageEditing = function () {
    imgEditingForm.classList.remove('hidden');
  };

  // событие закрытия попапа
  imgButtonCloseHandler.addEventListener('click', function () {
    window.closeImageEditing();
  });

  // функция закрытия попапа
  window.closeImageEditing = function () {
    imgEditingForm.classList.add('hidden');
    document.removeEventListener('keydown', buttonClickHandler);

    // сброс значения размера value %;
    scaleControlValue.setAttribute('value', INITIAL_VALUE_IMG + '%');
    scaleControlValueNumber = INITIAL_VALUE_IMG;
    // сброс размера картинки scale;
    imgUploadPreview.style.transform = 'scale(' + INITIAL_NUMBER_FOR_SIZE_IMG + ')';
    numberForSize = INITIAL_NUMBER_FOR_SIZE_IMG;
    // сброс инпута эффекта
    effectLevelValue.setAttribute('value', INITIAL_NUMBER_FOR_VALUE);
    // сброс полосы регулировки эффекта на оригинал
    imgSliderEffect.style.visibility = 'hidden';
    // сброс фильтра изображения;
    imgUploadPreview.className = 'img-upload__preview';
    imgUploadPreview.style.filter = null;
    // сброс заполненной формы и валидации полей;
    imgUploadForm.reset();
    window.form.imgComment.style.border = window.FORM_BORDER_HEIGHT + ' solid ' + window.SUCCESS_FORM_BORDER_COLOR;
    window.form.imgHashTag.style.border = window.FORM_BORDER_HEIGHT + ' solid ' + window.SUCCESS_FORM_BORDER_COLOR;
  };

  // событие клика которое уменьшает размер изображения и меняет value %
  scaleControlSmallHandler.addEventListener('click', function () {
    if (scaleControlValueNumber > MIN_VALUE_NUMBER_IMG) {
      scaleControlValueNumber -= STEP_OF_CHANGE_VALUE_IMG;
      scaleControlValue.setAttribute('value', scaleControlValueNumber + '%');

      numberForSize -= STEP_OF_CHANGE_NUMBER_FOR_SIZE_IMG;
      imgUploadPreview.style.transform = 'scale(' + numberForSize + ')';
    }
  });

  // событие клика которое увеличивает размер изображения и меняет value %
  scaleControlBigHandler.addEventListener('click', function () {
    if (scaleControlValueNumber < MAX_VALUE_NUMBER_IMG) {
      scaleControlValueNumber += STEP_OF_CHANGE_VALUE_IMG;
      scaleControlValue.setAttribute('value', scaleControlValueNumber + '%');

      numberForSize += STEP_OF_CHANGE_NUMBER_FOR_SIZE_IMG;
      imgUploadPreview.style.transform = 'scale(' + numberForSize + ')';
    }
  });

  // функция которая передает в событие нажатую кнопку, а дальше событие с помощью условий меняет классы изображения, добавляя соответствующие фильтры
  var changesImageEffect = function (currentRadioButton) {
    // выбирает эффект изображения
    var selectionEffect = function () {
      currentRadioButton.checked = true;
      imgUploadPreview.style.filter = null;
      window.slider.imgEffectButtonHandler.style.left = window.slider.imgEffectLevelLine.offsetWidth + 'px';
      window.slider.imgEffectLevelDepth.style.width = window.slider.imgEffectLevelLine.offsetWidth + 'px';
    };

    // Скрываем полосу фильтров на позиции - оригинал
    var hiddenImgSliderEffect = function () {
      if (currentRadioButton.id === 'effect-none') {
        imgSliderEffect.style.visibility = 'hidden';
      } else {
        imgSliderEffect.style.visibility = 'visible';
      }
    };

    // применяет стили эффекта к изображению
    var applyPressingEffect = function () {
      if (currentRadioButton.id === 'effect-none') {
        imgUploadPreview.className = 'img-upload__preview';
      } else if (currentRadioButton.id === 'effect-chrome') {
        imgUploadPreview.className = 'img-upload__preview effects__preview--chrome';
        imgUploadPreview.style.filter = 'grayscale(1)';
        effectLevelValue.setAttribute('value', INITIAL_NUMBER_FOR_VALUE);
      } else if (currentRadioButton.id === 'effect-sepia') {
        imgUploadPreview.className = 'img-upload__preview effects__preview--sepia';
        imgUploadPreview.style.filter = 'sepia(1)';
        effectLevelValue.setAttribute('value', INITIAL_NUMBER_FOR_VALUE);
      } else if (currentRadioButton.id === 'effect-marvin') {
        imgUploadPreview.className = 'img-upload__preview effects__preview--marvin';
        imgUploadPreview.style.filter = 'invert(100%)';
        effectLevelValue.setAttribute('value', INITIAL_NUMBER_FOR_VALUE);
      } else if (currentRadioButton.id === 'effect-phobos') {
        imgUploadPreview.className = 'img-upload__preview effects__preview--phobos';
        imgUploadPreview.style.filter = 'blur(3px)';
        effectLevelValue.setAttribute('value', INITIAL_NUMBER_FOR_VALUE);
      } else if (currentRadioButton.id === 'effect-heat') {
        imgUploadPreview.className = 'img-upload__preview effects__preview--heat';
        imgUploadPreview.style.filter = 'brightness(3)';
        effectLevelValue.setAttribute('value', INITIAL_NUMBER_FOR_VALUE);
      }
    };
    // вызывает функции изменения эффекта изображения при нажатии
    currentRadioButton.addEventListener('click', selectionEffect);
    currentRadioButton.addEventListener('click', hiddenImgSliderEffect);
    currentRadioButton.addEventListener('click', applyPressingEffect);
  };

  // цикл который перебирает радиобаттоны и вызывает функцию модификации изображения, добавления ей фильтров
  for (var i = 0; i < imgRadioEffectButtons.length; i++) {
    changesImageEffect(imgRadioEffectButtons[i]);
  }

  // функция изменяет эффект изображения в зависимости от положения пина
  window.setEffectLevelPin = function (buttonPosition, maxWidth) {

    effectLevelValue.setAttribute('value', Math.ceil((buttonPosition * NUMBER_PROPORTION_FOR_VALUE) / maxWidth.offsetWidth));

    if (imgUploadPreview.className === 'img-upload__preview effects__preview--chrome') {
      imgUploadPreview.style.filter = 'grayscale(' + buttonPosition / maxWidth.offsetWidth + ')';
    } else if (imgUploadPreview.className === 'img-upload__preview effects__preview--sepia') {
      imgUploadPreview.style.filter = 'sepia(' + buttonPosition / maxWidth.offsetWidth + ')';
    } else if (imgUploadPreview.className === 'img-upload__preview effects__preview--marvin') {
      imgUploadPreview.style.filter = 'invert(' + buttonPosition / maxWidth.offsetWidth * FILTER_INVERT_PROPORTION_NUMBER + '%' + ')';
    } else if (imgUploadPreview.className === 'img-upload__preview effects__preview--phobos') {
      imgUploadPreview.style.filter = 'blur(' + buttonPosition / maxWidth.offsetWidth * FILTER_BLUR_PROPORTION_NUMBER + 'px' + ')';
    } else if (imgUploadPreview.className === 'img-upload__preview effects__preview--heat') {
      imgUploadPreview.style.filter = 'brightness(' + (buttonPosition / maxWidth.offsetWidth + FILTER_BRIGHTNESS_PROPORTION_NUMBER_FIRST) * FILTER_BRIGHTNESS_PROPORTION_NUMBER_SECOND + ')';
    }
  };
})();
