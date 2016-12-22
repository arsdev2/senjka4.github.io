var _w = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screens.width;
var _h = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screens.height;

if (_w > _h) _w = 480;
var _sw = _w / 480;

if(_w < 400 && _h < 400){
	alert('ERROR!');
}

var _s = -1;
var score = -1;

PIXI.loader
	.add("lato", "res/font/lato.css")
	.add("fingerprint", "res/fingerprint.png")
	.add("share", "res/share/share.png")
	.add("vk", "res/share/vk.png")
	.add("fb", "res/share/fb.png")
	.add("tw", "res/share/tw.png")
	.once("complete", onload)
	.load();

function onload(){
	animate();
	setTimeout(function(){_s = -0.5}, 3000);
	setTimeout(function(){_s = 0}, 3500);
}
var renderer = PIXI.autoDetectRenderer(_w, _h, {
	antialias: true,
	autoResize: true,
	resolution: 1.5
}, false, true);


document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
stage.interactive = true;

var highscore = d(localStorage.getItem('BlastORQ_FingerTest')) - 0 || 0;

var screens = {
	splash : {},	//Splash
	s0 : {},		//Menu
	s1 : {},		//Game
	s2 : {}		//Game Over

};

screens.splash.logo = new PIXI.Sprite(PIXI.Texture.fromImage('res/logo.png'));
screens.splash.logo.anchor.x = 0.5;
screens.splash.logo.x = _w/2;
screens.splash.logo.y = 0;
screens.splash.logo.scale.set((_w/770)*0.8);

screens.splash.h1 = new PIXI.Text('Blast.ORQ', {
	fontFamily: 'Lato',
	fontWeight: '300',
	fontSize: 96 * _sw + 'px',
	fill: '#FFC000',
	align: 'center'
});
screens.splash.h1.position.x = _w / 2;
screens.splash.h1.position.y = 833*(_w/770)*0.8;
screens.splash.h1.anchor.x = 0.5;
screens.splash.h1.alpha = 0;

screens.splash.h2 = new PIXI.Text('GAMES', {
	fontFamily: 'Lato',
	fontWeight: '300',
	fontSize: 128 * _sw + 'px',
	fill: '#FFC000',
	align: 'center'
});
screens.splash.h2.position.x = _w / 2;
screens.splash.h2.position.y = 833*(_w/770)*0.8 + 96*_sw;
screens.splash.h2.anchor.x = 0.5;
screens.splash.h2.alpha = 0;

screens.splash
screens.s0.h1 = new PIXI.Text('Fingertest', {
	fontFamily: 'Lato',
	fontWeight: '300',
	fontSize: 96 * _sw + 'px',
	fill: '#FFC000',
	align: 'center'
});
screens.s0.h1.position.x = _w / 2;
screens.s0.h1.position.y = 100;
screens.s0.h1.anchor.x = 0.5;
screens.s0.h1.alpha = 0;

screens.s0.txt = new PIXI.Text('Перевір свій палець!', {
	fontFamily: 'Lato',
	fontWeight: '300',
	fontSize: 48 * _sw + 'px',
	fill: '#FFC000',
	align: 'center'
});
screens.s0.txt.position.x = _w / 2;
screens.s0.txt.position.y = 100 + (96 * _sw) + 16;
screens.s0.txt.anchor.x = 0.5;
screens.s0.txt.alpha = 0;

screens.s1.header = new PIXI.Graphics();
screens.s1.header.beginFill(0xFFC000);
screens.s1.header.moveTo(0, 0);
screens.s1.header.lineTo(0, (16 + (48 + 100) * _sw + 16) + 20);
screens.s1.header.lineTo(_w, (16 + (48 + 100) * _sw + 16) + 60);
screens.s1.header.lineTo(_w, 0);
screens.s1.header.endFill();

screens.s1.h1 = new PIXI.Text('Не відпускай!', {
	fontFamily: 'Lato',
	fontWeight: '300',
	fontSize: 48 * _sw + 'px',
	fill: '#000000',
	align: 'center'
});
screens.s1.h1.position.x = _w / 2;
screens.s1.h1.position.y = 16;
screens.s1.h1.anchor.x = 0.5;

