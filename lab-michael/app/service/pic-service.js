'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('picService');

  let service = {};

  service.uploadGalleryPic = function(galleryData, picData) {
    $log.debug('uploadGalleryPic');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        // 'Content-Type':'application/json'
      };
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file
        }
      })
    })
    .then(res => {
      galleryData.pic.unshift(res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  service.deleteGalleryPic = function(galleryData, picData) {
    return authService.getToken()
        .then(token => {
          let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic/${picData._id}`;
          let config = {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json'
            }
          };
          return $http.delete(url, config);
        })
        .then(res => {
          $log.log('pic deleted');
          return res.data;
        })
        .catch(err => {
          $log.error(err.message);
          return $q.reject(err);
        });
  };
  return service;
}
