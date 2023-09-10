let checkUser = localStorage.getItem('login');
console.log(checkUser);

if(!checkUser) {
    window.location.href = '/admin/index.html'
}