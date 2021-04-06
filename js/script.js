$(document).ready(function () {
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
    
    var section_id = $(this).attr("href");
    var offsetPixels = $(section_id).offset().top;
    e.preventDefault();
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

  //eventos pra limpar validação do formulario ao digitar no input
  $('input[name="name"]').on("input", function () {
    let input = $(this);

    if (input.val().match("^[a-zA-Z ]{3,30}$")) {
      input.removeClass("invalid").addClass("valid");
    } else {
      //input.removeClass("valid").addClass("invalid");
    }
  });

  $('input[name="email"]').on("input", function () {
    let input = $(this);
    const regex = /^(([^<>()[\]\\.,;!@#$%¨&*():\s@"]+(\.[^<>()[\]\\.,;:!@#$%¨&*()\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(input.val())) {
      input.removeClass("invalid").addClass("valid");
    } else {
      //input.removeClass("valid").addClass("invalid");
    }
  });

  $('input[name="cell"]').on("input", function () {
    let input = $(this);

    let formatedText = input
      .val()
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
      .replace(/(-\d{4})\d+?$/, "$1");

    input.val(formatedText);

    if (input.val().match(/^[(][0-9]{2}[)]?[ ]?[0-9]{4,5}[-]?[0-9]{4}$/g)) {
      input.removeClass("invalid").addClass("valid");
    } else {
      // input.removeClass("valid").addClass("invalid");
    }
  });

  $('textarea[name="message"]').keyup(function (event) {
    let input = $(this);
    let lengthMessage = $(this).val().length;

    if (lengthMessage > 0) {
      input.removeClass("invalid").addClass("valid");
    } else {
      //input.removeClass("valid").addClass("invalid");
    }
  });

  //função de validação
  function validate() {
    let name = $('input[name="name"]');
    let email = $('input[name="email"]');
    let cell = $('input[name="cell"]');
    let message = $('textarea');

    if (!name.val().match("^[a-zA-Z ]{3,30}$")) {
      name.removeClass("valid").addClass("invalid");
      alert("Erro: nome inválido");
      return false;
    }

    const regex = /^(([^<>()[\]\\.,;!@#$%¨&*():\s@"]+(\.[^<>()[\]\\.,;:!@#$%¨&*()\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(email.val())) {
      email.removeClass("valid").addClass("invalid");
      alert("Erro: email inválido");
      return false;
    }


    if (!cell.val().match(/^[(][0-9]{2}[)]?[ ]?[0-9]{4,5}[-]?[0-9]{4}$/g)) {
      cell.removeClass("valid").addClass("invalid");
      alert("Erro: Telefone inválido");
      return false;
    }

    if (message.val().length <= 0) {
      message.removeClass("valid").addClass("invalid");
      alert("Erro: preencha a mensagem por favor");
      return false;
    }

    return true;
  }

  //evento Prevent Default do formulario
  $("form").submit(function (e) {
    console.log("PREVENT DEFAULT");
    e.preventDefault();
    // Serialize data
    var formData = $(this).serialize();
    console.log("Ajax Request: ", formData);

    if (!validate()) {
      return;
    }
    //return;

    // Make AJAX request
    $.post("enviar-email.php", formData)
      .done(function () {
        //limpa formulario
        $('input[name="name"]').val("");
        $('input[name="email"]').val("");
        $('input[name="cell"]').val("");
        $('textarea[name="message"]').val("");
        //exibe mensagem de sucesso
        alert("Mensagem enviada com sucesso");
      })
      .fail(function () {
        //exibe mensagem de erro
        alert("Erro no envio da mensagem!");
      });
  });
});
