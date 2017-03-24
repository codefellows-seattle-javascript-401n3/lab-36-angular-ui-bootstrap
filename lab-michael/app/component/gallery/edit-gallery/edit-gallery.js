'use strict';

module.exports = {
  template: require('./edit-gallery.html'),
  controller: ['$log', 'galleryService',EditGalleryController],
  controllerAs: 'editGalleryCtrl',
  bindings: {
    gallery: '<',
  },
};

function EditGalleryController($log, galleryService) {
  $log.debug('EditGalleryController');
  this.$onInit = () => {
    this.updateGallery = function() {
      console.log('inside updateGallery');
      galleryService.updateGallery(this.gallery._id, this.gallery);
    };
  };
}
