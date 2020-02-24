$(document).ready(function () {
	$.validator.addMethod('minLengthPhone', function (value) {
		return value.replace(/\D+/g, '').length > 10;
	});

	$.validator.addMethod('laxEmail', function (value, element) {
		return this.optional(element) || /^([a-zA-Z0-9_.\-+])+\@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/.test(value);
	});

	$('form[name="contactsForm"]').each(function (key, value) {
		$(value).validate({
			rules: {
				name: {
					required: true
				},
				phone: {
					required: true,
					minLengthPhone: true
				}
			},
			messages: {
				name: {
					required: 'Необходимо указать имя'
				},
				tel: {
					required: 'Необходимо указать контактный телефон',
					minLengthPhone: 'Вы ввели не полный номер'
				}
			},
			submitHandler: function () {
				$(value).addClass('is-success');
			}
		});
	});

	$('.form-control').on('keyup', function () {
		var _this = $(this);

		if ($.trim(_this.val()).length) {
			_this.addClass('is-focus');
		} else {
			_this.removeClass('is-focus');
		}

		if (_this.hasClass('phone-mask')) {
			_this.valid();
		}
	});
});