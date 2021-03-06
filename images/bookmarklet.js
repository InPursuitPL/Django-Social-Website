(function() {
	var jquery_version = '2.1.4';
	var site_url = 'http://mysite.com:8000/';
	var static_url = site_url + 'static/';
	var min_width = 100;
	var min_height = 100;
	
	function bookmarklet(msg) {
		// load CSS
		var css = jQuery('<link>');
		css.attr({
			rel: 'stylesheet',
			type: 'text/css',
			href: static_url + 'css/bookmarklet.css?r=' + Math.floor(Math.random()*99999999999999999999)
		});
		jQuery('head').append(css);
		
		// load HTML
		box_html = '<div id="bookmarklet"><a href="#" id="close">&times;</a><h1>Select an image to bookmark:</h1><div class="images"></div></div>';
		jQuery('body').append(box_html);
		
		// close event
		jQuery('#bookmarklet #close').click(function() {
			jQuery('#bookmarklet').remove();
		});
	};
	// Check if jQuery is loaded
	if (typeof window.jQuery !== 'undefined') {
		bookmarklet();
	} else {
		// Check for conflicts
		var conflict = typeof window.$ != 'undefined';
		// Create the script that point to Google API
		var script = document.createElement('script');
		script.setAttribute('src',
		'http://ajax.googleapis.com/ajax/libs/jquery/' +
		jquery_version + '/jquery.min.js');
	// Add the script to the 'head' for processing
	document.getElementsByTagName('head')[0].appendChild(script);
	// Create a way to wait untill scipt loading
	var attempts = 15;
	(function() {
		// Check again if jQuery is undefined
		if (typeof window.jQuery !== 'undefined') {
			if (--attempts > 0) {
				// Calls himself in a few miliseconds
				window.setTimeout(arguments.callee, 250)
			} else {
				// Too much attempts to load, send error
				alert('An error occured while loading jQuery')
			}
		} else {
			bookmarklet();
		}
	})();
	}
})()