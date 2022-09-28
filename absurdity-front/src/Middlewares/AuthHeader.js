export default function authHeader() {
    const user = localStorage.getItem('user');

    if (user) {
      return true;
    } else {
      return false;
    }
}