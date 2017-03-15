'use strict';

require('./_pic-thumbnail-container.scss');

module.exports = {
  template: require('./pic-thumbnail-container.html'),
  controller: ['$log', 'picService', PicThumbmailContainerController],
  controllerAs: 'picThumbnailContainerCtrl',
  bindings: {
    gallery: '<'
  }
};

function PicThumbmailContainerController($log, picService) {
  $log.debug('PicThumbmailController()');
}
