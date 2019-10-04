// Функционал просмотра превью изображения в виде ПОПАПА
'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.preview = {
    ESC_KEYCODE: ESC_KEYCODE
  };

  var pictureContain = document.querySelector('.big-picture');
  var popapCommentCount = pictureContain.querySelector('.social__comment-count');
  var popapCommentsLoader = pictureContain.querySelector('.comments-loader');

  // скрываем элементы с помощью добавления класса hidden элементам
  popapCommentCount.classList.add('hidden');
  popapCommentsLoader.classList.add('hidden');

  // определяем переменные - изображения и кнопку закрытия
  var popapPictureImg = pictureContain.querySelector('.big-picture__img').querySelector('img');
  var popapDescription = pictureContain.querySelector('.social__caption');
  var popapLikesCount = pictureContain.querySelector('.likes-count');
  var popapCommentsCount = pictureContain.querySelector('.comments-count');
  var thumbnailsImg = document.querySelectorAll('.picture');
  var bigImgCloseButton = document.querySelector('#picture-cancel');
  var bigPictureComment = pictureContain.querySelectorAll('.social__comment');
  var popapImgAvatar = pictureContain.querySelectorAll('.social__comment .social__picture');
  var popapSocialText = pictureContain.querySelectorAll('.social__comment .social__text');

  // функция открывает попап и подставляет в него данные из объекта
  var openPopapImg = function (currentThumbnail, obj) {
    currentThumbnail.addEventListener('click', function () {
      pictureContain.classList.remove('hidden');
      popapPictureImg.src = 'photos/' + obj.url + '.jpg';
      popapDescription.textContent = obj.description;
      popapLikesCount.textContent = obj.likes;
      popapCommentsCount.textContent = obj.comments.length;

      // цикл перебирающий все комментарии
      for (var i = 0; i < bigPictureComment.length; i++) {
        loadCommentsInPopap(popapImgAvatar[i], popapSocialText[i], obj.comments[i]);
      }

      // добавляет событие закрытия ПОПАПА на кнопку ESC
      document.addEventListener('keydown', closePopapImgKeydown);
    });
  };

  // функция которая подставляет автар и текст в каждый комментарий
  var loadCommentsInPopap = function (avatar, comment, objComment) {
    avatar.src = objComment.avatar;
    comment.textContent = objComment.message;
  };

  // цикл перебирает миниатюры и отдает их в функцию
  for (var i = 0; i < thumbnailsImg.length; i++) {
    openPopapImg(thumbnailsImg[i], window.creature.arrayObjectsPictures[i]);
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
    if (evt.keyCode === window.preview.ESC_KEYCODE) {
      closePopapImg();
    }
  };
})();
