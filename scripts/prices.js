const tabs = document.querySelectorAll("[data-price]");
if (tabs.length > 0) {
  for (let i = 0; i < tabs.length; i++) {
    const clickedPriceTab = tabs[i];
    clickedPriceTab.addEventListener("click", function (e) {
      document.querySelector(".using").classList.remove("using");
      document.querySelector(".openPriceTab").classList.remove("openPriceTab");

      clickedPriceTab.parentElement.classList.add("using");
      document
        .getElementById(clickedPriceTab.getAttribute("data-price"))
        .classList.add("openPriceTab");
      e.preventDefault();
    });
  }
}

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
