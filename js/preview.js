// Функционал просмотра превью изображения в виде ПОПАПА
'use strict';

(function () {
  var ESC_KEYCODE = 27;
  window.ESC_KEYCODE = ESC_KEYCODE;

  var bigPicture = document.querySelector('.big-picture');
  var popupCommentCount = bigPicture.querySelector('.social__comment-count');
  var popupCommentsLoader = bigPicture.querySelector('.comments-loader');

  // скрываем элементы с помощью добавления класса hidden элементам
  popupCommentCount.classList.add('hidden');
  popupCommentsLoader.classList.add('hidden');

  // определяем переменные - изображения и кнопку закрытия
  var popupPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  var popupDescription = bigPicture.querySelector('.social__caption');
  var popupLikesCount = bigPicture.querySelector('.likes-count');
  var popupCommentsCount = bigPicture.querySelector('.comments-count');
  var thumbnailsImg = document.querySelectorAll('.picture');
  var bigImgCloseButton = document.querySelector('#picture-cancel');
  var bigPictureComment = bigPicture.querySelectorAll('.social__comment');
  var popupImgAvatar = bigPicture.querySelectorAll('.social__comment .social__picture');
  var popupSocialText = bigPicture.querySelectorAll('.social__comment .social__text');

  // функция открывает попап и подставляет в него данные из объекта
  var openPopupImg = function (currentThumbnail, obj) {
    currentThumbnail.addEventListener('click', function () {
      bigPicture.classList.remove('hidden');
      popupPictureImg.src = 'photos/' + obj.url + '.jpg';
      popupDescription.textContent = obj.description;
      popupLikesCount.textContent = obj.likes;
      popupCommentsCount.textContent = obj.comments.length;

      // цикл перебирающий все комментарии
      for (var i = 0; i < bigPictureComment.length; i++) {
        loadCommentsInPopup(popupImgAvatar[i], popupSocialText[i], obj.comments[i]);
      }

      // добавляет событие закрытия ПОПАПА на кнопку ESC
      document.addEventListener('keydown', closePopupImgKeydown);
    });
  };

  // функция которая подставляет автар и текст в каждый комментарий
  var loadCommentsInPopup = function (avatar, comment, objComment) {
    avatar.src = objComment.avatar;
    comment.textContent = objComment.message;
  };

  var cicle = function (hoop) {
    // цикл перебирает миниатюры и отдает их в функцию
    for (var i = 0; i < hoop.length; i++) {
      openPopupImg(hoop[i], window.creature.arrayObjectsPictures[i]);
    }
  };

  cicle(thumbnailsImg);

  bigImgCloseButton.addEventListener('click', function () {
    closePopupImg();
  });

  // функция закрытия попапа
  var closePopupImg = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', closePopupImgKeydown);
  };

  // функция закрытия попапа на кнопку
  var closePopupImgKeydown = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      closePopupImg();
      document.removeEventListener('keydown', closePopupImgKeydown);
    }
  };
})();
