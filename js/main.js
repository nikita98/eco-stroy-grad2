(function () {
  console.log(123123);
})();

$(document).ready(function () {
  $(".projects__project-item").magnificPopup({
    delegate: "a",
    type: "image",
  });

  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    items: 1,
  });

  $(function () {
    let tab = $("#tabs .tab");
    tab.hide().filter(":first").show();

    // Клики по вкладкам.
    $("#tabs .tabs__link")
      .click(function () {
        tab.hide();
        tab.filter(this.hash).show();
        $("#tabs .tabs__link").removeClass("active");
        $(this).addClass("active");
        return false;
      })
      .filter(":first")
      .click();

    // // Клики по якорным ссылкам.
    // $(".tabs-target").click(function () {
    //   $("#tabs .tabs-nav a[href=" + $(this).attr("href") + "]").click();
    // });
  });

  var price;
  $(".poup_open").click(function () {
    $(".popup_container").delay(1).fadeIn(150), $(".poup").fadeIn(200);
  }),
    $(".poup > a").click(function () {
      $(".popup_container").fadeOut(200), $(".poup").fadeOut(150);
    }),
    $(".popup_container").click(function (a) {
      $(a.target).closest(".poup").length ||
        ($(".popup_container").fadeOut(200),
        $(".poup").fadeOut(150),
        a.stopPropagation());
    }),
    $(".price").hover(
      function () {
        (price = $(this).html()), $(this).addClass("active").html("Подробнее");
      },
      function () {
        $(this).removeClass("active").html(price);
      }
    ),
    $(function () {
      $(".fileinput").change(function () {
        $(".pfile").html($(this).val());
      });
    }),
    $(".slider_box > a.close").click(function () {
      $(".back_layout").delay(100).fadeOut(100), $(".slider_box").fadeOut(100);
    }),
    $(".back_layout").click(function (a) {
      $(a.target).closest(".slider_box").length ||
        ($(".back_layout").delay(100).fadeOut(100),
        $(".slider_box").fadeOut(100),
        a.stopPropagation());
    }),
    $(".gallery a").click(function () {
      var a = $(this).attr("data-slide");
      $(".back_layout").fadeIn(100),
        $("#" + a)
          .delay(100)
          .fadeIn(100);
    }),
    $("area").click(function () {
      var a = $(this).attr("data-slide");
      $(".back_layout").fadeIn(100),
        $("#" + a)
          .delay(100)
          .fadeIn(100);
    }),
    $(".rem_box h6 a").click(function () {
      ($sub = $(this).closest(".rem_box").children("h5").html()),
        $(".popup_container form input[name='psub']").val(
          "Заявка с сайта на " + $sub.replace(/<\/?[^>]+>/gi, " ")
        );
    }),
    $(".zz p a").click(function () {
      $(".popup_container form input[name='psub']").val(
        "Заявка с сайта на обратный звонок"
      );
    });

  jQuery(document).ready(function (e) {
    e("#slider1").bjqs({}),
      e("#slider2").bjqs({}),
      e("#slider3").bjqs({}),
      e("#slider4").bjqs({}),
      e("#slider5").bjqs({}),
      e("#slider6").bjqs({});
  });
});
