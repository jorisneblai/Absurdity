/* isLoggedMiddleware is used to check the existence of a user token then displays elements of the application*/

export default function isLoggedMiddleware() {
 const isLogged = localStorage.getItem('user');

 if(isLogged) {
     return true
 } else {
     return false
 }
}