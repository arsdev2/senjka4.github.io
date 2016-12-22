document.addEventListener("scroll", function(e){
	el = document.querySelector(".scrolltop");
	els = document.querySelectorAll(".main");
	if(el.getBoundingClientRect().top < 320)return;
	if(getScrollTop() < 128){
		el.style.bottom = "-48px";
		return;
	}else{
		el.style.bottom = "";
	}
	arr = [];
	for(i=0;i<els.length;i++){
		if(els[i].getBoundingClientRect().top < el.getBoundingClientRect().top){
			arr.push(els[i].getBoundingClientRect().top);
		}
	}
	var num = (arr.length-1>els.length-1)?els.length-1:arr.length-1;
	num = Math.abs(num);
	if(document.querySelectorAll(".main")[num].classList.contains("blue")){
		el.className = "scrolltop pink";
	}else{
		el.className = "scrolltop blue";
	}
});

function CClick(e, event) {
	which = event.which;
	if (event.ctrlKey) which = 2;
	switch (which) {
		case 1:
			console.log('Left Mouse button pressed.');
			e.getElementsByClassName('link')[0].click();
			break;
		case 2:
			console.log('Middle Mouse button pressed.');
			w = window.open(e.getElementsByClassName('link')[0].href);
			w.blur();
			setTimeout(w.focus, 0);
			break;
		case 3:
			console.log('Right Mouse button pressed.');
			/*popupCenter('https://vk.com/share.php?url=' + encodeURIComponent(e.getElementsByClassName('link')[0].href), 'Share', 626, 436);*/
			break;
		default:
			console.error('You have a strange Mouse!');
	}
	return false;
};
function getScroll(){
    var x = 0, y = 0;
    if( typeof( window.pageYOffset ) == 'number' ) {
        y = window.pageYOffset;
        x = window.pageXOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        y = document.body.scrollTop;
        x = document.body.scrollLeft;
    } else if( document.documentElement && 
    ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        y = document.documentElement.scrollTop;
        x = document.documentElement.scrollLeft;
    }
    var obj = new Object();
    obj.x = x;
    obj.y = y;
    return obj;
};
function getScrollTop(){return  getScroll().y};
function getScrollLeft(){return  getScroll().x};
function setScrollTop(o){window.scrollTo(0,o)};
function getWindowHeight(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0}
function getWindowWidth(){return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0}
function getDocHeight(){return Math.max(document.body.scrollHeight||0,document.documentElement.scrollHeight||0,document.body.offsetHeight||0,document.documentElement.offsetHeight||0,document.body.clientHeight||0,document.documentElement.clientHeight||0)};
function getScrollPercentage(){return(getScrollTop()+getWindowHeight())/getDocHeight()*100};

/*MobileDetect*/
!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,h=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,i=/IEMobile/i,j=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,k=/BlackBerry/i,l=/BB10/i,m=/Opera Mini/i,n=/(CriOS|Chrome)(?=.*\bMobile\b)/i,o=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,p=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),q=function(a,b){return a.test(b)},r=function(a){var r=a||navigator.userAgent,s=r.split("[FBAN");return"undefined"!=typeof s[1]&&(r=s[0]),this.apple={phone:q(b,r),ipod:q(c,r),tablet:!q(b,r)&&q(d,r),device:q(b,r)||q(c,r)||q(d,r)},this.amazon={phone:q(g,r),tablet:!q(g,r)&&q(h,r),device:q(g,r)||q(h,r)},this.android={phone:q(g,r)||q(e,r),tablet:!q(g,r)&&!q(e,r)&&(q(h,r)||q(f,r)),device:q(g,r)||q(h,r)||q(e,r)||q(f,r)},this.windows={phone:q(i,r),tablet:q(j,r),device:q(i,r)||q(j,r)},this.other={blackberry:q(k,r),blackberry10:q(l,r),opera:q(m,r),firefox:q(o,r),chrome:q(n,r),device:q(k,r)||q(l,r)||q(m,r)||q(o,r)||q(n,r)},this.seven_inch=q(p,r),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},s=function(){var a=new r;return a.Class=r,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=r:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=s():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=s()):a.isMobile=s()}(this);

/*Glitch*/
var Glitch={started:!1,I:-1,init:function(){return document.querySelector("div.glitch.glitch-bottom")?el=document.querySelector("div.glitch.glitch-bottom"):(el=document.createElement("div"),el.className="glitch glitch-bottom",document.body.parentElement.appendChild(el)),this.start(),this.I>-1&&clearInterval(this.I),document.addEventListener("resize",this.start),this.started=!0,!0},start:function(){var t=(window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height),e="<style>";for(e+="div.glitch.glitch-bottom {display: block;position: fixed;top: -0.2vh;left: 0px;width: 100%;height: 0px;z-index: 100000000000;opacity: 0.8;-webkit-animation-name: glitch;animation-name: glitch;-webkit-animation-duration: 0.006s;animation-duration: 0.006s;-webkit-animation-iteration-count: infinite;animation-iteration-count: infinite;-webkit-animation-direction: alternate;animation-direction: alternate;-webkit-animation-timing-function: linear;animation-timing-function: linear;}@-webkit-keyframes glitch{from{opacity:0.9;}to{opacity:0.5;}}div.glitch.glitch-bottom:after{content:'';position:fixed;left:0px;top:0px;width:100%;height:1px;box-shadow: 0 20vh 50vh 10vh rgba(0,0,0,1),0 80vh 50vh 10vh rgba(0,0,0,0.7);z-index:-10;}",e+="div.glitch.glitch-bottom{box-shadow: ",arr=[],i=0;i<t/2;i++)arr.push("0 "+2*i+"px 0 1px "+("rgba("+~~(255*Math.random())+", "+~~(255*Math.random())+", "+~~(255*Math.random())+", "+(Math.random()/2+.5)+")"));return e+=arr.join(", "),e+="}",e+="</style>",el.innerHTML=e,!0},stop:function(){return clearInterval(this.I),this.I=-1,document.querySelector("div.glitch.glitch-bottom")&&(document.querySelector("div.glitch.glitch-bottom").outerHTML=""),this.started=!1,!0},toggle:function(){this.started?this.stop():this.init()}};

