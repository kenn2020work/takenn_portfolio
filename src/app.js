$(function () {
  $('div.line').each(function () {
    var $win = $(window),
        $winH = $win.height(),
        $connect = $(this),
        position = $connect.offset().top,
        current = 0,
        scroll;
    $win.on('load scroll', function () {
      scroll = $win.scrollTop();
      current = (1 - (position - scroll) / $winH) * 2 * 100;
      if (current > 99.9) {
        current = 100;
      }
      if (scroll > position - $winH) {
        $connect.css({width: current + '%'});
      }
    });
  });
});