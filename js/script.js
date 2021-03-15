//$(document).ready(function () {
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

  //evento para scroll automatico ao clicar em link do menu
  $("nav a").click(function (e) {
    e.preventDefault();
  
    var section_id = $(this).attr("href");
    var offsetPixels = $(section_id).offset().top;
    $("html, body").animate({ scrollTop: offsetPixels }, 700);
  });

  /******************** vantagem slick caroussel **********************/
  selector_visibility_breakpoint = 1000;
  $(function () {
    let vantagensContainer = $(".vantagens .all-vantagens");
  
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
  });

  //eventos de validação do formulario
  $('input[name="name"]').on("input", function () {
    console.log("AQUI");
    let input = $(this);

    if ( input.val().match('^[a-zA-Z]{3,16}$') ) {
      //console.log( "Valid name" );
      input.removeClass("invalid").addClass("valid");
    } else {
      //console.log("That's not a name");
      input.removeClass("valid").addClass("invalid");
    }
  });
//});


  // // Validate, Prevent and set empty value in fields if successful
  // $(document).ready(function () {


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

//Prevent Default do formulario
$("form").submit(function (e) {
  console.log("PREVENT DEFAULT");
  e.preventDefault();
  // Serialize data
  var formData = $(this).serialize();
  console.log("Ajax Request: ", formData);

  return;

  // Make AJAX request
  $.post("envia-email.php", formData)
  .done(function () {
    //limpa formulario
    $('input[name="name"]').val("");
    $('input[name="email"]').val("");
    $('textarea[name="message"]').val("");
    //exibe mensagem de sucesso
    alert('Mensagem enviada com sucesso');
  })
  .fail( function() {
    //exibe mensagem de erro
    alert('Erro no envio da mensagem!');
  });
});