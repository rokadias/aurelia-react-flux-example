// Specific settings for our application's
// authentication context. These will override
// the default settings provided by aureliauth

var config = {

  // Our Node API is being served from the root
  baseUrl: '/',
  // The API specifies that new users register at the POST /users enpoint
  signupUrl: 'users',
  // Logins happen at the POST /sessions/create endpoint
  loginUrl: 'sessions/create',
  // The API serves its tokens with a key of id_token which differs from
  // aurelia-auth's standard
  tokenName: 'id_token',
  // Once logged in, we want to redirect the user to the first view
  loginRedirect: '/studies'
}

export default config;