/* smooth-scroll.js v1.3.1 */
(function(e,t){"use strict";var n=0,r=500,i=15,s=document.getElementsByTagName("a"),o;for(var u=0;u<s.length;u++){o=s[u].attributes.href===t?null:s[u].attributes.href.nodeValue.toString();if(o!==null&&o.length>1&&o.indexOf("#")!=-1){s[u].onclick=function(){var n,s=this.attributes.href.nodeValue.toString(),o=s.substr(0,s.indexOf("#")),u=s.substr(s.indexOf("#")+1);if(n=document.getElementById(u)){var l=(r-r%i)/i,c=f(),h=(a(n)-c)/l;if(e.history&&typeof e.history.pushState=="function")e.history.pushState({},t,o+"#"+u);for(var p=1;p<=l;p++){(function(){var t=h*p;setTimeout(function(){e.scrollTo(0,t+c)},i*p)})()}return false}}}}var a=function(e){var r=n*-1;while(e.offsetParent!=t&&e.offsetParent!=null){r+=e.offsetTop+(e.clientTop!=null?e.clientTop:0);e=e.offsetParent}return r};var f=function(){return e.pageYOffset!==t?e.pageYOffset:document.documentElement.scrollTop!==t?document.documentElement.scrollTop:document.body.scrollTop}})(window);

/*Torch*/

var Flashlight={started:!1,radius:200,centerX:-400,centerY:-400,init:function(){var t=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,e=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height;document.getElementById("light")?el=document.getElementById("light"):(el=document.createElement("div"),el.id="light",document.body.insertBefore(el,document.body.lastChild)),el.innerHTML="<style>#light{background-position:-400px -400px;position:fixed;top:0px;left:0px;width:200vw;height:200vh;pointer-events: none;z-index:2147483648;transition-duration: .5s;-webkit-transition-duration: .5s;-moz-transition-duration: .5s;-o-transition-duration: .5s;-ms-transition-duration: .5s;transition-property: opacity;-webkit-transition-property: opacity;-moz-transition-property: opacity;-o-transition-property: opacity;-ms-transition-property: opacity;opacity:0;}</style>",this.started=!0,this.radius=200,this.centerX=t/2,this.centerY=e/2,document.removeEventListener("mousemove",Flashlight.update),document.removeEventListener("mousewheel",Flashlight.update),document.addEventListener("mousemove",Flashlight.update),document.addEventListener("mousewheel",Flashlight.update),setTimeout(function(){document.getElementById("light").style.opacity=1},1),Flashlight.update()},update:function(t,e){if(document.getElementById("light")){var n=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,i=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height;Flashlight.centerX=Flashlight.cursor(t).X,Flashlight.centerY=Flashlight.cursor(t).Y,t&&"mousewheel"==t.type&&t.shiftKey&&(e||(e=t.deltaY||t.deltaX),t.preventDefault(),(Flashlight.radius<n/2&&Flashlight.radius<i/2||e>0)&&(Flashlight.radius-=e/4),Flashlight.radius<50&&(Flashlight.radius=50)),document.getElementById("light").style.background="-webkit-radial-gradient("+Flashlight.radius+"px "+Flashlight.radius+"px, circle contain, rgba(0, 0, 0, 0), rgba(29, 29, 29, 0.96)) -400px -400px",document.getElementById("light").style.backgroundPosition=Flashlight.centerX-Flashlight.radius+"px "+(Flashlight.centerY-Flashlight.radius)+"px"}},cursor:function(t,e){var n,i,o,l=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,d=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height;return(t=t||window.event)?(null==t.pageX&&null!=t.clientX&&(n=t.target&&t.target.ownerDocument||document,i=n.documentElement,o=n.body,t.pageX=t.clientX+(i&&i.scrollLeft||o&&o.scrollLeft||0)-(i&&i.clientLeft||o&&o.clientLeft||0),t.pageY=t.clientY+(i&&i.scrollTop||o&&o.scrollTop||0)-(i&&i.clientTop||o&&o.clientTop||0)),{x:t.clientX,y:t.clientY,X:t.clientX,Y:t.clientY}):{x:-l,y:-d,X:-l,Y:-d}},stop:function(){return this.started=!1,document.getElementById("light")&&(document.getElementById("light").style.opacity=0,document.getElementById("toggle").disabled=!0,setTimeout(function(){document.getElementById("light").outerHTML="",document.getElementById("toggle").disabled=""},600)),!0},toggle:function(t){return t=t?!!t:!this.started,t?this.init():this.stop()}};document.addEventListener("keydown",function(t){t.altKey&&t.ctrlKey&&Flashlight.toggle()});