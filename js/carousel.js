/******************** vantagem slick caroussel **********************/
$(document).ready(function () {
    
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

});