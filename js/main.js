'use strict';

var MIN_NUMBER_LIKES = 15;
var MAX_NUMBER_LIKES = 150;

var MIN_RANDOM_VALUE = 0;
var MAX_RANDOM_VALUE = 5;

var MIN_RANDOM_COMMENTS = 10;
var MAX_RANDOM_COMMENTS = 25;

var MIN_BIG_PHOTO_NUMBER = 0;
var MAX_BIG_PHOTO_NUMBER = 2;

var ESC_KEYCODE = 27;
var INITIAL_VALUE_IMG = 100;
var STEP_OF_CHANGE_VALUE_IMG = 25;
var MIN_VALUE_NUMBER_IMG = 25;
var MAX_VALUE_NUMBER_IMG = 100;

var INITIAL_NUMBER_FOR_SIZE_IMG = 1;
var STEP_OF_CHANGE_NUMBER_FOR_SIZE_IMG = 0.25;


var arrayObjectsPictures = []; // пустой массив объектов;
var picturesContainer = document.querySelector('.pictures'); // контейнер куда мы вставляем фотографии

// ЗАДАНИЕ 2
// Получаем элементы разметки с помощью querySelector
var pictureContain = document.querySelector('.big-picture');
var popapCommentCount = pictureContain.querySelector('.social__comment-count');
var popapCommentsLoader = pictureContain.querySelector('.comments-loader');
var popapPictureImg = pictureContain.querySelector('.big-picture__img').querySelector('img');
var popapDescription = pictureContain.querySelector('.social__caption');
var popapLikesCount = pictureContain.querySelector('.likes-count');
var popapCommentsCount = pictureContain.querySelector('.comments-count');
var bigPictureComment = pictureContain.querySelectorAll('.social__comment');
var popapImgAvatar = pictureContain.querySelectorAll('.social__comment');
var popapSocialText = pictureContain.querySelectorAll('.social__comment');

// Показываем попап с большой фотографией и ее описанием
// pictureContain.classList.remove('hidden');

// Скрываем элементы с помощью добавления класса hidden элементам
popapCommentCount.classList.add('hidden');
popapCommentsLoader.classList.add('hidden');

// ЗАДАНИЕ 2
// ЗАДАНИЕ 3

// Определяем рабочие элементы с помощью querySelector
var imgUploadSection = document.querySelector('.img-upload');
var imgUploadForm = imgUploadSection.querySelector('#upload-select-image');
var imgEditingForm = imgUploadSection.querySelector('.img-upload__overlay');
var imgUserDownloader = imgUploadSection.querySelector('#upload-file');
var imgButtonClose = imgUploadSection.querySelector('#upload-cancel');

var scaleControlSmaller = imgUploadSection.querySelector('.scale__control--smaller');
var scaleControlBigger = imgUploadSection.querySelector('.scale__control--bigger');
var scaleControlValue = imgUploadSection.querySelector('.scale__control--value');
var imgEffectLevel = imgUploadSection.querySelector('.scale__control--bigger');

var imgRadioEffectButton = imgUploadSection.querySelectorAll('.effects__radio');
var imgEffectChangeButton = imgUploadSection.querySelector('.effect-level__pin');
var imgEffectLevelLine = imgUploadSection.querySelector('.effect-level__line');

// Задаем начальное значение value размера изображения в 100%
var scaleControlValueNumber = INITIAL_VALUE_IMG;
scaleControlValue.value = scaleControlValueNumber + '%';

// Определяем переменную которая хранит размер размер изображения
var imgUploadPreview = imgUploadSection.querySelector('.img-upload__preview');
var numberForSize = INITIAL_NUMBER_FOR_SIZE_IMG;

// Определяем переменную которая хранит позицию пина на линейке изменения эффекта
var positionEffectPin = 0;

// Событие загрузки фотографии
imgUserDownloader.addEventListener('change', function () {
  openImageEditing();

  // Находим позицию пина на линейке изменения и делаем пропорцию в %
  var posX = imgEffectChangeButton.offsetLeft;
  var posWidth = imgEffectLevelLine.offsetWidth;
  positionEffectPin = Math.round((posX / posWidth) * 100);
  imgEffectLevel.value = positionEffectPin;

  // Добавляем событие закрытие по кнопке ESC
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeImageEditing();
    }
  });
});

// Функция открытия попапа
var openImageEditing = function () {
  imgEditingForm.classList.remove('hidden');
};

// Событие закрытия попап
imgButtonClose.addEventListener('click', function () {
  closeImageEditing();
});

// Функция закрытия попапа
var closeImageEditing = function () {
  imgEditingForm.classList.add('hidden');
  imgUploadForm.reset(); // НЕ РАБОТАЕТ RESET НА ФОРМЕ, НЕ ПОЙМУ ПОЧЕМУ???!!!
};

