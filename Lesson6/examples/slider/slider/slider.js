function Slider(selector, width, height) {
  this.sliderEl = document.querySelector(selector);
  this.sliderWidth = width ?? 720;
  this.sliderHeight = height ?? 480;
  if (!this.sliderEl) {
    throw new TypeError(`Wrong slider selector`);
  }
}

Slider.prototype.init = function () {
  // Ставим слайдеру нужный размер.
  this.sliderEl.style.width = this.sliderWidth;
  this.sliderEl.style.height = this.sliderHeight;

  // Создаем иконку загрузки
  this.loadIcon = document.createElement('i');
  this.loadIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
  this.sliderEl.prepend(this.loadIcon);

  // Создаем левую стрелку
  this.leftArrow = document.createElement('i');
  this.leftArrow.classList.add('fas', 'fa-chevron-circle-left', 'slider-leftArrow');
  this.sliderEl.append(this.leftArrow);

  // Создаем правую стрелку
  this.rightArrow = document.createElement('i');
  this.rightArrow.classList.add('fas', 'fa-chevron-circle-right', 'slider-rightArrow');
  this.sliderEl.append(this.rightArrow);

  this.slides = document.querySelectorAll('.slider-item');
  this.slideIdx = 0;

  // Ждем когда загрузится весь контент
  window.addEventListener('load', () => {
    // Добавляем обработчик для левой стрелки
    this.leftArrow.addEventListener('click', () => {
      this.setNextLeftImage();
    });
    // Добавляем обработчик для правой стрелки
    this.rightArrow.addEventListener('click', () => {
      this.setNextRightImage();
    });
    // Показываем первый слайд
    this.slides[this.slideIdx].classList.remove('hidden-slide');
    // Удаляем спинер загрузки
    this.loadIcon.remove();
  });
};

Slider.prototype.setNextLeftImage = function () {
  this.slides[this.slideIdx].classList.add("hidden-slide");
  this.slideIdx = this.slideIdx === 0
    ? this.slides.length - 1
    : this.slideIdx - 1;
  this.slides[this.slideIdx].classList.remove('hidden-slide');
};

Slider.prototype.setNextRightImage = function () {
  this.slides[this.slideIdx].classList.add("hidden-slide");
  this.slideIdx = this.slideIdx === this.slides.length - 1
    ? 0
    : this.slideIdx + 1;
  this.slides[this.slideIdx].classList.remove('hidden-slide');
};