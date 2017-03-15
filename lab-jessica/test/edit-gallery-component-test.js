'use strict';

describe('Edit Gallery Component', function() {
  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $window, $componentController, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    });

    this.testToken = 'testToken';

    this.$window.localStorage.setItem('token', this.testToken);
  });

  afterEach(() => {
    this.$window.localStorage.removeItem('token');
  });

  it('should contain the proper component bindings', () => {
    let mockBindings = {
      gallery: {
        name: 'test gallery name',
        desc: 'test gallery description'
      }
    };

    let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
    //none of this makes sense to me. I can change gallery to anything i want and this will still work.
    //I can even delete the bindings in edit-gallery and this still works.
    expect(editGalleryCtrl.gallery).toBeDefined();
    expect(editGalleryCtrl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(editGalleryCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);

    this.$rootScope.$apply();
  });

  describe('editGalleryCtrl.updateGallery()', () => {
    it('should make a valid PUT request', () => {
      let url = 'http://localhost:8000/api/gallery/12345';

      let updatedGallery = {
        _id: '12345',
        name: 'updated name',
        desc: 'updated description'
      };

      let headers = {
        'Authorization': `Bearer ${this.testToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      this.$httpBackend.expectPUT(url, updatedGallery, headers).respond(200);

      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'name',
          desc: 'description'
        },
      };

      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
      expect(editGalleryCtrl.gallery.name).toEqual(mockBindings.gallery.name);
      expect(editGalleryCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);

      editGalleryCtrl.gallery.name = 'updated name';
      editGalleryCtrl.gallery.desc = 'updated description';

      editGalleryCtrl.updateGallery();

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