// Событие клика которое уменьшает размер изображения и меняет value %
scaleControlSmaller.addEventListener('click', function () {
  if (scaleControlValueNumber > MIN_VALUE_NUMBER_IMG) {
    scaleControlValueNumber -= STEP_OF_CHANGE_VALUE_IMG;
    scaleControlValue.value = scaleControlValueNumber + '%';

    numberForSize -= STEP_OF_CHANGE_NUMBER_FOR_SIZE_IMG;
    imgUploadPreview.style.transform = 'scale(' + numberForSize + ')';
  }
});

// Событие клика которое увеличивает размер изображения и меняет value %
scaleControlBigger.addEventListener('click', function () {
  if (scaleControlValueNumber < MAX_VALUE_NUMBER_IMG) {
    scaleControlValueNumber += STEP_OF_CHANGE_VALUE_IMG;
    scaleControlValue.value = scaleControlValueNumber + '%';

    numberForSize += STEP_OF_CHANGE_NUMBER_FOR_SIZE_IMG;
    imgUploadPreview.style.transform = 'scale(' + numberForSize + ')';
  }
});

// Функция которая передает параметром нажатую кнопку в событие, а далее событие с помощью условий меняет классы изображения, добавляя соответствующие классы
var modifiedImageEffect = function (currentRadioButton) {
  currentRadioButton.addEventListener('click', function () {
    currentRadioButton.checked = true;
    imgUploadPreview.style.filter = null;
    if (currentRadioButton.id === 'effect-none') {
      imgUploadPreview.className = 'img-upload__preview';
    } else if (currentRadioButton.id === 'effect-chrome') {
      imgUploadPreview.className = 'img-upload__preview effects__preview--chrome';
    } else if (currentRadioButton.id === 'effect-sepia') {
      imgUploadPreview.className = 'img-upload__preview effects__preview--sepia';
    } else if (currentRadioButton.id === 'effect-marvin') {
      imgUploadPreview.className = 'img-upload__preview effects__preview--marvin';
    } else if (currentRadioButton.id === 'effect-phobos') {
      imgUploadPreview.className = 'img-upload__preview effects__preview--phobos';
    } else if (currentRadioButton.id === 'effect-heat') {
      imgUploadPreview.className = 'img-upload__preview effects__preview--heat';
    }

    // Событие отжатия клавиши при котором в img превью меняется фильтр эффекта в соответствии с положением пина на линейке
    imgEffectChangeButton.addEventListener('mouseup', function () {
      if (imgUploadPreview.className === 'img-upload__preview effects__preview--chrome') {
        imgUploadPreview.style.filter = 'grayscale(' + positionEffectPin / 100 + ')';
      } else if (imgUploadPreview.className === 'img-upload__preview effects__preview--sepia') {
        imgUploadPreview.style.filter = 'sepia(' + positionEffectPin / 100 + ')';
      } else if (imgUploadPreview.className === 'img-upload__preview effects__preview--marvin') {
        imgUploadPreview.style.filter = 'invert(' + positionEffectPin / 100 + ')';
      } else if (imgUploadPreview.className === 'img-upload__preview effects__preview--phobos') {
        imgUploadPreview.style.filter = 'blur(' + positionEffectPin / 10 + 'px' + ')';
      } else if (imgUploadPreview.className === 'img-upload__preview effects__preview--heat') {
        imgUploadPreview.style.filter = 'brightness(' + positionEffectPin / 10 + ')';
      }
    });
  });
};

// Цикл который перебирает радиобаттоны и вызывает функцию модификации изображения
for (i = 0; i < imgRadioEffectButton.length; i++) {
  modifiedImageEffect(imgRadioEffectButton[i]);
}


// ЗАДАНИЕ 3 //

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

// ЗАДАНИЕ 2

var popupDataFilling = function (arrayIndex) { // функция которая подставляет данные в попап
  popapPictureImg.src = 'img/logo-background-' + arrayObjectsPictures[arrayIndex].url + '.jpg';
  popapDescription.textContent = arrayObjectsPictures[arrayIndex].description;

  popapLikesCount.textContent = arrayObjectsPictures[arrayIndex].likes;

  popapCommentsCount.textContent = arrayObjectsPictures[arrayIndex].comments.length;

  for (i = 0; i < bigPictureComment.length; i++) { // цикл перебирающий все комментарии
    popapImgAvatar[i].querySelector('.social__picture');
    popapImgAvatar[i].querySelector('.social__picture');
    popapSocialText[i].querySelector('.social__text');
  }

  var createComment = function (numberComment) { // функция которая подставляет данные в комментарии
    popapImgAvatar[numberComment].querySelector('.social__picture').src = arrayObjectsPictures[numberComment].comments[numberComment].avatar;
    popapImgAvatar[numberComment].querySelector('.social__picture').src = arrayObjectsPictures[numberComment].comments[numberComment].avatar;
    popapSocialText[numberComment].querySelector('.social__text').textContent = arrayObjectsPictures[numberComment].comments[numberComment].message;
  };
  createComment(0); // берем значения первого элемента массива
  createComment(1); // берем значения второго элемента массива
};

popupDataFilling(getRandomNumber(MIN_BIG_PHOTO_NUMBER, MAX_BIG_PHOTO_NUMBER));

// ЗАДАНИЕ 2
