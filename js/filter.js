// Добавляет фильтрацию фотографий по кнопке
'use strict';
(function () {

  var filterContainer = document.querySelector('.img-filters');
  var filterButtons = filterContainer.querySelectorAll('.img-filters__button');
  var mappedPictures = document.querySelectorAll('.picture');
  var filterPopularButton = filterContainer.querySelector('#filter-popular');
  var filterRandomButton = filterContainer.querySelector('#filter-random');
  var filterDiscussedButton = filterContainer.querySelector('#filter-discussed');

  var deletePhotos = window.removeDebounce(function (currentArray) {
    currentArray.forEach(function (currentPicture) {
      currentPicture.parentNode.removeChild(currentPicture);
    });
  });

  var giveFilterValue = function (arraySortObjects) {
    window.renderPictures(arraySortObjects);
    window.previewPictures(arraySortObjects);
  };

  var makeActiveButton = window.removeDebounce(function (currentButton) {
    var activeButton = document.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    currentButton.classList.add('img-filters__button--active');
  });

  var sortPopularPictures = window.removeDebounce(function (arrayObjects) {
    giveFilterValue(arrayObjects);
  });

  var sortRandomPictures = window.removeDebounce(function (arrayObjects) {
    var arrayRandomPictures = arrayObjects.slice().sort(function () {
      return Math.random() - 0.5;
    });
    arrayRandomPictures = arrayRandomPictures.slice(0, 10);
    giveFilterValue(arrayRandomPictures);
  });

  var sortPicturesDiscussed = window.removeDebounce(function (arrayObjects) {
    var arrayDiscussedPictures = arrayObjects.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    giveFilterValue(arrayDiscussedPictures);
  });

  // фильтрация фотографий
  window.filterPictures = function (data) {
    var arrayPictures = data;

    // показываем раздел фильтрации фотографий
    filterContainer.classList.remove('img-filters--inactive');

    // удаляет класс active у кнопки и добавляет его нажатой кнопке
    var switchButton = function (currentButton) {
      currentButton.addEventListener('click', function () {
        mappedPictures = document.querySelectorAll('.picture');

        if (currentButton === filterPopularButton) {
          deletePhotos(mappedPictures);
          makeActiveButton(currentButton);
          sortPopularPictures(arrayPictures);
        } else if (currentButton === filterRandomButton) {
          deletePhotos(mappedPictures);
          makeActiveButton(currentButton);
          sortRandomPictures(arrayPictures);
        } else if (currentButton === filterDiscussedButton) {
          deletePhotos(mappedPictures);
          makeActiveButton(currentButton);
          sortPicturesDiscussed(arrayPictures);
        }
      });
    };

    // цикл перебирает все кнопки и отдает их в функцию
    var iteratesButton = function (arrayButtons) {
      for (var i = 0; i < arrayButtons.length; i++) {
        switchButton(arrayButtons[i]);
      }
    };

    iteratesButton(filterButtons);
  };

})();