screens.s1.timer = new PIXI.Text('00:00:00', {
	fontFamily: 'Lato',
	fontWeight: '300',
	fontSize: 100 * _sw + 'px',
	fill: '#000000',
	align: 'center'
});
screens.s1.timer.position.x = _w / 2;
screens.s1.timer.position.y = 16 + (48 * _sw) + 16;
screens.s1.timer.anchor.x = 0.5;

screens.s2.h1 = new PIXI.Text('Game Over!', {
	fontFamily: 'Lato',
	fontWeight: '300',
	fontSize: 80 * _sw + 'px',
	fill: '#FFC000',
	align: 'center'
});
screens.s2.h1.position.x = _w / 2;
screens.s2.h1.position.y = 100;
screens.s2.h1.anchor.x = 0.5;
screens.s2.h1.alpha = 0;

screens.s2.txt = new PIXI.Text('Твій рахунок: ', {
	fontFamily: 'Lato',
	fontWeight: '300',
	fontSize: 36 * _sw + 'px',
	fill: '#FFC000',
	align: 'center'
});
screens.s2.txt.position.x = _w / 2;
screens.s2.txt.position.y = 100 + (80 * _sw) + 16;
screens.s2.txt.anchor.x = 0.5;
screens.s2.txt.alpha = 0;

screens.s2.sharebtn = drawBtn(_w - 48, _h + 48, 32, 'res/share/share.png', function() {
	share(0);
});
screens.s2.sharebtnvk = drawBtn(_w * 0.75 - 48, _h + 48, 32, 'res/share/vk.png', function() {
	share("vk")
});
screens.s2.sharebtnfb = drawBtn(_w * 0.5 - 48, _h + 48, 32, 'res/share/fb.png', function() {
	share("fb")
});
screens.s2.sharebtntw = drawBtn(_w * 0.25 - 48, _h + 48, 32, 'res/share/tw.png', function() {
	share("tw")
});


stage.addChild(screens.splash.h1);
stage.addChild(screens.splash.h2);
stage.addChild(screens.splash.logo);

stage.addChild(screens.s1.header);
stage.addChild(screens.s1.h1);
stage.addChild(screens.s1.timer);

stage.addChild(screens.s0.h1);
stage.addChild(screens.s0.txt);

stage.addChild(screens.s2.h1);
stage.addChild(screens.s2.txt);

var finger = drawFinger(_w / 2, _h - 200);
opacityBtn(finger, 0);

var
	ch_M1 = 0, //opacity

	ch_0 = 0, //opacity

	ch_1t = -300, //top
	ch_1o = 0, //top

	ch_2 = 0, //opacity

	ch_2share = _h + 48,
	ch_2sharedisplaybtns = false;
	ch_2sharebtns = _h + 48,

	ch_2fx = 0,
	ch_2fy = 0,
	game_start = -1,
	direction = {
		x: 0,
		y: 0,
		i: -1
	};

