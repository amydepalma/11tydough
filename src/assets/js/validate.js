var Site = Site || {};
Site.validate = Site.validate

Site.validate = {

//getValidateStyles: function (form, validator) {
//	setTimeout(function () {
//
//		$.each($(':input'), function () {
//
//			var field = $(this);
//			var fieldClass = field[0].className;
//			var labelHtml = field.prev().html();
//			var errorSvg = '<svg aria-hidden="true" class="error svg-icon">';
//			var errorLabelStr = '<svg aria-hidden="true" class="error svg-icon"><use xlink:href="#icon-error" /></svg>';
//			var errorLabelRendered = '<svg aria-hidden="true" class="error svg-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-error"></use></svg>';
//			var reqSpan = '<span>*</span>';
//			if (fieldClass == "error") {
//
//				if (labelHtml.indexOf(errorSvg) == -1) {
//
//					field.prev().prepend(errorLabelStr);
//				}
//
//			} else {
//
//				if (labelHtml !== undefined) {
//					//clear icons if no error
//
//					if (labelHtml.indexOf(errorSvg) == 0) {
//
//						labelHtml = labelHtml.split(errorLabelRendered);
//
//						var labelName = field[0].labels[0].htmlFor
//
//						field.prev().replaceWith('<label for="' + labelName + '">' + labelHtml[1] + '</label>');
//					}
//				}
//			}
//		});
//	}, 20);
//},

init: function () {

	//Method for validating emails
	$.validator.addMethod("validate_email", function (value, element) {
		if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
			return true;
		}
		else {
			return false;
		}
	});

	$('.contact-form').validate({
		submitHandler: function (form, e) {
			event.preventDefault();
			form.submit();
		},
		debug: true,
		onkeyup: false,
		onfocusout: false,

		rules: {
			name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			phnum: {
				required: true,
				number: true,
				maxlength: 200
			},
			contact_type: {
				required: true
			},
			message: {
				required: true,
				maxlength: 3500
			},
		},

		messages: {
			name: "Please enter your full name",
			phnum: {
				required: "Phone is required",
				number: "Phone may only include numbers"
			},
			email: {
				required: "Email is required",
				number: "Please enter a valid email address"
			},
			contact_type: {
				required: "A reason for contacting is required",
			},
			message: {
				required: "A message is required",
				maxlength: "Messages must be less than 3500 characters"
			}
		}
	});
}
}

$(document).ready(function () {
	Site.validate.init();
});
