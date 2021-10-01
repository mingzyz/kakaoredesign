console.clear();

// Params
var sliderSelector = '.banner-slide .swiper',
    options = {
      init: false,
      loop: true,
      speed:800,
      slidesPerView: 2,
      spaceBetween: 120,
      centeredSlides : true,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 50,
        stretch: 100,
        depth: 100,
        modifier: 1,
        slideShadows : true,
      },
      grabCursor: true,
      parallax: true,
      pagination: {
        el: '.banner-slide .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.banner-slide .swiper-button-next',
        prevEl: '.banner-slide .swiper-button-prev',
      },
    };
var mySwiper = new Swiper(sliderSelector, options);

// Initialize slider
mySwiper.init();


const swiper2 = new Swiper('.new-stage-slide .swiper', {
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  autoplay: {
    delay: 5000,
  },
  loop: true,
  navigation: {
    nextEl: '.new-stage-slide .swiper-button-next',
    prevEl: '.new-stage-slide .swiper-button-prev',
  },

});




$(".stage-card").mouseenter(function(){
  let $this = $(this);
  $this.addClass("active");
});

$(".stage-card").mouseleave(function() {
  let $this = $(this);
  $this.removeClass("active");
})


function TabBox__changed(eventType, tbName, tbItemNo) {
  console.log(`eventType : ${eventType}, tbName : ${tbName}, tbItemNo : ${tbItemNo}`);
}

function TabBox__init() {
  $('[data-tb]').each(function(index, el) {
    const $el = $(el);
    const tbAttrValue = $el.attr('data-tb');
    
    const tbAttrValueBits = tbAttrValue.split('__');
    
    const tbName = tbAttrValueBits[0];
    const tbItemNo = parseInt(tbAttrValueBits[1]);
    const tbItemType = tbAttrValueBits[2];
    
    $el.data('data-tbName', tbName);
    $el.data('data-tbItemNo', tbItemNo);
    $el.data('data-tbItemType', tbItemType);
    
    if ( tbItemType == 'head' ) {
      const $items = $(`[data-tb^="${tbName}__"]`);
      const $bodyItem = $(`[data-tb="${tbName}__${tbItemNo}__body"]`);
      
      $el.click(function() {
        const $activedItems = $(`[data-tb^="${tbName}__"].tb-active`);
        
        if ( $activedItems.length > 0 ) {
          const oldNo = $activedItems.eq(0).data('data-tbItemNo');

          if ( oldNo == tbItemNo ) {
            return;
          }
          
          $activedItems.removeClass('tb-active');
          $('html').removeClass(`${tbName}__${oldNo}__actived`);
          if ( TabBox__changed ) {
            TabBox__changed('inactive', tbName, oldNo);
          }
        }
        
        $el.addClass('tb-active');
        $bodyItem.addClass('tb-active');
        
        $('html').addClass(`${tbName}__${tbItemNo}__actived`);
        if ( TabBox__changed ) {
          TabBox__changed('active', tbName, tbItemNo);
        }
      });
    }
  });
  
  $('[data-tb-clicked]').click();
}

TabBox__init();
