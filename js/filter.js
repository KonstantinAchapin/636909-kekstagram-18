// Добавляет фильтрацию фотографий по кнопке
'use strict';
(function () {
  // фильтрация фотографий
  window.filterPictures = function (data) {
    var arrayPictures = data;
    var filterContainer = document.querySelector('.img-filters');
    var filterButtons = filterContainer.querySelectorAll('.img-filters__button');
    var filterPopular = filterContainer.querySelector('#filter-popular');
    var filterRandom = filterContainer.querySelector('#filter-random');
    var filterDiscussed = filterContainer.querySelector('#filter-discussed');

    var deletePhotos = function (currentArray) {
      currentArray.forEach(function (currentPicture) {
        currentPicture.parentNode.removeChild(currentPicture);
      });
    };

    // показываем раздел фильтрации фотографий
    filterContainer.classList.remove('img-filters--inactive');

    // удаляет класс active у кнопки и добавляет его нажатой кнопке
    var switchButton = function (currentButton) {
      currentButton.addEventListener('click', function () {
        var downloadPicture = document.querySelectorAll('.picture');
        var activeButton = filterContainer.querySelector('.img-filters__button--active');
        activeButton.classList.remove('img-filters__button--active');
        currentButton.classList.add('img-filters__button--active');

        if (currentButton === filterPopular) {
          window.setTimeout(function () {
            deletePhotos(downloadPicture);
            var arrayPicturesPopular = arrayPictures.sort(function (a, b) {
              return b.likes - a.likes;
            });
            window.renderPictures(arrayPicturesPopular);
          }, 500);
        } else if (currentButton === filterRandom) {
          window.setTimeout(function () {
            deletePhotos(downloadPicture);
            var arrayPicturesRandom = arrayPictures.sort(function () {
              return Math.random() - 0.5;
            });
            window.renderPictures(arrayPicturesRandom);
          }, 500);
        } else if (currentButton === filterDiscussed) {
          window.setTimeout(function () {
            deletePhotos(downloadPicture);
            var arrayPicturesDiscussed = arrayPictures.sort(function (a, b) {
              return b.comments.length - a.comments.length;
            });
            window.renderPictures(arrayPicturesDiscussed);
          }, 500);
        }
      });
    };

    // цикл перебирает все кнопки и отдает их в функцию
    var cicle = function (button) {
      for (var f = 0; f < button.length; f++) {
        switchButton(button[f]);
      }
    };

    cicle(filterButtons);
    // фильтрация фотографий
  };

  window.load(window.filterPictures, window.ifErrorInsert);

})();
