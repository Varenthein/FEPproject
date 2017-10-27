/* USER INFO */

export const $user = {
  isLogged: true,
  login: 'Varenthein',
  token: 'Bv9ja7ejTha6pmWPRrnQ'
}

/* SLIDER */

export function Slider(elem) {

  this.$element = elem;

  this.goNext = function(e) {
    if(e.target.parentNode.nextElementSibling) {
      let presentSlide = e.target.parentNode;
      let nextSlide = e.target.parentNode.nextElementSibling;
      presentSlide.classList.add('animated','bounceOutLeft');
      setTimeout(() => {
        nextSlide.classList.add('animated','bounceInLeft');
        presentSlide.classList.remove('animated','bounceOutLeft');
        presentSlide.style.display = "none";
        nextSlide.style.display = "block";
      }, 500);
    }
  };

  this.goBack = function(e) {
    if(e.target.parentNode.previousElementSibling) {
      let presentSlide = e.target.parentNode;
      let previousSlide = e.target.parentNode.previousElementSibling;
      presentSlide.classList.remove('bounceInLeft');
      presentSlide.classList.add('animated','bounceOutLeft');
      setTimeout(() => {
        presentSlide.classList.remove('bounceOutLeft');
        previousSlide.classList.remove('bounceOutLeft');
        previousSlide.classList.add('animated','bounceInLeft');
        presentSlide.style.display = "none";
        previousSlide.style.display = "block";
      }, 500);
    }
  };

  this.prepare = function() {
    this.$element.querySelectorAll(".slide__next").forEach((item) => item.addEventListener("click",(e) => this.goNext(e)));
    this.$element.querySelectorAll(".slide__back").forEach((item) => item.addEventListener("click",(e) => this.goBack(e)));
    this.$element.querySelectorAll(".slide:not(:first-of-type)").forEach((item) => item.style.display = "none");
  };
  this.prepare();
}

/* TABS */

export function toogleTab(event) {
  event.target.parentElement.querySelectorAll('.tab__content').forEach((item) => item.style.display = "none");
  const sibling = event.target.nextElementSibling;
  sibling.style.display = (sibling.style.display === "none") ? "block" : "none";
}

/* ALERTS */

export function popUpMsg(alert_type, alert_title, alert_msg, alert_time = 3000) {
  const alertElem = document.createElement("div");
  alertElem.classList.add('alert','alert--'+alert_type,'animated','bounceInLeft');
  alertElem.innerHTML = `
    <h3>${alert_title}</h3>
    <hr>
    <p>${alert_msg}</p>
  `;
  const closeBtn = document.createElement("button");
  closeBtn.innerText = "X";
  closeBtn.className = "alert__closeBtn";
  closeBtn.addEventListener("click", function() {
    alertElem.classList.remove('bounceInLeft');
    alertElem.classList.add('bounceOutLeft');
    setTimeout(() => { alertElem.remove(); }, 1000);
  });
  alertElem.appendChild(closeBtn);
  document.body.insertBefore(alertElem, document.body.firstChild);
  setTimeout(() => {
    alertElem.classList.remove('bounceInLeft');
    alertElem.classList.add('bounceOutLeft');
  }, alert_time);
  setTimeout(() => {
    alertElem.remove();
  }, alert_time+1000);
}
