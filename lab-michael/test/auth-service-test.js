'use strict';

describe('The Auth Service', function() {
  beforeEach(() => {
    angular.mock.module('ngAuthFront');
    angular.mock.inject(($rootScope, authService, $window, $httpBackend) => {
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });

  // THIS BREAKS THINGS. OUTPUT IS GIVING _this instead of this

  // afterEach(() => {
  //   this.authService.setToken(null);
  //   this.$window.localStorage.clear();
  // });



  describe('authService.getToken()', () => {
    it('should return a token', () => {
      this.$window.localStorage.setItem('token', 'test token');

      this.authService.getToken()
      .then(token => {
        expect(token).toEqual('test token');
      });

      this.$window.localStorage.removeItem('token');
      this.$rootScope.$apply();
    });

    it('should return no token found', () => {
      this.authService.getToken()
      .catch(err => {
        expect(err).toEqual(new Error('token not found'));
      });

      this.$rootScope.$apply();
    });
  });

  describe('authService.logout()', () => {
    it('should remove token from localStorage', () => {
      this.$window.localStorage.setItem('token', 'test token');
      expect(this.$window.localStorage.token).toEqual('test token');

      this.authService.logout()
      .then(() => {
        expect(this.$window.localStorage.token).toBeUndefined();
      });

      this.$rootScope.$apply();
    });
  });

  describe('authService.signup()', () => {
    it('should signup a user', () => {
      let testUser = {
        username: 'mikeyb',
        email: 'mikeyb@test.com',
        password: 'pass12345'
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/signup', testUser, headers)
      .respond(200, {testUser});

      this.authService.signup(testUser);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
  describe('authService.login()', () => {
    it('should authorize a returning user()', () => {
      let testUser = {
        username: 'mikeyb',
        password: 'pass12345',
      };
      let base64 = this.$window.btoa(`${testUser.username}:${testUser.password}`);
      let headers = {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      };

      this.$httpBackend.expectGET('http://localhost:3000/api/login', headers)
      .respond(200, 'test token');

      this.authService.login(testUser)
      .then(token => {
        expect(token).toBe('test token');
      });

      this.$httpBackend.flush();
      this.$rootScope.$apply();

    });
  });
});
