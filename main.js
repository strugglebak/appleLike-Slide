function gotoSlide(menuItemIndex) {
  if (menuItemIndex > $menuItems.length - 1) {
    menuItemIndex = 1;
  } else if (menuItemIndex < 1) {
    menuItemIndex = $menuItems.length - 1;
  }

  if (menuItemIndex === 1 && curIndex === $menuItems.length - 1) {
    // 从最后一张跳到第一张
    $images.css({
      transform: `translateX(${-(curIndex + 1) * 920}px)`
    }).one('transitionend', function() {
      $images.hide().offset();
      $images.css({
        transform: `translateX(${-(menuItemIndex) * 920}px)`
      }).show();
    });
  } else if (menuItemIndex === $menuItems.length - 1 && curIndex === 1) {
    // 从第一张跳到最后一张
    $images.css({
      transform: 'translateX(0px)'
    }).one('transitionend', function() {
      $images.hide().offset();
      $images.css({
        transform: `translateX(${-(menuItemIndex) * 920}px)`
      }).show();
    });
  } else {
    $images.css({
      transform: `translateX(${-(menuItemIndex) * 920}px)`
    });
  }
  curIndex = menuItemIndex;
}

function bindEvents() {
  $('#menuItems').on('click', 'li', function(e) {
    let $curMenuItem = $(e.currentTarget);
    let menuItemIndex = $curMenuItem.index();
    gotoSlide(menuItemIndex);
  });
}

function setSlideOn() {
  return setInterval(function() {
    gotoSlide(curIndex + 1);
  }, 2000);
}

let $menuItems = $('#menuItems > li');
let $images = $('#images');
let $imagesChild = $images.children('img');
let $firstFake = $imagesChild.eq(0).clone(true);
let $lastFake = $imagesChild.eq($imagesChild.length - 1).clone(true);

$images.prepend($lastFake);
$images.append($firstFake);
$images.hide().offset();
$images.css({
  transform: 'translateX(-920px)'
});
$images.show();

let curIndex = 1;
bindEvents();

var timeId = setSlideOn();
$('#mainWindow').on('mouseenter', function() {
  window.clearInterval(timeId);
});
$('#mainWindow').on('mouseleave', function() {
  timeId = setSlideOn();
});
