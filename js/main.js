'use strict';

var MIN_NUMBER_LIKES = 15;
var MAX_NUMBER_LIKES = 150;

var MIN_RANDOM_VALUE = 0;
var MAX_RANDOM_VALUE = 5;

var MIN_RANDOM_COMMENTS = 10;
var MAX_RANDOM_COMMENTS = 25;

var ESC_KEYCODE = 27;
var INITIAL_VALUE_IMG = 100;
var STEP_OF_CHANGE_VALUE_IMG = 25;
var MIN_VALUE_NUMBER_IMG = 25;
var MAX_VALUE_NUMBER_IMG = 100;

var INITIAL_NUMBER_FOR_SIZE_IMG = 1;
var STEP_OF_CHANGE_NUMBER_FOR_SIZE_IMG = 0.25;


var arrayObjectsPictures = []; // пустой массив объектов;
var picturesContainer = document.querySelector('.pictures'); // контейнер куда мы вставляем фотографии

// Получаем элементы разметки с помощью querySelector
var pictureContain = document.querySelector('.big-picture');
var popapCommentCount = pictureContain.querySelector('.social__comment-count');
var popapCommentsLoader = pictureContain.querySelector('.comments-loader');
var popapPictureImg = pictureContain.querySelector('.big-picture__img').querySelector('img');
var popapDescription = pictureContain.querySelector('.social__caption');
var popapLikesCount = pictureContain.querySelector('.likes-count');
var popapCommentsCount = pictureContain.querySelector('.comments-count');
// var popapImgDescriptionAvatar = pictureContain.querySelector('social__header .social__picture'); аватар описания фотографии
var bigPictureComment = pictureContain.querySelectorAll('.social__comment');
var popapImgAvatar = pictureContain.querySelectorAll('.social__comment .social__picture');
var popapSocialText = pictureContain.querySelectorAll('.social__comment .social__text');

// Скрываем элементы с помощью добавления класса hidden элементам
popapCommentCount.classList.add('hidden');
popapCommentsLoader.classList.add('hidden');

// Определяем рабочие элементы с помощью querySelector
var imgUploadSection = document.querySelector('.img-upload');
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

var imgForm = imgUploadSection.querySelector('.img-upload__form');
var imgHashTags = imgUploadSection.querySelector('.text__hashtags');
var imgComment = imgUploadSection.querySelector('.text__description');

// Определяем, а потом скрываем imgSliderEffect по умолчанию
var imgSliderEffect = imgUploadSection.querySelector('.img-upload__effect-level');
imgSliderEffect.style.visibility = 'hidden';

// Задаем начальное значение value размера изображения в 100%
var scaleControlValueNumber = INITIAL_VALUE_IMG;
scaleControlValue.setAttribute('value', scaleControlValueNumber + '%');

// Определяем переменную которая хранит размер размер изображения
var imgUploadPreview = imgUploadSection.querySelector('.img-upload__preview');
var numberForSize = INITIAL_NUMBER_FOR_SIZE_IMG;

// Определяем переменную которая хранит позицию пина на линейке изменения эффекта
var positionEffectPin = 0;

// Событие открытия попапа после загрузки фотографии
imgUserDownloader.addEventListener('change', function () {
  openImageEditing();

  // Находим позицию пина на линейке изменения и делаем пропорцию в %
  var posPinX = imgEffectChangeButton.offsetLeft;
  var widthParentPin = imgEffectLevelLine.offsetWidth;
  positionEffectPin = Math.round((posPinX / widthParentPin) * 100);

  // Добавляем событие закрытие по кнопке ESC
  document.addEventListener('keydown', buttonClickHandler);
});

// Функция закрытия по кнопке ESC
var buttonClickHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeImageEditing();
  }
};

// Функция открытия попапа
var openImageEditing = function () {
  imgEditingForm.classList.remove('hidden');
};

// Событие закрытия попапа
imgButtonClose.addEventListener('click', function () {
  closeImageEditing();
});

