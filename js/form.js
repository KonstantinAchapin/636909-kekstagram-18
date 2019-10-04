// Валидация формы ввода хэш-тэга и комментария при добавлении фотографии
'use strict';

(function () {
  var BEGINNING_LINE_STRING = 0;
  var FIRST_CHARACTER_STRING = 1;
  var MIN_HASHTAG_SIZE = 2;
  var MAX_HASHTAG_SIZE = 20;
  var MAX_HASHTAGS_AMOUNT = 5;
  var MAX_COMMENT_SIZE = 140;

  var imgForm = window.upload.imgUploadSection.querySelector('.img-upload__form');
  var imgHashTags = window.upload.imgUploadSection.querySelector('.text__hashtags');
  window.upload.imgHashTags = imgHashTags;
  var imgComment = window.upload.imgUploadSection.querySelector('.text__description');
  window.upload.imgComment = imgComment;

  // валидация введенных данных по хэш-тэгу
  imgHashTags.addEventListener('input', function () {
    // создаем массив хэш-тэгов
    function createHashTagsArray(stringToSplit) {
      var arrayOfStrings = stringToSplit.split(' ');
      return arrayOfStrings;
    }

    var hashTagsArray = createHashTagsArray(imgHashTags.value.toLowerCase()
    );
    for (var i = 0; i < hashTagsArray.length; i++) {
      if (validityHashTag(hashTagsArray[i]) === false) {
        break;
      } else {
        validityHashTag(hashTagsArray[i]);
      }
    }

    // проверяем совпадение значений в массиве если совпадают то false
    function findSameArray(arr) {
      for (var f = 0; f < arr.length; f++) {
        for (var j = f + 1; j < arr.length; j++) {
          if (arr[f] === arr[j]) {
            return false;
          }
        }
      }
      return true;
    }

    // функция показывает ограничения по вводу и выводит подсказки по их заполнению
    function validityHashTag(hashTagText) {
      if (hashTagText.substr(BEGINNING_LINE_STRING, FIRST_CHARACTER_STRING) !== '#') {
        imgHashTags.setCustomValidity('Введите "#" первым символом хэш-тэга');
        return false;
      } else if (hashTagText.length < MIN_HASHTAG_SIZE) {
        imgHashTags.setCustomValidity('Введите название хэш-тэга не менее 2-ух символов');
        return false;
      } else if (hashTagText.length >= MAX_HASHTAG_SIZE) {
        imgHashTags.setCustomValidity('Хэш-тэг должен быть не более 20 символов');
        return false;
      } else if (hashTagsArray.length > MAX_HASHTAGS_AMOUNT) {
        imgHashTags.setCustomValidity('Введите не больше 5 хэш-тэгов');
        return false;
      } else if (findSameArray(hashTagsArray) === false) {
        imgHashTags.setCustomValidity('Нельзя вводить одинаковые хэш-тэги');
        return false;
      } else {
        imgHashTags.setCustomValidity('');
        return true;
      }
    }
  });

  // временная отмена отправки данных для удобства
  imgForm.addEventListener('submit', function (event) {
    event.preventDefault();
  });

  // валидация введенных данных по комментарию пользователя
  imgComment.addEventListener('input', function () {
    if (imgComment.value.length >= MAX_COMMENT_SIZE) {
      imgComment.setCustomValidity('Размер комментария не должен превышать 140 символов');
    } else {
      imgComment.setCustomValidity('');
    }
  });
})();
