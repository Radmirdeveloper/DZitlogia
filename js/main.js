$(document).ready(function () {
    new WOW({
        animateClass: 'animate__animated'
    }).init();
    $('#burger').onclick = function () {
        $('#menu').classList.add('open');
    }
    $('#menu > *').each((item) => {
        item.onclick = () => {
            $('menu').classList.remove('open');
        }
    });
    $('.test-popup-link').magnificPopup({
        type: 'image'
    });
    $('.gallery-item').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    let loader = $('#loader');
    $('.btn.buy.hvr-push').click(function (event) {
        let formCont = $('.form-contr');
        let valid = false;
        let error = $('.error-form');
        error.hide();
        formCont.css('border-color', 'rgb(185, 145, 80)');
        for (let i = 0; i < formCont.length; i++) {
            if (!$(formCont[i]).val()) {
                $(error[i]).show()
                $(formCont[i]).css('border-color', 'red');
                valid = true
            }
        }
        if (!valid) {
            loader.css('display', 'flex')
            $.ajax({
                method: "POST",
                url: 'https://itlogia.ru/test/checkout',
                data: {name: $(formCont[0]).val(), address: $(formCont[1]).val(), telephone: $(formCont[2]).val()},
            })
                .done(function (msg) {
                    let form = $('#order-form');
                    let sendSuccess = $('#send-s');
                    let sendFail = $('#send-f');
                    loader.css('display', 'none');
                    if (msg.success) {
                        form.hide()
                        sendSuccess.css('display', 'flex')
                        $('#order-container').css('align-items', 'center')
                    } else {
                        form.hide()
                        sendFail.css('display', 'flex')
                        $('#order-container').css('align-items', 'center')
                    }
                });
        }
    })
}());

