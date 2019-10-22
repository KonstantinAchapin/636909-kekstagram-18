// Определяет функциональсность комментариев в превью изображения
'use strict';
(function () {

  var commentCopy = document.querySelector('.social__comment').cloneNode(true);
  var commentsInitial = document.querySelectorAll('.social__comment');
  window.commentsLoaderButton = document.querySelector('.comments-loader');

  // функция удаляет комментарии
  window.deleteComments = window.debounce(function (currentArray) {
    currentArray.forEach(function (currentPicture) {
      currentPicture.parentNode.removeChild(currentPicture);
    });
  });

  window.deleteComments(commentsInitial);

  window.commentContain = document.querySelector('.social__comments');

  // Создает и добавляет комментарий из полученных с сервера данных
  var getCommentElement = function (currentComment) {
    window.commentUser = commentCopy.cloneNode(true);

    var commentImg = window.commentUser.querySelector('.social__picture');
    var commentText = window.commentUser.querySelector('.social__text');

    commentImg.src = currentComment.avatar;
    commentText.textContent = currentComment.message;

    window.commentContain.appendChild(window.commentUser);
  };

  // Вызывает функцию getCommentElement создавая все комментарии из массива объектов при этом скрывает все после 5-ого
  window.cicleComment = function (currentComment) {
    for (var i = 0; i < currentComment.comments.length; i++) {
      getCommentElement(currentComment.comments[i]);
      if (i > 4) {
        window.commentUser.classList.add('visually-hidden');
      }
    }
  };

  // ДОРАБОТАТЬ ПРИБАВЛЕНИЕ ЗНАЧЕНИЯ ПРИ НАЖАТИИ КНОПКИ //

  window.getCommentCount = function () {
    var commentCount = document.querySelector('.social__comment-count');

    var commentsAll = document.querySelectorAll('.social__comment');
    var commentsHidden = document.querySelectorAll('.social__comment.visually-hidden');

    var commentsVisuallyNumber = commentsAll.length - commentsHidden.length;
    commentCount.firstChild.nodeValue = commentsVisuallyNumber + ' из ';
  };

  // ДОРАБОТАТЬ ПРИБАВЛЕНИЕ ЗНАЧЕНИЯ ПРИ НАЖАТИИ КНОПКИ //

  // Добавляет 5 и менее комментариев при нажатии на кнопку загрузить ещё
  window.commentsLoaderButton.addEventListener('click', function () {
    var commentsHidden = document.querySelectorAll('.social__comment.visually-hidden');

    for (var i = 0; i < commentsHidden.length; i++) {
      if (i < 5) {
        commentsHidden[i].classList.remove('visually-hidden');
      }

      if (commentsHidden.length <= 5) {
        window.commentsLoaderButton.style.display = 'none';
      }
    }
    window.getCommentCount();
  });

})();