function animate() {
	//SCREEN -1
	if (_s == -1) {
		screens.splash.h1.visible = true;
		screens.splash.h2.visible = true;
		screens.splash.logo.visible = true;
		if (ch_M1 < 1) {
			ch_M1 += 0.07;
			ch_M1 = ch_M1 >= 1 ? 1 : ch_M1;
			screens.splash.h1.alpha = ch_M1;
			screens.splash.h2.alpha = ch_M1;
			screens.splash.logo.alpha = ch_M1;
		}
	} else {
		if (ch_M1 > 0) {
			ch_M1 -= 0.07;
			ch_M1 = ch_M1 < 0 ? 0 : ch_M1;
			screens.splash.h1.alpha = ch_M1;
			screens.splash.h2.alpha = ch_M1;
			screens.splash.logo.alpha = ch_M1;
		} else {
			screens.splash.h1.visible = false;
			screens.splash.h2.visible = false;
			screens.splash.logo.visible = false;
		}
	}

	//SCREEN 0
	if (_s == 0) {
		screens.s0.h1.visible = true;
		screens.s0.txt.visible = true;
		if (ch_0 < 1) {
			ch_0 += 0.07;
			ch_0 = ch_0 >= 1 ? 1 : ch_0;
			screens.s0.h1.alpha = ch_0;
			screens.s0.txt.alpha = ch_0;
			opacityBtn(finger, ch_0);
		}
	} else {
		if (ch_0 > 0) {
			ch_0 -= 0.07;
			ch_0 = ch_0 < 0 ? 0 : ch_0;
			screens.s0.h1.alpha = ch_0;
			screens.s0.txt.alpha = ch_0;
		} else {
			screens.s0.h1.visible = false;
			screens.s0.txt.visible = false;
		}
	}

	//SCREEN 1
	if (_s == 1) {
		var a = document.querySelectorAll(".headercolor");
		a.forEach(function(e){e.content = "#FFC000";});

		moveFinger(finger, finger.x + direction.x / 20, finger.y + direction.y / 20);
		screens.s1.header.visible = true;
		screens.s1.h1.visible = true;
		screens.s1.timer.visible = true;
		//TOP
		if (ch_1t < 0) {
			ch_1t += 15;
			ch_1t = ch_1t > 0 ? 0 : ch_1t;
			screens.s1.header.y = ch_1t;
		}
		//OPACITY
		if (ch_1o < 1) {
			ch_1o += 0.07;
			ch_1o = ch_1o >= 1 ? 1 : ch_1o;
			screens.s1.h1.alpha = ch_1o;
			screens.s1.timer.alpha = ch_1o;
		}
	} else {
		if(ch_1t < -200){
			var a = document.querySelectorAll(".headercolor");
			a.forEach(function(e){e.content = "#000000";});
		}
		//TOP
		if (ch_1t > -300) {
			ch_1t -= 15;
			ch_1t = ch_1t < -300 ? -300 : ch_1t;
			screens.s1.header.y = ch_1t;
		} else {
			screens.s1.header.visible = false;
		}

		//OPACITY
		if (ch_1o > 0) {
			ch_1o -= 0.07;
			ch_1o = ch_1o < 0 ? 0 : ch_1o;
			screens.s1.h1.alpha = ch_1o;
			screens.s1.timer.alpha = ch_1o;
		} else {
			screens.s1.h1.visible = false;
			screens.s1.timer.visible = false;
		}
	}

	//SCREEN 2
	if (_s == 2) {
		if (finger.x > _w / 2 + 2 || finger.x < _w / 2 - 2) {
			moveFinger(finger, finger.x - ch_2fx / 10, finger.y);
		} else {
			moveFinger(finger, _w / 2, finger.y);
		}
		if (finger.y > _h - 200 + 2 || finger.y < _h - 200 - 2) {
			moveFinger(finger, finger.x, finger.y - ch_2fy / 10);
		} else {
			moveFinger(finger, finger.x, _h - 200);
		}

		screens.s2.h1.visible = true;
		screens.s2.txt.visible = true;
		if (ch_2 < 1) {
			ch_2 += 0.07;
			ch_2 = ch_2 >= 1 ? 1 : ch_2;
			screens.s2.h1.alpha = ch_2;
			screens.s2.txt.alpha = ch_2;
		}

		if (ch_2share > _h - 48) {
			ch_2share -= 5;
			ch_2share = ch_2share < _h - 48 ? _h - 48 : ch_2share;
			moveBtn(screens.s2.sharebtn, screens.s2.sharebtn.x, ch_2share);
		}

		if (ch_2sharedisplaybtns && ch_2sharebtns > _h - 48) {
			ch_2sharebtns -= 5;
			ch_2sharebtns = ch_2sharebtns < _h - 48 ? _h - 48 : ch_2sharebtns;
		} else if (!ch_2sharedisplaybtns && ch_2sharebtns < _h + 48) {
			ch_2sharebtns += 5;
			ch_2sharebtns = ch_2sharebtns > _h + 48 ? _h + 48 : ch_2sharebtns;
		}
		moveBtn(screens.s2.sharebtnvk, screens.s2.sharebtnvk.x, ch_2sharebtns);
		moveBtn(screens.s2.sharebtnfb, screens.s2.sharebtnfb.x, ch_2sharebtns);
		moveBtn(screens.s2.sharebtntw, screens.s2.sharebtntw.x, ch_2sharebtns);
	} else {
		if (ch_2 > 0) {
			ch_2 -= 0.07;
			ch_2 = ch_2 < 0 ? 0 : ch_2;
			screens.s2.h1.alpha = ch_2;
			screens.s2.txt.alpha = ch_2;
		} else {
			screens.s2.h1.visible = false;
			screens.s2.txt.visible = false;
		}

		if (ch_2share < _h + 48) {
			ch_2share += 5;
			ch_2share = ch_2share > _h + 48 ? _h + 48 : ch_2share;
			moveBtn(screens.s2.sharebtn, screens.s2.sharebtn.x, ch_2share);
		}else{
			ch_2sharedisplaybtns = false;
		}

		if (ch_2sharedisplaybtns && ch_2sharebtns < _h + 48) {
			ch_2sharebtns += 5;
			ch_2sharebtns = ch_2sharebtns > _h + 48 ? _h + 48 : ch_2sharebtns;
		}
		moveBtn(screens.s2.sharebtnvk, screens.s2.sharebtnvk.x, ch_2sharebtns);
		moveBtn(screens.s2.sharebtnfb, screens.s2.sharebtnfb.x, ch_2sharebtns);
		moveBtn(screens.s2.sharebtntw, screens.s2.sharebtntw.x, ch_2sharebtns);
	}

	//requestAnimationFrame(animate);
	renderer.render(stage);
	setTimeout(animate, 1000/30);
}

