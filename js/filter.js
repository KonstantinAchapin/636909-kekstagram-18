// Добавляет фильтрацию фотографий по кнопке
'use strict';
(function () {

  var deletePhotos = window.debounce(function (currentArray) {
    currentArray.forEach(function (currentPicture) {
      currentPicture.parentNode.removeChild(currentPicture);
    });
  });

  var sortPopularPictures = window.debounce(function (array) {
    var arrayPopularPictures = array.sort(function (a, b) {
      return b.likes - a.likes;
    });
    window.renderPictures(arrayPopularPictures);
  });

  var sortRandomPictures = window.debounce(function (array) {
    var arrayRandomPictures = array.sort(function () {
      return Math.random() - 0.5;
    });
    window.renderPictures(arrayRandomPictures);
  });

  var sortPicturesDiscussed = window.debounce(function (array) {
    var arrayPicturesDiscussed = array.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.renderPictures(arrayPicturesDiscussed);
  });

  // фильтрация фотографий
  window.filterPictures = function (data) {
    var arrayPictures = data;
    var filterContainer = document.querySelector('.img-filters');
    var filterButtons = filterContainer.querySelectorAll('.img-filters__button');
    var filterPopular = filterContainer.querySelector('#filter-popular');
    var filterRandom = filterContainer.querySelector('#filter-random');
    var filterDiscussed = filterContainer.querySelector('#filter-discussed');

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
          deletePhotos(downloadPicture);
          sortPopularPictures(arrayPictures);
        } else if (currentButton === filterRandom) {
          deletePhotos(downloadPicture);
          sortRandomPictures(arrayPictures);
        } else if (currentButton === filterDiscussed) {
          deletePhotos(downloadPicture);
          sortPicturesDiscussed(arrayPictures);
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

})();
