// XRjs.dev website setup scripts

// get current url & file name
var path = window.location.pathname;
var page = path.split("/").pop();

// bold the current page in the <header>
$("a").each(function( index ) {
	if($( this ).attr('href')){
	if($( this ).attr('href').indexOf(page) >= 0){
		$(this).css('font-weight',900);
	}
	}
});

// import a .js file
function loadScript(url) {
	var script = document.createElement("script");
	script.src = url;
	document.head.appendChild(script);
}

const promise1 = new Promise((resolve, reject) => {
	loadScript('/lib/jquery/jquery.min.js');	// load jQuery
	loadScript('/lib/highlight/highlight.js');	// load highlight.js
	resolve('Success!');
});

promise1.then((value) => {
	//console.log(value)
	
	// render markdown for docs
	renderMD();

	// add fontawesome icons
	$('body').append('<link rel="stylesheet" href="/lib/fontawesome/css/all.min.css"/><div class="icons"><a title="GitHub Repository" href="https://github.com/xrscript/XR.js/"><i class="fab fa-github"></i></a><!--<a href="https://npmjs.com/package/@xrscript/XR.js"><i class="fab fa-npm"></i></a>--></div>');
		
	// add links to inline code
	// readers can click on XR.Functions() and go to Wiki
	var code = $('script[type="module"]').html();
	var res = code.replace(/XR.js|XR.Reality|XR.Splash|XR.Lensflare|XR.Floor|XR.Video|XR.Image|XR.Audio|XR.Model|XR.Pointer|XR.Controls|XR.Light|XR.Fog|XR.Sphere|XR.Cone|XR.Box|XR.Plane|XR.Circle|XR.Icosahedron|XR.Dodecahedron|XR.Octahedron|XR.Tetrahedron|XR.TorusKnot|XR.Torus|XR.Ring|XR.Sky|XR.Server|XR.User|XR.Menu|XR.Button|XR.Dropdown|XR.Hands|XR.Locomotion|XR.Gamepad|XR.Text|XR.Car|XR.SVG|XR.Animate|XR.Accelerometer|XR.Compass|XR.Gyroscope/gi, function (x) {
		if(x == 'XR.js'){ return "<a href='https://github.com/xrscript/XR.js/blob/main/XR.js' target='_blank'>"+x+"</a>"; }
		else            { return "<a href='https://github.com/xrscript/XR.js/wiki/"+ x.split('.')[1] +"' target='_blank'>"+x+"</a>"; }
	});
	
	$('body').append('<pre class="code" hidden><div id="sourceLink"><a title="Source Code" href="https://github.com/xrscript/XR.js/blob/main' + path + '" target="_blank"><i class="fas fa-external-link-alt"></i></a></div></code><code class="language-javascript">'+res+'</pre>');

	// add show code button
	$('body').append('<div id="showCode"><a><i class="far fa-code"></i>');
	$( "#showCode").click(function() {$( ".code" ).toggle();});
	
});

// render markdown
function renderMD() {
	if(document.getElementById('markdown_source')){
		var textx = document.getElementById('markdown_source').value,
		target = document.getElementById('markdown');
		var converter = new showdown.Converter({tables: true});
		var htmls = converter.makeHtml(textx);
		target.innerHTML = htmls;
	}
}

// setup highlight.js
setTimeout(function(){
	document.querySelectorAll('pre code').forEach((block) => {
		hljs.configure({tabReplace: '     '})
		hljs.highlightBlock(block);
	});
}, 2020);
