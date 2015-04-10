/**
 * Created by ticup on 09/04/15.
 */
$(function () {
    $('.ui.checkbox').checkbox();
    $('.popup').popup();
    $('.dropdown')
        .dropdown({
            // you can use any ui transition
            transition: 'drop'
        });

        $('.ui.accordion')
            .accordion()
        ;

    $('.login.form')
        .form({
            firstName: {
                identifier  : 'firstName',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter your first name'
                    }
                ]
            },
            lastName: {
                identifier  : 'lastName',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter your last name'
                    }
                ]
            }
        }, {
            inline : true,
            on     : 'blur'
        });
});


function displayLoginError(err) {
    $('.login.form .error').html(err);
    $('.login.form').addClass('error');
}

function showApp(user) {
    $('#login').hide();
    $('#app').show();
    $('.ui.profile.name.label').html(user.lastName + ", " + user.firstName);
}