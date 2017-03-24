'use strict';

require('./_thumbnail-container.scss');

module.exports = {
  template: require('./thumbnail-container.html'),
  controller: ['$log', 'picService', ThumbnailContainerController],
  controllerAs: 'thumbnailContainerCtrl',
  bindings: {
    gallery: '<',
    pic: '<'
  },
};

function ThumbnailContainerController($log, picService) {
  $log.debug('ThumbnailContainerController()');
}