function drawFinger(_x, _y) {
	var blurFilter = new PIXI.filters.BlurFilter();
	blurFilter.blur = 10;

	var shadow = new PIXI.Graphics();
	shadow.lineStyle(0);
	shadow.beginFill(0xFFC000);
	shadow.drawCircle(0, 0, 80 * _sw);
	shadow.x = _x;
	shadow.y = _y;
	shadow.endFill();
	shadow.filters = [blurFilter];
	shadow.interactive = true;
	shadow.buttonMode = true;
	stage.addChild(shadow);

	var blackCircle = new PIXI.Graphics();
	blackCircle.lineStyle(0);
	blackCircle.beginFill(0x000000);
	blackCircle.drawCircle(0, 0, 80 * _sw);
	blackCircle.x = _x;
	blackCircle.y = _y;
	blackCircle.endFill();
	blackCircle.interactive = true;
	blackCircle.buttonMode = true;
	stage.addChild(blackCircle);

	var finger = new PIXI.Sprite(PIXI.Texture.fromImage('res/fingerprint.png'));
	finger.anchor.set(0.5);
	finger.x = _x;
	finger.y = _y;
	finger.scale.set(_sw);
	finger.interactive = true;
	finger.buttonMode = true;
	stage.addChild(finger);

	var pseudo = new PIXI.Graphics();
	pseudo.lineStyle(0);
	pseudo.beginFill(0x000000, 0);
	pseudo.drawCircle(0, 0, 80 * _sw);
	pseudo.x = _x;
	pseudo.y = _y;
	pseudo.endFill();
	pseudo.interactive = true;
	pseudo.buttonMode = true;
	pseudo.dataEls = {"finger":finger, "shadow":shadow, "blackCircle":blackCircle, "pseudo":pseudo};
	stage.addChild(pseudo);

	pseudo
		.on('mousedown', fingerTouchStart)
		.on('touchstart', fingerTouchStart)
		.on('mouseup', fingerTouchEnd)
		.on('mouseupoutside', fingerTouchEnd)
		.on('mousemove', fingerTouchMove)
		.on('touchmove', fingerTouchMove)
		.on('mouseupoutside', fingerTouchEnd)
		.on('touchend', fingerTouchEnd)
		.on('mouseout', fingerTouchOut)
		.on('touchout', fingerTouchOut);
	return pseudo;
}

