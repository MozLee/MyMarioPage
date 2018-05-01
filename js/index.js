$(function () {
  let firstEnter = true;
  $("#fullpage").fullpage({
    scrollingSpeed: 2000,
    navigation: true,
    verticalCentered: false,
    afterLoad: function (anchorLink, index) {
      //Mario第一次加载跑路
      if (index === 1 && firstEnter) {
        $(".mario-model")
          .eq(index - 1)
          .animate({
              left: "45%"
            },
            2000,
            function () {
              $(this)
                .removeClass("mario-run-r")
                .addClass("mario-stop-r");
            }
          );
      }
    },
    onLeave: function (index, nextIndex) {
      //离开第一页去第二页
      if (index === 1 && nextIndex === 2) {
        firstEnter = false;
        $(".mario-model")
          .eq(index - 1)
          .removeClass("mario-stop-r mario-run-l mario-stop-l")
          .addClass("mario-run-r")
          .animate({
              left: "100%"
            },
            1000
          );
        $(".mario-model")
          .eq(index)
          .removeClass('mario-lg-run-l mario-lg-stop-r')
          .addClass("mario-lg-run-r")
          .animate({
              left: "50%"
            },
            1900,
            function () {
              $.fn.fullpage.setAllowScrolling(true);

              $(this)
                .removeClass("mario-lg-run-r")
                .addClass("mario-lg-stop-r");
            }
          );
        $('.mushroom-model').animate({
          right: '50%'
        })
      }
      if (index === 2 && nextIndex === 1) {
        stopTouch();
        $(".mario-model")
          .eq(nextIndex - 1)
          .removeClass("mario-run-r")
          .addClass("mario-run-l")
          .animate({
              left: "45%"
            },
            1900,
            function () {
              $(this)
                .removeClass("mario-run-l mario-stop-l")
                .addClass("mario-stop-l");
              startTouch();
            }
          );

        $(".mario-model")
          .eq(nextIndex)
          .removeClass("mario-lg-stop-l")
          .addClass("mario-lg-run-l")
          .animate({
              left: -32
            },
            1900,
            function () {
              $(this)
                .removeClass("mario-run-r")
                .addClass("mario-lg-run-l");
            }
          );
      }
      if (index == 3 && nextIndex == 2) {
        $('.mario-model').eq(nextIndex)
          .removeClass('mario-bl-stop-r')
          .addClass('mario-bl-run-l')
          .animate({
            left: -32
          }, 1900);
        $('.mario-model').eq(nextIndex - 1)
          .removeClass('mario-lg-run-r')
          .addClass('mario-lg-run-l')
          .animate({
            left: '50%'
          }, 1900, function () {
            $(this).removeClass('mario-lg-run-l')
              .addClass('mario-lg-stop-l')
          })
      }
      if (index == 2 && nextIndex == 3) {
        stopTouch();
        $(".mario-model")
          .eq(nextIndex - 1)
          .removeClass("mario-bl-run-l")
          .addClass("mario-bl-run-r")
          .animate({
              left: "45%"
            },
            1900,
            function () {
              $(this)
                .removeClass("mario-bl-run-r")
                .addClass("mario-bl-stop-r");
              startTouch();
            }
          );

        $(".mario-model")
          .eq(index - 1)
          .removeClass("mario-lg-stop-r mario-lg-stop-l")
          .addClass("mario-lg-run-r")
          .animate({
              left: '100%'
            },
            1900
          );
      }
    }
  });
});

function stopTouch() {
  $('.section').on('touchmove', function (e) {
    e.preventDefault()
  }, false);
}

function startTouch() {
  $('.section').off();
}
$(function () {
  $.fn.fullpage.setAllowScrolling(false);
  setTimeout(function () {
    $.fn.fullpage.setAllowScrolling(true);
  }, 2000)
  $(".info p").mouseover(function () {
    $(".info i").removeClass("mushroom");
    $(this)
      .find("i")
      .addClass("mushroom");
  });
  function showTab(index) {
    $('.find_me_cont').each(function(i,item){
      console.log(index);
      $(item).hide();            
      if(i==index){
        console.log(123);
        $(item).show();
      }
    })
  }
  let w = $('.find_me').css('width');
  let a = (parseFloat(w) - 32 * 4) / 5;
  let mario = $('.final-mario')
  let wall_L = $('.find_me').offset().left;
  let postion = 1.5; //记录位置
  let asks = $('.ask')
  // console.log('this',wall_L);
  $('.ask').each(function (i, item) {
    $(this).attr('index', i);
    if (i === 0) {
      $(this).css({
        left: a
      })
    } else {
      $(this).css({
        left: (i + 1) * a + 32 * i
      })
    }
  }).click(function (ev) {
    currPostion = $(this).attr('index')
    let wall_b = $(window).height() - $('.find_me')[0].getBoundingClientRect().bottom - 64 - 70;
    //判断方向 切换人物模型
    if (currPostion - postion > 0) { //人物向右
      mario.removeClass().addClass('mario-model final-mario mario-bl-run-r')
        .animate({
          left: parseFloat($(this).css('left')) + wall_L
        }, 1000, function () { //向上跳
          mario.removeClass().addClass('mario-model final-mario mario-jump-r')
            .animate({
              bottom: wall_b
            }, 500, function () { //跳跃到顶
              $(asks[currPostion]).removeClass('ask-ing').addClass('ask-done');
              mario.animate({
                bottom:0
              },500,function(){//跳跃落地
                 mario.removeClass().addClass('mario-model final-mario mario-bl-stop-r');
                 showTab(currPostion)                
              })
            })
        })
    } else { //人物向左
      mario.removeClass().addClass('mario-model final-mario mario-bl-run-l')
        .animate({
          left: parseFloat($(this).css('left')) + wall_L
        }, 1000, function () { //向上跳
          mario.removeClass().addClass('mario-model final-mario mario-jump-l')
            .animate({
              bottom: wall_b
            }, 500, function () { //跳跃到顶
              $(asks[currPostion]).removeClass('ask-ing').addClass('ask-done');
              mario.animate({
                bottom:0
              },500,function(){//跳跃落地
                 mario.removeClass().addClass('mario-model final-mario mario-bl-stop-l') 
                 showTab(currPostion)                                                
              })
            })
        })
    }
    // console.log(parseFloat($(this).css('left'))+wall_L);
    postion = currPostion;
  })
});
