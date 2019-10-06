// Создает массив объектов со случайными данными
'use strict';

(function () {
  var NUMBER_OF_MOK_OBJECT = 24;

  var MIN_NUMBER_LIKES = 15;
  var MAX_NUMBER_LIKES = 150;

  var MIN_RANDOM_VALUE = 0;
  var MAX_RANDOM_VALUE = 5;

  var MIN_RANDOM_COMMENTS = 10;
  var MAX_RANDOM_COMMENTS = 25;

  // пустой массив объектов
  var arrayObjectsPictures = [];

  window.creature = {
    NUMBER_OF_MOK_OBJECT: NUMBER_OF_MOK_OBJECT,
    arrayObjectsPictures: arrayObjectsPictures
  };

  // функция возвращающая случайное число от min до max
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var commentsMassages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно былопоймать такой неудачный момент?!'];

  var commentsName = ['Артем', 'Ваня', 'Илья', 'Жанна', 'Наталья', 'Людмила'];

  // функция создает объект со случайными данными
  var getRandomMock = function (numberUrl) {
    var publicationDescription = {};
    publicationDescription.url = numberUrl + 1;
    publicationDescription.description = 'Описание фотографии';
    publicationDescription.likes = getRandomNumber(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES);
    publicationDescription.comments = getRandomComments();
    return publicationDescription;
  };

  var getRandomComments = function () {
    var arrayComments = [];
    for (var i = 0; i <= getRandomNumber(MIN_RANDOM_COMMENTS, MAX_RANDOM_COMMENTS); i++) {
      arrayComments.push({
        avatar: 'img/avatar-' + (getRandomNumber(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE) + 1) + '.svg',
        message: commentsMassages[getRandomNumber(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)],
        name: commentsName[getRandomNumber(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)]
      });
    }
    return arrayComments;
  };

  // цикл вызывает функцию создания объекта и добавляет объект в пустой массив
  for (var i = 0; i <= window.creature.NUMBER_OF_MOK_OBJECT; i++) {
    arrayObjectsPictures.push(getRandomMock(i));
  }
})();