// Функция закрытия попапа
var closeImageEditing = function () {
  imgEditingForm.classList.add('hidden');

  // Сброс значения размера value %;
  scaleControlValue.setAttribute('value', INITIAL_VALUE_IMG + '%');
  scaleControlValueNumber = INITIAL_VALUE_IMG;
  // Сброс размера картинки scale;
  imgUploadPreview.style.transform = 'scale(' + INITIAL_NUMBER_FOR_SIZE_IMG + ')';
  numberForSize = INITIAL_NUMBER_FOR_SIZE_IMG;
  // Сброс полосы регулировки эффекта на оригинал
  imgSliderEffect.style.visibility = 'hidden';
  // Сброс фильтра изображения;
  imgUploadPreview.className = 'img-upload__preview';
  imgUploadPreview.style.filter = null;
  // Сброс заполненной формы;
  imgUploadForm.reset();
};

// Событие клика которое уменьшает размер изображения и меняет value %
scaleControlSmaller.addEventListener('click', function () {
  if (scaleControlValueNumber > MIN_VALUE_NUMBER_IMG) {
    scaleControlValueNumber -= STEP_OF_CHANGE_VALUE_IMG;
    scaleControlValue.setAttribute('value', scaleControlValueNumber + '%');

    numberForSize -= STEP_OF_CHANGE_NUMBER_FOR_SIZE_IMG;
    imgUploadPreview.style.transform = 'scale(' + numberForSize + ')';
  }
});

// Событие клика которое увеличивает размер изображения и меняет value %
scaleControlBigger.addEventListener('click', function () {
  if (scaleControlValueNumber < MAX_VALUE_NUMBER_IMG) {
    scaleControlValueNumber += STEP_OF_CHANGE_VALUE_IMG;
    scaleControlValue.setAttribute('value', scaleControlValueNumber + '%');

    numberForSize += STEP_OF_CHANGE_NUMBER_FOR_SIZE_IMG;
    imgUploadPreview.style.transform = 'scale(' + numberForSize + ')';
  }
});

// Функция которая передает в событие нажатую кнопку, а дальше событие с помощью условий меняет классы изображения, добавляя соответствующие фильтры
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

    // Событие отжатия клавиши от пина при котором меняется фильтр эффекта в соответствии с положением пина на линейке (сейчас оно 20%)
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

// Цикл который перебирает радиобаттоны и вызывает функцию модификации изображения, добавления ей фильтров
for (i = 0; i < imgRadioEffectButton.length; i++) {
  modifiedImageEffect(imgRadioEffectButton[i]);
}

// Валидация хэш-тэгов

// Событие focus отменяет закрытие попапа на ESC
imgHashTags.addEventListener('focus', function () {
  document.removeEventListener('keydown', buttonClickHandler);
});
// Событие blur снова добавляет закрытие попапа на ESC
imgHashTags.addEventListener('blur', function () {
  document.addEventListener('keydown', buttonClickHandler);
});

// Событие focus отменяет закрытие попапа на ESC
imgComment.addEventListener('focus', function () {
  document.removeEventListener('keydown', buttonClickHandler);
});
// Событие blur снова добавляет закрытие попапа на ESC
imgComment.addEventListener('blur', function () {
  document.addEventListener('keydown', buttonClickHandler);
});

