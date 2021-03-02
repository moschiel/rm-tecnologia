/********************** MENU EVENTS ****************************/
let menuIcon = $('img.menu');
let menuMobile = $('.mobile-menu');

//aplica evento de click para inverter visibilidade do menu mobile
menuIcon.click(function(){
  menuMobile.slideToggle();
});

//evento resize, desaparece o menu-mobile se tela maior que 760px
function checkMenuDisplay() {
  if($(window).width() > 760 && menuMobile.css('display') != 'none') {
    menuMobile.css('display', 'none');
  }
}

$(window).resize(()=>{
  checkMenuDisplay();
});

//envento para scroll automatico ao clicar em link do menu
$('nav a').click(function(e){
  e.preventDefault();

  var section_id = $(this).attr('href');
  var offsetPixels = $(section_id).offset().top;
  $('html, body').animate({scrollTop:offsetPixels}, 700);

});



/******************** vantagem **********************/
const cor_ativo = "#688293";
const cor_inativo = "#d8d8d8";
selector_visibility_breakpoint = 1000

$(function() {

  let vantagensContainer = $('.vantagens .all-vantagens');
  let selectorContainer = $(".vantagens-selector");
  let vantagensColum =  $(".vantagem");

  //carrega seletores dinamincamente
  vantagensColum.each( function(){
    selectorContainer.append('<div class="selector"></div>');
  });

  let seletores = $('.vantagens .selector');
  
  function setVantagensDisplay() {
    let width = $(window).width();

    if(width <= selector_visibility_breakpoint){
      seletores.css('display', 'block');
    }
    else{
      seletores.css('display', 'none');
    }
  }

  setVantagensDisplay();

  $(window).resize(()=>{
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
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  vantagensContainer.on('beforeChange', function (slick, currentSlide) {  
    let slideIndex = vantagensContainer.slick('slickCurrentSlide');
    seletores.css('background-color', cor_inativo);
    seletores.eq(slideIndex).css('background-color', cor_ativo);
  });

})


