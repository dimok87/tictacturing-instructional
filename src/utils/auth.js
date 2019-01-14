import auth0 from 'auth0-js';

const authDomain = 'dlesnoy.auth0.com'
const clientId = 'IOOjrA0vC4JNty6KLrrUzLCpL2i2WcnK'

class Auth {
  accessToken;
  idToken;
  expiresAt;
  auth0 = new auth0.WebAuth({
    domain: authDomain,
    clientID: clientId,
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login = () => {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    console.log(12345)
    this.auth0.parseHash((err, authResult) => {
      console.log("::::")
      console.log(authResult)
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        //window.location.reload()
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken = () => {
    return this.accessToken;
  }

  getIdToken = () => {
    return localStorage.getItem('idToken');
  }

  setSession = (authResult) => {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('idToken', authResult.idToken)
		localStorage.setItem('exp', authResult.expiresIn * 1000)

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    //window.location.reload()
  }

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    //window.location.reload()
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}

export default new Auth(); 
