'use strict';

var arrayObjectsPictures = []; // пустой массив объектов;
// console.log(arrayObjectsPictures); показывает в консоли массив объектов, в котором видно что в каждом объекте количество комментариев от 1 до 3 и каждый из комментариев имеет разные случайные значения;

var picturesContainer = document.querySelector('.pictures'); // контейнер куда мы вставляем фотографии

var getRandomNumber = function (min, max) { // функция возвращающая случайное число от min до max;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createObject = function (numberUrl) { // функция заполняет массив объектов arrayObjectsPictures[] с указанными свойствами и значениями
  var publicationDescription = {};
  publicationDescription.url = numberUrl + 1;
  publicationDescription.description = 'Описание фотографии';
  publicationDescription.likes = getRandomNumber(15, 150);
  publicationDescription.comments = [{
    avatar: ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'][getRandomNumber(0, 5)],
    message: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'][getRandomNumber(0, 5)],
    name: ['Артем', 'Ваня', 'Илья', 'Жанна', 'Наталья', 'Людмила'][getRandomNumber(0, 5)]
  }];
  if (getRandomNumber(0, 1) === 0) { // Это условие позволяет добавить случайное число комментариев (некрасиво, но работоспособно)
    publicationDescription.comments = [{
      avatar: ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'][getRandomNumber(0, 5)],
      message: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'][getRandomNumber(0, 5)],
      name: ['Артем', 'Ваня', 'Илья', 'Жанна', 'Наталья', 'Людмила'][getRandomNumber(0, 5)]
    }, {
      avatar: ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'][getRandomNumber(0, 5)],
      message: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'][getRandomNumber(0, 5)],
      name: ['Артем', 'Ваня', 'Илья', 'Жанна', 'Наталья', 'Людмила'][getRandomNumber(0, 5)]
    }];
  } else if (getRandomNumber(0, 1) === 1) {
    publicationDescription.comments = [{
      avatar: ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'][getRandomNumber(0, 5)],
      message: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'][getRandomNumber(0, 5)],
      name: ['Артем', 'Ваня', 'Илья', 'Жанна', 'Наталья', 'Людмила'][getRandomNumber(0, 5)]
    }, {
      avatar: ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'][getRandomNumber(0, 5)],
      message: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'][getRandomNumber(0, 5)],
      name: ['Артем', 'Ваня', 'Илья', 'Жанна', 'Наталья', 'Людмила'][getRandomNumber(0, 5)]
    }, {
      avatar: ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'][getRandomNumber(0, 5)],
      message: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'][getRandomNumber(0, 5)],
      name: ['Артем', 'Ваня', 'Илья', 'Жанна', 'Наталья', 'Людмила'][getRandomNumber(0, 5)]
    }];
  }
  arrayObjectsPictures.push(publicationDescription);
};

var createHTMLElement = function (arrayIndex) { // ф-ция заполняет DOM элемент из свойств и значений объектов в массиве arrayObjectsPictures[]
  var picture = document.querySelector('#picture');
  picture.content.querySelector('.picture__img').src = 'photos/' + arrayObjectsPictures[arrayIndex].url + '.jpg';
  picture.content.querySelector('.picture__comments');
  picture.content.querySelector('.picture__likes').textContent = arrayObjectsPictures[arrayIndex].likes;
  picture.content.querySelector('.picture__comments').textContent = arrayObjectsPictures[arrayIndex].comments.length;
  return document.querySelector('#picture').content.querySelector('.picture');
};

for (var i = 0; i <= 24; i++) { // цикл который создает 25 объектов и делает из их значений 25 DOM элементов вставляя их в конец #picture
  createObject(i);
  var template = createHTMLElement(i);
  var element = template.cloneNode(true);
  picturesContainer.appendChild(element);
}
