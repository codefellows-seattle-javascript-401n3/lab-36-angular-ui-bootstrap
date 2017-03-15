'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService) {
  $log.debug('galleryService');

  let service = {};
  service.galleries = [];

  service.createGallery = function(gallery) {
    $log.debug('galleryService.createGallery()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      return $http.post(url, gallery, config);
    })
    .then(res => {
      $log.log('gallery created');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };

  service.fetchGalleries = function() {
    $log.debug('galleryService.fetchGalleries()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      };
      return $http.get(url, config);
    })
    .then(res => {
      $log.log('galleries fetched');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch(err =>{
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGallery = function(id) {
    $log.debug('galleryService.deleteGallery()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${id}`;
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      };
      return $http.delete(url, config);
    })
    .then(() => {
      $log.log('gallery deleted');

      for(let i = 0; i < service.galleries.length; i++) {
        let curr = service.galleries[i];

        if(curr._id === id) {
          service.galleries.splice(i, 1);
          break;
        }
      }

    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateGallery = function(gallery) {
    $log.debug('galleryService.updateGallery()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${gallery._id}`;
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, gallery, config);
    })
    .then(res => {
      $log.log('gallery updated');

      for(let i = 0; i < service.galleries.length; i++) {
        let curr = service.galleries[i];

        if(curr._id === gallery._id) {
          service.galleries[i] = res.data;
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
