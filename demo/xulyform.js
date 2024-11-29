//NOTE
// thẻ báo lỗi phải nằm trong class "col-8"( timthecungcap:'.col-8',)
// thẻ thông báo phải có class "sp_message"(  thebaoloi:'.sp_message',)
{/* <script src="xulyform.js"></script> 
  <script>
  Validator({
    form:'form-2',
   timthecungcap:'.col-8',
    thebaoloi:'.sp_message',
    rules:[
    Validator.isRequired('#email','Vui lòng nhập trường này!'),
      Validator.isEmail('#email'),
      Validator.isRequired('#fullname','Vui lòng nhập trường này!'),
      Validator.isRequired('#diachi','Vui lòng nhập trường này!'),
      Validator.isRequired('#filess','Vui lòng nhập trường này!'),
      
     
      Validator.isRequired('.form-check input[name="gt"]','Vui lòng nhập trường này!'),
      Validator.isRequired('#pass','Vui lòng nhập trường này!'),
      Validator.isMinlength('#pass',6),
      Validator.isSamepass('#again-pass',function(){
        return document.querySelector('#form-2 #pass').value
      },'Mật khẩu không khớp'),

    ],
    onSubmit:function(data){
    //API
      console.log(data);
      
    }
  })

  </script>
  
 */}














function Validator(options) {
  //tim den the span thong bao
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }
  var selectorRules = {};
  function Validate(inputElement, rule) {
    var thebaoloi = getParent(
      inputElement,
      options.timthecungcap
    ).querySelector(options.thebaoloi);

    var noidungloi;
    var rules = selectorRules[rule.selector];
    for (var i = 0; i < rules.length; ++i) {
     
      switch (inputElement.type) {
        case "radio":
          noidungloi = rules[i](
            formElement.querySelector(rule.selector+':checked'));
          break;
        default:
          noidungloi = rules[i](inputElement.value);
      }

      if (noidungloi) {
        break;
      }
    }

    if (noidungloi) {
      thebaoloi.innerText = noidungloi;
    } else {
      thebaoloi.innerText = "";
    }
    return !noidungloi;
  }

  var formElement = document.getElementById(options.form);
  if (formElement) {
    
    formElement.onsubmit = function (e) {
      e.preventDefault();
      var checkform = true;
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var checkValid = Validate(inputElement, rule);
        if (!checkValid) {
          checkform = false;
        }
       
      });

      if (checkform==true) {
        if (typeof options.onSubmit === "function") {
          var inputok = formElement.querySelectorAll("[name]");
          var formvalue = Array.from(inputok).reduce(function (values, input) {
           switch(input.type){
            case 'radio':
              values[input.name] = formElement.querySelector('input[name="'+input.name+'"]:checked').value;
              break;
              case 'checkbox':
                if(!input.matches(':checked')) return values;
                if(!Array.isArray(values[input.name])){
                  values[input.name]=[input.value];

                }
                values[input.name].push(input.value)
               
                break;
                default:
                  values[input.name] = input.value;
           }
            return values;
          }, {});
          options.onSubmit(formvalue);
        } else {
          formElement.submit();
        }
      }
    };

    options.rules.forEach(function (rule) {
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }
      var inputElements = formElement.querySelectorAll(rule.selector);
        Array.from(inputElements).forEach(function(inputElement){
          if (inputElement) {
            var thebaoloi = getParent(
              inputElement,
              options.timthecungcap
            ).querySelector(options.thebaoloi);
    
            inputElement.onblur = function () {
              var noidungloi = rule.test(inputElement.value);
              Validate(inputElement, rule);
            };
            inputElement.oninput = function () {
              thebaoloi.innerText = "";
            };
          }
          
        })
     
    });
  }
}
Validator.isRequired = function (selector,mes) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : mes;
    },
  };
};
Validator.isEmail = function (selector) {
  var check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var ms;
  return {
    selector: selector,
    test: function (value) {
      if (!check.test(value)) {
        ms = "Vui lòng nhập đúng định dạng!";
        return ms;
      }
      return undefined;
    },
  };
};
Validator.isMinlength = function (selector, min) {
  return {
    selector: selector,
    test: function (value) {
      return  value.length >= min? undefined: `Vui lòng nhập ít nhất ${min} ký tự!`;
    },
  };
};
Validator.isSamepass = function (selector, pass, mesage) {
  return {
    selector: selector,
    test: function (value) {
      return value === pass() ? undefined : mesage;
    },
  };
};
