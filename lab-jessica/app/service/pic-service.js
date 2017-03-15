'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('picService');

  let service = {};

  service.uploadPic = function(gallery, pic) {
    $log.debug('picService.uploadPic()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${gallery._id}/pic`;
      let headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      };
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: pic.name,
          desc: pic.desc,
          file: pic.file
        }
      });
    })
    .then(res => {
      $log.log('pic uploaded');
      gallery.pics.unshift(res.data);
      return res.data;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deletePic = function(gallery, pic) {
    $log.debug('picService.deletePic()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${gallery._id}/pic/${pic._id}`;
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      return $http.delete(url, config);
    })
    .then(() => {
      $log.log('pic deleted');
      for(let i = 0; i < gallery.pics.length; i++) {
        let curr = gallery.pics[i];

        if(curr._id === pic._id) {
          gallery.pics.splice(i, 1);
          break;
        }
      }
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
