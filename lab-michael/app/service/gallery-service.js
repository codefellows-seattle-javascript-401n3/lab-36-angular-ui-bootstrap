'use strict';

module.exports = ['$q', '$log', '$http','authService', galleryService];


function galleryService($q, $log, $http, authService) {
  $log.debug('galleryService()');

  let service = {};
  service.galleries = [];

  service.createGallery = function(gallery) {
    $log.debug('galleryService.createGallery()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          // Stringified for the dash
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.post(url, gallery, config);
    })
    .then( res => {
      $log.log('gallery was created');
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
    .then( token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('Galleries have been retrieved');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };
  service.updateGallery = function(galleryID, updateGallery) {
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      return $http.put(url, updateGallery, config);
    })
    .then ( res => {
      for(let i= 0; i < service.galleries.length; i++) {
        if(service.galleries[i]._id === galleryID) {
          service.galleries[i] = res.data;
        }
      }
    })
    .catch(err => {
      $log.log(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGallery = function(galleryID) {
    $log.debug('galleryService.deleteGalleries()');

    return authService.getToken()
    .then( token => {

      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config);
    })
    .then(() => {
      $log.log('Gallery Deleted');
      for(let i = 0;i < service.galleries.length; i++) {
        if(service.galleries[i]._id === galleryID) {
          service.galleries.splice(i,1);
        }
      }
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });


  };
  return service;
}
