export default function isLoggedMiddleware() {
 const isLogged = localStorage.getItem('user');

 if(isLogged) {
     return true
 } else {
     return false
 }
}