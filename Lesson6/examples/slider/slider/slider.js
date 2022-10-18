function Slider(selector, width, height) {
  this.sliderEl = document.querySelector(selector);
  this.sliderWidth = width ?? 720;
  this.sliderHeight = height ?? 480;
  if (!this.sliderEl) {
    throw new TypeError(`Wrong slider selector`);
  }
}

// function Slider(selector, options = {}) {
//   this.sliderWidth = options.width ?? 720;
//   this.sliderHeight = options.height ?? 480;
// }

Slider.prototype.init = function () {
  // Ставим слайдеру нужный размер.
  this.sliderEl.style.width = `${this.sliderWidth}px`;
  this.sliderEl.style.height = `${this.sliderHeight}px`;

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

  const run = () =>{
    this.leftArrow.addEventListener('click', () => {
      console.log('leftArrow')
      this.setNextLeftImage();
    });

    this.rightArrow.addEventListener('click', () => {
      console.log('rightArrow')
      this.setNextRightImage();
    });

    this.slides[this.slideIdx].classList.remove('hidden-slide');
  }

  const firstImg = this.slides[this.slideIdx].querySelector('img');

  if(firstImg.complete){
    run();
    return;
  }

  firstImg.addEventListener('load', ()=>{
    this.loadIcon.remove();
    run();
  })

  /*
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
  */
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