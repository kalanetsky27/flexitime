var infoBlock = $('#info_msg'),
    email,
    password,
    result,
    btnAction = $('#btn_login');

btnAction.on('click', function () {
    hideInfoBlock(infoBlock);

    email = $('#email').val().trim();
    password = $('#password').val().trim();

    if(!emailValidation.test(email)) {
        showInfoBlock(infoBlock, $.l.err_email_format);
    } else if(password.length < 6) {
        showInfoBlock(infoBlock, $.l.err_pass_format);
    } else {
        sendInfoButtonRequest(
            infoBlock,
            btnAction,
            'api_cabinet_login',
            {e: email, p: password, asc: asc, t: new Date().getTime()},
            function (data) {
                result = data['r'];

                if(result == 1) {
                    btnAction.prop('disabled', true);
                    window.location.href = CABINET_URL+getCurrLocalePath()+'general';
                } else {
                    switch(result) {
                        case 2: showInfoBlock(infoBlock, $.l.err_email_format);
                            break;
                        case 3: showInfoBlock(infoBlock, $.l.err_pass_format);
                            break;
                        case 4: showInfoBlock(infoBlock, $.l.err_login);
                            break;
                        case 5: showInfoBlock(infoBlock, $.l.err_user_blocked);
                            break;
                        case 6:
                            btnAction.hide();
                            window.location.reload(true);
                            break;
                        case 7: showInfoBlock(infoBlock, $.l.err_login_bad_time);
                            break;
                        default: showInfoBlock(infoBlock, $.l.err_unknown);
                    }
                }
            }
        );
    }

});