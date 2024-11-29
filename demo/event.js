function Validator(options) {
  function Validate(inputelement, rule) {
    var erroemessage = rule.test(inputelement.value);
  
    
    var message_loi = inputelement.parentElement.querySelector(
      options.errorSelector
    );
    if (erroemessage) {
      message_loi.innerText = erroemessage;
    } else {
      message_loi.innerText = "";
    }
    return !erroemessage;
  }
  var FormElement = document.getElementById(options.form);

  if (FormElement) {
    FormElement.onsubmit = function (e) {
      e.preventDefault();
      var isValid = true;
      options.rules.forEach(function (rule) {
        var inputelement = FormElement.querySelector(rule.selector);

        var message_loi = inputelement.parentElement.querySelector(
          options.errorSelector
        );
        // Xu ly blue ra khoi input

        var erroemessage = rule.test(inputelement.value);

        var checkform = Validate(inputelement, rule);
        if (!checkform) {
          isValid = false;
        }
      });
      // '[name]:not([disabled])' lay ra nhung thng khong co dislabe

      if (isValid) {
        // truong hop submit voi JS
        if (typeof options.onSubmit === "function") {
          var inputok = FormElement.querySelectorAll("[name]");
          var formvalues = Array.from(inputok).reduce(function (values, input) {
            return (values[input.name] = input.value) && values;
          }, {});

          options.onSubmit(formvalues);
        }
        // truong hop mac dinh
        else {
          FormElement.submit();
        }
      }
    };
    options.rules.forEach(function (rule) {
      var inputelement = FormElement.querySelector(rule.selector);
      if (inputelement) {
        var message_loi = inputelement.parentElement.querySelector(
          options.errorSelector
        );
        // Xu ly blue ra khoi input
        inputelement.onblur = function () {
          var erroemessage = rule.test(inputelement.value);

          Validate(inputelement, rule);
        };
        // xu ly khi nguoi dung nhap input
        inputelement.oninput = function () {
          message_loi.innerText = "";
        };
      }
    });
  }
}

// nguyen tac cua rules
// khi co loi thi tra ve mesage loi
// khi hop le thi khong tra ra cg
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Vui lòng nhập trường này!";
    },
  };
};
Validator.minLength = function (selector, min) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : `Vui lòng nhập tối thiểu ${min} ký tự `;
    },
  };
};
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var ms = "";
      if (value.trim() == "") {
        ms = "Vui lòng nhập trường này!";
        return ms;
      } else if (!check.test(value)) {
        ms = "Vui lòng nhập đúng định dạng";
        return ms;
      }
      return undefined;
    },
  };
};
Validator.isConfimed = function (selector, getpass, mesage) {
  return {
    selector: selector,
    test: function (value) {
      return value === getpass() ? undefined : mesage;
    },
  };
};

function check() {
  var bgmoad = document.getElementById("content");

  bgmoad.style.backgroundColor = `rgb(${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
}
function checkout() {
  var bgmoad = document.getElementById("content");
  var thoat = document.getElementById("thoat");
  if (confirm("Are you sure you want to checkout")) {
    thoat.setAttribute("data-dismiss", "modal");
  } else {
    thoat.setAttribute("data-dismiss", "aj");
  }
}
