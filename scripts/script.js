const mainSwiper = new Swiper(".slider__container", {
  navigation: {
    prevEl: ".slider__button_prev",
    nextEl: ".slider__button_next",
  },
  simulateTouch: false,
  spaceBetween: 24,
  slideToClickedSlide: true,
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    // условия для разных размеров окна браузера
    768: {
      // при 768px и выше
      slidesPerView: 2,
    },
    1280: {
      // при 1280px и выше
      slidesPerView: 3,
    },
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  speed: 500,
});

const prosSwiper = new Swiper(".slider-pros__container", {
  navigation: {
    prevEl: ".slider-pros__button_prev",
    nextEl: ".slider-pros__button_next",
  },
  simulateTouch: false,
  speed: 700,
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
});
//=====MENU BURGER================================================================================================
const menuBurger = document.getElementById("menuBurger");
const menuBurgerList = document.getElementById("menuBurgerList");
menuBurger.addEventListener("click", function (e) {
  menuBurgerList.classList.toggle("open");
  menuBurger.classList.toggle("active");
});
//=====TABS==================================================================================================
const allTabs = document.querySelectorAll("[data-goto]");
if (allTabs.length > 0) {
  for (let i = 0; i < allTabs.length; i++) {
    const clickedTab = allTabs[i];
    clickedTab.addEventListener("click", function (e) {
      document.querySelector(".inUse").classList.remove("inUse");
      document.querySelector(".openTab").classList.remove("openTab");

      clickedTab.parentElement.classList.add("inUse");
      document
        .getElementById(clickedTab.getAttribute("data-goto"))
        .classList.add("openTab");
      e.preventDefault();
    });
  }
}

//=======SCROLL===========================================================================================

const scrollLinks = document.querySelectorAll("[data-scrollto]");
if (scrollLinks.length > 0) {
  for (let i = 0; i < scrollLinks.length; i++) {
    const scrollLink = scrollLinks[i];
    scrollLink.addEventListener("click", function (e) {
      if (
        scrollLink.dataset.scrollto &&
        document.querySelector(scrollLink.dataset.scrollto)
      ) {
        const scrolltoBlock = document.querySelector(
          scrollLink.dataset.scrollto
        );
        const scrolltoBlockValue =
          scrolltoBlock.getBoundingClientRect().top + scrollY;
        if (menuBurger.classList.contains("active")) {
          menuBurgerList.classList.remove("open");
          menuBurger.classList.remove("active");
        }
        window.scrollTo({
          top: scrolltoBlockValue,
          behavior: "smooth",
        });
        e.preventDefault();
      }
    });
  }
}
//=======VALIDATION==================================================================
const form = document.querySelector(".contacts__form");
form.addEventListener("submit", formSend);
async function formSend(e) {
  e.preventDefault();

  let error = formValidate(form);
  if (error === 0) {
    successfulOrder();
    form.reset();
  }
}
function formValidate(form) {
  let error = 0;
  let formReq = document.querySelectorAll("._req");

  for (let i = 0; i < formReq.length; i++) {
    const inputForValidation = formReq[i];
    formRemoveError(inputForValidation);

    if (inputForValidation.value === "") {
      formAddError(inputForValidation);
      error++;
    }
  }

  return error;
}
function formAddError(inputForValidation) {
  inputForValidation.parentElement.classList.add("_error");
  inputForValidation.classList.add("_error");
}
function formRemoveError(inputForValidation) {
  inputForValidation.parentElement.classList.remove("_error");
  inputForValidation.classList.remove("_error");
}
function successfulOrder() {
  const questionSuccess = document.createElement("div");
  questionSuccess.className = "questionSuccess";
  questionSuccess.textContent = "Спасибо! Мы свяжемся с вами в ближайшее время";
  document.querySelector("body").append(questionSuccess);
  setTimeout(() => {
    questionSuccess.remove();
  }, 5000);
}
