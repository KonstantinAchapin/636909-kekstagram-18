// Добавляет комментрии и их функциональность в превью изображения
'use strict';
(function () {
  var MIN_NUMBER_HIDDEN_COMMENTS = 4;
  var SHOW_NUMBER_COMMENTS = 5;

  // копия комментраия для дальнейшего использования
  var commentCopy = document.querySelector('.social__comment').cloneNode(true);

  var commentContain = document.querySelector('.social__comments');
  var commentsLoaderButtonHandler = document.querySelector('.comments-loader');
  var commentsInitial = document.querySelectorAll('.social__comment');
  var commentCount = document.querySelector('.social__comment-count');

  window.previewComments = {
    commentContain: commentContain,
    commentsLoaderButtonHandler: commentsLoaderButtonHandler,
  };

  // функция удаляет комментарии
  window.deleteComments = window.removeDebounce(function (currentArray) {
    currentArray.forEach(function (currentPicture) {
      currentPicture.parentNode.removeChild(currentPicture);
    });
  });

  // удаляем стандартные комментарии в разметке
  window.deleteComments(commentsInitial);

  // Создает и добавляет комментарий из полученных с сервера данных
  var getCommentElement = function (currentComment) {
    window.commentUser = commentCopy.cloneNode(true);

    var commentImg = window.commentUser.querySelector('.social__picture');
    var commentText = window.commentUser.querySelector('.social__text');

    commentImg.alt = currentComment.name;
    commentImg.src = currentComment.avatar;
    commentText.textContent = currentComment.message;

    window.previewComments.commentContain.appendChild(window.commentUser);
  };

  // Вызывает функцию getCommentElement создавая все комментарии из массива объектов при этом скрывает все после 5-ого
  window.cicleComment = function (currentComment) {
    for (var i = 0; i < currentComment.comments.length; i++) {
      getCommentElement(currentComment.comments[i]);
      if (i > MIN_NUMBER_HIDDEN_COMMENTS) {
        window.commentUser.classList.add('visually-hidden');
      }
    }
  };

  // Добавляет 5 и менее комментариев при нажатии на кнопку загрузить ещё
  var addComments = window.removeDebounce(function () {
    var commentsHidden = document.querySelectorAll('.social__comment.visually-hidden');

    for (var i = 0; i < commentsHidden.length; i++) {
      if (i < SHOW_NUMBER_COMMENTS) {
        commentsHidden[i].classList.remove('visually-hidden');
      }

      // скрывает кнопку когда комментарии закончились
      if (commentsHidden.length <= SHOW_NUMBER_COMMENTS) {
        window.previewComments.commentsLoaderButtonHandler.style.display = 'none';
      }
    }
  });

  window.previewComments.commentsLoaderButtonHandler.addEventListener('click', function () {
    addComments();
    window.getCommentCount();
  });

  // показывает количество видимых комментариев в счетчике
  window.getCommentCount = window.removeDebounce(function () {
    var commentsAll = document.querySelectorAll('.social__comment').length;
    var commentsHidden = document.querySelectorAll('.social__comment.visually-hidden').length;

    var commentsVisuallyNumber = commentsAll - commentsHidden;
    commentCount.firstChild.nodeValue = commentsVisuallyNumber + ' из ';
  });

})();
