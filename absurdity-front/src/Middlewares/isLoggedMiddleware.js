/* isLoggedMiddleware is used to check the existence of a user token then displays elements of the application*/
import Cookie from 'universal-cookie'
const pathURL = process.env.REACT_APP_PATH;
const domainURL = process.env.REACT_APP_DOMAIN;

export default function isLoggedMiddleware() {
const cookies = new Cookie();
const isLogged = cookies.get('user', { path: pathURL ,domain: domainURL});

if(isLogged) {
     return true
 } else {
     return false
 }
}