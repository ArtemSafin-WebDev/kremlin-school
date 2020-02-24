function viewport() {
	var e = window, a = 'inner';
	if (!('innerWidth' in window )) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

if (viewport().width > 1023) {
	var scene = document.getElementById('parallax');
	var parallaxInstance = new Parallax(scene, {
		hoverOnly: true,
		limitY: 1
	});
}