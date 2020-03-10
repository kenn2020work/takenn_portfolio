$(function () {

  //下scrollで画像を閉じる
  $(window).scroll(function () {
    var scroll = $(this).scrollTop();
    // console.log("スクロール量：" + scroll);
    $(".top-image").css({
      height: 500 - scroll
    });

    //scrollして画像が0pxになった時にdisplay: none;にする
    if (scroll < 500) {
      $(".site-title").removeClass("none");
      // console.log("Scroll：500未満です")
    } else {
      $(".site-title").addClass("none");
      // console.log("Scroll：500以上です")
    }
    
    //画面幅に合わせて
    jQuery(document).ready(function () {
      //560px以下
      if (window.matchMedia('(max-width:560px)').matches) {
        $(function () {
          if (scroll < 500) {
            $(".header-2").removeClass("none");
            $(".sticky-header").css("display","none");
          } else {
            $(".header-2").addClass("none");
            $(".sticky-header").removeClass("none");
            $(".sticky-header").css({
              'display': 'block',
              'transition': '0.8s',
              'transition delay': '0.5s',
            });
          }
        });
      } //560px以上
      else {
        $(".header-2").removeClass("none");
      }
  });

    //ふわっと現れる1
    $(".effect").each(function () {
      var imgPos = $(this).offset().top;
      // var scroll = $(this).scrollTop();
      var windowHeight = $(window).height();
      // console.log("imgPos:" + imgPos);
      // console.log("scroll:" + scroll);
      // console.log("windowHeight:" + windowHeight);
      if (scroll > imgPos - windowHeight + windowHeight / 2 ) {
        $(".effect").css("opacity", "1");
      } else {
        $(".effect").css("opacity", "0");
      }
    });

    //ふわっと現れる2
    $(".effect2").each(function () {
      var imgPos = $(this).offset().top;
      // var scroll = $(this).scrollTop();
      var windowHeight = $(window).height();
      // console.log("imgPos:" + imgPos);
      // console.log("scroll:" + scroll);
      // console.log("windowHeight:" + windowHeight);
      if (scroll > imgPos - windowHeight * 0.7) {
        $(".effect2").css("opacity", "1");
      } else {
        $(".effect2").css("opacity", "0");
      }
    });

        //ふわっと現れる3
        $(".effect3").each(function () {
          var imgPos = $(this).offset().top;
          // var scroll = $(this).scrollTop();
          var windowHeight = $(window).height();
          // console.log("imgPos:" + imgPos);
          // console.log("scroll:" + scroll);
          // console.log("windowHeight:" + windowHeight);
          if (scroll > imgPos - windowHeight * 0.9 ) {
            $(".effect3").css("opacity", "1");
          } else {
            $(".effect3").css("opacity", "0");
          }
        });
  });
});