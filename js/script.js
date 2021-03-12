/********************** MENU EVENTS ****************************/
let menuIcon = $("img.menu");
let menuMobile = $(".mobile-menu");

//aplica evento de click para inverter visibilidade do menu mobile
menuIcon.click(function () {
  menuMobile.slideToggle();
});

//evento resize, desaparece o menu-mobile se tela maior que 760px
function checkMenuDisplay() {
  if ($(window).width() > 760 && menuMobile.css("display") != "none") {
    menuMobile.css("display", "none");
  }
}

$(window).resize(() => {
  checkMenuDisplay();
});

//envento para scroll automatico ao clicar em link do menu
$("nav a").click(function (e) {
  e.preventDefault();

  var section_id = $(this).attr("href");
  var offsetPixels = $(section_id).offset().top;
  $("html, body").animate({ scrollTop: offsetPixels }, 700);
});

/******************** vantagem **********************/
const cor_ativo = "#688293";
const cor_inativo = "#d8d8d8";
selector_visibility_breakpoint = 1000;

$(function () {
  let vantagensContainer = $(".vantagens .all-vantagens");
  let selectorContainer = $(".vantagens-selector");
  let vantagensColum = $(".vantagem");

  //carrega seletores dinamincamente
  vantagensColum.each(function () {
    selectorContainer.append('<div class="selector"></div>');
  });

  let seletores = $(".vantagens .selector");

  function setVantagensDisplay() {
    let width = $(window).width();

    if (width <= selector_visibility_breakpoint) {
      seletores.css("display", "block");
    } else {
      seletores.css("display", "none");
    }
  }

  setVantagensDisplay();

  $(window).resize(() => {
    setVantagensDisplay();
  });

  vantagensContainer.slick({
    dots: true,
    infinite: true,
    prevArrow: false,
    nextArrow: false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: selector_visibility_breakpoint,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });

  vantagensContainer.on("beforeChange", function (slick, currentSlide) {
    let slideIndex = vantagensContainer.slick("slickCurrentSlide");
    seletores.css("background-color", cor_inativo);
    seletores.eq(slideIndex).css("background-color", cor_ativo);
  });

});



  // // Validate, Prevent and set empty value in fields if successful
  // $(document).ready(function () {
  //   $('input[name="name"]').on("input", function () {
  //     let input = $(this);
  //     let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*$/;
  //     let is_name = re.test(input.val());
  //     if (is_name) {
  //       input.removeClass("invalid").addClass("valid");
  //     } else {
  //       input.removeClass("valid").addClass("invalid");
  //     }
  //   });

  //   $('input[name="email]').on("input", function () {
  //     let input = $(this);
  //     let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //     let is_email = re.test(input.val());
  //     if (is_email) {
  //       input.removeClass("invalid").addClass("valid");
  //     } else {
  //       input.removeClass("valid").addClass("invalid");
  //     }
  //   });

  //   $('textarea[name="message"]').keyup(function (event) {
  //     let input = $(this);
  //     let message = $(this).val();
  //     if (message) {
  //       input.removeClass("invalid").addClass("valid");
  //     } else {
  //       input.removeClass("valid").addClass("invalid");
  //     }
  //   });

  //   $(".button").click(function (event) {
  //     let form_data = $("form").serializeArray();
  //     let error_free = true;
  //     for (let input in form_data) {
  //       let element = $(form_data[input]["name"]);
  //       let valid = element.hasClass("valid");
  //       let error_element = $("span", element.parent());
  //       if (!valid) {
  //         error_element.removeClass("error").addClass("error_show");
  //         error_free = false;
  //       } else {
  //         error_element.removeClass("error_show").addClass("error");
  //       }
  //     }
  //     if (!error_free) {
  //       event.preventDefault();
  //     } else {
  //       console.log("No errors: Form will be submitted");
  //     }
  //   });



  // $("form").submit(function (e) {
  //   e.preventDefault();

  //   // Serialize data
  //   var formData = $(this).serialize();

  //   // Make AJAX request

  //   $.post("envia-email.php", formData).done(function () {
  //     $('input[name="name"]').is(':valid').val("");
  //     $('input[name="email"]').val("").trigger('change');
  //     $('textarea[name="message"]').val("").trigger('change');
  //   });
  // });