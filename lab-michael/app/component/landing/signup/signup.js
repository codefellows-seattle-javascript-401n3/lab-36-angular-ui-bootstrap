'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $location, authService) {
  $log.debug('SignupController');

  authService.getToken()
  .then( () => {
    $location.url('/home');
  });

  this.signup = function(user) {
    console.log('clicked singup');
    $log.debug('signupCtrl.signup()');

    authService.signup(user)
    .then( () => {
      $location.url('/home');
    })
    .catch(e => {
      console.log(e);
    });
  };
}
