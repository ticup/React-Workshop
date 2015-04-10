/**
 * Created by ticup on 09/04/15.
 */


function submitLoginForm() {
    var form = $('.login.form')[0];
    var fname = form.firstName.value;
    var lname = form.lastName.value;
    var company = form.company.value;
    var exp = form.experience.value;
    if (fname != "" && lname != "")
        register(fname, lname, company, parseInt(exp, 10));
}

function register(fname, lname, company, exp) {
    var user = {firstName: fname, lastName: lname, company: company, exp: exp};
    send('register', user, function (err, id) {
        if (err) return displayLoginError(err);
        user.id = id;
        storeUser(user);
        showApp(user);
    });
}



// storage
function storeUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function retrieveUser() {
    var user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return null;
}



// socket
var socket = io();

function send(event, msg, callback) {
    socket.emit(event, msg, callback);
}


// init
var user = retrieveUser();

if (user) {
    send('refresh', user, function (err, succ) {
        if (err) return;
        showApp(user);
    });
}


