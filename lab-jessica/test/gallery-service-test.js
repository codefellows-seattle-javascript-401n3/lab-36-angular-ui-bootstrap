'use strict';

describe('Gallery Service', function() {
  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, authService, galleryService, $window, $httpBackend) => {
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
    });

    this.testToken = 'testToken';

    this.$window.localStorage.setItem('token', this.testToken);
  });

  afterEach(() => {
    this.$window.localStorage.removeItem('token');
  });

  describe('galleryService.createGallery()', () => {
    it('should create a new gallery', () => {
      let galleryData = {
        name: 'example gallery',
        desc: 'example description'
      };

      let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.testToken}`
      };

      this.$httpBackend.expectPOST('http://localhost:8000/api/gallery', galleryData, headers)
      .respond(200);

      this.galleryService.createGallery(galleryData);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

  describe('galleryService.fetchGalleries()', () => {
    it('should fetch all galleries', () => {
      let headers = {
        'Authorization': `Bearer ${this.testToken}`,
        'Accept': 'application/json'
      };

      this.$httpBackend.expectGET('http://localhost:8000/api/gallery', headers)
      .respond(200);

      this.galleryService.fetchGalleries();
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

  // describe('galleryService.updateGallery()', () => {
  //   it('should update a gallery', () => {
  //     let galleryData = {
  //       name: 'example gallery',
  //       desc: 'example description'
  //     };
  //     let galleryID = 'testid';
  //     let headers = {
  //       'Authorization': `Bearer ${this.testToken}`,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     };
  //
  //     this.$httpBackend.expectPUT(`http://localhost:8000/api/gallery/${galleryID}`, galleryData, headers)
  //     .respond(200);
  //
  //     this.galleryService.updateGallery(galleryID);
  //     this.$httpBackend.flush();
  //     this.$rootScope.$apply();
  //   });
  // });


  describe('galleryService.deleteGallery()', () => {
    it('should delete a gallery', () => {
      let galleryID = 'testid';
      let headers = {
        'Authorization': `Bearer ${this.testToken}`,
        'Accept': 'application/json, text/plain, */*'
      };

      this.$httpBackend.expectDELETE(`http://localhost:8000/api/gallery/${galleryID}`, headers)
      .respond(204);

      this.galleryService.deleteGallery(galleryID);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
