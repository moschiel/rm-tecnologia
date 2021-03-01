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

//envento para scroll automatico ao clicar em link do menu
$('nav a').click(function(e){
  e.preventDefault();

  var section_id = $(this).attr('href');
  var offsetPixels = $(section_id).offset().top;
  $('html, body').animate({scrollTop:offsetPixels}, 700);

});

/********************** COLABORADOR SLIDER EVENTS ****************************/
var scrollContainer = $('.scrollColaboradores');
var colaboradores = $('.colaborador');
var offsetXcolaborador = [];
var seletores = $('.bullets .bolinha');
var curSlideIndex = 0;

seletores.click( (e) => { 
  curSlideIndex = seletores.index( $(e.target) ); //index de quem foi clicado
  shiftSlider(curSlideIndex);
  autoPlaySlider(curSlideIndex);
 });

function calculaSliderOffsets() {
  offsetXcolaborador = [];
  for(let i=0; i<colaboradores.length; i++){
    offsetXcolaborador.push(
      colaboradores.eq(i).offset().left - scrollContainer.offset().left
    )
  }
}

var sliderPlayerInterval;

function autoPlaySlider(optionalIndex) {
  if(sliderPlayerInterval){ //se timer 'setInterval' ja estava criado, deletamos
    clearInterval(sliderPlayerInterval);
  }

  if(optionalIndex){ //seta index atual para rodar o autoPlay, [opcional]
    curSlideIndex = optionalIndex;
  }

  sliderPlayerInterval = setInterval(() => {  
    curSlideIndex++;
    if(curSlideIndex == colaboradores.length) {
      curSlideIndex = 0;
    }
    shiftSlider(curSlideIndex);
  }, 5000);
}

const active_color = '#999999';
const inactive_color = '#c8c8c8';

function shiftSlider(index){
  scrollContainer.animate({scrollLeft: offsetXcolaborador[index]}, 700);
  seletores.css('background-color', inactive_color);
  seletores.eq(index).css('background-color', active_color);
}

function resetSliderPosition() {
  curSlideIndex = 0;
  shiftSlider(0);
}

function initSliderColaborador(){
  calculaSliderOffsets();
  resetSliderPosition()
  autoPlaySlider();
}

//Incializa auto play
initSliderColaborador();

/*************** WINDOW RESIZE EVENTS ************/
$(window).resize(function () { 
  checkMenuDisplay();
  initSliderColaborador();
});
