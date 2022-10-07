/* isLoggedMiddleware is used to check the existence of a user token then displays elements of the application*/
import Cookie from 'universal-cookie'

export default function isLoggedMiddleware() {
const cookies = new Cookie();
const isLogged = cookies.get('user');

if(isLogged) {
     return true
 } else {
     return false
 }
}