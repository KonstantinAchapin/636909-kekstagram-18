// Функционал просмотра превью изображения в виде ПОПАПА
'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var MIN_NUMBER_COMMENTS = 5;
  window.ESC_KEYCODE = ESC_KEYCODE;

  var bigPicture = document.querySelector('.big-picture');
  var popupPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  var popupDescription = bigPicture.querySelector('.social__caption');
  var popupLikesCount = bigPicture.querySelector('.likes-count');
  var popupCommentsCount = bigPicture.querySelector('.comments-count');
  var bigImgCloseButtonHandler = document.querySelector('#picture-cancel');
  var commentBigPhoto = document.querySelectorAll('.social__comment');

  // функция закрытия попапа
  var closePopupImg = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', closePopupImgKeydown);
    window.previewComments.commentsLoaderButtonHandler.style.display = 'block';

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
    var openPopupImg = function (currentThumbnailHandler, obj) {
      currentThumbnailHandler.addEventListener('click', function (event) {
        event.preventDefault();

        bigPicture.classList.remove('hidden');
        popupPictureImg.src = obj.url;
        popupDescription.textContent = obj.description;
        popupLikesCount.textContent = obj.likes;
        popupCommentsCount.textContent = obj.comments.length;

        // Вызывает функции создания комментариев при открытии
        window.cicleComment(obj);
        // скрывает кнопку добавить еще сразу, если комментариев меньше 5
        commentBigPhoto = document.querySelectorAll('.social__comment');
        if (commentBigPhoto.length <= MIN_NUMBER_COMMENTS) {
          window.previewComments.commentsLoaderButtonHandler.style.display = 'none';
        }
        window.getCommentCount();
        // добавляет событие закрытия ПОПАПА на кнопку ESC
        document.addEventListener('keydown', closePopupImgKeydown);
      });
    };

    var plunkThumbnails = function (arrayThumbnails) {
      // цикл перебирает миниатюры и отдает их в функцию
      for (var i = 0; i < arrayThumbnails.length; i++) {
        openPopupImg(arrayThumbnails[i], data[i]);
      }
    };

    plunkThumbnails(window.thumbnailsImg);

    bigImgCloseButtonHandler.addEventListener('click', function () {
      closePopupImg();
    });
  };

})();
