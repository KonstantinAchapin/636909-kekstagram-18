// Функционал просмотра превью изображения в виде ПОПАПА
'use strict';

(function () {

  var ESC_KEYCODE = 27;
  window.ESC_KEYCODE = ESC_KEYCODE;

  var bigPicture = document.querySelector('.big-picture');
  var popupPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  var popupDescription = bigPicture.querySelector('.social__caption');
  var popupLikesCount = bigPicture.querySelector('.likes-count');
  var popupCommentsCount = bigPicture.querySelector('.comments-count');
  var bigImgCloseButton = document.querySelector('#picture-cancel');
  var commentBigPhoto = document.querySelectorAll('.social__comment');

  // функция закрытия попапа
  var closePopupImg = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', closePopupImgKeydown);
    window.commentsLoaderButton.style.display = 'block';

    // удаляет комментарии при закрытии окна
    commentBigPhoto = document.querySelectorAll('.social__comment');
    window.deleteComments(commentBigPhoto);
  };

  // функция закрытия попапа на кнопку
  var closePopupImgKeydown = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      closePopupImg();
      document.removeEventListener('keydown', closePopupImgKeydown);
    }
  };

  window.previewPictures = function (data) {
    // функция открывает попап и подставляет в него данные из объекта
    var openPopupImg = function (currentThumbnail, obj) {
      currentThumbnail.addEventListener('click', function (event) {
        event.preventDefault();

        // Вызывает функции комментариев и отдает им текущий объект
        window.cicleComment(obj);
        window.getCommentCount();

        bigPicture.classList.remove('hidden');
        popupPictureImg.src = obj.url;
        popupDescription.textContent = obj.description;
        popupLikesCount.textContent = obj.likes;
        popupCommentsCount.textContent = obj.comments.length;

        commentBigPhoto = document.querySelectorAll('.social__comment');
        if (commentBigPhoto.length <= 5) {
          window.commentsLoaderButton.style.display = 'none';
        }

        // добавляет событие закрытия ПОПАПА на кнопку ESC
        document.addEventListener('keydown', closePopupImgKeydown);
      });
    };

    var cicle = function (hoop) {
      // цикл перебирает миниатюры и отдает их в функцию
      for (var i = 0; i < hoop.length; i++) {
        openPopupImg(hoop[i], data[i]);
      }
    };

    cicle(window.thumbnailsImg);

    bigImgCloseButton.addEventListener('click', function () {
      closePopupImg();
    });
  };

})();
