$(function () {
  $(".rf").each(function () {
    var item = $(this),
      btn = item.find(".feedback");
    function checkInput() {
      item.find("select.required").each(function () {
        if ($(this).val() == "0") {
          $(this).parents(".form-group").addClass("error");
        } else {
          $(this).parents(".form-group").removeClass("error");
        }
      });

      item.find("input[type=text].required").each(function () {
        if ($(this).val() != "") {
          $(this).removeClass("error");
        } else {
          $(this).addClass("error");
        }
      });
      item.find("textarea.required").each(function () {
        if ($(this).val() != "") {
          $(this).removeClass("error");
        } else {
          $(this).addClass("error");
        }
      });
      item.find("input[type=email]").each(function () {
        var regexp =
          /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
        var $this = $(this);
        if ($this.hasClass("required")) {
          if (regexp.test($this.val())) {
            $this.removeClass("error");
          } else {
            $this.addClass("error");
          }
        } else {
          if ($this.val() != "") {
            if (regexp.test($this.val())) {
              $this.removeClass("error");
            } else {
              $this.addClass("error");
            }
          } else {
            $this.removeClass("error");
          }
        }
      });
      item.find("input[type=checkbox].required").each(function () {
        if ($(this).is(":checked")) {
          $(this).removeClass("error");
        } else {
          $(this).addClass("error");
        }
      });
    }
    btn.click(function () {
      checkInput();
      var sizeEmpty = item.find(".error:visible").length;
      if (sizeEmpty > 0) {
        return false;
      } else {
        item.submit();
      }
    });
  });
  $("select").change(function () {
    if ($(this).val() == "") {
      $(this).parents(".form-group").removeClass("selected");
    } else {
      $(this).parents(".form-group").addClass("selected");
      $(this).parents(".form-group").removeClass("error");
    }
  });
});

function inArray(needle, haystack) {
  var length = haystack.length;
  for (var i = 0; i < length; i++) {
    if (typeof haystack[i] == "object") {
      if (arrayCompare(haystack[i], needle)) return true;
    } else {
      if (haystack[i] == needle) return true;
    }
  }
  return false;
}
window.isset = function (v) {
  if (typeof v == "object" && v == "undefined") {
    return false;
  } else if (arguments.length === 0) {
    return false;
  } else {
    var buff = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
      if (typeof buff === "undefined" || buff === null) return false;
      buff = buff[arguments[i + 1]];
    }
  }
  return true;
};

function myconf() {
  var cf = $.Deferred();
  $.ajax({
    type: "POST",
    url: "feedback/",
    dataType: "json",
    data: "act=cfg",
    success: function (answer) {
      cf.resolve(answer.configs);
    },
  });
  return cf;
}

var mcf = myconf();

mcf.done(function (conf) {
  $(document).ready(function () {
    (function () {
      var fb = $(".feedback");
      if (fb.length > 0) {
        fb.each(function () {
          var form = $(this).closest("form"),
            name = form.attr("name");
        });
      }
    })();
  });

  /**
   * �������� ����.
   *
   */

  function feedback(vars) {
    var bt = $(vars.form).find(".feedback");
    var btc = bt.clone();
    var bvc = bt.val();
    var cfg = conf[vars.act].cfg;

    $.ajax({
      type: "POST",
      url: "feedback/",
      cache: false,
      dataType: "json",
      data: "act=" + vars.act + "&" + vars.data,
      beforeSend: function () {
        $(bt).prop("disabled", true);
        $(bt).addClass("loading");
      },
      success: function (answer) {
        $(bt).prop("disabled", false);
        $(bt).removeClass("loading");

        if (isset(answer.ok) && answer.ok == 1) {
          $(vars.form)[0].reset();
          $.each(answer.infos, function (k, val) {
            $(".feedback_form-success-message").html(val);
            $(".feedback_thanks").fadeIn(1000);
            setTimeout(function () {
              $(".feedback_thanks").fadeOut(1000);
            }, 2500);
          });
        } else {
          $.each(answer.errors, function (k, val) {
            $(".feedback_form-success-message").html(val);

            $(".feedback_thanks-error").fadeIn(1000);
            setTimeout(function () {
              $(".feedback_thanks-error").fadeOut(1000);
            }, 2500);
          });
        }
      },
    });
  }

  /**
   * ���������� ������ ����.
   * ������ ������ ���� ������ ����� <form> c ������� .feedback
   * ����� ���������� ����� ���-�� �����, ����� ������
   *
   */

  $(document).on("click", ".feedback", function () {
    var form = $(this).closest("form"),
      name = form.attr("name"),
      obj = {};
    obj.form = form;
    obj.act = name;
    obj.data = $(form).serialize();

    feedback(obj);

    return false;
  });
}); // done
