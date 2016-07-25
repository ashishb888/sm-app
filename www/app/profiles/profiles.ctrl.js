(function() {
  angular.module('starter').controller('ProfilesCtrl', ProfilesCtrl);

  ProfilesCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService'];

  function ProfilesCtrl(sc, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService) {
    var logger = utilService.getLogger();
    logger.debug("ProfilesCtrl start");

    // Variables section
    var pc = this;
    // Personal info form
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
    pc.pif.dob = new Date();

    // Form hide/show
    pc.isPInfoForm = true;
    pc.isPhotoForm = false;
    pc.isFamilyForm = false;
    pc.isOccupationForm = false;
    pc.isAddressForm = false;

    // Occupation form
    pc.of = {};
    pc.hEducationArr = ["Bellow 10th", "10th", "12th", "BA", "BSc", "BCom", "Diploma", "BE", "BTech", "ME", "MTech", "Ded", "Bed", "MCA", "BCA", "MA", "MSc"];
    pc.of.hEducation = pc.hEducationArr[0];
    pc.occupationArr = ["Job", "Farm", "Business"];
    pc.of.occupation = pc.occupationArr[0];

    // Family form
    pc.ff = {};
    pc.familyTypeArr = ["Joint family", "Nuclear family"];
    pc.ff.familyType = pc.familyTypeArr[0];
    pc.familyValuesArr = ["Traditional", "Moderate"];
    pc.ff.familyValues = pc.familyValuesArr[0];
    pc.familyStatusArr = ["Middle class", "Upper middle class"];
    pc.ff.familyStatus = pc.familyStatusArr[0];

    // Photo form
    pc.pf = {};
    pc.imgs = {};
    pc.imgs.imgURIs = [];
    pc.imgs.imgBase64s = [];

    // Address form
    pc.af = {};
    pc.districtArr = ["A"];
    pc.af.district = pc.districtArr[0];
    pc.taluqaArr = ["A", "B"];
    pc.af.taluqa = pc.taluqaArr[0];
    pc.townArr = ["A", "B", "C"];
    pc.af.town = pc.townArr[0];

    pc.dp = {};
    pc.dp.uri = "img/sm-2.png";
    pc.dp.base64;

    // Function section
    var initHeightArr = initHeightArr;
    pc.showImagesModal = showImagesModal;
    pc.hideImagesModal = hideImagesModal;
    pc.showPInfoForm = showPInfoForm;
    pc.showPhotoForm = showPhotoForm;
    pc.showFamilyForm = showFamilyForm;
    pc.showOccupationForm = showOccupationForm;
    pc.showAddressForm = showAddressForm;
    pc.clickImage = clickImage;
    pc.changeDP = changeDP;

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
    $scope.$on('modal.hidden', function() {
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

    function showPInfoForm() {
      pc.isPInfoForm = true;
      pc.isPhotoForm = false;
      pc.isFamilyForm = false;
      pc.isOccupationForm = false;
      pc.isAddressForm = false;
    }

    function showPhotoForm() {
      pc.isPhotoForm = true;
      pc.isPInfoForm = false;
      pc.isFamilyForm = false;
      pc.isOccupationForm = false;
      pc.isAddressForm = false;
    }

    function showFamilyForm() {
      pc.isFamilyForm = true;
      pc.isPhotoForm = false;
      pc.isPInfoForm = false;
      pc.isOccupationForm = false;
      pc.isAddressForm = false;
    }

    function showOccupationForm() {
      pc.isOccupationForm = true;
      pc.isFamilyForm = false;
      pc.isPhotoForm = false;
      pc.isPInfoForm = false;
      pc.isAddressForm = false;
    }

    function showAddressForm() {
      pc.isAddressForm = true;
      pc.isOccupationForm = false;
      pc.isFamilyForm = false;
      pc.isPhotoForm = false;
      pc.isPInfoForm = false;
    }

    function changeDP(srcType) {
      try {
        logger.debug("changeDP function");
        var promise = cameraService.clickImage(srcType);

        promise.then(function (imageData) {
          pc.dp.uri = imageData.uri;
          //pc.dp.base64 = imageData.base64;
        });

      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    /* Captures images. Calls clickImage function of cameraService to capture images */
    function clickImage() {
        logger.debug("clickImage() function");

        var promise = cameraService.clickImage();

        promise.then(function (imageData) {
          pc.imgs.imgURIs.push(imageData.uri);
          pc.imgs.imgBase64s.push(imageData.base64);
        });
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
