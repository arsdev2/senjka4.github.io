document.addEventListener("scroll", function(e) {
	el = document.getElementById('bg_img');

	elPos = el.getBoundingClientRect().top + el.getBoundingClientRect().height - 64;
	elPos = elPos > 0 ? elPos : 0;
	opacity = elPos / (el.getBoundingClientRect().height - 64);
	el.style.opacity = opacity;

	if (elPos <= 64) {
		hOpacity = 1 - elPos / 64;
		hOpacity = hOpacity > 0 ? hOpacity : 0;

		height = el.getBoundingClientRect().top + el.getBoundingClientRect().height;
		height = height > 64 ? height : 64;

		document.getElementById('altHeader').style.display = 'block';
		document.getElementById('altHeader').style.opacity = hOpacity;
		document.getElementById('altHeader').style.height = height + "px";
	} else {
		document.getElementById('altHeader').style.display = 'none';
		document.getElementById('altHeader').style.opacity = 0;
		document.getElementById('altHeader').style.height = 64 + "px";
	}
});