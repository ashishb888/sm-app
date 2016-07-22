(function() {
  angular.module('starter').controller('ProfilesCtrl', ProfilesCtrl);

  ProfilesCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal'];

  function ProfilesCtrl(sc, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal) {
    var logger = utilService.getLogger();
    logger.debug("ProfilesCtrl start");

    // Variables section
    var pc = this;
    pc.pif = {};
    pc.genderArr = ["Male", "Female"];
    pc.pif.gender = pc.genderArr[0];
    pc.heightArr = [];
    pc.bodyTypeArr = ["Slim", "Average", "Athletic", "Heavy"];
    pc.pif.bodyType = pc.bodyTypeArr[0];
    pc.martitalStatusArr = ["Never married", "Widower", "Divorced", "Awaiting divorce"];
    pc.pif.martitalStatus = pc.martitalStatusArr[0];
    pc.complexionArr = ["Very fair", "Fair", "Wheatish", "Wheatish brown", "Dark"];
    pc.pif.complexion = pc.complexionArr[0];
    pc.physicalStatusArr = ["Normal", "Physically challenged"];
    pc.pif.physicalStatus = pc.physicalStatusArr[0];
    pc.eatingHabitArr = ["Vegetarian", "Non-vegetarian", "Eggetarian"];
    pc.pif.eatingHabit = pc.eatingHabitArr[0];
    pc.drinkingHabitArr = ["No", "Yes", "Occasionally"];
    pc.pif.drinkingHabit = pc.drinkingHabitArr[0];
    pc.smokingHabitArr = ["No", "Yes", "Occasionally"];
    pc.pif.smokingHabit = pc.smokingHabitArr[0];
    pc.subCasteArr = ["Swetamber", "Digamber", "Pancham"];
    pc.pif.subCaste = pc.subCasteArr[0];
    pc.isPInfoForm = true;
    pc.isPhotoForm = false;
    pc.isFamilyForm = false;

    // Function section
    var initHeightArr = initHeightArr;
    pc.showImagesModal = showImagesModal;
    pc.hideImagesModal = hideImagesModal;
    pc.showpInfoForm = showpInfoForm;
    pc.showPhotoForm = showPhotoForm;
    pc.showFamilyForm = showFamilyForm;

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

    function showpInfoForm() {
      pc.isPInfoForm = true;
      pc.isPhotoForm = false;
      pc.isFamilyForm = false;
    }

    function showPhotoForm() {
      pc.isPhotoForm = true;
      pc.isPInfoForm = false;
      pc.isFamilyForm = false;
    }

    function showFamilyForm() {
      pc.isFamilyForm = true;
      pc.isPhotoForm = false;
      pc.isPInfoForm = false;
    }

    function initHeightArr() {
      logger.debug("initHeightArr function");
      for (var i = 4; i < 10; i++) {
        for (var j = 0; j < 12; j++) {
          if (j===0) {
            pc.heightArr.push(i + " ft ");
            continue;
          }
          pc.heightArr.push(i + " ft " + j + " in");
        }
      }
      pc.pif.height = pc.heightArr[0];
    }
    initHeightArr();

    logger.debug("ProfilesCtrl end");
  }
})();
