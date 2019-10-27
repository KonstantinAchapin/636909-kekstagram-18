// Валидация формы ввода хэш-тэга и комментария при добавлении фотографии
'use strict';

(function () {
  var BEGINNING_LINE_STRING = 0;
  var FIRST_CHARACTER_STRING = 1;
  var MIN_VALUE_COMPARISON = 1;
  var MIN_HASHTAG_SIZE = 2;
  var MAX_HASHTAG_SIZE = 20;
  var MAX_HASHTAGS_AMOUNT = 5;
  var MAX_COMMENT_SIZE = 140;
  var ERROR_FORM_BORDER_COLOR = 'rgb(220, 20, 60)';
  var SUCCESS_FORM_BORDER_COLOR = 'rgb(238, 238, 238)';
  var FORM_BORDER_HEIGHT = '2px';

  var imgForm = document.querySelector('.img-upload__form');
  var imgHashTagHandler = document.querySelector('.text__hashtags');
  var imgCommentHandler = document.querySelector('.text__description');

  window.form = {
    ERROR_FORM_BORDER_COLOR: ERROR_FORM_BORDER_COLOR,
    SUCCESS_FORM_BORDER_COLOR: SUCCESS_FORM_BORDER_COLOR,
    FORM_BORDER_HEIGHT: FORM_BORDER_HEIGHT,
    imgHashTag: imgHashTagHandler,
    imgComment: imgCommentHandler
  };

  // валидация введенных данных по хэш-тэгу
  // создаем массив хэш-тэгов
  var createArrayHashTags = function (stringToSplit) {
    var hashTagsStrings = stringToSplit.split(' ');
    return hashTagsStrings;
  };

  // проверяем совпадение значений в массиве если совпадают то false
  var findSameArray = function (arrayHashtags) {
    for (var i = 0; i < arrayHashtags.length; i++) {
      for (var j = i + 1; j < arrayHashtags.length; j++) {
        if (arrayHashtags[i] === arrayHashtags[j]) {
          return false;
        }
      }
    }
    return true;
  };

  // функция показывает ограничения по вводу и выводит подсказки по их заполнению
  imgHashTagHandler.addEventListener('input', function () {
    var validityHashTag = function (hashTagText) {
      if (hashTagText.substr(BEGINNING_LINE_STRING, FIRST_CHARACTER_STRING) !== '#' & hashTagText.length >= MIN_VALUE_COMPARISON) {
        imgHashTagHandler.setCustomValidity('Введите "#" первым символом хэш-тэга');
        return false;
      } else if (hashTagText.length < MIN_HASHTAG_SIZE & hashTagText.length >= MIN_VALUE_COMPARISON) {
        imgHashTagHandler.setCustomValidity('Введите название хэш-тэга не менее 2-ух символов');
        return false;
      } else if (hashTagText.length >= MAX_HASHTAG_SIZE) {
        imgHashTagHandler.setCustomValidity('Хэш-тэг должен быть не более 20 символов');
        return false;
      } else if (arrayHashTags.length > MAX_HASHTAGS_AMOUNT) {
        imgHashTagHandler.setCustomValidity('Введите не больше 5 хэш-тэгов');
        return false;
      } else if (findSameArray(arrayHashTags) === false) {
        imgHashTagHandler.setCustomValidity('Нельзя вводить одинаковые хэш-тэги');
        return false;
      } else {
        imgHashTagHandler.setCustomValidity('');
        return true;
      }
    };

    var arrayHashTags = createArrayHashTags(imgHashTagHandler.value.toLowerCase()
    );
    for (var i = 0; i < arrayHashTags.length; i++) {
      if (validityHashTag(arrayHashTags[i]) === false) {
        imgHashTagHandler.style.border = window.form.FORM_BORDER_HEIGHT + ' solid ' + window.form.ERROR_FORM_BORDER_COLOR;
        break;
      } else {
        imgHashTagHandler.style.border = window.form.FORM_BORDER_HEIGHT + ' solid ' + window.form.SUCCESS_FORM_BORDER_COLOR;
        validityHashTag(arrayHashTags[i]);
      }
    }
  });

  // валидация введенных данных по комментарию пользователя
  imgCommentHandler.addEventListener('input', function () {
    if (imgCommentHandler.value.length >= MAX_COMMENT_SIZE) {
      imgCommentHandler.style.border = window.form.FORM_BORDER_HEIGHT + ' solid ' + window.form.ERROR_FORM_BORDER_COLOR;
      imgCommentHandler.setCustomValidity('Размер комментария не должен превышать 140 символов');
    } else {
      imgCommentHandler.style.border = window.form.FORM_BORDER_HEIGHT + ' solid ' + window.form.SUCCESS_FORM_BORDER_COLOR;
      imgCommentHandler.setCustomValidity('');
    }
  });

  // Отправка данных для формы на сервер
  imgForm.addEventListener('submit', function (evt) {
    window.send(new FormData(imgForm), window.showSuccessWindow, window.showFillErrorWindow);
    evt.preventDefault();
  });
})();
