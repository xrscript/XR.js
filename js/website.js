//var jsonString = $('script[type="module"]').html();/

// import a .js file
function includeScript(e) {
	
		var js = document.createElement("script");
	 js.type = "text/javascript";
	 js.src = e;
	 document.body.appendChild(js);
		
}

	
	
	const promise1 = new Promise((resolve, reject) => {
		includeScript('/lib/jquery/jquery.min.js')
		
	
	 /// console.log(value);
		
		setTimeout(function(){
	   

			resolve('Success!');			  }, 420);

		
	});

	promise1.then((value) => {
		
		//console.log('2')
	  // expected output: "Success!"
	
		
	runMD();
		
		var code = $('script[type="module"]').html();


	var icons = '<link rel="stylesheet" href="/lib/fontawesome/css/all.min.css" /><div class="icons"><a title="GitHub Repository" href="https://github.com/xrscript/XR.js/"><i class="fab fa-github"></i></a><a hidden title="Documentation" href="/docs"><i class="far fa-book"> </i></a><!--<a href="https://npmjs.com/package/@xrscript/XR.js"><i class="fab fa-npm"></i></a>--></div>'

	$('body').append(icons);
	//$('body').append('<i class="far fa-expand"></i></a></div>');
	var res = code.replace(/XR.Reality|XR.Splash|XR.Lensflare|XR.Floor|XR.Video|XR.Image|XR.Audio|XR.Model|XR.Pointer|XR.Controls|XR.Light|XR.Fog|XR.Sphere|XR.Cone|XR.Box|XR.Plane|XR.Circle|XR.Icosahedron|XR.Dodecahedron|XR.Octahedron|XR.Tetrahedron|XR.TorusKnot|XR.Torus|XR.Ring|XR.Sky|XR.Server|XR.User|XR.Menu|XR.Button|XR.Dropdown|XR.Hands|XR.Locomotion|XR.Gamepad|XR.Text|XR.Car|XR.SVG/gi, function (x) {
		var	s = x.split('.')[1];
		return "<a href='https://github.com/xrscript/XR.js/wiki/"+s+"' target='_blank'>"+x+"</a>";
	});

	$('body').append('<div id="showCode"><a><i class="far fa-code"></i>');
	$( "#showCode" ).click(function() {$( ".code" ).toggle();});
	$('body').append('<pre class="code"><code class="language-javascript">'+res+'</pre></code>');
	$( ".code" ).hide();
	});
	

//};

// ...

//	this.init(); //
// render markdown
function runMD() {
if(document.getElementById('markdown_source')){
 var textx = document.getElementById('markdown_source').value,
 target = document.getElementById('markdown');
 var converter = new showdown.Converter({tables: true});
var htmls = converter.makeHtml(textx);

target.innerHTML = htmls;
}
}

function dynamicallyLoadScript(url) {
	var script = document.createElement("script");  // create a script DOM node
	script.src = url;  // set its src to the provided URL

	document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
dynamicallyLoadScript('/lib/highlight/highlight.js')
setTimeout(function(){

	document.querySelectorAll('pre code').forEach((block) => {
   hljs.highlightBlock(block);
 });		  }, 2020);


