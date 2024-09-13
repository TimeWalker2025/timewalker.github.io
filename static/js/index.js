window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation";
var NUM_INTERP_FRAMES = 240;

var hashTableImages = {};
function preloadHashTableImages() {
    const targets = ["00", "01", "02", "03", "04"];
    targets_hash = {};
    targets_hash["0"] = "00";
    targets_hash["1"] = "01";
    targets_hash["2"] = "02";
    targets_hash["3"] = "03";
    targets_hash["4"] = "04";
    var NUM_INTER = 5;

    let key;
    let imageSrc;
    for (let beta1 of targets) {
        for (let beta2 of targets) {
            for (let beta3 of targets) {
                for (let beta4 of targets) {
                    key = beta1 + "_" + beta2 + "_" + beta3 + "_" + beta4
                    imageSrc = "./static/images/interpolation/" + key + ".png"
                    hashTableImages[key] = new Image();
                    hashTableImages[key].src = imageSrc
                }
            }
        }
    }
}

function computeBlendWeightColor(beta) {
    positiveColor = $.Color("#E06666");
    negativeColor = $.Color("#0095dd");

    if (beta < 0) {
        blendColor = negativeColor;
    } else {
        blendColor = positiveColor;
    }
    white = $.Color("#FFF");
    alpha = Math.abs(beta) / 0.75;

    blendedColor = blendColor.alpha(alpha).blend(white.alpha(1 - alpha));

    return blendedColor;
}

function updateHashTableImage() {
    var beta1 = $("#slider-hash-table-1").val();
    var beta2 = $("#slider-hash-table-2").val();
    var beta3 = $("#slider-hash-table-3").val();
    var beta4 = $("#slider-hash-table-4").val();

    beta1 = targets_hash[beta1];
    beta2 = targets_hash[beta2];
    beta3 = targets_hash[beta3];
    beta4 = targets_hash[beta4];

    key = beta1 + "_" + beta2 + "_" + beta3 + "_" + beta4;

    var image = hashTableImages[key];
    image.ondragstart = function() { return false; };
    image.oncontextmenu = function() { return false; };
    $('#hash-table-image-wrapper').empty().append(image);

    // Update vector
//    $("#blend-weights-vector-1").css({"backgroundColor": computeBlendWeightColor(beta1)});
//    $("#blend-weights-vector-2").css({"backgroundColor": computeBlendWeightColor(beta2)});
//    $("#blend-weights-vector-3").css({"backgroundColor": computeBlendWeightColor(beta3)});
//    $("#blend-weights-vector-4").css({"backgroundColor": computeBlendWeightColor(beta4)});
}



$(document).ready(function() {


    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }


    preloadHashTableImages();
    updateHashTableImage();
    $("#slider-hash-table-1, #slider-hash-table-2, #slider-hash-table-3, #slider-hash-table-4").on("input", function () {
        updateHashTableImage();
    });

    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})