// Валидация введенных данных по хэш-тэгу
imgHashTags.addEventListener('input', function () {
  // Создаем массив хэш-тэгов
  function createHashTagsArray(stringToSplit) {
    var arrayOfStrings = stringToSplit.split(' ');
    return arrayOfStrings;
  }

  var hashTagsArray = createHashTagsArray(imgHashTags.value.toLowerCase()
  );
  for (i = 0; i < hashTagsArray.length; i++) {
    if (validityHashTag(hashTagsArray[i]) === false) {
      break;
    } else {
      validityHashTag(hashTagsArray[i]);
    }
  }

  // Проверяем совпадение значений в массиве
  function findSameArray(arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          return false;
        }
      }
    }
    return true;
  }

  // Функция валидации введенных данных
  function validityHashTag(hashTagText) {
    if (hashTagText.substr(0, 1) !== '#') {
      imgHashTags.setCustomValidity('Введите "#" первым символом хэш-тэга');
      return false;
    } else if (hashTagText.length < 2) {
      imgHashTags.setCustomValidity('Введите название хэш-тэга не менее 2-ух символов');
      return false;
    } else if (hashTagText.length >= 20) {
      imgHashTags.setCustomValidity('Хэш-тэг должен быть не более 20 символов');
      return false;
    } else if (hashTagsArray.length > 5) {
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

// Временная отмена отправки данных для удобства
imgForm.addEventListener('submit', function (event) {
  event.preventDefault();
  // alert('Сообщение отправлено!');
});

// Валидация введенных данных по комментарию пользователя
imgComment.addEventListener('input', function () {
  if (imgComment.value.length >= 140) {
    imgComment.setCustomValidity('Размер комментария не должен превышать 140 символов');
  } else {
    imgComment.setCustomValidity('');
  }
});

var getRandomNumber = function (min, max) { // функция возвращающая случайное число от min до max;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var commentsMassages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно былопоймать такой неудачный момент?!'];

var commentsName = ['Артем', 'Ваня', 'Илья', 'Жанна', 'Наталья', 'Людмила'];

var getPicturesMocks = function (numberUrl) { // функция заполняет массив объектов arrayObjectsPictures[] с указанными свойствами и значениями
  var publicationDescription = {};
  publicationDescription.url = numberUrl + 1;
  publicationDescription.description = 'Описание фотографии';
  publicationDescription.likes = getRandomNumber(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES);
  publicationDescription.comments = getComments();
  return publicationDescription;
};

var getComments = function () {
  var commentArrays = [];
  for (var i = 0; i <= getRandomNumber(MIN_RANDOM_COMMENTS, MAX_RANDOM_COMMENTS); i++) {
    commentArrays.push({
      avatar: 'img/avatar-' + (getRandomNumber(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE) + 1) + '.svg',
      message: commentsMassages[getRandomNumber(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)],
      name: commentsName[getRandomNumber(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)]
    });
  }
  return commentArrays;
};

var getPictureElement = function (arrayIndex) { // ф-ция заполняет DOM элемент из свойств и значений объектов в массиве arrayObjectsPictures[]
  var picture = document.querySelector('#picture');
  picture.content.querySelector('.picture__img').src = 'photos/' + arrayObjectsPictures[arrayIndex].url + '.jpg';
  picture.content.querySelector('.picture__comments');
  picture.content.querySelector('.picture__likes').textContent = arrayObjectsPictures[arrayIndex].likes;
  picture.content.querySelector('.picture__comments').textContent = arrayObjectsPictures[arrayIndex].comments.length;
  return document.querySelector('#picture').content.querySelector('.picture');
};

for (var i = 0; i <= 24; i++) { // цикл который создает 25 объектов и делает из их значений 25 DOM элементов вставляя их в конец #picture
  arrayObjectsPictures.push(getPicturesMocks(i));
  var template = getPictureElement(i);
  var element = template.cloneNode(true);
  picturesContainer.appendChild(element);
}

// определяем в переменные все миниатюры изображения и кнопку закрытия
var thumbnailsImg = document.querySelectorAll('.picture');
var bigImgCloseButton = document.querySelector('#picture-cancel');

// функция открывает попап и подставляет в него данные из объекта
var openPopapImg = function (currentThumbnail, obj) {
  currentThumbnail.addEventListener('click', function () {
    pictureContain.classList.remove('hidden');
    popapPictureImg.src = 'photos/' + obj.url + '.jpg';
    popapDescription.textContent = obj.description;
    popapLikesCount.textContent = obj.likes;
    popapCommentsCount.textContent = obj.comments.length;

    var createComment = function (avatar, comment, objComment) { // функция которая подставляет данные в комментарии
      avatar.src = objComment.avatar;
      comment.textContent = objComment.message;
    };

    for (i = 0; i < bigPictureComment.length; i++) { // цикл перебирающий все комментарии
      createComment(popapImgAvatar[i], popapSocialText[i], obj.comments[i]);
    }

    // Добавляем событие закрытие по кнопке ESC
    document.addEventListener('keydown', closePopapImgKeydown);
  });
};

// Цикл перебирает миниатюры и отдает их в функцию
for (i = 0; i < thumbnailsImg.length; i++) {
  openPopapImg(thumbnailsImg[i], arrayObjectsPictures[i]);
}

bigImgCloseButton.addEventListener('click', function () {
  closePopapImg();
});

// функция закрытия попапа
var closePopapImg = function () {
  pictureContain.classList.add('hidden');
};

// функция закрытия попапа на кнопку
var closePopapImgKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopapImg();
  }
};
