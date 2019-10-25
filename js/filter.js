// Добавляет фильтрацию фотографий по кнопке
'use strict';
(function () {

  var filterContainer = document.querySelector('.img-filters');
  var filterButtons = filterContainer.querySelectorAll('.img-filters__button');
  var mappedPicture = document.querySelectorAll('.picture');
  var filterPopularButton = filterContainer.querySelector('#filter-popular');
  var filterRandomButton = filterContainer.querySelector('#filter-random');
  var filterDiscussedButton = filterContainer.querySelector('#filter-discussed');

  var deletePhotos = window.removeDebounce(function (currentArray) {
    currentArray.forEach(function (currentPicture) {
      currentPicture.parentNode.removeChild(currentPicture);
    });
  });

  var giveFilterValue = function (array) {
    window.renderPictures(array);
    window.previewPictures(array);
  };

  var makeActiveButton = window.removeDebounce(function (currentButton) {
    var activeButton = document.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    currentButton.classList.add('img-filters__button--active');
  });

  var sortPopularPictures = window.removeDebounce(function (array) {
    giveFilterValue(array);
  });

  var sortRandomPictures = window.removeDebounce(function (array) {
    var arrayRandomPictures = array.slice().sort(function () {
      return Math.random() - 0.5;
    });
    arrayRandomPictures = arrayRandomPictures.slice(0, 10);
    giveFilterValue(arrayRandomPictures);
  });

  var sortPicturesDiscussed = window.removeDebounce(function (array) {
    var arrayPicturesDiscussed = array.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    giveFilterValue(arrayPicturesDiscussed);
  });

  // фильтрация фотографий
  window.filterPictures = function (data) {
    var arrayMyPictures = data;
    var arrayPictures = data;

    // показываем раздел фильтрации фотографий
    filterContainer.classList.remove('img-filters--inactive');

    // удаляет класс active у кнопки и добавляет его нажатой кнопке
    var switchButton = function (currentButton) {
      currentButton.addEventListener('click', function () {
        mappedPicture = document.querySelectorAll('.picture');

        if (currentButton === filterPopularButton) {
          deletePhotos(mappedPicture);
          makeActiveButton(currentButton);
          sortPopularPictures(arrayMyPictures);
        } else if (currentButton === filterRandomButton) {
          deletePhotos(mappedPicture);
          makeActiveButton(currentButton);
          sortRandomPictures(arrayPictures);
        } else if (currentButton === filterDiscussedButton) {
          deletePhotos(mappedPicture);
          makeActiveButton(currentButton);
          sortPicturesDiscussed(arrayPictures);
        }
      });
    };

    // цикл перебирает все кнопки и отдает их в функцию
    var plunkButton = function (button) {
      for (var f = 0; f < button.length; f++) {
        switchButton(button[f]);
      }
    };

    plunkButton(filterButtons);
  };

})();
