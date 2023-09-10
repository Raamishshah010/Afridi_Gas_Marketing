// admin@afridigasmarketing.com


function login() {


    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...

            localStorage.setItem('login', true);
            window.location.href = '../../admin/dashboard.html'
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert(errorMessage)
        });
}