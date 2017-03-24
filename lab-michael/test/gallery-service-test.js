'use strict'

describe('The Gallery Service', function() {

  beforeEach(() => {
    angular.mock.module('ngAuthFront');
    angular.mock.inject(( $rootScope, authService, galleryService, $window, $httpBackend) => {
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('galleryService.createGallery()', () => {
    it('should create a new gallery', () => {
      let galleryData = {
        name: 'test gally',
        desc: 'test desc'
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer test token'
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', galleryData, headers)
      .respond(200, {
        _id: '12345',
        username: 'testUser',
        name: galleryData.name,
        desc: galleryData.desc,
      });

      this.galleryService.createGallery(galleryData);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

  describe('galleryService.deleteGallery()', () => {
    it('should delete a gallery', () => {
      let galleryID = 'testID';
      let headers = {
        Authorization: 'Bearer test token',
        Accept: 'application/json',
      };

      this.$httpBackend.expectDELETE('http://localhost:3000/api/gallery/testID', headers).respond(204);
      this.galleryService.deleteGallery(galleryID);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    })
  });


  describe('galleryService.updateGallery()', () => {
    it('should update a gallery', () => {
      let galleryData = {
        _id: '12345',
        username: 'testUser',
        name: 'test gally',
        desc: 'test desc'
      };

      let headers = {
        Authorization: 'Bearer test token',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };
      this.$httpBackend.expectPUT('http://localhost:3000/api/gallery/12345', galleryData, headers).respond(200, {
        _id: '12345',
        username: 'testUser',
        name: galleryData.name,
        desc: galleryData.desc,
      });

      this.galleryService.updateGallery(galleryData._id, galleryData);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    })
  });

});
