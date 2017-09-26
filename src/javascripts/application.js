// Stylesheets
require('../stylesheets/dark.scss');
require('../stylesheets/notfound-dark.scss');
require('../stylesheets/light.scss');
require('../stylesheets/notfound-light.scss');
require('../plugins/font-awesome/css/font-awesome.css');

// Scripts
require('../plugins/jquery/js/jquery.min.js');
require('../plugins/throttle-debounce-fn/js/throttle-debounce-fn.js'); // Load before fluidbox
require('../plugins/fluidbox/js/jquery.fluidbox.js');
require('./scrollappear.js');

$(function() {
    // ScrollAppear
    if (typeof $.fn.scrollAppear === 'function') {
        $('.appear').scrollAppear();
    }

    // Fluidbox
    $('.fluidbox-trigger').fluidbox();

    // Share buttons
    $('.article-share a').on('click', function() {
        window.open($(this).attr('href'), 'Share', 'width=200,height=200,noopener');
        return false;
    });
});