function moveFinger(finger, _x, _y) {
	f = finger.dataEls;
	var arr = ["finger", "shadow", "blackCircle", "pseudo"];
	for (i = 0; i < arr.length; i++) {
		f[arr[i]].x = _x;
		f[arr[i]].y = _y;
	}
}

function drawBtn(_x, _y, size, texture, onclick) {
	var blurFilter = new PIXI.filters.BlurFilter();
	blurFilter.blur = 10;

	var shadow = new PIXI.Graphics();
	shadow.lineStyle(0);
	shadow.beginFill(0xFFC000);
	shadow.drawCircle(0, 0, size*_sw);
	shadow.x = _x;
	shadow.y = _y;
	shadow.endFill();
	shadow.filters = [blurFilter];
	shadow.interactive = true;
	shadow.buttonMode = true;
	stage.addChild(shadow);

	var blackCircle = new PIXI.Graphics();
	blackCircle.lineStyle(0);
	blackCircle.beginFill(0x000000);
	blackCircle.drawCircle(0, 0, size*_sw);
	blackCircle.x = _x;
	blackCircle.y = _y;
	blackCircle.endFill();
	blackCircle.interactive = true;
	blackCircle.buttonMode = true;
	stage.addChild(blackCircle);

	var finger = new PIXI.Sprite(PIXI.Texture.fromImage(texture));
	finger.anchor.set(0.5);
	finger.x = _x;
	finger.y = _y;
	finger.scale.set((size * _sw - 4) / 128);
	finger.interactive = true;
	finger.buttonMode = true;
	stage.addChild(finger);

	var pseudo = new PIXI.Graphics();
	pseudo.lineStyle(0);
	pseudo.beginFill(0xFF0000, 1);
	pseudo.drawCircle(0, 0, size*_sw);
	pseudo.alpha = 0;
	pseudo.x = _x;
	pseudo.y = _y;
	pseudo.endFill();
	pseudo.interactive = true;
	pseudo.buttonMode = true;
	pseudo.dataEls = {"finger":finger, "shadow":shadow, "blackCircle":blackCircle, "pseudo":pseudo};
	stage.addChild(pseudo);

	pseudo
		.on('mousedown', onclick)
		.on('touchstart', onclick);
	return pseudo;
}

function moveBtn(btn, _x, _y) {
	b = btn.dataEls;
	var arr = ["finger", "shadow", "blackCircle", "pseudo"];
	for (i = 0; i < arr.length; i++) {
		b[arr[i]].x = _x;
		b[arr[i]].y = _y;
	}
}
function opacityBtn(btn, _o){
	b = btn.dataEls;
	//pseudo.dataEls = [finger, shadow, blackCircle, pseudo]
	b.finger.alpha = _o;
	b.blackCircle.alpha = !!_o;
	b.pseudo.alpha = _o;


	var blurFilter = new PIXI.filters.BlurFilter();
	var o = _o*2>1?1:_o*2;
	blurFilter.blur = 10*o;
	b.shadow.alpha = _o;
	b.shadow.filters = [blurFilter];
}

