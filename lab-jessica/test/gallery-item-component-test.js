'use strict';

describe('Gallery Item Component', function(){
  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    });
  });

  it('should contain the proper component bindings', () => {
    let mockBindings = {
      gallery: {
        name: 'test gallery name',
        desc: 'test gallery description'
      }
    };

    let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
    expect(galleryItemCtrl.gallery).toBeDefined();
    expect(galleryItemCtrl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(galleryItemCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);

    this.$rootScope.$apply();
  });

  describe('initial properties', () => {
    it('showEditGallery property should be false', () => {

      let galleryItemCtrl = this.$componentController('galleryItem');
      expect(galleryItemCtrl.showEditGallery).toEqual(false);

      this.$rootScope.$apply();
    });
  });

  describe('galleryItemCtrl.deleteGallery()', () => {
    it('should call deleteGallery', () => {
      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'test name',
          desc: 'test description',
          pics: [],
        },

        deleteGallery: function(id) {
          expect(id).toEqual('12345');
        }
      };

      let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
      galleryItemCtrl.deleteGallery(galleryItemCtrl.gallery._id);

      this.$rootScope.$apply();
    });
  });
});
