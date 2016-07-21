(function() {
  angular.module('starter').controller('ProfilesCtrl', ProfilesCtrl);

  ProfilesCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal'];

  function ProfilesCtrl(sc, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal) {
    // Variables section
    var logger = utilService.getLogger();
    logger.debug("ProfilesCtrl start");

    var pc = this;

    // Function section
    pc.showImagesModal = showImagesModal;
    pc.hideImagesModal = hideImagesModal;

    $scope.aImages = [{
      	'src' : 'img/sm-1.jpg',
      	'msg' : 'swipe/tap'
    	}, {
        'src' : 'img/sm-2.png',
        'msg' : ''
      }, {
        'src' : 'img/sm-1.jpg',
        'msg' : ''
    },
    {
      	'src' : 'img/a.jpg',
      	'msg' : ''
    	}, {
        'src' : 'img/b.jpg',
        'msg' : ''
      }, {
        'src' : 'img/c.jpg',
        'msg' : ''
    }];

    $ionicModal.fromTemplateUrl('app/profiles/images-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      pc.imagesModal = modal;
    });

    function showImagesModal() {
      $ionicSlideBoxDelegate.slide(0);
      pc.imagesModal.show();
    }

    function hideImagesModal() {
      pc.imagesModal.hide();
    }

    // Cleanup the modal when we're done with it!
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      console.log('Modal is hidden!');
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });



    logger.debug("ProfilesCtrl end");
  }
})();