function share(e) {
	window.navigator.vibrate(75);
	title = encodeURIComponent("Fingertest");
	text = encodeURIComponent("Мій рахунок в Fingertest - " + getTime(score).join(':'));
	if(getTime(score) != getTime(highscore)){
		text += encodeURIComponent(", мій рекорд - " + getTime(highscore).join(':'));
	}
	url = encodeURIComponent("https://games.blastorq.pp.ua/#ua.pp.blastorq.fingertest");
	image = encodeURIComponent("https://games.blastorq.pp.ua/images/ua.pp.blastorq.fingertest.png");

	popupCenter = function(url, title, w, h) {
		var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screens.left;
		var dualScreenTop = window.screenTop != undefined ? window.screenTop : screens.top;

		width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screens.width;
		height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screens.height;

		var left = ((width / 2) - (w / 2)) + dualScreenLeft;
		var top = ((height / 2) - (h / 2)) + dualScreenTop;
		var newWindow = window.open(url, title, 'scrollbars=yes,status=yes,resizable=no,modal=yes,titlebar=no,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left);
		if (window.focus) {
			newWindow.focus();
		}
	}
	var genScore = function(s) {
		return s + ":" + h(s);
	}

	switch (e) {
		case 0:
			ch_2sharedisplaybtns = !ch_2sharedisplaybtns;
			window.navigator.vibrate(35);
			break;
		case 'vk':
			popupCenter('https://vk.com/share.php?url='+url+ '&title='+title+ '&description='+text+ '&image='+image, '', 600, 400);
			break;
		case 'fb':
			popupCenter('https://www.facebook.com/sharer/sharer.php?u='+url+ '&title='+title+ '&description='+text+ '&image='+image, '', 600, 400);
			break;
		case 'tw':
			popupCenter('https://twitter.com/intent/tweet?url='+url+ '&hashtags='+title+ '&text='+text+ '&image='+image, '', 600, 400);
			break;
	}
}

var touched = false;

function fingerTouchStart(event) {
	this.data = event.data;
	_s = 1;
	touched = true;
	game_start = new Date();
	direction.i = setInterval(function() {
		if (finger.x + 96 < _w) {
			if (finger.x - 96 > 0) {
				direction.x = rand(-2, 2);
			} else {
				direction.x = rand(0, 2);
			}
		} else {
			direction.x = rand(-2, 0);
		}
		if (finger.y + 96 < _h) {
			if (finger.y - 96 > 300) {
				direction.y = rand(-2, 2);
			} else {
				direction.y = rand(0, 2);
			}
		} else {
			direction.y = rand(-2, 0);
		}
	}, 10000);
	startTime();
}

function fingerTouchMove() {
	if (!touched) return;
	if (this.data) {
		var p = this.data.global;
		var f = finger;
		var sqr = function(a) {
			return a * a;
		};
		if (sqr(p.x - f.x) + sqr(p.y - f.y) >= sqr(80 * _sw)) {
			this.data = null;
			this.touch = false;
			gover();
		}
	}
}

function fingerTouchEnd() {
	if (!touched) return;
	this.data = null;
	this.touch = false;
	gover();
}

function fingerTouchOut() {
	if (!touched) return;
	this.data = null;
	this.touch = false;
	gover();
}

function startTime() {
	if (!touched) return;
	var time = new Date() - game_start - 0;
	score = time - 0;
	if (score > highscore) {
		highscore = score;
		highscore += rand(-5, 5);
		localStorage.setItem('BlastORQ_FingerTest', c(highscore));
	}
	screens.s1.timer.text = getTime(time).join(":");
	var t = setTimeout(startTime, 500);
}

function getTime(time) {
	time = new Date(time);
	var checkTime = function(i) {
		if (i < 10) {
			i = "0" + i
		};
		return i;
	}
	var h = time.getHours() + time.getTimezoneOffset() / 60;
	var m = time.getMinutes();
	var s = time.getSeconds();
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	return [h, m, s];
}

function gover() {
	_s = 2;
	touched = false;
	screens.s2.txt.text = 'Твій час: ' + getTime(score).join(":") + '\n' +
		'Твій рекорд: ' + getTime(highscore).join(":");
	clearInterval(direction.i);
	ch_2fx = finger.x - _w / 2;
	ch_2fy = finger.y - (_h - 200);
	direction = {
		x: 0,
		y: 0,
		i: -1
	};
	window.navigator.vibrate([50, 150, 50, 150, 50]);
}

function c(n) {
	n = n > 0 ? n : -n;
	n = n + "";
	h = 0;
	for (j = 0; j < n.length; j++) {
		h += n[j] % 5 + n[j] % 3;
	}
	h = h * h * h + 1;
	h = h ^ 3612;

	n = (n - 0).toString(36);
	n = n.split("").reverse().join("");
	return n + ':' + h;
}

function d(n) {
	if ((n + "").indexOf(':') < 0) return -1;
	n = n.split(":");
	h0 = n[1];
	n = n[0];
	n = n.split("").reverse().join("");
	n = parseInt(n, 36);
	n = ~~n;

	n = n > 0 ? n : -n;
	n = n + "";
	h1 = 0;
	for (j = 0; j < n.length; j++) {
		h1 += n[j] % 5 + n[j] % 3;
	}
	h1 = h1 * h1 * h1 + 1;
	h1 = h1 ^ 3612;
	return h0 == h1 ? n : -1;
}

function sleep(t) {
	end = new Date() - 0 + t * 1000;
	while (new Date() < end);
}

function rand(mi, ma) {
	return Math.floor(Math.random() * (ma - mi + 1) + mi);
}

function h(r) {
	var e;
	try {
		var o = require("crypto"),
			t = o.createHash("sha1");
		t.update(r), e = t.digest("hex")
	} catch (a) {
		e = void 0
	}
	if (void 0 !== e) return e;
	var c, h, n, d, s, u, f, C, A, i = function(r, e) {
			var o = r << e | r >>> 32 - e;
			return o
		},
		p = function(r) {
			var e, o, t = "";
			for (e = 7; e >= 0; e--) o = r >>> 4 * e & 15, t += o.toString(16);
			return t
		},
		v = new Array(80),
		g = 1732584193,
		l = 4023233417,
		b = 2562383102,
		k = 271733878,
		w = 3285377520;
	r = unescape(encodeURIComponent(r));
	var y = r.length,
		m = [];
	for (h = 0; y - 3 > h; h += 4) n = r.charCodeAt(h) << 24 | r.charCodeAt(h + 1) << 16 | r.charCodeAt(h + 2) << 8 | r.charCodeAt(h + 3), m.push(n);
	switch (y % 4) {
		case 0:
			h = 2147483648;
			break;
		case 1:
			h = r.charCodeAt(y - 1) << 24 | 8388608;
			break;
		case 2:
			h = r.charCodeAt(y - 2) << 24 | r.charCodeAt(y - 1) << 16 | 32768;
			break;
		case 3:
			h = r.charCodeAt(y - 3) << 24 | r.charCodeAt(y - 2) << 16 | r.charCodeAt(y - 1) << 8 | 128
	}
	for (m.push(h); m.length % 16 !== 14;) m.push(0);
	for (m.push(y >>> 29), m.push(y << 3 & 4294967295), c = 0; c < m.length; c += 16) {
		for (h = 0; 16 > h; h++) v[h] = m[c + h];
		for (h = 16; 79 >= h; h++) v[h] = i(v[h - 3] ^ v[h - 8] ^ v[h - 14] ^ v[h - 16], 1);
		for (d = g, s = l, u = b, f = k, C = w, h = 0; 19 >= h; h++) A = i(d, 5) + (s & u | ~s & f) + C + v[h] + 1518500249 & 4294967295, C = f, f = u, u = i(s, 30), s = d, d = A;
		for (h = 20; 39 >= h; h++) A = i(d, 5) + (s ^ u ^ f) + C + v[h] + 1859775393 & 4294967295, C = f, f = u, u = i(s, 30), s = d, d = A;
		for (h = 40; 59 >= h; h++) A = i(d, 5) + (s & u | s & f | u & f) + C + v[h] + 2400959708 & 4294967295, C = f, f = u, u = i(s, 30), s = d, d = A;
		for (h = 60; 79 >= h; h++) A = i(d, 5) + (s ^ u ^ f) + C + v[h] + 3395469782 & 4294967295, C = f, f = u, u = i(s, 30), s = d, d = A;
		g = g + d & 4294967295, l = l + s & 4294967295, b = b + u & 4294967295, k = k + f & 4294967295, w = w + C & 4294967295
	}
	return A = p(g) + p(l) + p(b) + p(k) + p(w), A.toLowerCase().substr(8, 16)
};