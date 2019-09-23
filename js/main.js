'use strict';

var MIN_NUMBER_LIKES = 15;
var MAX_NUMBER_LIKES = 150;

var MIN_RANDOM_VALUE = 0;
var MAX_RANDOM_VALUE = 5;

var MIN_RANDOM_COMMENTS = 10;
var MAX_RANDOM_COMMENTS = 25;

var arrayObjectsPictures = []; // пустой массив объектов;
var picturesContainer = document.querySelector('.pictures'); // контейнер куда мы вставляем фотографии

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
