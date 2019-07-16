function getViewportHeight() {
	if (window.innerHeight!=window.undefined) return window.innerHeight;
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientHeight;
	if (document.body) return document.body.clientHeight; 

	return window.undefined; 
}
function getViewportWidth() {
	if (window.innerWidth!=window.undefined) return window.innerWidth;
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientWidth;
	if (document.body) return document.body.clientWidth; 

	return window.undefined; 
}

/**
 * Gets the real scroll top
 */
function getScrollTop() {
	if (self.pageYOffset) // all except Explorer
	{
		return self.pageYOffset;
	}
	else if (document.documentElement && document.documentElement.scrollTop)
		// Explorer 6 Strict
	{
		return document.documentElement.scrollTop;
	}
	else if (document.body) // all other Explorers
	{
		return document.body.scrollTop;
	}
}
function getScrollLeft() {
	if (self.pageXOffset) // all except Explorer
	{
		return self.pageXOffset;
	}
	else if (document.documentElement && document.documentElement.scrollLeft)
		// Explorer 6 Strict
	{
		return document.documentElement.scrollLeft;
	}
	else if (document.body) // all other Explorers
	{
		return document.body.scrollLeft;
	}
}

function getMousePos(ev){
    if(ev.pageX || ev.pageY){
        return {x:ev.pageX, y:ev.pageY};
    }
    return {
        x:ev.clientX + document.documentElement.scrollLeft - document.body.clientLeft,
        y:ev.clientY + document.documentElement.scrollTop  - document.body.clientTop
    };
}

function initShowBigPic(){
	var ei = document.createElement("div");
	ei.id = 'enlarge_images';
	ei.style.cssText = 'position:absolute;display:none;z-index:3;border-width:1px; border-style:solid; border-color: #e4e4e4;padding:5px;';
	document.body.appendChild(ei);
}
initShowBigPic();
function showBigPic(event, img){
	var scrollTop = getScrollTop();
	var scrollLeft = getScrollLeft();
	var gg = (typeof img == 'object')? img: document.getElementById(img);
	var ei = document.getElementById('enlarge_images');
	ei.style.display = "block";
	//获取大图路径
	var bigImgURL = gg.src.substring(0,gg.src.lastIndexOf("_min"))+gg.src.substring(gg.src.lastIndexOf("."),gg.src.length);
	ei.innerHTML = '<img src="' + bigImgURL + '" />';
	
	var y = getMousePos(event).y-scrollTop - ei.offsetHeight + 10;
	var x = scrollLeft + getMousePos(event).x + 10;

	if (x > getViewportWidth() / 2) {
  		x = x - ei.offsetWidth - 2 * 20;
  	}
	if ((y+ei.offsetHeight)>getViewportHeight()) {
		y = getViewportHeight()-ei.offsetHeight-20;
	}
  	ei.style.left = (x + 10 + scrollLeft)+'px';
 	ei.style.top = (y + 10 + scrollTop)+'px';
}
function hideBigPic(){
	var ei = document.getElementById('enlarge_images');
	ei.innerHTML = "";
	ei.style.display = "none";
}
