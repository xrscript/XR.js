// XR.js
import '/lib/three/build/three.js';	// three.js
import '/lib/tween/tween.umd.js';	// tween.js
import '/lib/physijs/physi.js';		// physi.js
Physijs.scripts.worker = '/lib/physijs/physijs_worker.js';
Physijs.scripts.ammo = '/lib/physijs/ammo.js';
import  { JoyStick } from '/lib/joy/joy.js';		// joy.js

import '/node_modules/simplex-noise/simplex-noise.js';
import { GUI } from './node_modules/three/examples/jsm/libs/dat.gui.module.js';
import { VRButton } 					from './node_modules/three/examples/jsm/webxr/VRButton.js';
import { ARButton } 					from './node_modules/three/examples/jsm/webxr/ARButton.js';
import { XRControllerModelFactory } 	from './node_modules/three/examples/jsm/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory }       	from './node_modules/three/examples/jsm/webxr/XRHandModelFactory.js';
import { OrbitControls } 				from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { PositionalAudioHelper  } 		from './node_modules/three/examples/jsm/helpers/PositionalAudioHelper.js';
// loaders
import { SVGLoader		} 				from './node_modules/three/examples/jsm/loaders/SVGLoader.js';
import { TDSLoader		}				from './node_modules/three/examples/jsm/loaders/TDSLoader.js';
import { ThreeMFLoader	}				from './node_modules/three/examples/jsm/loaders/3MFLoader.js';
import { Rhino3dmLoader	} 				from './node_modules/three/examples/jsm/loaders/3DMLoader.js';
import { AMFLoader		}				from './node_modules/three/examples/jsm/loaders/AMFLoader.js';
import { ColladaLoader	} 				from './node_modules/three/examples/jsm/loaders/ColladaLoader.js';
import { OBJLoader2		} 				from './node_modules/three/examples/jsm/loaders/OBJLoader2.js';
import { FBXLoader		} 				from './node_modules/three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader		}               from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { MTLLoader		} 				from './node_modules/three/examples/jsm/loaders/MTLLoader.js';
import { PCDLoader		} 				from './node_modules/three/examples/jsm/loaders/PCDLoader.js';
import { MD2Character	}				from '/node_modules/three/examples/jsm/misc/MD2Character.js';
import { NRRDLoader		}				from '/node_modules/three/examples/jsm/loaders/NRRDLoader.js';
import { VTKLoader		}				from '/node_modules/three/examples/jsm/loaders/VTKLoader.js';
import { PDBLoader		}				from './node_modules/three/examples/jsm/loaders/PDBLoader.js';
import { PLYLoader		}				from '/node_modules/three/examples/jsm/loaders/PLYLoader.js';
import { PRWMLoader		}				from './node_modules/three/examples/jsm/loaders/PRWMLoader.js';
import { STLLoader		}				from './node_modules/three/examples/jsm/loaders/STLLoader.js';
import { VRMLoader		}				from './node_modules/three/examples/jsm/loaders/VRMLoader.js';
import { XLoader		}				from './node_modules/three/examples/jsm/loaders/XLoader.js';
import { XYZLoader		}				from './node_modules/three/examples/jsm/loaders/XYZLoader.js';
import { MtlObjBridge	} 				from './node_modules/three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';
import { Lensflaree,LensflareElement }	from '/node_modules/three/examples/jsm/objects/Lensflare.js';
import { CSS2DRenderer, CSS2DObject }	from '/node_modules/three/examples/jsm/renderers/CSS2DRenderer.js';
import { Water } 						from './node_modules/three/examples/jsm/objects/Water.js';
import { Skyy } 						from '/node_modules/three/examples/jsm/objects/Sky.js';

import '/lib/jquery/jquery.min.js';
import '/js/website.js';
// animated soldier
let model, skeleton
var  actions = [];
const crossFadeControls = [];
var	mixer
let idleAction, walkAction, runAction;
let idleWeight, walkWeight, runWeight;
let  settings;
import basketball from '/assets/json/basketball.js';

let singleStepMode = false;
let sizeOfNextStep = 0;
var currentTime, totalGrabTime, throwTime;
var objectNewPosition;
var objectNewRotation;
var grabber		= false;
var grabbing	= false;
var grabbingObject;
var grabStartTime	= 0;
var grabEndTime		= 0;
var grabTime		= 0;
var intersecto
var startEndDifference
var startEndRotation
var grabbingController
var throwLinearVelocity			=  new THREE.Vector3();
var throwAngularVelocity		=  new THREE.Vector3();
var controllerGrabVector		=  new THREE.Vector3();
var controllerGrabPosition		=  new THREE.Vector3();
var controllerGrabRotation		=  new THREE.Vector3();
var controllerGrabStartPosition	=  new THREE.Vector3();
var controllerGrabStartRotation	=  new THREE.Vector3();
var throwStartVector			=  new THREE.Vector3();
var throwEndVector				=  new THREE.Vector3();
var throwStartRotation			=  new THREE.Vector3();
var throwEndRotation			=  new THREE.Vector3();
var controllerGrabEndPosition	=  new THREE.Vector3();
var controllerGrabEndRotation	=  new THREE.Vector3();
var intersectingObjectPosition	=  new THREE.Vector3();
var intersectingObjectDirection	=  new THREE.Vector3();
var fps;
var head;
// for demo
var menuBox, menuSphere, menuCylinder;
var fullGamepad = {
	  joystick:{
		  l : [0,0],
		  r : [0,0]
	  },
	  button:{
		  a : 0, // A Button
		  b : 0, // B Button
		  x : 0, // X Button
		  y : 0 // Y Button
		  //r : controller[0].gamepad.buttons[3], // stick button R
		  //l : controller[1].gamepad.buttons[3]  // stick button L
	  }/*
	  trigger:{
		  r : controller[0].gamepad.buttons[0], // trigger R
		  l : controller[1].gamepad.buttons[0]  // trigger L
	  },
	  grip:{
		  r : controller[0].gamepad.buttons[1], // grip R
		  l : controller[1].gamepad.buttons[1]  // grip L
	  },
	  rest:{
		  r : controller[0].gamepad.buttons[6], // thumbrest R
		  l : controller[1].gamepad.buttons[6]  // thumbrest L
	  }*/
  //},
}

var touchGamepad;
var animationOn = false;
var joystick;
var fingermenu
var video,videotexture
var _boxes = [], spawnBox, loader,NoiseGen,ground_geometry, ground_material, ground;
let water, sun, watermesh;
let mixerFBX;
let mixerDAE;
raycaster = new THREE.Raycaster();
var clock = new THREE.Clock();
var audioLoader = new THREE.AudioLoader();

//mirror
var mirror = false;
var mirrorCameras = [];
var mirrorObjects = [];

var cameraDirection = new THREE.Vector3();
var cameraPostion	= new THREE.Vector3();
var dollyDirection	= new THREE.Vector3();
var dollyPostion	= new THREE.Vector3();
var loader			= new THREE.TextureLoader();
var mainmenu		= new THREE.Group(); // main menu
mainmenu.name = 'mainmenu';
var guidingController;
var pointingController;
var walkController;
let sphere//, clock;
let hands, hand1, hand2;
let controller2;
let controllerGrip1, controllerGrip2;
var pointer = false;
var hovering = [];
var videoTexture,vid;
var intersects=[];
var renderer;
var scene;
var videogeo
var camera, dolly, controls, material;
var controller = [];
var skybox;var floor; var text;
var teleporting = false;
var rafCallbacks = new Set(),tempVec, tempVec1,tempVecP,tempVecV,g,lineSegments,lineGeometryVertices,		guideline, guidelight, guidesprite,newPos
var controllerVec1 =  new THREE.Vector3(),controllerVec2 =  new THREE.Vector3();
var compass = false;
const cameraGroup = new THREE.Group();
//var raycaster;
var mouse = new THREE.Vector2();
var intersecting,
raycaster,
controller,
controller1,
tempMatrix = new THREE.Matrix4(),
intersectedObject,
intersectedPosition;
var fly = false;
var walk = false;

var objects =[];


// joysticks
var Joy1 , Joy2;

// toggle fullscreen
function toggleFullscreen() {
  if (document.fullscreenElement) { document.exitFullscreen();} else { document.body.requestFullscreen().catch(err => { console.log(err); }); }
}
var rightArm

// Reality
export class Reality {
	constructor (options) {
		if(!options){options={}}
		new Scene(options);
		new Camera();
		
		new Player(options);
		new Controls(options);
		new Menu();
		
		// default light,
		var light = new THREE.AmbientLight( 0x404040,0.8 ); // soft white light
	   scene.add( light );
		
		//TWEEN.start();
		var look = options.lookAt || [0,2,1]// || null
		if(look.length){
			camera.lookAt(new THREE.Vector3(...look));
			//	controls.target.set( ...options.lookAt);
		}
		//camera.position.set( 0, 2, 5 );
		//camera.lookAt(new THREE.Vector3(0,1,0));
		
		//camera.lookAt(new THREE.Vector3(...look));
		//return scene
	}
	lookAt(e){
	//	camera.position.set( 25, 20, 250 );
		//camera.lookAt(new THREE.Vector3( 0, 7, 0 ));
		camera.lookAt(...e);
		//controls.target.set( ...e);
	}
	
	jump(e){
		new Animate({
		at: dolly,
		position: {x:0,y: 5,z:0},
		duration: 700,
		velocity:true,
		type:'relative'
		});
	}
}

// Scene
export class Scene {
	constructor (options) {
		if(!options){options={}}
		this.gravity = options.gravity || -5;
		 fps  = options.fps || 60;
		var p = options.physics || false
		if (options.physics == false){ scene = new THREE.Scene(); }
		else {
			var g = this.gravity;
			if (g.length){ } else { g = [0, g,0] }
			scene =  new Physijs.Scene({
				reportsize: 50, // set this to the total number of objects
				fixedTimeStep: 1 / fps,
				broadphase: 'sweepprune', // or  'dynamic'
			});
			window.scene = scene
			scene.setGravity(new THREE.Vector3( ...g ));
			scene.addEventListener( 'update', function() { scene.simulate( undefined, 1 ); /* physics_stats.update(); */ } );
			scene.simulate();
		}
		
		//scene.background = new THREE.Color( 0x333333 );
		renderer = new THREE.WebGLRenderer(/**/{ antialias: true, alpha: true });
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		// renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 0.6;
		renderer.outputEncoding = THREE.sRGBEncoding;
		// renderer.physicallyCorrectLights = true
		renderer.xr.enabled = true;
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.shadowMapSoft = true;
		document.body.appendChild(renderer.domElement);
		renderer.setAnimationLoop( render );
		document.body.appendChild( VRButton.createButton( renderer ) );
		scene.add(mainmenu);
	}
}

// ===== Multiplayer ===== //

// Server
export class Server {
	constructor (options) {
		if(!options){options={}}
		
		console.log(options)
		var port = options.port || 8888;
		var ip = options.ip || 'http://localhost';
		var socket = io.connect(ip + ':' + port);
		socket.on('connect', function(data) {
			socket.emit('join', 'Hello World from client');
			socket.emit("say to someone", 'Hello World from client');
		});
		socket.on('popo', function(data) {
			console.log(data)
		});
		
		socket.on('connectToRoom',function(data) {
			document.body.innerHTML = '';
			document.write(data);
		});
		$('form').submit(function(e){
			e.preventDefault();
			var message = $('#chat_input').val();
			socket.emit('messages', message);
			material = new THREE.MeshLambertMaterial ({
				combine: 		THREE.MixOperation,
				reflectivity: 	this.reflect,
				color: 			this._color,
				side:			this._side,
				clearcoat:		1,
				metalness:		0,
				transparent:	true,
				opacity:		0.8,
				wireframe:		false,
				flatShading:	true
			});
			var geometry = new THREE.SphereGeometry(8, 8, 8);
			var box = new THREE.Mesh( geometry, material )
			scene.add(box)
		});
		 setInterval( function () {
	 //  if (video && video.currentTime){
		   socket.emit('pos',cameraGroup.getWorldPosition(cameraDirection) );
	 //  }
	 }, 1000 / 24 );
	
		// camera.getWorldPosition(cameraPostion);
		// camera.getWorldDirection(cameraDirection);
		// raycaster.set( cameraPostion, cameraDirection );

	}
}


// Grab
export class Grab {
	constructor (options) {
		if(!options){options={}}
	
		grabber = true
		grabbingController = options.bind
		//console.log('grab')
		//console.log(options)
		const panoSphereGeo = new THREE.SphereBufferGeometry( 0.05, 25, 25 );
		const panoSphereMat = new THREE.MeshStandardMaterial( { wireframe:true });
		var sphere = new THREE.Mesh( panoSphereGeo, panoSphereMat );
		grabbingController.add( sphere );
		var GrabRaycaster = new THREE.Raycaster();
		//scene.add(GrabRaycaster)
		grabbingController.addEventListener( 'squeezestart', function ( event ) {
			grabTime = 0
			grabStartTime = +new Date();
			grabbing = true
		//	console.log('grrraab')
			panoSphereMat.wireframe = false
			//const p = guidingController.getWorldPosition(tempVecP);  // controller position
			//const v = guidingController.getWorldDirection(tempVecV); // controller direction
			
			// update the picking ray with the camera and mouse position
			var direction = sphere.getWorldDirection(controllerGrabStartRotation);
			var position = sphere.getWorldPosition(controllerGrabStartPosition);
			//console.log(direction)
			GrabRaycaster.set( position, direction );
			// Draw a line from pointA in the given direction at distance 100
		/*	   var pointA = new THREE.Vector3(controllerGrabPosition );
			   var direction = new THREE.Vector3(controllerGrabVector );
			   direction.normalize();

			   var distance = 100; // at what distance to determine pointB

			   var pointB = new THREE.Vector3();
			   pointB.addVectors ( pointA, direction.multiplyScalar( distance ) );

			   var geometry = new THREE.Geometry();
			   geometry.vertices.push( pointA );
			   geometry.vertices.push( pointB );
			   var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
			   var line = new THREE.Line( geometry, material );
			   scene.add( line );
		 */
				// calculate objects intersecting the picking ray
			//var object = scene.getObjectById( 4, true );
			
			scene.traverse(function(child) {
			  if (child.type === "Mesh") {
				  
				  if(child.name != 'controller' && child.name != 'floor'){
					  console.log(intersecto)
					  intersecto = GrabRaycaster.intersectObject(child );
					  grabbingObject = intersecto
					  console.log(grabbingObject)
					  // console.log(scene.children)
					  // console.log(intersecto)
					  if (intersecto[0]){
						  var direction = intersecto[0].object.getWorldDirection(intersectingObjectDirection);
						  var position  = intersecto[0].object.getWorldPosition(intersectingObjectPosition);
						  //  intersecto[0].object.material.color.set( 0xff0000 );
					  }
				  }
			//	  console.log('mesh')
				//child.material = ClassMaterial; //apply same material to all meshes
			  }
			});
		});
		 
		grabbingController.addEventListener( 'squeezeend', function ( event ) {
			panoSphereMat.wireframe = true;
			grabEndTime = +new Date();
			grabTime = grabEndTime - grabStartTime;
			var position = startEndDifference;
			var rotation = startEndRotation;
			console.log(position, grabTime)
			var velocityThrow = (1000 - grabTime) / 1000;
			console.log(velocityThrow)
			
			if (intersecto[0]){
				//var targetObject = options.at.object;
				// tempVec.set(0,0,0)
				//var poss = new THREE.Vector3()
				//console.log(new THREE.Vector3(e))
				//console.log('asdf')
				//intersecto[0].position.x = e.x;
				//intersecto[0].position.y = e.y;
				//intersecto[0].position.z = e.z;
				intersecto[0].object.position.x = objectNewPosition.x;
				intersecto[0].object.position.y = objectNewPosition.y;
				intersecto[0].object.position.z = objectNewPosition.z;
				intersecto[0].object.__dirtyPosition = true;
				
				intersecto[0].object.rotation.x = objectNewRotation.x;
				intersecto[0].object.rotation.y = objectNewRotation.y;
				intersecto[0].object.rotation.z = objectNewRotation.z;
				intersecto[0].object.__dirtyRotation = true;
				
				// console.log(position, grabTime)
				
				// calculate the linear velocity, so user can 'throw' objects
				var velocityThrow = (1000 - grabTime) / 1000;
				// console.log(velocityThrow)
				// console.log(startEndDifference)
				// console.log(startEndRotation)
				//throwStartVector
				var positiong2 = grabbingController.getWorldPosition(controllerGrabPosition);
				var dir = grabbingController.getWorldDirection(controllerGrabRotation);

				// this will return the difference vector between the start position and current position of grab
				
				
				var throwdiffDirection = positionVector1(throwStartRotation, controllerGrabRotation);
				var throwdiff = positionVector1(throwStartVector, controllerGrabPosition);
				// console.log(throwdiff)
				//console.log(startEndDifference)
				//var igy = positionVector(intersectingObjectPosition, positiong);
				
				var sdgf  = multiplyVector(throwLinearVelocity, 10)
				var sdgf1 = multiplyVector(throwAngularVelocity, 10)
				
				
				intersecto[0].object.setLinearVelocity(sdgf);
				intersecto[0].object.setAngularVelocity(sdgf1);

				//targetObject.setLinearVelocity(new THREE.Vector3(e.x, e.y, e.z));
				//targetObject.setAngularVelocity(new THREE.Vector3(e.x, e.y, e.z));
				//console.log(e)
				//anim = e;
					
				// targetObject.setAngularVelocity(new THREE.Vector3(e.x, e.y, e.z));
				//targetObject.setLinearVelocity(linearVelocity);

				//targetObject.setLinearVelocity(new THREE.Vector3(e.x, e.y, e.z));
				//targetObject.setAngularVelocity(new THREE.Vector3(e.x, e.y, e.z));
				//console.log(e)
				//anim = e;
				//intersecto[ 0 ].object.material.color.set( 0x000000 );
				
			}
			grabbing = false;
			intersecto = [];
		});
	};
}

// Controls
export class Controls {
	constructor (options) {
		if(!options){options={}}
		controls = new OrbitControls( camera, renderer.domElement);
		//controls.damping = 0.2;
		//this.minDistance = 0;
		this.maxDistance = 100;
		var position = options.position || [0,2,0]
		// controls.target.set( 0, 0,  0 );
		controls.update();
		// controls.screenSpacePanning = true;
		controls.enableKeys = false;
		controls.maxPolarAngle = (Math.PI/ 2) - 0.1;
		camera.position.set( ...position );
		//camera.lookAt( 0, 30, 0 );
		//controls.target.set( 0, 2,0 );
		camera.scale.set(1, 1, 1)
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;
		//controls.addEventListener( 'change', render );
	}
}
let floorMat;
// Floormat
export class Floormat {
	constructor (options) {
		if(!options){options={}}
		
		floorMat = new THREE.MeshStandardMaterial( {
			  roughness: 0.8,
			  color: 0xffffff,
			  metalness: 0.2,
			  bumpScale: 0.01
		  } );
		  const textureLoader = new THREE.TextureLoader();
		  textureLoader.load( "/assets/hardwood2_diffuse.jpg", function ( map ) {
			  map.wrapS = THREE.RepeatWrapping;
			  map.wrapT = THREE.RepeatWrapping;
			  map.anisotropy = 4;
			  map.repeat.set( 10, 14 );
			  map.encoding = THREE.sRGBEncoding;
			  floorMat.map = map;
			  floorMat.needsUpdate = true;
		  } );
		  textureLoader.load( "/assets/hardwood2_bump.jpg", function ( map ) {
			  map.wrapS = THREE.RepeatWrapping;
			  map.wrapT = THREE.RepeatWrapping;
			  map.anisotropy = 4;
			  map.repeat.set( 10, 14 );
			  floorMat.bumpMap = map;
			  floorMat.needsUpdate = true;
		  } );
		  textureLoader.load( "/assets/hardwood2_roughness.jpg", function ( map ) {
			  map.wrapS = THREE.RepeatWrapping;
			  map.wrapT = THREE.RepeatWrapping;
			  map.anisotropy = 4;
			  map.repeat.set( 10, 14 );
			  floorMat.roughnessMap = map;
			  floorMat.needsUpdate = true;
		  } );

		const floorGeometry = new THREE.PlaneBufferGeometry( 20, 20 );
		const floorMesh = new THREE.Mesh( floorGeometry, floorMat );
		floorMesh.receiveShadow = true;
		floorMesh.rotation.x = - Math.PI / 2.0;
		scene.add( floorMesh );
	}
}

// Floor
export class Floor {
	constructor (options) {
		if(!options){options={}}
		this._color 	= options.color 	|| 0xffffff;
		this._opacity 	= options.opacity 	|| 0.6;
		this._size 		= options.size 		|| 100;
		this._scale 	= options.scale 	|| [100,100];
		this._name 		= options.name 		|| 'floor';
		this._map 		= options.map 		|| null;
		this._material 	= options.material 	|| 'standard';
		this._bounce 	= options.bounce 	|| 0.2;
		this._friction 	= options.friction 	|| 0.2;
		var o = this._opacity;
		var s = this._size;
		var c = this._color;
		var n = this._name;
		//var side = THREE.FrontSide;
		var mat =  getMaterial({
			type:this._material,
			color: this._color,
			//	transparent:true,
			opacity:this._opacity,
			side: THREE.FrontSide,
			map:this._map,
			repeat: options.repeat
		})
		
		// Materials
		var ground_material = Physijs.createMaterial( mat, this._friction, this._bounce );
	   
		//ground.receiveShadow = true;
		//scene.add( ground );
		
		var geo =  new THREE.PlaneGeometry(this._scale[0], this._scale[1])
		floor = new Physijs.PlaneMesh(geo, ground_material, 0		);
		
		//var geo =  new THREE.BoxGeometry(this._scale[0], this._scale[1])
		//floor = new Physijs.BoxMesh(geo, ground_material, 0		);
		
		floor.rotation.x = -Math.PI / 2;
		//floor.position.x = 0;
		floor.position.y = 0.0;
		scene.add(floor);
		floor.color = c;
		floor.receiveShadow = true;
		floor.castShadow = false;
		floor.name = n;
		
  }
}

spawnBox = (function() {
	var box_geometry = new THREE.BoxGeometry( 1,1,1),
		handleCollision = function( collided_with, linearVelocity, angularVelocity ) {
			switch ( ++this.collisions ) {
				case 1:this.material.color.setHex(0xff8855);console.log('first');break;
				case 2:this.material.color.setHex(0xbb9955);break;
				case 3:this.material.color.setHex(0xaaaa55);break;
				case 4:this.material.color.setHex(0x99bb55);break;
				case 5:this.material.color.setHex(0x88cc55);break;
				case 6:this.material.color.setHex(0x77dd55);break;
			}
		},
		createBox = function() {
			var box, material;
			material = Physijs.createMaterial(new THREE.MeshLambertMaterial({ map: loader.load( '/assets/textures/wood.jpg' ) }),.6,.3);
			//material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/rocks.jpg' ) });
			box = new Physijs.BoxMesh( box_geometry, material );
			box.collisions = 0;
			box.castShadow = true;
			box.addEventListener( 'collision', handleCollision );
			box.addEventListener( 'ready', spawnBox );
			box.position.set(0,5,0)
			scene.add( box );
		};
	return function() {setTimeout( createBox, 1000 );	};
})();


// ===== terrain ===== //
// terrain
export class Terrain {
	constructor (options) {
		if(!options){options={}}
		
		var noise = 3;
		// Ground
		NoiseGen = new SimplexNoise();
		var ground_materialo =  getMaterial({
			type:'standard',
			color: 0x888888,
			//transparent:true,
			//opacity:0.9,
			side:0,
			map:'/assets/textures/grass.png',
			repeat:[6,6]
		});
		
		var ground_material = Physijs.createMaterial( ground_materialo,
			0.2, // high friction
			0.3  // low restitution (bounce)
		);
		ground_geometry = new THREE.PlaneGeometry( 200, 200, 50, 50 );
		for ( var i = 0; i < ground_geometry.vertices.length; i++ ) {
			var vertex = ground_geometry.vertices[i];
			vertex.z = NoiseGen.noise2D( vertex.x / 10, vertex.y / 10 ) * noise;
		}
		ground_geometry.computeFaceNormals();
		ground_geometry.computeVertexNormals();
		
		
		// If your plane is not square as far as face count then the HeightfieldMesh
		// takes two more arguments at the end: # of x faces and # of y faces that were passed to THREE.PlaneMaterial
		ground = new Physijs.HeightfieldMesh( ground_geometry, ground_material, 0, 50, 50 );
		ground.rotation.x = Math.PI / -2;
		ground.receiveShadow = true;
		scene.add( ground );
	}
}

					 
// ===== Player ===== //
// Player
export class Player {
	constructor (options) {
		if(!options){options={}}
		
		var  thematerial = Physijs.createMaterial( new THREE.MeshBasicMaterial({ color:'white', opacity:0.0, transparent:true}), 1, 0, 1000)
		//dolly = new THREE.Group();
		
		if(floor){ dolly = new Physijs.BoxMesh(new THREE.BoxGeometry( 2, 0.01, 2 ),thematerial ); }
		else     { dolly = new THREE.Mesh(new THREE.BoxGeometry( 2, 0.01, 2 ),thematerial ); }
		dolly.position.set( 0, 0.01, 1 );

		if(options.position){
			var p = options.position
			dolly.position.set( p[0],0,p[2] );
		}
		
		dolly.add( camera );
		scene.add( dolly );
		//dolly.position.set( 0,8,0 );

		scene.add(cameraGroup);
		var ground_material = Physijs.createMaterial( new THREE.MeshStandardMaterial(),
			1, // high friction
			0 // low restitution
		);
		// add head
		 head = new THREE.Mesh( new THREE.OctahedronGeometry( 0.1, 2 ), ground_material, 1 );
		//head.castShadow = true;
		camera.add( head );
		
	}
}

var overlaytext;
var overlays = [];
// Overlay
export class Overlay {
	constructor (options) {
		//newText(options)
		this._font 	=  '/assets/fonts/helvetiker_bold.json';
		this._text 	=  options.text;
		this._size 	=  options.size || 0.3;

		var sdfg =	newText(this._font, this._text, this._size)
		console.log(sdfg)
		var thisOverlay = this;
		thisOverlay.object = overlaytext
	}
			
			text(e){
				//console.log(this.object)
				//console.log(e)
				//console.log(this)
				//console.log(overlays)
				camera.remove(this.object)
				overlays.forEach(function(model, i) {
					//console.log(model,i)
					camera.remove(overlays[i]);
				});
				newText(this._font, e, this._size)
			}
}
function newText(thefont,text,size){
	
	var thetextobj;
	const font = new THREE.FontLoader();
	font.load( '/assets/fonts/helvetiker_bold.json', function ( font ) {
		const textGeo = new THREE.TextBufferGeometry( text, {
			font: font,
			size: size,
			height: 0.1,
			//curveSegments: segments,
			//bevelEnabled: b,
			bevelThickness: 0.1,
			bevelSize: 0.02,
			bevelOffset:0.01,
			bevelSegments:3,
		});
		textGeo.computeBoundingBox();
		const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		material = new THREE.MeshPhongMaterial({
			//specular: specular,
			color:'black',
			transparent:true,
			opacity:1
		});
		overlaytext = new THREE.Mesh( textGeo, material );
		//text.castShadow 	= true;
		//text.receiveShadow 	= false;
		
		// if 'href' exists, make it clickable
		if (overlaytext.href){ mainmenu.add(overlaytext); }
		else          { scene.add(overlaytext);    }
		//text.rotation.set(r[0],r[1],r[2])
		overlaytext.position.set(centerOffset + 0 , 0,-3)
		//
		camera.add(overlaytext)
		overlays.push(overlaytext)
	});
	return thetextobj;
}
var	chair_material,ground_material,ground
var spawnChair
// Chairs
export class Chairs {
	constructor (options) {
		loader = new THREE.TextureLoader();
		chair_material = Physijs.createMaterial( new THREE.MeshLambertMaterial({ map: loader.load( '/assets/textures/wood.jpg' ) }),.6,.9);
		chair_material.map.wrapS = chair_material.map.wrapT = THREE.RepeatWrapping;
		chair_material.map.repeat.set( .25, .25 );
		spawnChair();
	}
}

spawnChair = (function() {
	var buildBack, buildLegs, doSpawn;
	
	buildBack = function() {
		var back, _object;
		   back = new Physijs.BoxMesh(new THREE.BoxGeometry( 5, 1, .5 ),chair_material);back.position.y = 5;back.position.z = -2.5;back.castShadow = true;back.receiveShadow = true;// rungs - relative to back
		_object = new Physijs.BoxMesh(new THREE.BoxGeometry( 1, 5, .5 ),chair_material);_object.position.y = -3;_object.position.x = -2;_object.castShadow = true;_object.receiveShadow = true;back.add( _object );
		_object = new Physijs.BoxMesh(new THREE.BoxGeometry( 1, 5, .5 ),chair_material);_object.position.y = -3;_object.castShadow = true;_object.receiveShadow = true;back.add( _object );
		_object = new Physijs.BoxMesh(new THREE.BoxGeometry( 1, 5, .5 ),chair_material);_object.position.y = -3;_object.position.x = 2;_object.castShadow = true;_object.receiveShadow = true;back.add( _object );
		return back;
	};
	buildLegs = function() {
		var leg, _leg;
		 leg = new Physijs.BoxMesh(new THREE.BoxGeometry( .5, 4, .5 ),chair_material);leg.position.x = 2.25;  leg.position.z = -2.25; leg.position.y    = -2.5; leg.castShadow = true;leg.receiveShadow = true;// back left
		_leg = new Physijs.BoxMesh(new THREE.BoxGeometry( .5, 4, .5 ),chair_material);_leg.position.x = -4.5;_leg.castShadow = true; _leg.receiveShadow = true; leg.add( _leg );// front left - relative to back left le
		_leg = new Physijs.BoxMesh(new THREE.BoxGeometry( .5, 4, .5 ),chair_material);_leg.position.z = 4.5; _leg.castShadow = true; _leg.receiveShadow = true; leg.add( _leg ); // front left - relative to back left leg
		_leg = new Physijs.BoxMesh(new THREE.BoxGeometry( .5, 4, .5 ),chair_material);_leg.position.x = -4.5;_leg.position.z = 4.5;  _leg.castShadow    = true;_leg.receiveShadow = true;leg.add( _leg );  // front right - relative to back left leg
		return leg;
	};
	
	doSpawn = function() {
		var chair;
		// seat of the chair
		chair = new Physijs.BoxMesh(new THREE.BoxGeometry( 5, 1, 5 ),chair_material);
		chair.castShadow = true;
		chair.receiveShadow = true;
		chair.add( buildBack() ); // back - relative to chair ( seat )
		chair.add( buildLegs() ); // legs - relative to chair ( seat )
		chair.position.set(Math.random() * 50 - 25, 100, Math.random() * 50 - 25);
		chair.rotation.set(Math.random() * Math.PI * 2,Math.random() * Math.PI * 2,Math.random() * Math.PI * 2);
		chair.addEventListener( 'ready', spawnChair );
		scene.add( chair );
	};
	
	return function() {setTimeout( doSpawn, 1000 );};
})();

// Gamepad
export class Gamepad {
	constructor (options) {
		if(!options){options={}}
		// console.log(options.buttons)
		var t = options.type;
		this.type = t;
		this.style = options.style || 'oculus';

		// touch gamepad
		if (this.type == 'touch'){
			controls.enabled = false;
			// joysticks
			if (this.style == 'xbox'){

			// create html elements
			var joyRow = document.createElement("div");
			joyRow.setAttribute("id", "row");
			document.body.appendChild(joyRow);

			var joy1 = document.createElement("div");
			joy1.setAttribute("id", "joy1Div");
			joyRow.appendChild(joy1);
			Joy1 = new JoyStick('joy1Div');

			var joy2 = document.createElement("div");
			joy2.setAttribute("id", "joy2Div");
			joyRow.appendChild(joy2);
			Joy2 = new JoyStick('joy2Div', { "title": "joystick2",/* "autoReturnToCenter": false */});

			
			// create html elements
			var buttonGroupL = document.createElement("div");
			buttonGroupL.setAttribute("id", "buttonGroupL");
			document.body.appendChild(buttonGroupL);

			var buttonGroupR = document.createElement("div");
			buttonGroupR.setAttribute("id", "buttonGroupR");
			document.body.appendChild(buttonGroupR);

	
			
			var Abutton = document.createElement("div");
			Abutton.setAttribute("id", "a"); Abutton.innerHTML = "A";
			
			var Bbutton = document.createElement("div");
			Bbutton.setAttribute("id", "b"); Bbutton.innerHTML = "B";
			
			buttonGroupR.appendChild(Bbutton);
			buttonGroupR.appendChild(Abutton);
			
			var Xbutton = document.createElement("div");
			Xbutton.setAttribute("id", "x"); Xbutton.innerHTML = "X";
			
			var Ybutton = document.createElement("div");
			Ybutton.setAttribute("id", "y"); Ybutton.innerHTML = "Y";
			
			buttonGroupL.appendChild(Ybutton);
			buttonGroupL.appendChild(Xbutton);

				
				
				/*
				// create html elements
			 var dpadRow = document.createElement("div");
				dpadRow.setAttribute("class", "dpadRow");
			 document.body.appendChild(dpadRow);

				
				
				
				var dpad = document.createElement("div");
				dpad.setAttribute("id", "dpad");
				document.body.appendChild(dpad);

				var dpad_up = document.createElement("div");
				dpad_up.setAttribute("id", "d_up"); dpad_up.innerHTML = '<i class="fas fa-caret-up"></i>';
				dpad.appendChild(dpad_up);

				var dpad_left = document.createElement("div");
				dpad_left.setAttribute("id", "dpad_left"); dpad_left.innerHTML = '<i class="fas fa-caret-left"></i>';
				dpadRow.appendChild(dpad_left);

				var dpad_right = document.createElement("div");
				dpad_right.setAttribute("id", "dpad_right"); dpad_right.innerHTML = '<i class="fas fa-caret-right"></i>';
				dpadRow.appendChild(dpad_right);

				
				dpad.appendChild(dpadRow);
				
				
				
				var dpad_down = document.createElement("div");
				dpad_down.setAttribute("id", "dpad_down"); dpad_down.innerHTML = '<i class="fas fa-caret-down"></i>';
				dpad.appendChild(dpad_down);

				*/
			// event listeners
			$(Abutton).on('touchstart mousedown', function(e){ console.log('clicked A'); fullGamepad.button.a = 1;  $(this).css('box-shadow','0px 0px 10px #222') }).on('touchend mouseup', function(e){ console.log('release A'); fullGamepad.button.a = 0; $(this).css('box-shadow', 'none') }).on('touchmove scroll', function(e){ e.preventDefault(); e.stopPropagation()});
			$(Bbutton).on('touchstart mousedown', function(e){ console.log('clicked B'); fullGamepad.button.b = 1;  $(this).css('box-shadow','0px 0px 10px #222') }).on('touchend mouseup', function(e){ console.log('release B'); fullGamepad.button.b = 0; $(this).css('box-shadow', 'none') }).on('touchmove scroll', function(e){ e.preventDefault(); e.stopPropagation()});
			$(Xbutton).on('touchstart mousedown', function(e){ console.log('clicked X'); fullGamepad.button.x = 1;  $(this).css('box-shadow','0px 0px 10px #222') }).on('touchend mouseup', function(e){ console.log('release X'); fullGamepad.button.x = 0; $(this).css('box-shadow', 'none') }).on('touchmove scroll', function(e){ e.preventDefault(); e.stopPropagation()});
			$(Ybutton).on('touchstart mousedown', function(e){ console.log('clicked Y'); fullGamepad.button.y = 1;  $(this).css('box-shadow','0px 0px 10px #222') }).on('touchend mouseup', function(e){ console.log('release Y'); fullGamepad.button.y = 0; $(this).css('box-shadow', 'none') }).on('touchmove scroll', function(e){ e.preventDefault(); e.stopPropagation()});
			
			//Joy2 = new JoyStick('joy2Div', { "title": "joystick2",/* "autoReturnToCenter": false */});

			}
			touchGamepad = true

		}
		else{
			//this.controller = [{},{}]
			//console.log(options.bind)
			// controllers
			controller[0] = renderer.xr.getController(0);
			controller[0].addEventListener( 'connected', (e) => {
				//console.log( e.data.handedness );
				controller[0].gamepad = e.data.gamepad;
			 });
			controller[0].addEventListener( 'disconnected', function () { this.remove( this.children[ 0 ] ); } );
			//dolly.add( controller ).add( controller1 );
			this.left = controller[0];
			controller[1] = renderer.xr.getController(1);
			controller[1].addEventListener( 'connected', (e) => {
				//console.log( e.data.handedness );
				controller[1].gamepad = e.data.gamepad;
			});
			//controller[0].addEventListener( 'selectstart', onSelectStart )
			//controller[0].addEventListener( 'selectend', onSelectEnd );
			//controller[0].addEventListener( 'selectstart', vibrateL );
			//this.controller[0] = controller[0]
			//controller[1].addEventListener( 'selectstart', vibrateR);
			//controller[1].addEventListener( 'selectend', onSelectEnd );
			controller[1].addEventListener( 'squeezestart', function ( event ) {
				
				/*spawnBox()*/} );
			
			this.right = controller[1];
			// this.controller[1] = controller[1]
			controller[1].addEventListener( 'disconnected', function () { this.remove( this.children[ 0 ] ); } );
			dolly.add( controller[0] )
			dolly.add( controller[1] );
			var controllerGrip = renderer.xr.getControllerGrip( 0 );
			controllerGrip.add( new XRControllerModelFactory().createControllerModel( controllerGrip ) );
			var controllerGrip1 = renderer.xr.getControllerGrip( 1 );
			controllerGrip1.add( new XRControllerModelFactory().createControllerModel( controllerGrip1 ) );
			dolly.add( controllerGrip );
			dolly.add( controllerGrip1 );
		}
	}
	
	vibrate(i,l){
		// console.log('asdf')
		if(controller[0].gamepad){ controller[0].gamepad.hapticActuators[ 0 ].pulse( i, l ) }
		if(controller[1].gamepad){ controller[1].gamepad.hapticActuators[ 1 ].pulse( i, l ) }
	}
	//gamepad.hapticActuators[ 0 ].pulse( 1, 100 );
	//raycaster = new THREE.Raycaster();
}


function handleCollisions(e){
			//console.log(e)
			
	intersecting = []
// find what user is pointing at
tempMatrix.identity().extractRotation( e.matrixWorld );
raycaster.ray.origin.setFromMatrixPosition( e.matrixWorld );
raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
	var intersects = raycaster.intersectObjects( mainmenu.children );
			//console.log(intersects)
//console.log(mainmenu.children )
			
	
	
//	mainmenu.children.forEach( model => {
		mainmenu.children.forEach(function(model, i) {

		if(mainmenu.children[i].type == 'PlaneGeometry'){
		//intersects[0].object.material.color = {b: 1, g: 1, r: 1};
		//console.log(scene.children[i])
		//mainmenu.children[i].material.color.set(mainmenu.children[i].color);
		//intersects[0].object.material.color = {b: 1, g: 0, r: 0};
		}
		//if (model.geometry.type == "PlaneGeometry"){
			//console.log("ya")
		//	console.log(model.geometry)
			
			
	//	}
			
		//model.visible = false;
		//hand2.add( model );
	} );
	
	
	
			
//var intersects = raycaster.intersectObjects( scene.children );
if ( intersects.length > 0 ) {
	
	intersectedObject 	= intersects[0].object;
	intersectedPosition = intersects[0].point;
	intersecting 		= intersects[0].object;
	
	if(hovering.length > 1){
		hovering[0].scale.y = 1;
		mainmenu.children.forEach(element => element.scale.y = 1);
	//	mainmenu.children.forEach(element => element.material.emissive = {b: 1, g: 1, r: 1});
		hovering[0].material.color = {b: 1, g: 1, r: 1}
		hovering = [];
	}
	if (hovering.indexOf(intersecting) === -1) {
		intersectedObject.scale.y = 1.1;
	//	intersectedObject.material.emissive = {b: 1, g: 0, r: 0}
		intersectedObject.material.color = {b: 0, g: 0, r: 1};
		if (pointingController.gamepad){
			pointingController.gamepad.hapticActuators[ 0 ].pulse(0.3, 30 )
		}
		hovering.push(intersectedObject);
	}
	else {
		//console.log(hovering)
	}
}
else {
	if(hovering.length > 0){
		hovering[0].scale.y = 1;
	//	hovering[0].material.emissive = {b: 0, g: 0, r: 0};
		// controller[0].gamepad.hapticActuators[ 0 ].pulse( 1, 100 )
	}
	//mainmenu.children.forEach(function(model, i) {
	//	model.material.color = {b: 1, g: 1, r: 1}
	//})
	hovering = [];
	intersectedObject = undefined;
}
	//console.log(intersecting)
			 
}
// Camera
export class Camera {
	constructor (options) {
		if(!options){options={}}
		this.fps 	= options.fps 	|| 60;
		this.fov 	= options.fov 	|| 70;
		this.near 	= options.near 	|| 0.01;
		this.far 	= options.far 	|| 10000;
		camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth /
		window.innerHeight, this.near, this.far );
		this.object = camera;
		objects.push(this);
		//camera.position.y = 10;
		//camera.position.set( 0,9,0 );
  }
}
// Radial Menu
export class Radial {
	constructor (options) {
		if(!options){options={}}
		this._scale 		= options.scale || 1;
		this._color 		= options.color || 0xff0000;
		this._side 		= options.side 		|| 2;
		this._blend 		= options.blend	|| "normal";
		this._position	= options.position	|| [0,0,0];
		this._rotation	= options.rotation	|| [0,0,0];
		this._name 		= options.name 		|| null;
		this._material 	= options.material 	|| "standard";
		this._reflect 	= options.reflect 	|| 1;
		this._helper 	= options.helper 	|| false;
		this._physics 	= options.physics 	|| true;
		this._bounce 	= options.bounce 	|| 0.8;
		this._friction 	= options.physics 	|| 0.3;
		var numberOfOptions = options.options.length
		var rot = this._rotation
		
		// thetaStart,thetaLength
		for (let i = 0; i < numberOfOptions; i ++) {
			var thematerial =  getMaterial({
				side: this._side,
				type: this._material,
				color: Math.random() * 0xffffff,
				map: options.map,
			});
		
			const geometry = new THREE.CircleGeometry(0.2, 32,((Math.PI * 2)/numberOfOptions) * (i), (Math.PI * 2) / numberOfOptions);
			var circlePart = new THREE.Mesh( geometry, thematerial );
			// circlePart.rotation.set(rot[0],rot[1],rot[2])
			circlePart.position.set(0,1,-2)
			mainmenu.add(circlePart)
		}
	}
}
// Triangle
export class Triangle {
	constructor (options) {
		if(!options){options={}}
		var sf = options;
		this._scale 	= options.scale 	|| 1;
		this._color 	= options.color 	|| 0xffffff;
		this._side 		= options.side 		|| 2;
		this._blend 	= options.blend		|| "normal";
		this._position	= options.position	|| [0,1,0];
		this._rotation	= options.rotation	|| [0,0,0];
		this._name 		= options.name 		|| null;
		this._material 	= options.material 	|| "standard";
		this._reflect 	= options.reflect 	|| 1;
		this._helper 	= options.helper 	|| false;
		this._radius 	= options.radius 	|| false;
		this._physics = options.physics || true;
		this._bounce = options.bounce || 0.8;
		this._friction = options.physics || 0.3;
		var p = this._physics;
		var r = this._radius;
		var o = options.opacity || 0;
		var clearcoat = options.clearcoat || 1;
		const geometry = new THREE.CircleGeometry(r, 0 );
		
		var thematerial =  getMaterial({
			side: this._side,
			type: this._material,
			color: this._color,
			map: options.map,
		});
		
		var circlef;
		if (p){ circlef = new Physijs.ConvexMesh( geometry, Physijs.createMaterial( thematerial, this._friction, this._bounce ),1 ); }
		else  { circlef = new THREE.Mesh( geometry, thematerial ); }
		
		circlef.castShadow 	= true;
		circlef.receiveShadow 	= false;
		circlef.position.set(...this._position)
		scene.add(circlef);
  }
}
/* ===== GEOMETRY ===== */
			 
// Sphere
export class Sphere {
	constructor (options) {
		if(!options){options={}}
		this._scale 	= options.scale 	|| 1;
		this._radius 	= options.radius 	|| 1;
		this._segments 	= options.segments 	|| [32,32];
		this._color 	= options.color 	|| 0xffffff;
		this._reflect  	= options.reflect 	|| 1;
		this._position 	= options.position 	|| [0,0,0];
		this._rotation	= options.rotation	|| [0,0,0];
		this._material 	= options.material 	|| 'physical';
		this._opacity 	= options.opacity 	|| 1;
		this._map 		= options.map 		|| null;
		this._physics 	= options.physics 	|| true;
		this._bounce 	= options.bounce 	|| 1;
		this._friction 	= options.friction 	|| 1;
		var p = this._physics;
		//var geometry = new THREE.CylinderGeometry( this._radius[0],this._radius[1], this._height, 32, 1, true);
		var messh
		var rot = this._rotation;
		var scale = this._scale

		
		material =  getMaterial({
			type	:this._material,
			color	:this._color,
			opacity	:this._opacity,
			side	:0,
			map		:this._map,
			position:this._position,

		})
	 // var geometry = new THREE.CylinderGeometry(1, 1, 2, 32, 1, true);

	//  if (options.map){
	//  material = new THREE.MeshBasicMaterial({
  //map: new THREE.TextureLoader().load("https://threejs.org/examples/textures/758px-Canestra_di_frutta_(Caravaggio).jpg")
//	  });}

	  var radius;
	  var r = this._radius;
	  if (r.length){ radius = r[0]; }
	  else 		   { radius = r;    }
	  var segments = [10,10];
	  
	  var s = this._segments;
	  if (s.length){ segments = s;   }
	  else 		   { segments =[s,s];}

	  var m = new THREE.SphereGeometry( radius, segments[0],  segments[1] )
		
		if (p){ messh = new Physijs.SphereMesh( m, Physijs.createMaterial( material, this._friction, this._bounce ) ) }
		else  { messh = new THREE.Mesh( m, material ) }
	//  obj.add(messh)
		//var s = this._scale;
		//if (scale.length){ messh.scale.set(...scale ); }
		//else 		 { messh.scale.set(scale,scale,scale); }
		messh.rotation.set(rot[0],rot[1],rot[2])
		//messh.position.set(...[0,4,0]);
		messh.position.set(this._position[0],this._position[1],this._position[2]);
		messh.receiveShadow = false;
		messh.castShadow = true;
		scene.add( messh );
		
		
		if (this._material == 'mirror'){ mirrorObjects.push(messh)
		}
	}
}


function loadSound(src) {
	//	var mydata = JSON.parse(basketball);
	//console.log(basketball.sounds[0])
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
			
	this.play = function(){
		this.sound.play();
	}
	this.stop = function(){
		this.sound.pause();
	}
}

// Collisions
export class Collisions {
			
	constructor (options) {
		
		basketball.sounds.forEach(element => console.log(element));

		var sound0 =	new loadSound('/assets/audio/basketball/bounce_0.mp3')
		var sound1 =	new loadSound('/assets/audio/basketball/bounce_1.mp3')
		var sound2 =	new loadSound('/assets/audio/basketball/bounce_2.mp3')
		var sound3 =	new loadSound('/assets/audio/basketball/bounce_3.mp3')
		var sound4 =	new loadSound('/assets/audio/basketball/bounce_4.mp3')
		var sound5 =	new loadSound('/assets/audio/basketball/bounce_5.mp3')
		var sound6 =	new loadSound('/assets/audio/basketball/bounce_6.mp3')
		// Loader
		loader = new THREE.TextureLoader();
	
		spawnBox();
		// requestAnimationFrame( render );
		scene.simulate();
		spawnBox = (function() {
			var box_geometry = new THREE.BoxGeometry( 1,1,1 ),
				handleCollision = function( collided_with, linearVelocity, angularVelocity ) {
				//	console.log(collided_with, linearVelocity, angularVelocity)
					switch ( ++this.collisions ) {
						case 1:this.material.color.setHex(0xcc8855);console.log('first'); sound0.play(); break;
						case 2:this.material.color.setHex(0xbb9955); sound1.play(); break;
						case 3:this.material.color.setHex(0xaaaa55); sound2.play(); break;
						case 4:this.material.color.setHex(0x99bb55); sound3.play(); break;
						case 5:this.material.color.setHex(0x88cc55); sound4.play(); break;
						case 6:this.material.color.setHex(0x77dd55); sound5.play(); break;
					}
				},
				createBox = function() {
					var box, material;
					material = Physijs.createMaterial( new THREE.MeshLambertMaterial({ map: loader.load( '/assets/textures/wood.jpg' ) }), .6, .9 );
					//material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/rocks.jpg' ) });
					box = new Physijs.BoxMesh( box_geometry, material );
					box.collisions = 0;
					box.castShadow = true;
					box.addEventListener( 'collision', handleCollision );
					box.addEventListener( 'ready', spawnBox );
					box.position.set(0,5,0)

					scene.add( box );
				};
			return function() { setTimeout( createBox, 1000 ); };
		})();
		
	}

}

// ===== Animations ===== //

// Animate
export class Animate {
			
	constructor (options) {
		// console.log(options.at)
		animationOn = true;
		var targetObject = options.at.object || options.at;
		var y		= options.yoyo;
		var r		= options.repeat	|| 0;
		var del		= options.delay		|| 0;
		var p		= options.position;
		var dur		= options.duration;
		var col		= options.color		|| null;
		var type	= options.type		|| 'absolute';
		
		// easing
		var dir 	= options.direction	|| 'inout';
		var ease 	= options.ease 		|| 'linear';
		var e		= getEase(ease, dir);
		
		var linearVelocity  = new THREE.Vector3();
		var angularVelocity = new THREE.Vector3();

		var anim;
		
		// if custom shadows exist
		var shad  = options.at.shadow
		var shad1 = options.at.shadowblack
		
		// opacity
		if (options.opacity != undefined){

			new TWEEN.Tween(targetObject.material).to({ opacity:options.opacity	}, dur)
			.repeat(r)
			.easing(e)
			.yoyo(y)
			.delay(del)
			.start();
			
			// if custom shadows...
			if(shad){ new TWEEN.Tween(shad).to({opacity:options.opacity	}, dur).repeat(r).yoyo(y).delay(del).start();}
			if(shad1){ new TWEEN.Tween(shad1).to({ opacity:options.opacity }, dur).repeat(r).easing(e).yoyo(y).delay(del).start(); /* console.log(shad) //shad.visible = true //shad.color = 'green' */ }
		}
		
		// color
		if (options.color  != null){
			var col = new THREE.Color(options.color);
			
			new TWEEN.Tween(targetObject.material.color)
			.to({r:col.r,g:col.g,b:col.b,},dur)
			.repeat(r)
			.easing(e)
			.yoyo(y)
			.delay(del)
			.start();
		
			// for custom shadows...
			if(shad){
			new TWEEN.Tween(shad.color).to({r:col.r,g:col.g,b:col.b,}, dur)
				.repeat(r)
				.yoyo(y)
				.delay(del)
				.start();
			//new TWEEN.Tween(shad1.color).to({r:col.r,g:col.g,b:col.b,}, dur).repeat(r).yoyo(y).start();
			}
			//	TweenLite.to(targetObject.material.color, dur, {r:col.r,g:col.g,b:col.b,});
		}
		// position
		 if (options.position != null) {
		
			 var newPos;
			 
			 if (type == 'absolute'){
				 newPos = {
					x: options.position.x,// || targetObject.position.x,
					y: options.position.y,// || targetObject.position.y,
					z: options.position.z,// || targetObject.position.z
				 }
			 }
			 else if (type == 'relative'){
				 newPos = {
					x:targetObject.position.x + options.position.x || 0,
					y:targetObject.position.y + options.position.y || 0,
					z:targetObject.position.z + options.position.z || 0
				 }
			 }
			 
			 // create animation
			 new TWEEN.Tween(targetObject.position)
			 .to(newPos, dur)
			 .repeat(r)
			 .easing(e)
			 .yoyo(y)
			 .onStart(updatePosition)
			 .onComplete(callbackPosition)
			 .delay(del)
			 .start()
		}
	
		// rotation
		 if (options.rotation != undefined){
			 new TWEEN.Tween( targetObject.rotation ).to( {
				 x: targetObject.rotation.x + options.rotation.x,
				 y: targetObject.rotation.y + options.rotation.y,
				 z: targetObject.rotation.z + options.rotation.z
			 }, dur )
			 .repeat(r)
			 .easing(e)
			 .yoyo(y)
			 .onStart(updateRotation)
			 .onUpdate()
			 .onComplete(callbackRotation)
			 .delay(del)
			 .start()
		}
		
		// scale
		if (options.scale != undefined){
			new TWEEN.Tween( targetObject.scale ).to( {
				x:targetObject.scale.x + options.scale.x,
				y:targetObject.scale.y + options.scale.y,
				z:targetObject.scale.z + options.scale.z
			}, dur )
			.repeat(r)
			.easing(e)
			.yoyo(y)
			//.onStart(updateRotation)
			.onUpdate()
			//.onComplete(callbackRotation)
			.delay(del)
			.start()
		}
		
		// update position
		function updatePosition(e){
			
			if(options.velocity){
				// console.log(e)
				
				if (type == 'absolute'){
					var calculate = positionVector1(e, options.position)/* = {
						x:((e.x + options.position.x) - e.x) / 1,
						y:((e.y + options.position.y) - e.y) / 1,//(e.y + options.position.y) + options.position.y,
						z:((e.z + options.position.z) - e.z) / 1 //((e.z + options.position.z) - e.y)  / 1//(e.z + options.position.z) + options.position.z,
					}*/
					// console.log(calculate)
					linearVelocity = calculate;
				}
				
				else if (type == 'relative'){
					var calculate = {
						x:options.position.x,
						y:options.position.y,//(e.y + options.position.y) + options.position.y,
						z:options.position.z //((e.z + options.position.z) - e.y)  / 1//(e.z + options.position.z) + options.position.z,
					}
					// console.log(calculate)
					linearVelocity = calculate;
				   }
			}
		}
		
		// update rotation
		function updateRotation(e){
			var calculate = {
				x:((e.x + options.rotation.x) - e.x) / 1,
				y:((e.y + options.rotation.y) - e.y) / 1,//(e.y + options.position.y) + options.position.y,
				z:((e.z + options.rotation.z) - e.z) / 1//(e.z + options.position.z) + options.position.z,
			}
			angularVelocity = calculate;
		}
		
		// position callback (apply linear velocity)
		function callbackPosition(e){
			targetObject.position.x = e.x;
			targetObject.position.y = e.y;
			targetObject.position.z = e.z;
			targetObject.__dirtyPosition = true;
			if (targetObject.setLinearVelocity){
				targetObject.setLinearVelocity(linearVelocity);
			}
		}
				
		// rotation callback (apply angular velocity)
		function callbackRotation(e){
			targetObject.rotation.x = e.x;
			targetObject.rotation.y = e.y;
			targetObject.rotation.z = e.z;
			targetObject.__dirtyRotation = true;
			if (targetObject.setAngularVelocity){
				targetObject.setAngularVelocity(angularVelocity);
			}
		}
			
	}
}
// ===== Polyhedrons ===== //

// Tetrahedron
export class Tetrahedron {
			
	constructor (options) {
		if(!options){options={}}
		this._scale 	= options.scale 	|| 1;
		this._color 	= options.color 	|| 0xff0000;
		this._side 		= options.side 		|| 2;
		this._blend 	= options.blend		|| "normal";
		this._opacity 	= options.opacity 	|| 1;
		this._map		= options.map		|| null;
		this._position	= options.position	|| [0,0,0];
		this._rotation	= options.rotation	|| [0,0,0];
		this._name 		= options.name 		|| null;
		this._material 	= options.material 	|| "standard";
		this._reflect 	= options.reflect 	|| 1;
		this._helper 	= options.helper 	|| false;
		this._physics	= options.physics	|| true;
		this._bounce	= options.bounce	|| 0.8;
		this._friction	= options.physics	|| 0.3;
		var p = this._physics;
		
		material =  getMaterial({
			type	: this._material,
			combine: 		THREE.MixOperation,
			reflectivity: 	this.reflect,
			color: 			this._color,
			side:			this._side,
			clearcoat:		1,
			metalness:		0,
			transparent:	true,
			opacity:		this._opacity,
			wireframe:		false,
			flatShading:	true,
			map		: this._map,
			position:this._position,
		});
		
		var geometry = new THREE.TetrahedronGeometry(s, s, s);
		
		var box;
		if (p){ box = new Physijs.ConvexMesh( geometry, Physijs.createMaterial( material, this._friction, this._bounce ) ); }
		else  { box = new THREE.Mesh( geometry, material ); }
		box.receiveShadow = false;
		box.castShadow = true;
		
		this.object = box;
		var pos = this._position;
		box.position.set(...pos);
		var s = this._scale;
		if (s.length){ box.scale.set(...s ); }
		else 		 { box.scale.set(s,s,s); }
		objects.push(this.object);
		scene.add(box);
		
	}
		  
}
function handleCollision( collided_with, linearVelocity, angularVelocity ) {
	console.log(collided_with);
	console.log(linearVelocity);
	console.log(angularVelocity);

	switch ( ++this.collisions ) {
		case 1:this.material.color.setHex(0xff8855);console.log('first');break;
		case 2:this.material.color.setHex(0xbb9955);break;
		case 3:this.material.color.setHex(0xaaaa55);break;
		case 4:this.material.color.setHex(0x99bb55);break;
		case 5:this.material.color.setHex(0x88cc55);break;
		case 6:this.material.color.setHex(0x77dd55);break;
	}
}
												  
// Box
export class Box {
			
	constructor (options) {
		if(!options){options={}}
		this._blend 	= options.blend		|| "normal";
		this._bounce	= options.bounce 	|| 0.5;
		this._color 	= options.color 	|| 0xffffff;
		this._friction 	= options.physics 	|| 0.3;
		this._helper 	= options.helper 	|| false;
		this._material 	= options.material 	|| "standard";
		this._map 		= options.map 		|| null;
		this._name 		= options.name 		|| null;
		this._opacity	= options.opacity 	|| 1;
		this._position	= options.position	|| [0,0,0];
		this._reflect 	= options.reflect 	|| 1;
		this._rotation	= options.rotation	|| [0,0,0];
		this._scale 	= options.scale 	|| 1;
		this._side 		= options.side 		|| 2;
		
		if(options.physics == false){this._physics = false} else {this._physics = true}
		var p = this._physics;
		
		var	material =  getMaterial({
			type:		this._material,
			color:		this._color,
			opacity:	this._opacity,
			map:		this._map,
			// bumpMap:	THREE.ImageUtils.loadTexture('/assets/map/egyptian_friz_2.png'),
			bumpScale:0.5,//:	this._opacity,
			side:		this._side,
			position:this._position,
		});
		
		// different on each side
		/*
		 let loader = new THREE.TextureLoader();
		 let materialArray = [
			 new THREE.MeshBasicMaterial( { map: loader.load("/assets/hardwood2_bump.jpg") } ),
			 new THREE.MeshBasicMaterial( { map: loader.load("/assets/hardwood2_bump.jpg") } ),
			 new THREE.MeshBasicMaterial( { map: loader.load("/assets/hardwood2_bump.jpg") } ),
			 new THREE.MeshBasicMaterial( { map: loader.load("/assets/hardwood2_bump.jpg") } ),
			 new THREE.MeshBasicMaterial( { map: loader.load("/assets/hardwood2_bump.jpg") } ),
			 new THREE.MeshBasicMaterial( { map: loader.load("/assets/hardwood2_bump.jpg") } ),
		 ];
		 let mesh = new THREE.Mesh( cubeGeometry, materialArray );
		 scene.add(mesh);
		 
		 */
		//var materialInner = new THREE.MeshBasicMaterial({
		//  map: new THREE.TextureLoader().load("https://threejs.org/examples/textures/758px-Canestra_di_frutta_(Caravaggio).jpg"),
		//  side: 2
		//});

	//	var thematerial =  getMaterial(this._material)//({color: options.color, clearcoat:1, reflectivity:1, metalness:0, transparent:true, opacity:0.8, wireframe:false, flatShading:true});//	light = new THREE.AmbientLight(0xffffbb, 1); break;
		//material = getMaterial(this._material, this._color,this._blend )//new thematerial ({color: this._color,/*combine:THREE.MixOperation,reflectivity: this.reflect,*/});
		//s = this._scale
		const geometry = new THREE.BoxGeometry(s, s, s);
		var box;
		
		if (p == undefined || p == true){ box = new Physijs.BoxMesh( geometry, Physijs.createMaterial( material, this._friction, this._bounce ) ); }
		else 		  { box = new THREE.Mesh( geometry, material ); }
		//box.receiveShadow = false;
		box.castShadow    = true;
		
		//this.object = box;
		// add helper XYZ arrows
		if (this._helper){
			var axesHelper = new THREE.AxesHelper( 4 );
			box.add( axesHelper );
		}
		
		box.position.set(...this._position);
		box.rotation.set(...this._rotation);

		// scale
		var s = this._scale;
		if (s.length){ box.scale.set(...s ); }
		else 		 { box.scale.set(s,s,s); }
		
		objects.push(this.object);
		scene.add(box);
		
	
		// custom shadow stuff...
		/*
		var geometryShadow = new THREE.PlaneBufferGeometry(100, 100 );
		geometryShadow.rotateX( - Math.PI / 2 );
		var planeMaterial = new THREE.ShadowMaterial();
		planeMaterial.opacity = this._opacity -0.5;
		planeMaterial.color = new THREE.Color(this._color);
		//planeMaterial.color = 'red';
		var shadowPlane = new THREE.Mesh( geometryShadow, planeMaterial );
		shadowPlane.position.y = 0.005;
		shadowPlane.receiveShadow = true;
		scene.add( shadowPlane );
		this.shadow = planeMaterial
		var planeMaterial1 = new THREE.ShadowMaterial();
		planeMaterial1.opacity = this._opacity;
		planeMaterial1.color = new THREE.Color(0x000000);
		// planeMaterial.color = 'red';
		var shadowPlane1 = new THREE.Mesh( geometryShadow, planeMaterial1 );
		shadowPlane1.position.y = 0.1;
		shadowPlane1.receiveShadow = true;//
		scene.add( shadowPlane1 );
		this.shadowblack = planeMaterial1
		scene.add(shadowPlane1);
		 */
		this.object = box;
		if (this._material == 'mirror'){ mirrorObjects.push(box); }
		
		box.addEventListener( 'collision', handleCollision );
		//box.addEventListener( 'ready', spawnBox );
		//new Geometry(options)

	}

}
												  
									  
// Avatar
var myAvatar
export class Avatar {
			
	constructor (options) {
		if(!options){options={}}
		// console.log(options.file);
		myAvatar = this
		this._file = options.file || '/assets/models/glb/Soldier.glb';
		
		var acts = this._actions
		var helper = options.helper || false;

		this._index = characters.length
		
		const loader = new GLTFLoader();
		loader.load(this._file, function ( gltf ) {

			model = gltf.scene;
			scene.add( model );

			model.traverse( function ( object ) { if ( object.isMesh ) object.castShadow = true; } );
			skeleton = new THREE.SkeletonHelper( model );
			skeleton.visible = true;
			scene.add( skeleton );
			// console.log(skeleton)
			
			
			myAvatar.skeleton = skeleton
			skeleton.bones.forEach( model => {
				
				//console.log(model.name)
				if(model.name == 'mixamorigLeftHand'){ model.position.set(0,0.1,-3) }
				if(model.name == 'mixamorigLeftHandRing1'){ }
				if(model.name == 'mixamorigLeftHandRing2'){ }
				if(model.name == 'mixamorigLeftHandRing3'){ }
				if(model.name == 'mixamorigLeftHandPinky1'){ }
				if(model.name == 'mixamorigLeftHandPinky2'){ }
			
	} );
			//var dfsg = skeleton.getBoneByName("mixamorigLeftForeArm")//.position.set(1,2,0)
			// console.log(model)
		} );
		
	}
}
									  
// Geometry
export class Geometry {
			
	constructor (options) {
		if(!options){options={}}
		var s = this._scale
		this._geometry = new THREE.BoxGeometry(s, s, s);
		//box.color('red')
	}
			
	// set or get color
	color(e) {
		if(e){ this._color = e; this.object.material.color = new THREE.Color(this._color); }
		else { return this.object.material.color}
	}
		
	hide(){ scene.remove(this.object) } // hide object
	show(){ scene.add   (this.object) } // show object
	
	// get functions
	getColor()		{ return this.object.material.color	} // get color
	getPosition()	{ return this.object.position		} // get position
	getQuaternion()	{ return this.object.quaternion		} // get quaternion
	getRotation()	{ return this.object.rotation		} // get rotation
	getScale()		{ return this.object.scale			} // get scale

	// set functions
	setColor		(e) { this._color = e;		this.object.material.color = new THREE.Color(this._color); 						} // set color
	setPosition		(e)	{ this._position = e; if ( Array.isArray( this._position) ) { this.object.position  .set(e[0],e[1],e[2]); } else { this.object.position .set(e.x,e.y,e.z); }this.object.__dirtyPosition = true; } // set position
	setQuaternion	(e) { this._quaternion = e;	this.object.quaternion.set(e[0],e[1],e[2]);										} // set quaternion
	setRotation		(e)	{ this._rotation = e;	this.object.rotation  .set(e[0],e[1],e[2]); this.object.__dirtyRotation = true; } // set rotation
	setScale		(e)	{ this._scale = e;		this.object.scale     .set(e[0],e[1],e[2]);										} // set scale

}

export class Cube extends Geometry {
	constructor(options) {
		if(!options){options={}}
		super(options);
		this._blend 	= options.blend		|| "normal";
		this._bounce	= options.bounce 	|| 0.5;
		this._color 	= options.color 	|| 0xffffff;
		this._friction 	= options.physics 	|| 0.3;
		this._helper 	= options.helper 	|| false;
		this._material 	= options.material 	|| "standard";
		this._map 		= options.map 		|| null;
		this._name 		= options.name 		|| null;
		this._opacity	= options.opacity 	|| 1;
		this._position	= options.position	|| [0,0,0];
		this._reflect 	= options.reflect 	|| 1;
		this._rotation	= options.rotation	|| [0,0,0];
		this._scale 	= options.scale 	|| 1;
		this._side 		= options.side 		|| 2;
		
		if(options.physics == false){this._physics = false} else {this._physics = true}
		var p = this._physics;

		var	material =  getMaterial({
			type:		this._material,
			color:		this._color,
			opacity:	this._opacity,
			map:		this._map,
			// bumpMap:	THREE.ImageUtils.loadTexture('/assets/map/egyptian_friz_2.png'),
			bumpScale:0.5,//:	this._opacity,
			side:		this._side,
			position:this._position,
		});
		var box;
		if (p == undefined || p == true){ box = new Physijs.BoxMesh( this._geometry, Physijs.createMaterial( material, this._friction, this._bounce ) ); }
		else 		  { box = new THREE.Mesh( this._geometry, material ); }
	  
		// scale
		var s = this._scale;
		if (s.length){ box.scale.set(...s ); }
		else 		 { box.scale.set(s,s,s); }
		
		scene.add(box);
		this.object = box;
	}
}
												  
// Octahedron
export class Octahedron extends Geometry{
			
	constructor (options) {
		if(!options){options={}} super(options);
		this._scale 	= options.scale 	|| 1;
		this._color 	= options.color 	|| 'red';
		this._side 		= options.side 		|| 2;
		this._blend 	= options.blend		|| "normal";
		this._opacity 	= options.opacity 	|| 1;
		this._map		= options.map		|| null;
		this._position	= options.position	|| [0,0,0];
		this._rotation	= options.rotation	|| [0,0,0];
		this._name 		= options.name 		|| null;
		this._material 	= options.material 	|| "standard";
		this._reflect 	= options.reflect 	|| 1;
		this._helper 	= options.helper 	|| false;
		this._bounce	= options.bounce	|| 0.8;
		this._friction	= options.physics	|| 0.3;
		if(options.physics == false){this._physics = false} else {this._physics = true}
		var p = this._physics;
		
		material =  getMaterial({
			type		: this._material,
			combine		: THREE.MixOperation,
			reflectivity: this.reflect,
			color		: this._color,
			side		: this._side,
			clearcoat	: 1,
			metalness	: 0,
			transparent	: true,
			opacity		: this._opacity,
			wireframe	: false,
			flatShading	: true,
			map			: this._map,
			position	: this._position,
		});
		var geometry = new THREE.OctahedronGeometry(s, s, s);
		
		var box;
		if (p){ box = new Physijs.ConvexMesh( geometry, Physijs.createMaterial( material, this._friction, this._bounce ) ); }
		else  { box = new THREE.Mesh( geometry, material ); }
		box.receiveShadow = false;
		box.castShadow = true;
		
		box.rotation.set(...this._rotation)

		this.object = box;
		var pos = this._position;
		box.position.set(...pos);
		var s = this._scale;
		if (s.length){ box.scale.set(...s ); }
		else 		 { box.scale.set(s,s,s); }
		objects.push(this.object);
		scene.add(box);
	}
		  
}

// Dodecahedron
export class Dodecahedron {
		   
   constructor (options) {
	   if(!options){options={}}
	   this._scale 		= options.scale 	|| 1;
	   this._color 		= options.color 	|| 0xff0000;
	   this._side 		= options.side 		|| 2;
	   this._blend 		= options.blend		|| "normal";
	   this._position	= options.position	|| [0,0,0];
	   this._rotation	= options.rotation	|| [0,0,0];
	   this._name 		= options.name 		|| null;
	   this._material 	= options.material 	|| "standard";
	   this._reflect 	= options.reflect 	|| 1;
	   this._helper 	= options.helper 	|| false;
	   this._physics 	= options.physics 	|| true;
	   this._bounce 	= options.bounce 	|| 0.8;
	   this._friction 	= options.physics 	|| 0.3;
	   
	   var p = this._physics;
	   
	   //var thematerial =  getMaterial(this._material,this._color,this._blend)
	   // material = thematerial;
	   // geometry = new THREE.ConeGeometry( this._height, this._radius, 32 );
	 // var thematerial =  getMaterial(this._material)

	   material =  getMaterial({
		   type			: this._material,
		   combine		: THREE.MixOperation,
		   reflectivity	: this.reflect,
		   color		: this._color,
		   side			: this._side,
		   map			: this._map,
		   position		: this._position,
	   });
	   var geometry = new THREE.DodecahedronGeometry();
	   
	   var box
	   if (p){ box = new Physijs.ConvexMesh( geometry, material ); }
	   else  { box = new THREE.Mesh( geometry, material ); }
	   box.receiveShadow = false;
	   box.castShadow = true;
	   this.object = box;
	   // position
	   var pos = this._position;
	   box.position.set(...pos);
	   box.rotation.set(...this._rotation)

	   // scale
	   var s = this._scale;
	   if (s.length){ box.scale.set(...s ); }
	   else 		{ box.scale.set(s,s,s); }
	   objects.push(this.object);
	   scene.add(box);

   }
}
		   

// Icosahedron
export class Icosahedron {
	constructor (options) {
		if(!options){options={}}
		this._scale 	= options.scale 	|| 1;
		this._color 	= options.color 	|| 0xff0000;
		this._side 		= options.side 		|| 2;
		this._blend 	= options.blend		|| "normal";
		this._opacity 	= options.opacity 	|| 1;
		this._position	= options.position	|| [0,0,0];
		this._rotation	= options.rotation	|| [0,0,0];
		this._name 		= options.name 		|| null;
		this._material 	= options.material 	|| "standard";
		this._reflect 	= options.reflect 	|| 1;
		this._helper 	= options.helper 	|| false;
		this._physics 	= options.physics 	|| true;
		this._bounce 	= options.bounce 	|| 0.8;
		this._friction 	= options.physics 	|| 0.3;
		var p = this._physics;
		
		material =  getMaterial({
			type		: this._material,
			combine		: THREE.MixOperation,
			reflectivity: this.reflect,
			color		: this._color,
			side		: this._side,
			clearcoat	: 1,
			metalness	: 0,
			transparent	: true,
			opacity		: this._opacity,
			wireframe	: false,
			map			: this._map,
		position:this._position,


			//flatShading:	true
		});
		var geometry = new THREE.IcosahedronGeometry(s, s, s);
		var box
		if (p){ box = new Physijs.ConvexMesh( geometry, material ); }
		else  { box = new THREE.Mesh( geometry, material );         }
		//box = new Physijs.ConvexMesh( geometry, material );
		box.receiveShadow = false;
		box.castShadow = true;
		
		this.object = box;
		var pos = this._position;
		box.position.set(...pos);
		
		box.rotation.set(...this._rotation)

		var s = this._scale;
		if (s.length){ box.scale.set(...s ); }
		else 		 { box.scale.set(s,s,s); }
		objects.push(this.object);
		scene.add(box);
	}
}
						 

// Torus
export class Torus {
			
	constructor (options) {
		if(!options){options={}}
		this._scale 	= options.scale 	|| 1;
		this._color 	= options.color 	|| 0xff0000;
		this._side 		= options.side 		|| 2;
		this._blend 	= options.blend		|| "normal";
		this._opacity 	= options.opacity 	|| 1;
		this._position	= options.position	|| [0,0,0];
		this._rotation	= options.rotation	|| [0,0,0];
		this._name 		= options.name 		|| null;
		this._material 	= options.material 	|| "standard";
		this._reflect 	= options.reflect 	|| 1;
		this._helper 	= options.helper 	|| false;
		this._physics 	= options.physics 	|| true;
		this._bounce 	= options.bounce 	|| 0.8;
		this._friction 	= options.physics 	|| 0.3;
		var p = this._physics;
		
		var s = options.segments || [8,6]
		material = new THREE.MeshLambertMaterial ({
			combine: 		THREE.MixOperation,
			reflectivity: 	this.reflect,
			color: 			this._color,
			side:			this._side,
			//clearcoat:	1,
			//metalness:	0,
			//transparent:	true,
			//opacity:		0.8,
			//wireframe:	false,
			//flatShading:	true
			position:this._position,
		});
		var geometry = new THREE.TorusGeometry( 10, 3, s[0], s[1] );
		var newmat = Physijs.createMaterial( material, this._friction, this._bounce );
		//const box = new Physijs.ConvexMesh( geometry, newmat );
		var box
		if (p){  box = new Physijs.ConvexMesh( geometry, material );
		} else { box = new THREE.Mesh( geometry, material ); }
		box.receiveShadow = false;
		box.castShadow = true;
		
		var pos = this._position;
		box.position.set(...pos);
		var s = this._scale;
		if (s.length){ box.scale.set(...s ); }
		else 		 { box.scale.set(s,s,s); }
		objects.push(this.object);this.object = box;
		scene.add(box);
	}
}

// TorusKnot
export class TorusKnot {
			
	constructor (options) {
		if(!options){options={}}
		this._scale 	= options.scale 	|| 0.9;
		this._color 	= options.color 	|| 0xff0000;
		this._side 		= options.side 		|| 2;
		this._blend 	= options.blend		|| "normal";
		this._opacity 	= options.opacity 	|| 1;
		this._position	= options.position	|| [0,6,0];
		this._rotation	= options.rotation	|| [0,0,0];
		this._name 		= options.name 		|| null;
		this._material 	= options.material 	|| "standard";
		this._reflect 	= options.reflect 	|| 1;
		this._helper 	= options.helper 	|| false;
		this._physics	= options.physics	|| true;
		this._bounce	= options.bounce	|| 0.8;
		this._friction	= options.physics	|| 0.3;
		
		var p = this._physics;
		var s = options.segments || [8,6]
		var w = options.wind || [3,2]
		material = new THREE.MeshLambertMaterial ({
			combine: 		THREE.MixOperation,
			reflectivity: 	this.reflect,
			color: 			this._color,
			side:			this._side,
			clearcoat:		1,
			metalness:		0,
			transparent:	true,
			opacity:		this._opacity,
			wireframe:		false,
			flatShading:	true
		});
		var geometry = new THREE.TorusKnotGeometry( 10, 3, s[0], s[1], w[0], w[1] );
		//Physjs.ConcaveMesh
		var toruos //= new Physijs.ConvexMesh( geometry, newmat,10 );
		if (p) {		var newmat = Physijs.createMaterial( material, this._friction, this._bounce );

			toruos = new Physijs.ConvexMesh( geometry, newmat );
			
		} else { toruos = new THREE.Mesh( geometry, material ); }
		//scene.add(toruos);
		toruos.receiveShadow = false;
		toruos.castShadow = true;
		//var pos = this._position;
		toruos.position.set(0,56,0);
		//var s = this._scale;
		//if (s.length){ toruos.scale.set(...s ); }
		//else 		 {
	
		
	//}
		//objects.push(this.object);
		this.object = toruos;
		scene.add(toruos);
	}
		  
}

// Cylinder
export class Cylinder {
	constructor (options) {
		if(!options){options={}}
		this._scale 	= options.scale 	|| 1;
		this._color 	= options.color 	|| 0xffffff;
		this._side 		= options.side 		|| "both";
		this._blend 	= options.blend		|| "normal";
		this._position	= options.position	|| [0,0,0];
		this._rotation	= options.rotation	|| [0,0,0];
		this._name 		= options.name 		|| null;
		this._material 	= options.material 	|| "standard";
		this._map		= options.map		|| null;
		this._reflect 	= options.reflect 	|| 1;
		this._helper 	= options.helper 	|| false;
		this._height 	= options.height 	|| 1;
		this._radius 	= options.radius 	|| [1,1];
		this._cap 		= options.cap		|| false;
		this._cap = !this._cap;
		var geometry = new THREE.CylinderGeometry( this._radius[0],this._radius[1], this._height, 32, 1, this._cap);
		this._physics = options.physics || true;
		this._bounce = options.bounce || 0.8;
		this._friction = options.physics || 0.3;
		
		var p = this._physics;
		var obj = new THREE.Group();
		var rot = this._rotation;
		var scale = this._scale

		material =  getMaterial({
			type	: this._material,
			color	: this._color,
			opacity	: this._opacity,
			side	: 2,
			map		: this._map,
			position:this._position,
		});
		var materialOuter;
		var meshOuter = new THREE.Mesh(geometry, material);
		
		materialOuter = new THREE.MeshStandardMaterial({
			//map: new THREE.TextureLoader().load(options.map),
			//side: this._side,openEnded:false
			type	: this._material,
			color	: this._color,
			opacity	: this._opacity,
			side	: 2,
			map		: this._map
		});
		var materialInner = new THREE.MeshPhysicalMaterial({
			//map: new THREE.TextureLoader().load(options.map),
			//side:THREE.DoubleSide,
			reflect:1,
			clearcoat:1,
			color:'#222222',
		});
		
		if (p){ meshOuter = new Physijs.CylinderMesh(geometry, Physijs.createMaterial( material, this._friction, this._bounce )); }
		else  { meshOuter = new THREE.Mesh(geometry, materialOuter);  }
	//
var meshInner = new THREE.Mesh(geometry, materialInner);
meshOuter.add(meshInner);
		meshOuter.position.set(...this._position)
		meshOuter.rotation.set(...this._rotation)
		meshOuter.castShadow 	= true;
		meshInner.castShadow 	= true;
		

		scene.add(meshOuter);
		
		//meshOuter.receiveShadow 	= false;
		//spawnBox()
	}
}
				 
// Cone
export class Cone {
	constructor (options) {
		if(!options){options={}}
		this._scale 	= options.scale 	|| 0.5;
		this._color 	= options.color 	|| 0xffffff;
		this._side 		= options.side 		|| "both";
		this._material 	= options.material 	|| "standard";
		this._position 	= options.position 	|| [0,0,0];
		this._rotation 	= options.rotation 	|| [0,0,0];
		this._radius 	= options.radius 	|| 1;
		this._height 	= options.height 	|| 1;
		this._opacity 	= options.opacity 	|| 1;
		this._map 		= options.map 		|| null;
		this._physics	= options.physics	|| true;
		this._bounce	= options.bounce	|| 0.8;
		this._friction	= options.physics	|| 0.3;
		
		var p = this._physics;
		var pos = this._position

		//ConeGeometry(radius : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
		//var thematerial =  getMaterial(this._material,this._color,this._blend)
		 //material = new thematerial ({color:this._color,side:2});
		var geometry = new THREE.ConeGeometry(  this._radius, this._height,32 );
		geometry
		var	material =  getMaterial({
			type		:this._material,
			color		:this._color,
			opacity		:this._opacity,
			reflect		:1,
			clearcoat	:1,
			metalness	:0,
			map			:this._map,
			position	:this._position,

			//anisotropy :29
		});
		var cone;
		if (p){ cone = new Physijs.ConeMesh( geometry, Physijs.createMaterial( material, this._bounce, this._friction ) ); }
		else  { cone = new THREE.Mesh( geometry, material ); }
		
		cone.receiveShadow = true;
//console.log(thematerial)
		cone.rotation.set(...this._rotation)
		cone.position.set(...pos)
		
		cone.castShadow 	= true;
		cone.receiveShadow 	= false;
		scene.add( cone );
		
	}
			
}
// Circle
export class Circle {
	constructor (options) {
		if(!options){options={}}
		var sf = options;
		this._scale 	= options.scale 	|| 1;
		this._color 	= options.color 	|| 0xffffff;
		this._side 		= options.side 		|| 2;
		this._blend 	= options.blend		|| "normal";
		this._position	= options.position	|| [0,1,0];
		this._rotation	= options.rotation	|| [0,0,0];
		this._name 		= options.name 		|| null;
		this._material 	= options.material 	|| "standard";
		this._map 		= options.map 		|| null;
		this._reflect 	= options.reflect 	|| 1;
		this._helper 	= options.helper 	|| false;
		this._radius 	= options.radius 	|| false;
		this._physics	= options.physics	|| true;
		this._bounce	= options.bounce	|| 0.8;
		this._friction	= options.physics	|| 0.3;
		var p = this._physics;
		var r = this._radius;
		var o = options.opacity || 0;
		var clearcoat = options.clearcoat || 1;
		const geometry = new THREE.CircleGeometry(r, 32 );
		
		var thematerial =  getMaterial({
			side		: this._side,
			type		: this._material,
			color		: this._color,
			map			: this._map,
			position	: this._position,
		});
		
		var circlef;
		if (p){ circlef = new Physijs.ConvexMesh( geometry, Physijs.createMaterial( thematerial, this._friction, this._bounce ),1 ); }
		else  { circlef = new THREE.Mesh( geometry, thematerial ); }
	
		circlef.castShadow 	= true;
		circlef.receiveShadow 	= false;
		circlef.position.set(...this._position)
		scene.add(circlef);
	}
}
						 
// Plane
export class Plane {
	constructor (options) {
		if(!options){options={}}
		this._scale		= options.scale 	|| [1,1];
		this._color		= options.color 	|| 0xffffff;
		this._side		= options.side 		|| "both";
		this._material	= options.material 	|| "standard";
		this._position 	= options.position 	|| [0,0,0];
		this._rotation	= options.rotation	|| [0,0,0];
		this._action	= options.action 	|| 1;
		this._opacity	= options.opacity 	|| 0.6;
		this._href		= options.href		|| null;
		this._name		= options.name		|| 'myname';
		this._at		= options.at		|| scene;
		this._physics	= options.physics	||true;
		this._bounce	= options.bounce	|| 0.8;
		this._friction	= options.physics	|| 0.3;
		var p = this._physics;
		var c = this._color
	
		var material = getMaterial( {
			opacity		: this._opacity,
			transparent	: true,
			color		: c,
			position	:this._position,
		});
		var width = this._scale[0],
			height = this._scale[1],
			depth = 0.001,roundCornerHeight=0.2,roundCornerWidth=0.2;
		var roundCornerWidth = roundCornerHeight = 0.2;
		var helpWidth = width - 2*roundCornerWidth,
			helpHeight = height - 2*roundCornerHeight;

		var boxGeometry = new THREE.BoxGeometry(width, height, depth, 40, 5, 1);
		boxGeometry.vertices.forEach(v => {
		  if(Math.abs(v.x)>helpWidth/2){
			if(Math.abs(v.y)>helpHeight/2){
			  let helperX = Math.abs(v.x)-helpWidth/2;
			  let helperY2 = (Math.abs(v.y)-helpHeight/2)/roundCornerHeight;
			  let helperY = (1-helperX/roundCornerWidth) * roundCornerHeight * helperY2;
			  v.y = Math.sign(v.y)*((helpHeight/2 + helperY)+(Math.sin(helperX/roundCornerWidth * Math.PI)*(roundCornerHeight/4))*helperY2);
			  v.x = Math.sign(v.x)*(Math.abs(v.x)+(Math.sin(helperX/roundCornerWidth * Math.PI)*(roundCornerWidth/4))*helperY2);
			}
		  }
		});

		var planeh = new THREE.Mesh(boxGeometry, material) ;
	
		planeh.action = this._action

		planeh.castShadow            = true;
		planeh.receiveShadow         = false;
		this.object 	= planeh;
		planeh.name 	= this._name;
		planeh.href 	= this._href;
		planeh.position.set(...this._position)
		planeh.rotation.set(...this._rotation)
		
		planeh.color = c
		planeh.name = this._href
		this._at.add( planeh );
	}
}
						 

// Ring
export class Ring {
	constructor (options) {
		if(!options){options={}}
		this._scale		= options.scale		|| [1,1];
		this._color		= options.color		|| 0xffffff;
		this._side		= options.side		|| "both";
		this._material	= options.material	|| "standard";
		this._position	= options.position	|| [0,0,0];
		this._opacity	= options.opacity	|| 1;
		this._radius	= options.radius	|| [0.5,1];
		this._physics	= options.physics	|| true;
		this._bounce	= options.bounce	|| 0.8;
		this._friction	= options.physics	|| 0.3;
		var p = this._physics;
		var r = this._radius
		var c = this._color
		
		var thematerial =  getMaterial({
			color		:c,
			side		:2,
			reflectivity: 1,
			clearcoat	:1,
			type		:this._material,
			opacity		:this._opacity,
			position	:this._position,
		});
	
		const geometry = new THREE.RingGeometry(r[0],r[1], 32 );
		var ring;
		if (p){ ring = new Physijs.ConvexMesh( geometry, Physijs.createMaterial( thematerial, this._friction, this._bounce ),1 ); }
		else { ring = new THREE.Mesh( geometry, thematerial ); }
		
		ring.position.set(...this._position)
		ring.color = c
		// add to scene
		scene.add( ring );
		ring.castShadow            = true;
		ring.receiveShadow         = false;
	}
}
				
//var mouse = new THREE.Vector2();

// listen for mouse events
function onMouseMove( e ) {
	mouse.x = 	( e.clientX / window.innerWidth  ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
}
				 
// listen for clicks
$(document).on('click', function(e){
	if(intersects[0]){
		if(intersects[0].object.href){
				//window.open(intersects[0].object.href)
		}

		if (intersects[0].object.action){
			if (intersects[0].object.action.call){
				intersects[0].object.action.call(intersects[0].object, intersects[0].object.name, intersects[0].object.href)
			}
		}
	}
});

// listen for clicks
$(document).on('mousedown', function(e){
	if(intersects[0]){
		if(intersects[0].object.href){
			window.location.assign(intersects[0].object.href);
			//window.open(intersects[0].object.href)
		}
		//}
	}
});


// listen for touch
$(document).on('touchstart', function(e){
		mouse.x = ( e.touches[0].clientX   / window.innerWidth  ) * 2 - 1;
		mouse.y = - ( e.touches[0].clientY / window.innerHeight ) * 2 + 1;

		renderer.render( scene, camera );
	if(intersects[0]){
		// console.log(intersects[0].object.name);
		if (intersects[0].object.name == 'floor'){}
		else if(intersects[0].object.href){ window.open(intersects[0].object.href); }
	}
});
	
	
// Menu
export class Menu {
constructor (options) {
		//raycaster = new THREE.Raycaster();
		window.addEventListener( 'mousemove', onMouseMove, false );
	}
}

//const currentHandModel = { left: 0, right: 0 };
//const handModels = { left: null, right: null };

// Hands
				 
				 var handObject;
export class Hands {
constructor (options) {
	if(!options){options={}}

	this._style = options.style || 'oculus'
	var style = this._style
	// console.log(style)
	const controllerModelFactory = new XRControllerModelFactory();
	const handModelFactory = new XRHandModelFactory().setPath( "/assets/models/fbx/" );

	hand1 = renderer.xr.getHand( 0 );
	dolly.add( hand1 );


	hand1.add( handModelFactory.createHandModel( hand1, style ) );
	
	//handModels.right[ currentHandModel.right ].visible = true;
	
	hand1.addEventListener( 'pinchstart', evt => {  console.log('start'); } );
	hand1.addEventListener( 'pinchend',   evt => {  console.log('end');   } );

	// Hand 2
	hand2 = renderer.xr.getHand( 1 );
	dolly.add( hand2 );
		
	
	hand2.add( handModelFactory.createHandModel( hand2, style ) );

	
	handObject = {
	left:{
		wrist: hand2.children[0],
		thumb:{
			metacarpal:	hand2.children[1],
			proximal:	hand2.children[2],
			distal:		hand2.children[3],
			tip:		hand2.children[4],
		},
		index:{
			metacarpal:		hand2.children[5],
			proximal:		hand2.children[6],
			intermediate:	hand2.children[7],
			distal:			hand2.children[8],
			tip:			hand2.children[9],
		},
		middle:{
			metacarpal:		hand2.children[10],
			proximal:		hand2.children[11],
			intermediate:	hand2.children[12],
			distal:			hand2.children[13],
			tip:			hand2.children[14],
		},
		ring:{
			metacarpal:		hand2.children[15],
			proximal:		hand2.children[16],
			intermediate:	hand2.children[17],
			distal:			hand2.children[18],
			tip:			hand2.children[19],
		},
		pinky:{
			metacarpal:		hand2.children[20],
			proximal:		hand2.children[21],
			intermediate:	hand2.children[22],
			distal:			hand2.children[23],
			tip:			hand2.children[24],
		}
	},
	right:{
		wrist: hand1.children[0],
		thumb:{
			metacarpal:	hand1.children[1],
			proximal:	hand1.children[2],
			distal:		hand1.children[3],
			tip:		hand1.children[4],
		},
		index:{
			metacarpal:		hand1.children[5],
			proximal:		hand1.children[6],
			intermediate:	hand1.children[7],
			distal:			hand1.children[8],
			tip:			hand1.children[9],
		},
		middle:{
			metacarpal:		hand1.children[10],
			proximal:		hand1.children[11],
			intermediate:	hand1.children[12],
			distal:			hand1.children[13],
			tip:			hand1.children[14],
		},
		ring:{
			metacarpal:		hand1.children[15],
			proximal:		hand1.children[16],
			intermediate:	hand1.children[17],
			distal:			hand1.children[18],
			tip:			hand1.children[19],
		},
		pinky:{
			metacarpal:		hand1.children[20],
			proximal:		hand1.children[21],
			intermediate:	hand1.children[22],
			distal:			hand1.children[23],
			tip:			hand1.children[24],
		}
		//console.log( e.data.handedness );
				
		
	//	hand2.children[9]

	}
						}
	
	
	
	//window.handModels = handModels;
	hand2.addEventListener( 'pinchend', evt => {
		// var firstBB = new THREE.Box3().setFromObject(hand2.children[9]);
		// var secondBB = new THREE.Box3().setFromObject(hand1.children);
		var ray = new THREE.Raycaster( hand2.children[9].position );
		raycaster.ray.direction.set(scene.direction)//.applyMatrix4( tempMatrix );
		var	intersections = ray.intersectObjects( scene.children);
		
		
		// var collision = firstBB.intersectsBox(secondBB);
		// console.log(intersections)
	});
	window.hands = [ hand1, hand2 ];
	var mat =  getMaterial({
		type		: 'standard',
		color		: 'white',
		transparent	: true,
		opacity		: 1,
		side		: 2,
		//	map:this._map
	});
	var geo =  new THREE.PlaneGeometry(0.1,0.02,1,1);
	fingermenu = new THREE.Mesh(geo, mat		);
	//hand2.children[9].add(fingermenu)
	//fingermenu.position.x = 0.05
	//fingermenu.rotation.x = -Math.PI / 2;

	
	this.left = handObject.left;
	this.right = handObject.right;

	
	
	const font = new THREE.FontLoader();
	font.load('/assets/fonts/helvetiker_bold.json', function ( font ) {
		const textGeo = new THREE.TextBufferGeometry( 'main menu', {
			font:font,
			size: 0.012,
			height: 0.002,
			curveSegments: 3,
			bevelEnabled: false
		});
		textGeo.computeBoundingBox();
		geo.computeBoundingBox();
		const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		const verticalOffset = - 0.25 * ( geo.boundingBox.max.y - geo.boundingBox.min.y );
		material = new THREE.MeshStandardMaterial({color:'black',});
		text = new THREE.Mesh( textGeo, material );
		text.position.x 	= centerOffset;
		text.position.y 	= verticalOffset;
		//text.castShadow 	= true;
		//text.receiveShadow 	= false;
		//text.name  			= name1;
		//text.color 			= '';
		//text.href  			= href;
		fingermenu.add(text);
		//text.rotation.set(r[0],r[1],r[2])
		//text.position.set(centerOffset + pos[0], pos[1],pos[2])
		//objects.push(mesh);
	});
	
	//const geometry = new THREE.BoxGeometry(0.1,0.1,0.1);
	//var box;
	//box = new THREE.Mesh( geometry, material );
	//box.castShadow    = true;
	//hand2.children[9].add(box)

	
}
		
		
		
		getHand(){
		console.log('sdfg');
			
			
		//	handObject
	}
		
		
}
var hit;
function collision() {
	var originPoint = fingermenu.position.clone();
	for (var vertexIndex = 0; vertexIndex <  fingermenu.geometry.vertices.length; vertexIndex++) {
		var ray = new THREE.Raycaster( fingermenu.position, fingermenu.geometry.vertices[vertexIndex] );
		var collisionResults = ray.intersectObjects( scene.children );
		if ( collisionResults.length > 0)  {
			hit = true;
			console.log(collisionResults);
		}
	}
}
				 
// Create laser pointer line
function buildController( data ) {
	switch ( data.targetRayMode ) {
		case 'tracked-pointer':
			var geometry = new THREE.BufferGeometry();
			geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0,     0,   0, 0, 0, - 1 ], 3 ) );
			geometry.setAttribute( 'color',    new THREE.Float32BufferAttribute( [ 0.5, 0.5, 0.5, 0, 0,   0 ], 3 ) );
			var material = new THREE.LineBasicMaterial( { vertexColors: true, blending: THREE.AdditiveBlending } );
			return new THREE.Line( geometry, material );
		case 'gaze':
			var geometry = new THREE.RingBufferGeometry( 0.02, 0.04, 32 ).translate( 0, 0, - 1 );
			var material = new THREE.MeshBasicMaterial( { opacity: 0.5, transparent: false });
			return new THREE.Mesh( geometry, material );
	}
}
// Pointer
export class Pointer {
	constructor (options) {
		if(!options){options={}}
		var c = options.bind || controller[0];
		console.log(c)
		c.addEventListener( 'connected', function ( e ) { this.add( buildController( e.data ) ); } );
		//controller[1].addEventListener( 'connected', function ( e ) { this.add( buildController( e.data ) ); } );
		c.addEventListener( 'selectstart', onSelectStart );
		//c.addEventListener( 'selectend', onSelectEnd );
		//controller[1].addEventListener( 'squeezestart', function ( event ) {
		//console.log(intersecting.action)
		//} );
		pointer = c
		pointingController = c
	}
}

// create menu items
function createMenu(track, i,p,r,pos,fontsz,o) {
		var asdf = i;
		var menuItem = new Plane({
			rotation:[0,0,0],
			color:track.color,
			scale:[1.95,0.8],
			position:[pos[0],(0.2-(asdf / 1.2)+1)+pos[1],pos[2]],
			at:mainmenu,
			action:track.action,
			value: track.value,
			name: track.name,
			href: track.href,
			opacity:o
		});
		new Text({ at:scene,text:track.name,color:'black',size:fontsz,rotation:[0,0,0],thickness:0.03, position:[p[0],(0.15-(asdf / 1.2)+0.9)+p[1],p[2]+0.05]})}

////textGeo.computeBoundingBox();
//const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
//const textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
//const mesh = new THREE.Mesh( textGeo, textMaterial );
//mesh.position.x = centerOffset;
//mesh.position.y = 0.1;
//mesh.castShadow = true;
//mesh.receiveShadow = true;
//parenta.add( mesh );

var gr = new THREE.Group();

// DropdownDemo
export class DropdownDemo {
	constructor (options) {
		/*
			 var geometry1 = new THREE.BoxBufferGeometry( 1, 1, 1 );
					  var material = new THREE.MeshStandardMaterial( { roughness: 0 } );
		   menuBox = new THREE.Mesh( geometry1, material );
			geometry1 = new THREE.SphereBufferGeometry( 1, 35, 35 );
			menuSphere = new THREE.Mesh( geometry1, material );
			geometry1 = new THREE.CylinderBufferGeometry( 1, 1, 1,30 );
			menuCylinder = new THREE.Mesh( geometry1, material );
			
			gr.add(menuBox)
			gr.add(menuSphere)
			gr.add(menuCylinder)
			gr.position.x 	= -2;
	   
			scene.add(gr)
			
	   console.log(e);
	   //// for demo
	   // var menuBox, menuSphere, menuCylinder;
	   switch( e ) {
	   case 'box':      gr.add( menuBox );      gr.remove(menuCylinder); gr.remove( menuSphere );  break;
	   case 'sphere':   gr.add( menuSphere );   gr.remove( menuBox );    gr.remove( menuCylinder); break;
	   case 'cylinder': gr.add( menuCylinder ); gr.remove( menuBox );    gr.remove( menuSphere );  break;
	   }
	   }*/
	}
}
																							 
// Image
export class Image {
	constructor (options) {
		if(!options){options={}}
		var sf = options;
		this._scale 	= options.scale 	|| 1;
		this._color 	= options.color 	|| 0xffffff;
		this._side 		= options.side 		|| 2;
		this._size 		= options._size 	|| 2;
		this._blend 	= options.blend		|| "normal";
		this._position	= options.position	|| [0,0,0];
		this._rotation	= options.rotation	|| [0,0,0];
		this._material	= options.material	|| "standard"
		this._action	= options.action	|| null
		this._name 		= options.name 		|| null;
		this._file 		= options.file 		|| "/assets/img/monalisa.jpg";
		
		var f = this._file
		var o = options.opacity || 0;
		var s = this._scale;
		
		var geometry =  new THREE.PlaneGeometry(s,s,1,1);
		$("body").append('<img hidden class="myimg" src='+f+'></img>');
		var dsfgs = []
		$('.myimg').on('load',function(){
			dsfgs.push($('.myimg').height());
			dsfgs.push($('.myimg').width());
			var w = 1 * s; var h = (dsfgs[0] / dsfgs[1]) * s; geometry.scale(w,h,1 );
		});
	//	var asdf = 	   getMeta(this._file)
		//setTimeout(function(){
		//	console.log(asdf)}, 1020);

		var geometry = new THREE.PlaneGeometry(1, 1, 2, 32, 1, true);
	
	var ground_material =  getMaterial({
		type:this._material,
		color: 'white',
		transparent:true,
		opacity:1,
		//side:2,
		map:this._file,
		side:this._side,
		//map:this._map
	});
 // var materialOuter = new THREE.MeshBasicMaterial({
//	map: new THREE.TextureLoader().load(this._file),
 //side:this._side,
 // });
  var meshOuter = new THREE.Mesh(geometry, ground_material);
		//const circle = new THREE.Mesh( geometry, thematerial );
		meshOuter.castShadow 	= true;
		meshOuter.receiveShadow 	= false;
		mainmenu.add(meshOuter);
		meshOuter.position.set(...this._position);
		meshOuter.action = this._action;
		console.log(meshOuter.action);
		//geometry.scale(8,8,8)
		if(s.length){ meshOuter.scale.set(...s);  }
		else 		{ meshOuter.scale.set(s,s,s); }
	}
}
			   

// Light
export class  Light {
  constructor (options) {
	  if(!options){options={}}
	  this._color 		= options.color 	|| 0xffffff;
	  this._position 	= options.position 	|| [0,10,4];
	  this._intensity 	= options.intensity	|| 1;
	  this._shadow 		= options.shadow	|| true;
	  this._type 		= options.type 		|| "point";
	  this._decay 		= options.decay		|| 0;
	  this._distance 	= options.distance 	|| 0;
	  this._angle		= options.angle 	|| 1;
	  this._penumbra	= options.penumbra 	|| 1;
	  this._width		= options.width 	|| 1;
	  this._height		= options.height 	|| 1;
	  var i = this._intensity;
	  var c = this._color;
	  var t = this._type;
	  var a = this._angle;
	  var w = this._width;
	  var h = this._height;
	  var o = options;
	  var dis = this._distance;
	  var dec = this._decay;
	  var p = this._penumbra;

	  if (t === "hemisphere"){
		  if(o.color){ c = [o.color[0],o.color[1]]; }
		  else 		 { c = [  0xffffff,  0x444444]; }
	  }
	  
	  var light;
	  switch(t){
		  case "ambient"	: light = new THREE.AmbientLight		(c, i);				break;
		  case "directional": light = new THREE.DirectionalLight	(c, i);				break;
		  case "hemisphere"	: light = new THREE.HemisphereLight		(c[0], c[1], i);	break;
		  case "point"		: light = new THREE.PointLight			(c, i, dis, dec);	break;
		  case "rect"		: light = new THREE.RectAreaLight		(c, i, w, h);		break;
		  case "spot"  		: light = new THREE.SpotLight			(c, i, dis,a,p,dec);break;
	  }
	  
	  if (t != 'ambient'){
		  // set up shadows
		  if(light.shadow){
			  light.castShadow            = true;
			  light.receiveShadow         = true;
			  light.shadow.mapSize.width  = 2048;
			  light.shadow.mapSize.height = 2048;
			  light.distance = dis
			  light.decay = dec
			  // light.shadow.camera.near = 0.5;
			  // light.shadow.camera.far  = 500;
		  }
	  }
	  
	  // add to scene
	  scene.add( light );
	  
	  // light helper
	  if (options.helper){
		  var shadowHelper = new THREE.CameraHelper( light.shadow.camera );
		  scene.add( shadowHelper );
	  }
	  
	  // set position
	  light.position.set(...this._position);
	  
  }
}

// Lensflare
export class  Lensflare {
  constructor (options) {
	  if(!options){options={}}
	  this._position 		= options.position 	|| [0.7,30,10];
	  const light			= new THREE.PointLight( 0xffffff, 1.5, 2000 );
	  const textureLoader 	= new THREE.TextureLoader();
	  const textureFlare0 	= textureLoader.load( "/assets/textures/lensflare/lensflare0.png" );
	  const textureFlare1 	= textureLoader.load( "/assets/textures/lensflare/lensflare2.png" );
	  const textureFlare2 	= textureLoader.load( "/assets/textures/lensflare/lensflare3.png" );
	  
	  const lensflare = new Lensflaree();
	  lensflare.addElement(new LensflareElement(textureFlare0, 212, 0  , new THREE.Color(0xffffff))); // texture, size, distance, color
	  lensflare.addElement(new LensflareElement(textureFlare1, 212, 0  , new THREE.Color(0xffffff)));
	  lensflare.addElement(new LensflareElement(textureFlare2,  60, 0.6, new THREE.Color(0xffffff)));
	  
	  light.add(lensflare);
	  light.position.set(...this._position);
	  scene.add(light);
  }
}

// Ocean
export class  Ocean {
	constructor (options) {
		renderer.outputEncoding = THREE.LinearEncoding;
		sun = new THREE.Vector3();
		const waterGeometry = new THREE.PlaneBufferGeometry( 10000, 10000 );
		water = new Water(
			waterGeometry, { textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load( '/assets/textures/waternormals.jpg', function ( texture ) { texture.wrapS = texture.wrapT = THREE.RepeatWrapping; } ),
			alpha: 1.0,
			sunDirection: new THREE.Vector3(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale: 3.7,
			fog: scene.fog !== undefined
			}
		);
		water.rotation.x = - Math.PI / 2;
		scene.add( water );
		const sky = new Skyy();
		sky.scale.setScalar( 1000 );
		scene.add( sky );
		const skyUniforms = sky.material.uniforms;
		skyUniforms[ 'turbidity' ].value = 10;
		skyUniforms[ 'rayleigh' ].value = 2;
		skyUniforms[ 'mieCoefficient' ].value = 0.005;
		skyUniforms[ 'mieDirectionalG' ].value = 0.8;
		const parameters = {
			inclination: 0.49,
			azimuth: 0.205
		};
		const pmremGenerator = new THREE.PMREMGenerator( renderer );
		function updateSun() {
			const theta = Math.PI * ( parameters.inclination - 0.5 );
			const phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );
			sun.x = Math.cos( phi );
			sun.y = Math.sin( phi ) * Math.sin( theta );
			sun.z = Math.sin( phi ) * Math.cos( theta );
			sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
			water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();
			scene.environment = pmremGenerator.fromScene( sky ).texture;
		}
		updateSun();
		const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
		const material = new THREE.MeshStandardMaterial( { roughness: 0 } );
		watermesh = new Physijs.BoxMesh( geometry, material );
		scene.add( watermesh );
  }
}
// Sprite
export class Sprite {
	constructor (options) {
	  if(!options){options={}}
	  const map = new THREE.TextureLoader().load('/assets/textures/grass.png');
	  const material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
	  const sprite = new THREE.Sprite( material );
	  sprite.scale.set(0.1, 0.1, 1)
	  scene.add( sprite );
	}
}

// Bowl
export class Bowl {
	constructor (options) {
		var geometry 	= new THREE.OctahedronGeometry(5, 20, 6, 0, 2*Math.PI, 0, 0.5 * Math.PI);
		var material 	= new THREE.MeshStandardMaterial({color:'#222222'} );
		var mesh1g 		= new THREE.Mesh( geometry, material );
		material.side = 2;
		var ground_material = Physijs.createMaterial( material, 1, 0 );
		// add head
		var mesh1gi = new Physijs.ConvexMesh( geometry, ground_material, 1 );
		mesh1gi.rotation.x = - Math.PI ;
		mesh1gi.position.y =5 ;
		scene.add(mesh1gi)
	}
}

// Fog
export class Fog {
	constructor (options) {
		if(!options){options={}}
		this._color = options.color || 0xFFFFFF;
		this._near	= options.near	|| 1;
		this._far 	= options.far	|| 1000;
		scene.fog = new THREE.Fog(this._color, this._near, this._far);
		scene.background = new THREE.Color(this._color);
	}
}
var solderActive = false
var ticks = 0, throwOld, throwNew, tick = 0
function render(timeNow, frame ) {
			
	tick += 1;

	// animated soldier
	if(solderActive){
		idleWeight = idleAction.getEffectiveWeight();
		walkWeight = walkAction.getEffectiveWeight();
		runWeight  = runAction.getEffectiveWeight();

		updateWeightSliders(); // Update the panel values if weights are modified from "outside" (by crossfadings)
		updateCrossFadeControls(); // Enable/disable crossfade controls according to current weight values
		let mixerUpdateDelta = clock.getDelta(); // Get the time elapsed since the last frame, used for mixer update (if not in single step mode)
		if ( singleStepMode ) { mixerUpdateDelta = sizeOfNextStep; sizeOfNextStep = 0; } // If in single step mode, make one step and then do nothing (until the user clicks again)
		mixer.update( mixerUpdateDelta ); // Update the animation mixer, the stats panel, and render this frame
	}
	if (video && video.currentTime){
		if (video.currentTime > 1 && videotexture) {videotexture.needsUpdate = true; }
		// if ( video.readyState >= video.HAVE_CURRENT_DATA ) { videotexture.needsUpdate = true; }
	}
	//const t = clock.getElapsedTime();
	//if ( rightArm ) { rightArm.rotation.z += Math.sin(t) * 0.005; }
	if(pointer && controller[0]){
		handleCollisions(pointer);
	}
			if(grabbing){
				ticks++;
				currentTime = +new Date();
				totalGrabTime = currentTime - grabStartTime
				if(ticks % 20 == 0){console.log('uigygufu')
					//throwTime = totalGrabTime
					throwAngularVelocity = positionVector1(throwEndRotation, controllerGrabRotation)
					throwLinearVelocity = positionVector1(throwEndVector, controllerGrabPosition)
					console.log(throwLinearVelocity)
					console.log(controllerGrabPosition,throwEndVector)
					throwOld = throwNew;
					throwNew = grabbingController.getWorldPosition(throwEndVector);
				}
				// console.log(totalGrabTime)
				// console.log(intersectingObjectPosition + controllerGrabPosition)
				if(intersecto[ 0 ]){
				//var position1 = intersecto[ 0 ].getWorldPosition(intersectingObjectPosition);
				//var position2 = grabbingController.getWorldPosition(controllerGrabPosition);
				}
				//ar positiong1 = grabbingController.getWorldPosition(controllerGrabStartPosition);
				var positiong2  = grabbingController.getWorldPosition(controllerGrabPosition);
				var positiong21 = grabbingController.getWorldDirection(controllerGrabRotation);
				// this will return the difference vector between the start position and current position of grab
				startEndDifference = positionVector1(controllerGrabStartPosition, controllerGrabPosition);
				startEndRotation = positionVector1(controllerGrabStartRotation, controllerGrabRotation);
				//console.log(startEndDifference)
				//var igy = positionVector(intersectingObjectPosition, positiong);
				
				// this returns the new position of grabbing object
				objectNewPosition = addVector(intersectingObjectPosition, startEndDifference);
				objectNewRotation = positionVector(intersectingObjectDirection, startEndRotation);
				//	console.log(objectNewPosition)
				//var igy = positionVector(intersectingObjectPosition, positiong);
				if(intersecto[0]){
					intersecto[0].object.position.x = objectNewPosition.x;
					intersecto[0].object.position.y = objectNewPosition.y;
					intersecto[0].object.position.z = objectNewPosition.z;
					
					console.log(objectNewRotation)
					intersecto[0].object.rotation.x = objectNewRotation.x;
					intersecto[0].object.rotation.y = objectNewRotation.y;
					intersecto[0].object.rotation.z = objectNewRotation.z;
				}
			}
			if (hands){
				var x = hand2.children[9].position.x
				var y = hand2.children[9].position.y
				var z = hand2.children[9].position.z
				var asdf = [x,y,z]
				console.log(asdf)
				//console.log(window.XRHand.THUMB_PHALANX_TIP)
			}
			
			// Fly Locomotion
			if (fly){
				if (controller[0]){
					if (dolly){
						//var position = controller[0].getWorldPosition(controllerVec1);
						var direction = controller[0].getWorldDirection(controllerVec2);
						dolly.position.x -= (direction.x * 0.01);
						dolly.position.y -= (direction.y * 0.01);
						dolly.position.z -= (direction.z * 0.01);
					}
				}
			}
			
			// Walk Locomotion
			if (walk){
				
				if (controller[0]){
					if (dolly){
						if(fullGamepad){
							
							// TO DO
							// add diagnal movement into calculation
							// right now, joystick forward/back changes speed, but left/right is not considered
							if(fullGamepad.joystick.r[0] != undefined){
								
								// controller direction
								var controllerDirection = controller[0].getWorldDirection(controllerVec2);
							
								// joystick axes
								var stickX = fullGamepad.joystick.r[1]; // forward, back
								var stickZ = fullGamepad.joystick.r[0]; // left, right
								
								// joystick forward / backward changes speed
								var speed = scale(-1,1,1,-1,stickX) * 0.2

								// move dolly along x axis
								var walkX = (scale(-1,1,1,-1,controllerDirection.x) * speed)
								dolly.position.x += (walkX);
								
								// move dolly along z axis
								var walkZ = (scale(-1,1,1,-1,controllerDirection.z) * speed)
								dolly.position.z += (walkZ);
							}
						}
					}
				}
			}
			
			// Teleport Locomotion
			if(teleporting){
				rafCallbacks.forEach(cb => cb(timeNow));
				camera.getWorldPosition(cameraPostion)
			}
	 
	if(moveForward){ }
	// If we are not presenting move the camera a little so the effect is visible
	/* if ( renderer.xr.isPresenting === false ) {
	  const time = clock.getElapsedTime();
	  sphere.rotation.y += 0.001;
	  sphere.position.x = Math.sin( time ) * 0.2;
	  sphere.position.z = Math.cos( time ) * 0.2;

	}*/
			if(touchGamepad){
				
				fullGamepad.joystick.l = [parseInt(Joy1.GetX()) * 0.01, parseInt(Joy1.GetY()) * 0.01]
				fullGamepad.joystick.r = [parseInt(Joy2.GetX()) * 0.01, parseInt(Joy2.GetY()) * 0.01]
				
				// ===== LEFT JOYSTICK  ===== //
				
				if(fullGamepad.joystick.l[0]){
					var camX = dolly.getWorldPosition(dollyPostion).x;
					var camZ = dolly.getWorldPosition(dollyPostion).z;
					
					dolly.translateX( fullGamepad.joystick.l[0] * 0.1 );
					dolly.translateZ( scale(-1,1,1,-1,fullGamepad.joystick.l[1]) * 0.1);
				}
				
				// ===== RIGHT JOYSTICK  ===== //
				
				if(fullGamepad.joystick.r[0]){
					
					// look up/down
					var newX = camera.rotation.x + fullGamepad.joystick.r[1] * 0.05 ;
					if(newX <= 0.5 && newX >= -1 ){ camera.rotation.x = newX; }
					
					// look left/right
					var newY = dolly.rotation.y + scale(-1,1,1,-1,fullGamepad.joystick.r[0]) * 0.05;
				
					// if rotation is more than a full 360, set back to 0
					if     (newY >  Math.PI * 2){ newY -= Math.PI * 2 }
					else if(newY < -Math.PI * 2){ newY += Math.PI * 2 }
					
					dolly.rotation.y = newY;
					
				}
				
				//console.log(fullGamepad.button.a)
			}

			// gamepad stuff
			if(controller[0]){
				if(controller[0].gamepad){
					if(controller[1].gamepad){
						var axesL = controller[1].gamepad.axes;
						var axesR = controller[0].gamepad.axes;
						fullGamepad = {
							joystick:{
								l : [axesL[2], /*scale(-1,1,1,-1,*/axesL[3]/*)*/],
								r : [axesR[2], /*scale(-1,1,1,-1,*/axesR[3]/*)*/]
							},
							button:{
								a : controller[0].gamepad.buttons[4], // A Button
								b : controller[0].gamepad.buttons[5], // B Button
								x : controller[1].gamepad.buttons[4], // X Button
								y : controller[1].gamepad.buttons[5], // Y Button
								r : controller[0].gamepad.buttons[3], // stick button R
								l : controller[1].gamepad.buttons[3]  // stick button L
							},
							trigger:{
								r : controller[0].gamepad.buttons[0], // trigger R
								l : controller[1].gamepad.buttons[0]  // trigger L
							},
							grip:{
								r : controller[0].gamepad.buttons[1], // grip R
								l : controller[1].gamepad.buttons[1]  // grip L
							},
							rest:{
								r : controller[0].gamepad.buttons[6], // thumbrest R
								l : controller[1].gamepad.buttons[6]  // thumbrest L
							}
						}
					}
				}
			}

	if(raycaster){
		
		raycaster.setFromCamera( mouse, camera );
		intersects = raycaster.intersectObjects( mainmenu.children );
		
		if (intersects){
			if(intersects.length){ document.body.style.cursor = "pointer" }
			else 				 { document.body.style.cursor = "auto"    }
		}
		
		for (var i = 0; i < mainmenu.children.length; i++) {
			if(mainmenu.children[i].geometry){
				if(mainmenu.children[i].geometry.type == 'BoxGeometry'){
					// HIGHLIGHT GREEN
					if (mainmenu.children[i].material.color != mainmenu.children[i].color){
						mainmenu.children[i].material.color =  new THREE.Color( mainmenu.children[i].color);
					}
				}
			}
			mainmenu.children[i].scale.set(1,1,1)
			if(mainmenu.children[i].material){ /*  mainmenu.children[i].material.color = {b: 1, g: 1, r: 1}; */  }
			if(mainmenu.children[i].type == 'Mesh'){
				if(intersects[0]){
					if(intersects[0].object.geometry.type == 'BoxGeometry'){
						// HIGHLIGHT GREEN
						intersects[0].object.material.color = {b: 0.2, g: 0.9, r: 0.01};
						intersects[0].object.scale.set(1.05,1.05,1.05)
					}
				}
			}
		}

		var arrayLength = intersects.length;
		if(intersects[0]){
			if(intersects[1]){
				if(intersects[1].material){ /*  intersects[1].material.color =  {b: 0, g: 1, r: 0}; */ }
				intersects[0].object.scale.set(1,1,1);
			}
		}
	}

	if(water){
		const time = performance.now() * 0.001;
		watermesh.position.y = Math.sin( time ) * 20 + 5;
		watermesh.rotation.x = time * 0.5;
		watermesh.rotation.z = time * 0.51;
		water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
	}

	if (mixerFBX || mixerDAE){
		var delta = clock.getDelta();
		if (animates != null && animates.length > 0) {
			for (let i = 0; i < animates.length; i ++) {
				animates[ i ].update( delta * 1000 );
			}
		}
		if (mixerFBX) mixerFBX.update(delta);
		if (mixerDAE) mixerDAE.update(delta);
	}
	if (animationOn){ TWEEN.update(); }
			
	// mirror stuff (update every 60 frames)
		if(tick % 60 == 0 && mirror){
			mirrorCameras.forEach( function ( cam,i ) {
				cam.position.copy( mirrorObjects[i].position);
				cam.update( renderer, scene );
			} );
		}
	
			//if(xr)
			renderer.render( scene, camera );
	// var seconds = new Date().getTime() / 6000;
}

function limitRange(num, min, max){
  const MIN = min || 1;
  const MAX = max || 20;
  const parsed = parseInt(num)
  return Math.min(Math.max(parsed, MIN), MAX)
}

// scale a number range
function scale(oldMin, oldMax, newMin, newMax, oldValue) {
	var oldRange = oldMax - oldMin;
	var newRange = newMax - newMin;
	var newValue = ((oldValue - oldMin) * newRange / oldRange) + newMin;
	return newValue;
}

// scale vector range
function scaleVector(oldMin, oldMax, newMin, newMax, vect) {
	var newVector = {x:0,y:0,z:0}
	newVector.x = scale(oldMin,oldMax,newMin,newMax,vect.x)
	newVector.y = scale(oldMin,oldMax,newMin,newMax,vect.y)
	newVector.z = scale(oldMin,oldMax,newMin,newMax,vect.z)
	return newVector;
}

// distance between two vectors
function distanceVector( v1, v2 ){
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;

    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}

// difference between two vectors
function differenceVector( v1, v2 ){
	var difference = function (a, b) { return Math.abs(a - b); }
	var dx = Math.abs(v1.x - v2.x)// v1.x - v2.x;
	var dy = Math.abs(v1.y - v2.y)// v1.y - v2.y;
	var dz = Math.abs(v1.z - v2.z)// v1.z - v2.z;
	return {x:dx,y:dy,z:dz};
}

// positional difference
function positionVector( v1, v2 ){
	var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;
	return {x:dx,y:dy,z:dz};
}

// multiply vector
function multiplyVector( v, a ){
    var dx = v.x * a;
    var dy = v.y * a;
    var dz = v.z * a;
	return {x:dx,y:dy,z:dz};
}

// positional difference
function positionVector1( v1, v2 ){
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;
	
	if (dx > 0){ dx = -dx } else { dx = Math.abs(dx) }
	if (dy > 0){ dy = -dy } else { dy = Math.abs(dy) }
	if (dz > 0){ dz = -dz } else { dz = Math.abs(dz) }

	return {x:dx,y:dy,z:dz};
}

// add two vectors
function addVector( v1, v2 ){
    var dx = v1.x + v2.x;
    var dy = v1.y + v2.y;
    var dz = v1.z + v2.z;
	return {x:dx,y:dy,z:dz};
}

// side selector
const getSide = function(e){
	switch(e){
		case "front": return 0;
		case "back":  return 1;
		case "both":  return 2;
	}
}

// blend selector
const getBlend = function(e){
	 if (typeof e === 'number'){ return e }
	 else if (typeof e === 'string'){
		switch(e){
			case "none": 	 return THREE.NoBlending;
			case "normal": 	 return THREE.NormalBlending;
			case "add": 	 return THREE.AdditiveBlending;
			case "subtract": return THREE.SubtractiveBlending;
			case "multiply": return THREE.MultiplyBlending;
			case "custom": 	 return THREE.CustomBlending;
		}
	}
}
						 
// Material selector
var getMaterial = function(options){
	// type,color,blend
	if(!options){options={}}

	var c 		= options.color 	|| 0xFFFFFF;
	var r 		= options.reflect 	|| 1;
	var w 		= options.wireframe || false;
	var o 		= options.opacity 	|| 1;
	var m 		= options.metalness || 1;
	var asdf 	= options.map;
	var repeat 	= options.repeat || [1,1];
	var bumpScale = options.bumpScale || 0
	var bumpMap = options.bumpMap || null
	var alphaMap = options.alphaMap || null
	var pos = options.position || null
	var params;
	// console.log(bumpMap)
	var clearcoat = options.clearcoat || 1
	//var s = options.side || 2
	var asdf = options.map
	
	params = {
		color:c,
		//side:2,
		transparent:true,
		opacity:o,
		wireframe:w,
		shadowSide: THREE.FrontSide,
		//bumpMap	: new THREE.TextureLoader().load(bumpMap),
		
		// flatShading:false,
		// blending: getBlend(options.blend),
		// vertexColors: true,
		// combine: 		THREE.MixOperation,
		// clearcoat:clearcoat,
		// metalness: m,
		// map: p
		
	}
	if (options.side)        { params.side = options.side }
	if (options.reflectivity){ params.reflectivity = options.reflectivity }
	 
	if (options.map){
		var p = new THREE.TextureLoader().load(asdf) || null
		p.wrapS = repeat[0];
		p.wrapT = repeat[1];
		if( repeat)	{ p.repeat.set(repeat[0],repeat[1]); }
		else 		{ p.repeat.set(1,1); }
		params.map = p
	}
	
	
	if(bumpMap){ params.bumpMap =  new THREE.TextureLoader().load(bumpMap); params.bumpScale = bumpScale; }
	if(alphaMap){ params.alphaMap = new THREE.TextureLoader().load(alphaMap); }
			
	switch(options.type){
		case "basic"	: return new THREE.MeshBasicMaterial(params);    break;
		case "depth"	: return new THREE.MeshDepthMaterial(params);    break;
		case "lambert"	: return new THREE.MeshLambertMaterial(params);  break;
		case "normal"	: return new THREE.MeshNormalMaterial(params);   break;
		case "phong"	: return new THREE.MeshPhongMaterial(params);    break;
		case "physical"	: return new THREE.MeshPhysicalMaterial(params); break;
		case "standard"	: return new THREE.MeshStandardMaterial(params); break;
		case "mirror"	:
			mirror = true;
			const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );
			var mirrorCubeCamera = new THREE.CubeCamera( 0.1, 5000, cubeRenderTarget );
			scene.add( mirrorCubeCamera );
			var mirrorCubeMaterial = new THREE.MeshBasicMaterial( { envMap: cubeRenderTarget.texture } );
			mirrorCubeCamera.position.set(...pos);
			mirrorCubeCamera.update( renderer, scene );
			mirrorCameras.push(mirrorCubeCamera)
			return mirrorCubeMaterial;
		break;

	}
}
				 
// Ease selector
var getEase = function(e,d){
	if(d == 'inout'){
		switch(e){
			case "back"			: return TWEEN.Easing.Back.InOut;		break;
			case "bounce"		: return TWEEN.Easing.Bounce.InOut;		break;
			case "circ"			: return TWEEN.Easing.Circular.InOut;	break;
			case "cubic"		: return TWEEN.Easing.Cubic.InOut;		break;
			case "elastic"		: return TWEEN.Easing.Elastic.InOut;	break;
			case "exponential"	: return TWEEN.Easing.Exponential.InOut;break;
			case "linear"		: return TWEEN.Easing.Linear.InOut;		break;
			case "quad"			: return TWEEN.Easing.Quadratic.InOut;	break;
			case "quart"		: return TWEEN.Easing.Quartic.InOut;	break;
			case "quint"		: return TWEEN.Easing.Quintic.InOut;	break;
			case "sine"			: return TWEEN.Easing.Sinusoidal.InOut;	break;
		}
	}
	else if(d == 'in'){
		switch(e){
			case "back"			: return TWEEN.Easing.Back.In;			break;
			case "bounce"		: return TWEEN.Easing.Bounce.In;		break;
			case "circ"			: return TWEEN.Easing.Circular.In;		break;
			case "cubic"		: return TWEEN.Easing.Cubic.In;			break;
			case "elastic"		: return TWEEN.Easing.Elastic.In;		break;
			case "exponential"	: return TWEEN.Easing.Exponential.In;	break;
			case "linear"		: return TWEEN.Easing.Linear.In;		break;
			case "quad"			: return TWEEN.Easing.Quadratic.In;		break;
			case "quart"		: return TWEEN.Easing.Quartic.In;		break;
			case "quint"		: return TWEEN.Easing.Quintic.In;		break;
			case "sine"			: return TWEEN.Easing.Sinusoidal.In;	break;
		}
	}
	else if(d == 'out'){
		switch(e){
			case "back"			: return TWEEN.Easing.Back.Out;			break;
			case "bounce"		: return TWEEN.Easing.Bounce.Out;		break;
			case "circ"			: return TWEEN.Easing.Circular.Out;		break;
			case "cubic"		: return TWEEN.Easing.Cubic.Out;		break;
			case "elastic"		: return TWEEN.Easing.Elastic.Out;		break;
			case "exponential"	: return TWEEN.Easing.Exponential.Out;	break;
			case "linear"		: return TWEEN.Easing.Linear.Out;		break;
			case "quad"			: return TWEEN.Easing.Quadratic.Out;	break;
			case "quart"		: return TWEEN.Easing.Quartic.Out;		break;
			case "quint"		: return TWEEN.Easing.Quintic.Out;		break;
			case "sine"			: return TWEEN.Easing.Sinusoidal.Out;	break;
		}
	}
}

function positionAtT(inVec,t,p,v,g) {
	inVec.copy(p);
	inVec.addScaledVector(v,t);
	inVec.addScaledVector(g,0.5*t**2);
	return inVec;
}


// controller trigger start
function onSelectStart(e){
	if(this == guidingController){
		teleporting = true;
		this.add(guideline);
		scene.add(guidesprite);
		scene.add(guidelight);
		guidelight.intensity = 1;
	}
	if (this == pointingController){
		if (intersecting.action){
			intersecting.action.call(intersecting, intersecting.name, intersecting.href)
		}
	}
	// window[intersecting.action].call()
}

// controller trigger end
function onSelectEnd(e){
	if(this == guidingController){
		this.remove(guideline);
		scene.remove(guidesprite);
		scene.remove(guidelight);
		var dsg = camera.getWorldPosition(cameraPostion)
		movePlayer();
	}
}

function vibrateL(wr){
	if(controller[0].gamepad){
		controller[0].gamepad.hapticActuators[ 0 ].pulse( 1, 100 );
	}
}
						 
function vibrateR(wr){
	//if(controller[1].gamepad)
	//controller[1].gamepad.hapticActuators[ 0 ].pulse( 1, 100 );
}
	
// for teleport locomotion
function movePlayer(e){
	//var sdfg = this
	teleporting = false
	const feetPos = cameraPostion;
	feetPos.y = 0;
				var asdf = camera.getWorldPosition(cameraPostion);
				//var asdf1 = dolly.getWorldPosition(dollyPostion);
				//console.log(asdf, asdf1)
				console.log(differenceVector(feetPos,cameraPostion))
	const p = guidingController.getWorldPosition(tempVecP);
	const v = guidingController.getWorldDirection(tempVecV);
	v.multiplyScalar(6);
	const t = (-v.y  + Math.sqrt(v.y**2 - 2*p.y*g.y))/g.y;
	const cursorPos = positionAtT(tempVec1,t,cameraPostion,v,g);
	const offset = cursorPos.addScaledVector(asdf ,-1);
	newPos.copy(cameraPostion);
	newPos.add(offset);
	newPos.y = 0;
	new Animate({
		at: dolly,
		position: newPos,
		duration: 300,
		velocity:false,
		type:'absolute'
	});
	//dolly.position.set(newPos.x,2,newPos.z);
	//camera.position.set(0,0,0);
	//camera.position.set(newPos.x,0,newPos.z);
	//dolly.__dirtyPosition = true;
}

// Globe
export class Globe {
	constructor (options) {
		var earth = new THREE.Mesh(
			new THREE.SphereGeometry(0.4, 34, 34),
			new THREE.MeshPhongMaterial({
				map 		: new THREE.TextureLoader().load('/assets/textures/earth/earthmap1k.jpg'),
				specularMap	: new THREE.TextureLoader().load('/assets/textures/earth/earthspec1k.jpg'),
				bumpMap		: new THREE.TextureLoader().load('/assets/textures/earth/earthbump1k.jpg'),
				bumpScale: 0.6,
				//	alphaMap: THREE.ImageUtils.loadTexture(alphaMap),
			})
		);
		var clouds = new THREE.Mesh(
		new THREE.SphereGeometry(0.41, 34, 34),
		new THREE.MeshPhongMaterial({
			map: new THREE.TextureLoader().load('/assets/textures/earth/fair_clouds_4k.png'),
			//alphaMap	: new THREE.TextureLoader().load('/assets/textures/earth/earthcloudmaptrans.jpg'),
			//	bumpScale: bumpScale,
			//	bumpMap	: bumpMap,
			//	bumpScale: 0.6,
			//	alphaMap: THREE.ImageUtils.loadTexture(alphaMap),
			opacity:0.8,
			transparent:true
		}));
				
		// marker object
		var pointerr = new THREE.Mesh(
		new THREE.CylinderGeometry(.02, 0, .10),
		new THREE.MeshPhongMaterial({color: 0xcc9900}));
		pointerr.position.set(0.45, 0, 0); // rotating obj should set (X > 0, 0, 0)
		pointerr.quaternion.setFromUnitVectors(
		new THREE.Vector3(0, 1, 0), new THREE.Vector3(1, 0, 0));
		var marker = new THREE.Object3D();
		marker.add(pointerr);

	// setup scene
	var obje = new THREE.Object3D();
	obje.add(marker);
	obje.add(clouds);
	obje.add(earth);
	//var scene = new THREE.Scene();
	scene.add(obje);
	// [initial position] rotate by lat/long
	// For ball is at (X,0,0), the lat rotation should be around Z axis
	var rad = Math.PI / 180;
	marker.quaternion.setFromEuler(
		new THREE.Euler(0, 135 * rad, 45 * rad, "YZX"));

	// from geolocation API
		navigator.geolocation.getCurrentPosition(function (poso) {
			var lat = poso.coords.latitude, lon = poso.coords.longitude;
			console.log(lat,lon)
			marker.quaternion.setFromEuler(new THREE.Euler(0, lon * rad, lat * rad, "YZX"));
		});
		this.object = obje;
	}
	
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
var moveForward,moveLeft,moveBackward,moveRight;

// Locomotion
export class Locomotion {
	constructor (options) {
		if(!options){options={}}
		var _parent = options.at || scene;

		var bindController = options.bind
		if (options.type == 'fly' 	){ fly  = true }
		if (options.type == 'walk'	){
			walk = true;
			//console.log(walkController);
			walkController = options.bind

		}
		if (options.type == 'rotate'){
			//rotate = true
		}
		if (options.type == 'teleport'){
			guidingController = options.bind
			var asdf = options.bind;
			asdf.addEventListener( 'selectstart', onSelectStart );
			asdf.addEventListener( 'selectend', onSelectEnd );

			// === LOCOMOTION == //
			rafCallbacks.add(() => {
				//	if (guidingController) {
				// Controller start position
				const p = guidingController.getWorldPosition(tempVecP);  // controller position
				const v = guidingController.getWorldDirection(tempVecV); // controller direction
				v.multiplyScalar(6);
				const t = (-v.y  + Math.sqrt(v.y**2 - 2*p.y*g.y))/g.y; // Time for tele ball to hit ground
				const vertex = tempVec.set(0,0,0);
				for (let i=1; i<=lineSegments; i++) {
					// set vertex to current position of the virtual ball at time t
					positionAtT(vertex,i*t/lineSegments,p,v,g);
					guidingController.worldToLocal(vertex);
					vertex.toArray(lineGeometryVertices,i*3);
				}
				guideline.geometry.attributes.position.needsUpdate = true;

				// Place the light and sprite near the end of the poing
				positionAtT(guidelight.position,  t, p, v, g);
				positionAtT(guidesprite.position, t, p, v, g);
				guidesprite.position.y = 0.05;
				guidelight.position.y  = 0.04;
			});

		 
		   //}
		   lineSegments=10;
		   const lineGeometry = new THREE.BufferGeometry();
		   lineGeometryVertices = new Float32Array((lineSegments +1) * 3);
		   
		   //lineGeometryVertices.fill(0);
		   lineGeometry.setAttribute('position', new THREE.BufferAttribute(lineGeometryVertices, 3));
		   const lineMaterial = new THREE.LineBasicMaterial({ });
		   guideline = new THREE.Line( lineGeometry, lineMaterial );
		   guidelight = new THREE.PointLight(0xffffff);
		   guidelight.shadow.mapSize.width  = 2048;
		   guidelight.shadow.mapSize.height = 2048;
		   // The target on the ground
		   const guidespriteTexture = new THREE.TextureLoader().load('/assets/img/target.png');
		   guidesprite = new THREE.Mesh(	new THREE.CircleGeometry(0.3, 32), new THREE.MeshBasicMaterial({ map: guidespriteTexture, transparent:true, opacity:0.8 }) );
		   
		   guidesprite.castShadow 	= false;
		   guidesprite.receiveShadow 	= false;
		   guidesprite.rotation.x = -Math.PI/2;
		   newPos = new THREE.Vector3();
		   // Utility Vectors
		   g = new THREE.Vector3(0,-9.8,0);
		   tempVec =  new THREE.Vector3();
		   tempVec1 = new THREE.Vector3();
		   tempVecP = new THREE.Vector3();
		   tempVecV = new THREE.Vector3();
		}
	 	 //  console.log(_parent)
	   // WASD control
	   /*
	   var p = _parent._position
	   console.log(p)
  var onKeyDown = function ( event ) {
	  event.preventDefault()
		 switch ( event.keyCode ) {
			case 38:case 87:moveForward  = true; p[2] -= 0.1; break;
			case 37:case 65:moveLeft     = true; p[0] -= 0.1; break;
			case 40:case 83:moveBackward = true; p[2] += 0.1; break;
			case 39:case 68:moveRight    = true; p[0] += 0.1; break;
			case 32:ejump();break;
		 }
	  _parent.position(p);
		 };
		   function jump(){p[1] += 1;
	   _parent.position(p);
	   setTimeout(function(){p[1] -= 1;  this._parent.position(p);}, 100);
   }
	   
	   // key up
	   const onKeyUp = function ( event ) {
		   switch ( event.keyCode ) {
			   case 38:case 87:moveForward = false;break;
			   case 37:case 65:moveLeft = false;break;
			   case 40:case 83:moveBackward = false;break;
			   case 39:case 68:moveRight = false;break;
		   }
	 };
	   document.addEventListener( 'keydown', onKeyDown, false );
	   document.addEventListener( 'keyup', onKeyUp, false );
		*/
   }
}
// Balls
export class Ball {
	constructor (options){
		if(!options){options={}}
		this._type = options.type || 'basketball';
		this._file = options.file || '/assets/img/cube/sky/'
		this._material = 'standard'
		var radius;
		var p = options.physics || true
		var friction = 0.5;
		var bounce = 0.9;
		var map;
		
		var alphaMap;
		var bumpMap;
		var bumpScale;
		if (options.type == 'basketball'){
			map			= '/assets/textures/balls/basketball/basketball.png'
			bumpMap		= '/assets/textures/balls/rugby/bumpmap.jpg';
			radius		= 0.12;
			bounce		= 0.56
			bumpScale	= 0.001;
		} //  29.5” | 74.9 cm
		if (options.type == 'volleyball'){
			map			= '/assets/textures/balls/volleyball/volleyball.png'
			bumpMap		= '/assets/textures/balls/volleyball/volleyball.png'
			radius		= 0.105;
			bumpScale	= 0.01;
			bounce		= 0.36
		} // 8.15”-8.39” (20.7-21.3 cm)
		if (options.type == 'tennis'){
			map 		= '/assets/textures/balls/tennis/tennis.jpg'
			bumpMap		= '/assets/textures/balls/tennis/bumpmap.jpg';
			radius 		= 0.0343;
			bumpScale	= 0.01;
			bounce		= 0.79
		} // 6.54–6.86 cm (2.57–2.70 inches). Balls must have masses in the range 56.0–59.4 g (1.98–2.10 ounces)
		if (options.type == 'beach'){
			map			= '/assets/textures/balls/beachball/beachball.jpg',
			alphaMap	= '/assets/textures/balls/beachball/alphamap.jpg'
			//bumpMap	= '/assets/textures/balls/beachball/bumbmap1.jpg';
			//alphaMap	= '/assets/textures/balls/beachball/alphamap.jpg';
			radius		= 0.2845;
			//bumpScale	= 0.01;
		}  //  11.2" (28.45cm)
		if (options.type == 'baseball'){
			map 		= '/assets/textures/balls/baseball/baseball.jpg';
			bumpMap		= '/assets/textures/balls/baseball/bumpmap.jpg';
			radius		= 0.0375;
			bumpScale	= 0.01;
			bounce		= 0.32
		}// (​2 55⁄64–​2 15⁄16 in. or 73–75 mm in diameter), with a mass of 5 to ​5 1⁄4 oz. (142 to 149 g).
		if (options.type == 'softball'){
			map		= '/assets/textures/balls/baseball/baseball.jpg';
			radius 	= 0.0375;
		}
		if (options.type == 'soccer'){
			map 		= '/assets/textures/balls/soccer/soccer.png'
			bumpMap		= '/assets/textures/balls/soccer/soccer.png';
			radius		= 0.125;
			bounce 		= 0.40,
			bumpScale	= 0.004;
		} //diameter of 8.6”-9” (22-23 cm) and circumference of 27”-28” (68-70 cm). The mass of a Size 5 Soccer Ball is between 14-16 oz (400-450 g) with a pressure between 8.5-15.6 psi (58.6-107.6 kPa)
		
		//*	if (this.type == 'pool'/*billiards */){ radius = ; } // 5 1⁄2 to 6.0 oz (160–170 g) with a diameter of 2 1⁄4 in (57 mm), plus or minus 0.005 in (0.127 mm).
		if (options.type == 'golf'){
			map			= '/assets/textures/balls/golf/golf.png';
			bumpMap		= '/assets/textures/balls/golf/golf.png';
			radius		= .0214;
			bounce		= 0.36
			bumpScale	= 0.01;
			
		} // 1.620 oz (45.93 grams), has a diameter not less than 1.680 in (42.67 mm),
		if (options.type == 'cricket'){
			map			= '/assets/textures/balls/cricket/cricket.png';
			radius		= 0.03645;
			bounce		= 0.16
		} //DIAMETER  INCHES 2.80 to 2.86	MM 71.3 to 72.9
		if (options.type == 'rugby'){
			map			= '/assets/textures/balls/rugby/rugby.png';
			bumpMap		= '/assets/textures/balls/rugby/bumpmap.jpg';
			radius		= 0.135;
			bumpScale	= 0.001;
			bounce		= 0.79
		}//  27 cm (11 in) long and 60 cm (24 in) in circumference at its widest point. // weighs between 383 and 440 g (13.5 and 15.5 oz)
		
		this._position	= options.position || [0,3,0];
		this._rotation	= options.rotation	|| [0,0,0];
		this._material	= options.material || 'physical';
		this._opacity	= options.opacity || 1;
		this._friction	= 1;
		this._bounce	= bounce
		
		//if (bumpMap){
		//	var texture	= THREE.ImageUtils.loadTexture(bumpMap)
		
		var material =  getMaterial({
			type:this._material,
			//color:this._color,
			//opacity:this._opacity,
			//side:0,
			alphaMap:alphaMap ,
			map:map,
			bumpMap	: bumpMap,
			bumpScale: bumpScale,
		})

		  var messh
		  if (p){ messh = new Physijs.SphereMesh( new THREE.SphereGeometry( radius, 20, 20 ), Physijs.createMaterial( material, this._friction, this._bounce ),1 ) }
		  else  { messh = new THREE.Mesh( m, material ) }
		//  obj.add(messh)
		//var s = this._scale;
		//if (scale.length){ messh.scale.set(...scale ); }
		//else 		 { messh.scale.set(scale,scale,scale); }
		messh.rotation.set(	this._rotation[0],	this._rotation[1],	this._rotation[2])
		//messh.position.set(...[0,4,0]);
		messh.position.set(this._position[0],this._position[1],this._position[2]);
	
		  messh.receiveShadow = false;
		  messh.castShadow = true;
		  scene.add( messh );
		
   this.object = messh
	}
	
}
// Sky
export class Sky {
	constructor (options) {
		if(!options){options={}}
		this._type = options.type || 'skybox';
		this._file = options.file || '/assets/img/cube/sky/'
		var re = /(?:\.([^.]+))?$/;
		var tex = options.textures || null;
		var ext = re.exec(this._file)[1];
		console.log(ext);
		
		//||
		//var file = this._file || '/';
		
		// if single file, set to skybox
		if (ext && this._type != 'depth'){ this._type = 'skybox'  }
		else  if  (this._type != 'depth'){ this._type = 'cubemap'; ext = 'jpg'}
			
		if (this._type == 'cubemap'){
			var f = this._file
			ext = 'jpg'
			var images
			//if(this._file.length){
			//	images = this._file
			//} else {
				var images = [ f+'/px.'+ext, f+'/nx.'+ext, f+'/py.'+ext, f+'/ny.'+ext, f+'/pz.'+ext, f+'/nz.'+ext, ];
			//}
			const loader = new THREE.CubeTextureLoader();
			const texture = loader.load(images);
			  scene.background = texture;
		}
		
		else if (this._type == 'depth'){
			const panoSphereGeo = new THREE.SphereBufferGeometry( 6, 256, 256 );
			const panoSphereMat = new THREE.MeshStandardMaterial( {
				side: THREE.BackSide,
				displacementScale: - 4.0
			});
			// Create the panoramic sphere mesh
			sphere = new THREE.Mesh( panoSphereGeo, panoSphereMat );
			manager = new THREE.LoadingManager();
			var loader = new THREE.TextureLoader( manager );
			loader.load( '/assets/textures/kandao3.jpg', function ( texture ) {
				texture.minFilter = THREE.NearestFilter;
				texture.generateMipmaps = false;
				sphere.material.map = texture;
			} );
			loader.load( '/assets/textures/kandao3_depthmap.jpg', function ( depth ) {
				depth.minFilter = THREE.NearestFilter;
				depth.generateMipmaps = false;
				sphere.material.displacementMap = depth;
			} );
			// On load complete add the panoramic sphere to the scene
			manager.onLoad = function () { scene.add( sphere ); };
		}
		else if (this._type == 'skybox'){
			//const loader = new THREE.CubeTextureLoader();
			//const texture = loader.load(images);
			//scene.background = texture;
			const loader = new THREE.TextureLoader();
			  const texture = loader.load(this._file,() => {
				  const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
				  rt.fromEquirectangularTexture(renderer, texture);
				  scene.background = rt;
				});
		}
	}
}
				
const audioSelect = document.querySelector("select#audioSource");
const videoSelect = document.querySelector("select#videoSource");
var videomesh
// Video
export class Video {
	constructor (options) {
		if(!options){options={}}
		this._position 	= options.position 	|| [0,0,0];
		this._rotation 	= options.rotation 	|| [0,0,0];
		this._scale 	= options.scale		|| [1,1,1];
		this._side		= options.side		|| 2;
		var po = this._position
		var ro = this._rotation
		var sc = this._scale
		console.log( sc)
		var si = this._side
		this._type = options.type || 'live'
		var videoElement = document.querySelector("video");
		if(this._type == 'screen'){
			startCapture()
			async function startCapture() {
			  let captureStream = null;

			  try {
				  captureStream = await navigator.mediaDevices.getDisplayMedia({video:true});
				  window.stream = captureStream; videoElement.srcObject = captureStream;
				  
				  videoElement.onloadeddata = function() {
					//if(videomesh){
					var sc =  1//	 video.play()
					// videotexture.needsUpdate = true
					// videomesh.scale.set(7,6,1 );
					// videogeo = new THREE.PlaneGeometry(4,4,1,1)
					// if(video)
					newRatio(video.videoHeight, video.videoWidth)
					// console.log(video.videoHeight, video.videoWidth)
					//videogeo.scale(1* sc,(video.videoHeight / video.videoWidth)* sc,1 );
					// };
					}
			  }
			  catch(err) { console.error(err); }
			  return captureStream;
			}
		}
		if(this._type == 'live'){
			navigator.mediaDevices.enumerateDevices().then(gotDevices).then(getStream).catch(handleError);
			audioSelect.onchange = getStream;
			videoSelect.onchange = getStream;
		  function gotDevices(deviceInfos) {
			for (let i = 0; i !== deviceInfos.length; ++i) {
			  const deviceInfo = deviceInfos[i];
			  const option = document.createElement("option");
			  option.value = deviceInfo.deviceId;
				   if (deviceInfo.kind === "audioinput") { option.text = deviceInfo.label || "microphone " + (audioSelect.length + 1); audioSelect.appendChild(option); }
			  else if (deviceInfo.kind === "videoinput") { option.text = deviceInfo.label || "camera "     + (videoSelect.length + 1); videoSelect.appendChild(option); }
			  else {console.log("Found another kind of device: ", deviceInfo);}
			}
		  }

		  function getStream() {
			if (window.stream) { window.stream.getTracks().forEach(function (track) { track.stop(); }); }
			const constraints = { audio: 'true', video: 'true' };
			navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
		  }

		  function gotStream(stream) { window.stream = stream; videoElement.srcObject = stream; }
		}
		setTimeout(function(){
		this._type = options.type || '2D';
		this._file = options.file || '/assets/video/movie.mov';
	
		//3D VIDEO
		if (this._type == '360'){
			camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2000 );
			camera.layers.enable( 1 ); // render left view when no stereo available
			video = document.getElementById( 'video' );
			video.src = this._file ;
			video.load();
			video.play();
			videotexture = new THREE.Texture( video );
			  //scene = new THREE.Scene();
			  //scene.background = new THREE.Color( 0x101010 );
			  // left
			  const geometry1 = new THREE.SphereBufferGeometry( 500, 60, 40 );
			  // invert the geometry on the x-axis so that all of the faces point inward
			  geometry1.scale( - 1, 1, 1 );
			  const uvs1 = geometry1.attributes.uv.array;
			  for ( let i = 0; i < uvs1.length; i += 2 ) { uvs1[ i ] *= 0.5; }
			  const material1 = new THREE.MeshBasicMaterial( { map: videotexture,side:2} );
			  const mesh1 = new THREE.Mesh( geometry1, material1 );
			  mesh1.rotation.y = - Math.PI / 2;
			  mesh1.layers.set( 1 ); // display in left eye only
			  scene.add( mesh1 );
			  // right
			  const geometry2 = new THREE.SphereBufferGeometry( 500, 60, 40 );
			  geometry2.scale( - 1, 1, 1 );
			  const uvs2 = geometry2.attributes.uv.array;
			  for ( let i = 0; i < uvs2.length; i += 2 ) { uvs2[ i ] *= 0.5; uvs2[ i ] += 0.5; }
			  const material2 = new THREE.MeshBasicMaterial( { map: videotexture,side:2 } );
			  const mesh2 = new THREE.Mesh( geometry2, material2 );
			  mesh2.rotation.y = - Math.PI / 2;
			  mesh2.layers.set( 2 ); // display in right eye only
			  scene.add( mesh2 );
			mesh1.position.set(0,1,0);
			videotexture.needsUpdate = true
		}
		// 2D VIDEO
		else if (this._type == '2D'){
			
			//camera.layers.enable( 1 );
			video = document.getElementById( 'video' );
			//video.play();
			videotexture = new THREE.Texture( video );
			// videotexture.wrapT = 512; videotexture.wrapS = 512;
			videotexture.flipY = true;
			videogeo = new THREE.PlaneGeometry(4,4,1,1)
			videogeo.scale(1* sc,(video.videoHeight / video.videoWidth)* sc,1 );
			const material1 = new THREE.MeshBasicMaterial( { map: videotexture, side:2 } );
			videomesh = new THREE.Mesh( videogeo, material1 );
			videomesh.rotation.y = - Math.PI / 2;
			// videomesh.layers.set( 1 ); // display in left eye only
			videomesh.color = 'white';
			scene.add( videomesh );
			videotexture.needsUpdate = true
			videomesh.position.set(...po);
			videomesh.rotation.set(...ro);
			//mesh1.scale.set(sc,sc,sc);
		}
	}, 2000);
		if(document.getElementById("myFile")){ document.getElementById("myFile").addEventListener("change", changeVideo); }
	}
}

function newRatio(q,w){
	//scene.remove(videomesh)
	mainmenu.remove( videotexture );
	mainmenu.remove( videogeo );
	mainmenu.remove( videomesh );

	var geometry = new THREE.IcosahedronGeometry(1, 6, 6);
	//object = new Physijs.ConvexMesh( geometry, material );
	var objectnk = new THREE.Mesh( geometry, material );

	scene.add( objectnk );
	objectnk.position.z += new THREE.Box3().setFromObject(objectnk).getSize().z * 0.5;

	var sc = 1
	video = document.getElementById( 'video' );
	//video.play();
	videotexture = new THREE.Texture( video );
	// videotexture.wrapT = 512; videotexture.wrapS = 512;
	videotexture.flipY = true;
	videogeo = new THREE.PlaneGeometry(4,4,1,1)
	videogeo.scale(1* sc,(video.videoHeight / video.videoWidth)* sc,1 );
	const material1 = new THREE.MeshBasicMaterial( { map: videotexture, side:2 } );
	videomesh = new THREE.Mesh( videogeo, material1 );
	// mesh1.rotation.y = - Math.PI / 2;
	// mesh1.layers.set( 1 ); // display in left eye only
	// mesh1.color = 'white';
	mainmenu.add( videomesh );
	// videomesh.position.set(...po);
	// videomesh.rotation.set(...ro);
}
					  
export class Button {
	constructor(options){
		if(!options){options={}}
		this._pos = options.position || [0,3,0],
		this._scale = options.scale || [1,0.29],
		this._color = options.color ||'black'
		this._background = options.background || 'grey'
		this._opacity = options.opacity || 1
		this._fontSize = options.fontSize || 0.3
		this._fontColor = options.fontColor || 'black'
		this._hover = options.hover || 'green'

		var ps =  this._pos
		var ac = options.action
		new Plane({
			color:this._color,
			//  scale:[1,0.4],
			position:ps,
			color:this._background,
			scale:this._scale,
			at:mainmenu,
			action:ac,
			name: options.name,
			opacity:this._opacity,
			hover:this._hover
		});
		new Text({ size:this._fontSize, color:this._color,position:[ps[0],(ps[1]-(this._fontSize * 0.4)),ps[2]], text:options.text, material:'basic' })
	}
}

export class Splash {
	constructor(options){
		
	this.length =	options.length  || 1000
		//new Light({position:[0,0,5]})
		//new Light({position:[3,0,-5]})
		//delete3DOBJ('floor');
		if(!options){options={}}
		this._text 		= options.text		|| 'hello';
		this._position 	= options.position 	|| [0,0,0];
		this._rotation 	= options.rotation 	|| [0,0,0];
		this._scale 	= options.scale		|| 0.01;
		var t = this._text
		var s = this._scale
		var p = this._position
		var r = this._rotation
		var thick = options.thickness
		scene.background = new THREE.Color( '#000000');

		var options = {
			text:t,size: 1,
			thickness:thick,
			font:'/assets/fonts/helvetiker_bold.json',
			position:p,
			rotation:r,
			bevel:true,
			href:'https://github.com/xrscript',
			name:'Splash',
			opacity:0,
			transparent:true,
			color:'red'
			//font:'/assets/fonts/Opus_Regular.json'
		}

		//function delete3DOBJ(objName){
		//	var selectedObject = scene.getObjectByName(objName);
		/////	scene.remove( selectedObject );
		//}
		
		var dfgs = new Text(options);
		this.object = dfgs
		
		
		//new TWEEN.Tween( dfgs.background ).to( {r:7,g:7,b:7}, 20 ).start();
		var col = new THREE.Color('#000000');
		//TweenLite.to(dfgs._at.background, 5, { r: col.r, g: col.g,b: col.b });
		//var targetPosition = new THREE.Vector3( 10, 10, 10 );
		//var duration = 500;
			var targetPosition = new THREE.Vector3( 1, 1, 2 );
			var duration = 3000;
			tweenCamera( targetPosition, duration );
		setTimeout(function(){
			var targetPosition = new THREE.Vector3( -1, 1, 2 );
			var duration = 10000;
			tweenCamera( targetPosition, duration );
			//	new TWEEN.Tween(camera.position).to(t, 6).start();
			//	new TWEEN.Tween( targetObject.material ).to( t, dur ).start();
			//	new TWEEN.Tween(  scene.getObjectByName('Splash').material ).to( {opacity:1,  }, 100).start();
			//	new TWEEN.Tween(  scene.getObjectByName('Splash').material ).to( {opacity:0}, 1040).to( {scale:0}, 1000).start();
			//  console.log(scene.getObjectByName('Splash'))
			//	new TWEEN.Tween(  scene.getObjectByName('Splash').material ).to( {scale:0}, 1000).start();
			//  new TWEEN.Tween(scene.getObjectByName('Splash').position).to({scale:0}, 6000).repeat( r ).yoyo(true).start();
			//  new TWEEN.Tween(  scene.getObjectByName('Splash').scale ).to( {  y:   1.5}, 1000 ).easing( TWEEN.Easing.Quadratic.EaseOut).start();
			var col = new THREE.Color('#ffffff');
			//TweenLite.to(dfgs._at.background, 20, { r: col.r, g: col.g, b: col.b, }); }, 3099);
		},78);
	}
}

function tweenCamera( targetPosition, duration ) {
   controls.enabled = false;
   var position = new THREE.Vector3().copy( camera.position );
   var tween = new TWEEN.Tween( position ).to( targetPosition, duration ) .easing( TWEEN.Easing.Cubic.InOut) .onUpdate( function () { camera.position.copy( position ); camera.lookAt( controls.target ); } )
	   .onComplete( function () {
		   camera.position.copy( targetPosition );
		   camera.lookAt( controls.target );
		   controls.enabled = true;
	   })
	   .start();
}

export class Dropdown {
	constructor(options){
		if(!options){options={}}
		console.log(options.options);
		var o = options.options
		//const group = new THREE.Group();
		this._pos = options.position || [0,0,0]
		this._rot = options.rotation || [0,0,0]
		this._color = options.color || 'black'
		this._opacity = options.opacity || 1
		var ps =  this._pos
		// example
		var menuItems = o;
		var fontSize = options.fontSize || 0.2
		var sdfg = this._pos;
		var sdfg1 = this._rot;
		//mainmenu.add(group)
		//group.position.set(...this._pos)
		//mainmenu.rotation.set(...this._rot)
		var oui = this._opacity
		menuItems.forEach(function(e, i) { createMenu(e,i,sdfg,sdfg1, ps,fontSize,oui); });
		/*function dropdownAction(e, href){
		console.log(e)
		//if(href){location.href = href; window.location.replace(href)}
		*/
	}
}
			

export class ScreenRec {
	constructor(options){

	function newRatio(q,w){
		var geometry = new THREE.IcosahedronGeometry(1, 6, 6);
		var material = new THREE.MeshStandardMaterial( { roughness: 0 } );
		var objectnk = new THREE.Mesh( geometry, material );
		scene.add(objectnk);
		objectnk.position.z += new THREE.Box3().setFromObject(objectnk).getSize().z * 0.5;
		var sc = 1;
		video = document.getElementById( 'video' );
		videotexture = new THREE.Texture( video );
		
		// videotexture.wrapT = 512;
		// videotexture.wrapS = 512;
		videotexture.flipY = true;
		videogeo = new THREE.PlaneGeometry(4,4,1,1)
		videogeo.scale(1* sc,(video.videoHeight / video.videoWidth)* sc,1 );
		const material1 = new THREE.MeshBasicMaterial( { map: videotexture, side:2 } );
		videomesh = new THREE.Mesh( videogeo, material1 );
		scene.add( videomesh );
		// videomesh.position.set(...po);
		// videomesh.rotation.set(...ro);
		}
	}
}
var centerOffset1;
						 
export class SVG {
	constructor(options){
		if(!options){options={}}
		this._file 		= options.file 		|| '/assets/svg/tiger.svg';
		this._position 	= options.position 	|| [0,0,0];
		this._scale		= options.scale		|| 0.01;

		var file		= this._file
		var scale		= this._scale;
		var p			= this._position
		var i			= this._intensity;

		loadSVG(this._file);
		
		function loadSVG( url ) {
			var geometry
			const loader = new SVGLoader();
			 loader.load( url, function ( data ) {
				 const paths = data.paths;
				 const group = new THREE.Group();
				 group.scale.multiplyScalar( 0.0025 );
				 // group.position.x = - 1;
				 // group.position.y = 2;
				 group.scale.y *= - 1;
				 for ( let i = 0; i < paths.length; i ++ ) {
					 const path = paths[i];
					 const fillColor = path.userData.style.fill;
					 if (fillColor !== undefined && fillColor !== 'none' ) {
						 const material = new THREE.MeshBasicMaterial( {
							 color: new THREE.Color().setStyle( fillColor ),
							 opacity: path.userData.style.fillOpacity,
							 transparent: path.userData.style.fillOpacity < 1,
							 side: THREE.DoubleSide,
							 depthWrite: false,
						 } );
						 const shapes = path.toShapes( true );
						 for ( let j = 0; j < shapes.length; j ++ ) {
							 const shape = shapes[ j ];
							  geometry = new THREE.ShapeBufferGeometry( shape );
							 const mesh = new THREE.Mesh( geometry, material );
							 geometry.computeBoundingBox();
							 group.add( mesh );
						 }
					 }
					 const strokeColor = path.userData.style.stroke;
					 if ( strokeColor !== undefined && strokeColor !== 'none' ) {
						 const material = new THREE.MeshBasicMaterial( {
							 color: new THREE.Color().setStyle( strokeColor ),
							 opacity: path.userData.style.strokeOpacity,
							 transparent: path.userData.style.strokeOpacity < 1,
							 side: THREE.DoubleSide,
							 depthWrite: false,
						 } );
						 for ( let j = 0, jl = path.subPaths.length; j < jl; j ++ ) {
							 const subPath = path.subPaths[ j ];
							 var geometry1 = SVGLoader.pointsToStroke( subPath.getPoints(), path.userData.style );
							 geometry1.computeBoundingBox();
							 // const centerOffset1 = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
							 if ( geometry1 ) {
								 const mesh = new THREE.Mesh( geometry1, material );
								 group.add( mesh );
							 }
						 }
					 }
				 }

				 scene.add( group );
				// centerOffset1 = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
				 //  group.position.x 	= centerOffset1;
				 centerOffset1 =   ( geometry.boundingBox.max.y - geometry.boundingBox.min.y ) /10 ;
				 group.position.y 	= centerOffset1;
			 } );
		}
	}
}
							  
var currentAction;
var characters = []
export class Character {
	constructor (options){
		if(!options){options={}}
		this._file = options.file || '/assets/models/glb/Soldier.glb';
		
		var acts = this._actions
		var helper = options.helper || false;

		this._index = characters.length
		
		const loader = new GLTFLoader();
		loader.load(this._file, function ( gltf ) {

			model = gltf.scene;
			scene.add( model );

			model.traverse( function ( object ) { if ( object.isMesh ) object.castShadow = true; } );
			skeleton = new THREE.SkeletonHelper( model );
			skeleton.visible = helper;
			scene.add( skeleton );

			// creates a GUI panel
			createPanel(options);

			const animations = gltf.animations;

			// create animation mixer
			mixer = new THREE.AnimationMixer( model );

			idleAction = mixer.clipAction( animations[ 0 ] );
			walkAction = mixer.clipAction( animations[ 3 ] );
			runAction  = mixer.clipAction( animations[ 1 ] );

			actions = [ idleAction, walkAction, runAction ];
			acts = [ idleAction, walkAction, runAction ];

			console.log(acts)
			activateAllActions();
			solderActive = true;
			characters.push([model,actions])
		} );
		
		//characters[this._index].push(this)
	//this.actions = actions;
	//	console.log(this.actions)
	}
			
		pause() {
			characters[0][1].forEach( function ( action ) { action.paused = true; } );
		}
		idle() {
			prepareCrossFade( runAction, idleAction, 0.1 );
			currentAction = 'idleAction';
		}
		walk() {
			characters[0][1].forEach( function ( action ) { action.paused = true; } );
			prepareCrossFade( idleAction, walkAction, 0.1 );
			currentAction = 'walkAction';
		}
		run() {
			characters[0][1].forEach( function ( action ) { action.paused = true; } );
			prepareCrossFade( walkAction, runAction, 0.1 );
			currentAction = 'runAction';
		}
		
		play() {
			characters[0][1].forEach( function ( action ) { action.paused = false; } );
		}
			
		speed(e) {
			mixer.timeScale = e;
		}
}
				
function createPanel(e) {
console.log(e)
	 const panel = new GUI( { width: 310 } );

	 const folder1 = panel.addFolder( 'Visibility' );
	 const folder2 = panel.addFolder( 'Activation/Deactivation' );
	 const folder3 = panel.addFolder( 'Pausing/Stepping' );
	 const folder4 = panel.addFolder( 'Crossfading' );
	 const folder5 = panel.addFolder( 'Blend Weights' );
	 const folder6 = panel.addFolder( 'General Speed' );

	 settings = {
		 'show model'	: true,
		 'show skeleton': e.helper,
		 'deactivate all': deactivateAllActions,
		 'activate all': activateAllActions,
		 'pause/continue': pauseContinue,
		 'make single step': toSingleStepMode,
		 'modify step size': 0.05,
		 'from walk to idle': function () { prepareCrossFade( walkAction, idleAction, 1.0 ); },
		 'from idle to walk': function () { prepareCrossFade( idleAction, walkAction, 0.5 ); },
		 'from walk to run':  function () { prepareCrossFade( walkAction, runAction,  2.5 ); },
		 'from run to walk':  function () { prepareCrossFade( runAction,  walkAction, 5.0 ); },
		 'use default duration': true,
		 'set custom duration': 3.5,
		 'modify idle weight': 0.0,
		 'modify walk weight': 1.0,
		 'modify run weight': 0.0,
		 'modify time scale': 1.0
	 };

	 folder1.add( settings, 'show model' ).onChange( showModel );
	 folder1.add( settings, 'show skeleton' ).onChange( showSkeleton );
	 folder2.add( settings, 'deactivate all' );
	 folder2.add( settings, 'activate all' );
	 folder3.add( settings, 'pause/continue' );
	 folder3.add( settings, 'make single step' );
	 folder3.add( settings, 'modify step size', 0.01, 0.1, 0.001 );
	 crossFadeControls.push( folder4.add( settings, 'from walk to idle' ) );
	 crossFadeControls.push( folder4.add( settings, 'from idle to walk' ) );
	 crossFadeControls.push( folder4.add( settings, 'from walk to run' ) );
	 crossFadeControls.push( folder4.add( settings, 'from run to walk' ) );
	 folder4.add( settings, 'use default duration' );
	 folder4.add( settings, 'set custom duration',  0,  10, 0.01 );
	 folder5.add( settings, 'modify idle weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) { setWeight( idleAction, weight ); } );
	 folder5.add( settings, 'modify walk weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) { setWeight( walkAction, weight ); } );
	 folder5.add( settings, 'modify run weight',  0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) { setWeight( runAction,  weight ); } );
	 folder6.add( settings, 'modify time scale',  0.0, 1.5, 0.01 ).onChange( modifyTimeScale );

	 /* folder1.open(); folder2.open(); folder3.open(); folder4.open(); folder5.open(); folder6.open(); */

	 crossFadeControls.forEach( function ( control ) {
		 control.classList1 = control.domElement.parentElement.parentElement.classList;
		 control.classList2 = control.domElement.previousElementSibling.classList;
		 control.setDisabled = function () { control.classList1.add( 'no-pointer-events' );    control.classList2.add(    'control-disabled' ); };
		 control.setEnabled  = function () { control.classList1.remove( 'no-pointer-events' ); control.classList2.remove( 'control-disabled' ); };
	 } );

 }

function showModel( visibility )    { model.visible = visibility; }
function showSkeleton( visibility ) { skeleton.visible = visibility; }
function modifyTimeScale( speed )   { mixer.timeScale = speed; }


function deactivateAllActions() { actions.forEach( function ( action ) { action.stop(); } ); }

   function activateAllActions() {
	   setWeight( idleAction, settings[ 'modify idle weight' ] );
	   setWeight( walkAction, settings[ 'modify walk weight' ] );
	   setWeight( runAction, settings[ 'modify run weight' ] );
	   actions.forEach( function ( action ) { action.play(); } );

   }

   function pauseContinue() {
	   if ( singleStepMode ) { singleStepMode = false; unPauseAllActions(); }
	   else {
		   if ( idleAction.paused ) { unPauseAllActions(); }
		   else 					{ pauseAllActions();   }
	   }
   }

   function pauseAllActions() {
	   actions.forEach( function ( action ) { action.paused = true; } );
   }

   function unPauseAllActions() {
	   actions.forEach( function ( action ) { action.paused = false; } );
   }

   function toSingleStepMode() {
	   unPauseAllActions();
	   singleStepMode = true;
	   sizeOfNextStep = settings[ 'modify step size' ];
   }

   function prepareCrossFade( startAction, endAction, defaultDuration ) {
	   // Switch default / custom crossfade duration (according to the user's choice)
	   const duration = setCrossFadeDuration( defaultDuration );
	   // Make sure that we don't go on in singleStepMode, and that all actions are unpaused
	   singleStepMode = false;
	   unPauseAllActions();
	   // If the current action is 'idle' (duration 4 sec), execute the crossfade immediately; else wait until the current action has finished its current loop
	   if ( startAction === idleAction ) { executeCrossFade    ( startAction, endAction, duration ); }
	   else 							 { synchronizeCrossFade( startAction, endAction, duration ); }
   }

   function setCrossFadeDuration( defaultDuration ) {
	   // Switch default crossfade duration <-> custom crossfade duration
	   if ( settings[ 'use default duration' ] ) { return defaultDuration; }
	   else 									 { return settings[ 'set custom duration' ]; }
   }

   function synchronizeCrossFade( startAction, endAction, duration ) {
	   mixer.addEventListener( 'loop', onLoopFinished );
	   function onLoopFinished( event ) {
		   if ( event.action === startAction ) {
			   mixer.removeEventListener( 'loop', onLoopFinished );
			   executeCrossFade( startAction, endAction, duration );
		   }
	   }
   }

   function executeCrossFade( startAction, endAction, duration ) {
	   // Not only the start action, but also the end action must get a weight of 1 before fading
	   // (concerning the start action this is already guaranteed in this place)
	   setWeight( endAction, 1 );
	   endAction.time = 0;
	   // Crossfade with warping - you can also try without warping by setting the third parameter to false
	   startAction.crossFadeTo( endAction, duration, true );
   }

   // This function is needed, since animationAction.crossFadeTo() disables its start action and sets
   // the start action's timeScale to ((start animation's duration) / (end animation's duration))

   function setWeight( action, weight ) {
	   action.enabled = true;
	   action.setEffectiveTimeScale( 1 );
	   action.setEffectiveWeight( weight );
   }

   // Called by the render loop
   function updateWeightSliders() {
	   settings[ 'modify idle weight' ] = idleWeight;
	   settings[ 'modify walk weight' ] = walkWeight;
	   settings[ 'modify run weight' ]  = runWeight;
   }

   // Called by the render loop
   function updateCrossFadeControls() {
	   crossFadeControls.forEach( function ( control ) { control.setDisabled(); } );
	   if ( idleWeight === 1 && walkWeight === 0 && runWeight === 0 ) { crossFadeControls[ 1 ].setEnabled(); }
	   if ( idleWeight === 0 && walkWeight === 1 && runWeight === 0 ) { crossFadeControls[ 0 ].setEnabled(); crossFadeControls[ 2 ].setEnabled(); }
	   if ( idleWeight === 0 && walkWeight === 0 && runWeight === 1 ) { crossFadeControls[ 3 ].setEnabled(); }
   }
	var manager = null;

		let skeletonHelper = null;
		const animates = [];
		
		const Models = [];
		const onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				const percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
			}
		};
		const onError = function () {};

// Model Loader
export class Model {
	constructor (options) {
		var model = this;
		if(!options){options={}}
		var file = options.file   || '/assets/models/beethoven.obj';
		var scale = options.scale || [1,1,1];
		if (!scale.length){ scale =[scale,scale,scale]; }
		
		var p = options.position || [0,0,0];
		var r = options.rotation || [0,0,0];
		var o = options.opacity || 1;
		var c = options.color || 'white'
		var mat = options.material || 'standard';
		var re = /(?:\.([^.]+))?$/;
		var tex = options.textures || null;
		
		var castShadow = options.castShadow
		console.log( castShadow)
		if(castShadow == undefined){castShadow = true}
		var receiveShadow = options.receiveShadow || null
		if(receiveShadow == undefined){receiveShadow = true}

		var ext = re.exec(file)[1];   // get file extension
		//ext = '3ds'
		var sf
			const loadingManager = new THREE.LoadingManager( function () { scene.add( sf ); } );
		
		if (ext == 'obj'){
			if (options.mtl){
				let loader = new OBJLoader2();
				const onLoadMtl = function (mtlParseResult) {
					loader.setModelName('space');
					loader.setLogging(true, true);
					loader.addMaterials( MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult), true);
					loader.load(file, callback, null, null, null );
				};
				const mtlLoader = new MTLLoader();
				mtlLoader.load(options.mtl, onLoadMtl );
			} else {
				let loader = new OBJLoader2();
				loader.load(file, callback, null, null, null );
			}
		}
		else if (ext == 'fbx'){
			let loader = new FBXLoader();
			loader.load(file, callback, null, null, null );
		}
		else if (ext == 'md2'){
			let loader = new FBXLoader();
			loader.load(file, callback, null, null, null );
		}
		else if (ext == 'ply'){
			const loader = new PLYLoader();
			loader.load( file, function ( geometry ) {
				geometry.computeVertexNormals();
				const material = new THREE.MeshStandardMaterial( { color:c, flatShading: true } );
				const mesh = new THREE.Mesh( geometry, material );
				callback(mesh)
			} );
		}
		else if (ext == 'nrrd'){
			const loader = new NRRDLoader();
			   loader.load( file, function ( volume ) {

				   //box helper to see the extend of the volume
				   const geometry = new THREE.BoxBufferGeometry( volume.xLength, volume.yLength, volume.zLength );
				   const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
				   const cube = new THREE.Mesh( geometry, material );
				   cube.visible = false;
				   const box = new THREE.BoxHelper( cube );
				   scene.add( box );
				   box.applyMatrix4( volume.matrix );
				   scene.add( cube );
				   const sliceZ = volume.extractSlice( 'z', Math.floor( volume.RASDimensions[ 2 ] / 4 ) ); scene.add( sliceZ.mesh );
				   const sliceY = volume.extractSlice( 'y', Math.floor( volume.RASDimensions[ 1 ] / 2 ) ); scene.add( sliceY.mesh );
				   const sliceX = volume.extractSlice( 'x', Math.floor( volume.RASDimensions[ 0 ] / 2 ) ); scene.add( sliceX.mesh );
			   } );
		}
		else if (ext == '3ds'){
			//3ds files dont store normal maps
			//const normal = new THREE.TextureLoader().load( '/assets/models/3ds/portalgun/textures/normal.jpg' );
			const loader = new TDSLoader();
			loader.setResourcePath(tex);
			loader.load(file, function (object) {
				object.traverse( function (child) { if (child.isMesh) { child.material.specular.setScalar( 0.1 ); /* child.material.normalMap = normal; */ } });
				scene.add( object );
				model.object = object
			});
		}
		
		else if (ext == 'vrm'){//model.object = 'popo'
		// model
		   const loader = new VRMLoader();
		   loader.load( file, function ( vrm ) {
			   // VRMLoader doesn't support VRM Unlit extension yet so converting all materials to THREE.MeshBasicMaterial here as workaround so far.
			   vrm.scene.traverse( function ( object ) {
				   if ( object.material ) {
					   if ( Array.isArray( object.material ) ) {
						   for ( let i = 0, il = object.material.length; i < il; i ++ ) {
							   const material = new THREE.MeshStandardMaterial();
							   THREE.Material.prototype.copy.call( material, object.material[ i ] );
							   material.color.copy( object.material[ i ].color );
							   material.map				= object.material[ i ].map;
							   material.skinning		= object.material[ i ].skinning;
							   material.morphTargets	= object.material[ i ].morphTargets;
							   material.morphNormals	= object.material[ i ].morphNormals;
							   object.material[ i ] = material;
						   }
					   } else {
						   const material = new THREE.MeshStandardMaterial();
						   THREE.Material.prototype.copy.call( material, object.material );
						   material.color.copy( object.material.color );
						   material.map				= object.material.map;
						   material.skinning		= object.material.skinning;
						   material.morphTargets	= object.material.morphTargets;
						   material.morphNormals	= object.material.morphNormals;
						   object.material = material;
					   }
				   }
				   object.castShadow 	= castShadow;
				   object.receiveShadow = receiveShadow;
			   } );
			   sf = vrm.scene
			   scene.add(sf);
			   sf.scale.x = scale[0];
			   sf.scale.y = scale[1];
			   sf.scale.z = scale[2];
			   sf.rotation.set( r[0],r[1], r[2] );
			   model.object = sf
		   } );
		}
			
		// XYZ loader
		else if (ext == 'xyz'){
			const loader = new XYZLoader();
			var points
			loader.load( file, function ( geometry ) {
				geometry.center();
				const material = new THREE.PointsMaterial( { size: 0.1 } );
				points = new THREE.Points( geometry, material );
				points.material.size = 0.2
				scene.add( points );
				points.position.set( p[0],  p[1], p[2] );
				points.rotation.set( r[0],  r[1], r[2]);
				points.scale.set( scale[0], scale[1],scale[2] );
				points.castShadow = true;
				points.receiveShadow = false;
				model.object = points
			});
		}
		// X loader
		else if (ext == 'x'){
			manager = new THREE.LoadingManager();
			manager.onProgress = function ( item, loaded, total ) { /* console.log( item, loaded, total ); */ };
			var loader = new XLoader( manager );
			actions[ 0 ] = {};
			loader.load( [ file ], function ( object ) {
				for ( let i = 0; i < object.models.length; i ++ ) {
					const modelx = object.models[ i ];
					//model.scale.x *= - 1;
					modelx.position.set( p[0],  p[1], p[2] );
					modelx.rotation.set( r[0],  r[1], r[2]);
					modelx.scale.set( scale[0], scale[1],scale[2] );
					Models.push( modelx );
					model.object =  modelx
				}
				loadAnimation( 'stand', 0, () => {
					scene.add( Models[ 0 ] );
					if (Models[ 0 ] instanceof THREE.SkinnedMesh ) {
						skeletonHelper = new THREE.SkeletonHelper( Models[ 0 ] ); scene.add( skeletonHelper );
					}
					actions[ 0 ][ 'stand' ].play();
				});
				object = null;
				
			
			}, onProgress, onError);
			const animationSelection = document.getElementById( 'mech1_anime' );
			animationSelection.addEventListener( 'change', mech1_changeAnime );
		}

		// AMF loader
		else if (ext == 'amf'){
			const loader = new AMFLoader();
			loader.load( file, callback );
		}

		// 3DM loader
		else if (ext == '3dm'){
			const loader = new Rhino3dmLoader();
			//	loader.setLibraryPath( '/assets/models/3dm/Rhino_Logo.3dm' );
			loader.load( file, function ( object ) {
				scene.add( object );
				callback(object)
			} );
		}
		// 3MF loader
		else if (ext == '3mf'){
			manager = new THREE.LoadingManager();
			const loader = new ThreeMFLoader( manager );
			loader.load( file,callback);
		}
		// PCD File
		else if (ext == 'pcd'){
			const loader = new PCDLoader();
			// load a resource
			loader.load( file, function ( points ) {
				scene.add( points );
				// const center = points.geometry.boundingSphere.center;
				// controls.target.set( center.x, center.y, center.z );
				// controls.update();
				console.log(points)
				points.scale.set( 10,10,10)
				points.position.set( -4,-5,-5)
				points.material.needsUpdate = true;
			},
				// called when loading is in progresses
				function ( xhr ) 	{ console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
				function ( error ) 	{ console.log( 'An error happened' ); }
			);

		}
				// PDB File
		else if (ext == 'pdb'){
			// instantiate a loader
			const loader = new PDBLoader();
			const offset = new THREE.Vector3();
			let root;
			// load a PDB resource
			root = new THREE.Group();
			scene.add( root );
			loader.load( file, function ( pdb ) {

					const geometryAtoms = pdb.geometryAtoms;
					const geometryBonds = pdb.geometryBonds;
					const json = pdb.json;
					console.log( 'This molecule has ' + json.atoms.length + ' atoms' );
					var boxGeometry = new THREE.BoxBufferGeometry( 0.2, 0.2, 0.5 );
					var sphereGeometry = new THREE.IcosahedronBufferGeometry( 0.5, 3 );
					 geometryAtoms.computeBoundingBox();
					 geometryAtoms.boundingBox.getCenter( offset ).negate();
					 geometryAtoms.translate( offset.x, offset.y, offset.z );
					 geometryBonds.translate( offset.x, offset.y, offset.z );

					 let positions = geometryAtoms.getAttribute( 'position' );
					 const colors = geometryAtoms.getAttribute( 'color' );

					 const position = new THREE.Vector3();
					 const color = new THREE.Color();

					 for ( let i = 0; i < positions.count; i ++ ) {

						 position.x = positions.getX( i );
						 position.y = positions.getY( i );
						 position.z = positions.getZ( i );

						 color.r = colors.getX( i );
						 color.g = colors.getY( i );
						 color.b = colors.getZ( i );
						 // console.log(positions)
						 const material = new THREE.MeshPhongMaterial( { color: color } );

						 const object = new THREE.Mesh( sphereGeometry, material );
						 object.position.copy( position );
						 object.position.multiplyScalar( 1 );
						 object.scale.multiplyScalar( 1 );
						 root.add( object );

						 const atom = json.atoms[ i ];

						 const text = document.createElement( 'div' );
						 text.className = 'label';
						 text.style.color = 'rgb(' + atom[ 3 ][ 0 ] + ',' + atom[ 3 ][ 1 ] + ',' + atom[ 3 ][ 2 ] + ')';
						 text.textContent = atom[ 4 ];

						 const label = new CSS2DObject( text );
						 label.position.copy( object.position );
						 root.add( label );

					 }

					 positions = geometryBonds.getAttribute( 'position' );

					 const start = new THREE.Vector3();
					 const end = new THREE.Vector3();

					 for ( let i = 0; i < positions.count; i += 2 ) {

						 start.x = positions.getX( i );
						 start.y = positions.getY( i );
						 start.z = positions.getZ( i );

						 end.x = positions.getX( i + 1 );
						 end.y = positions.getY( i + 1 );
						 end.z = positions.getZ( i + 1 );

						 start.multiplyScalar( 1 );
						 end.multiplyScalar( 1 );

						 const object = new THREE.Mesh( boxGeometry, new THREE.MeshPhongMaterial( 0xffffff ) );
						 object.position.copy( start );
						 object.position.lerp( end, 0.5 );
						 object.scale.set( 1, 1, start.distanceTo( end ) );
						 object.lookAt( end );
						 scene.add( object );
					 }
				},
				function ( xhr )   { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
				function ( error ) { console.log(error); }
			);
		}
		else if (ext == 'prwm'){
			// instantiate a loader
			let loader = new PRWMLoader();

			// load a resource
			loader.load( file,
				// called when resource is loaded
				function ( bufferGeometry ) {

					var math =  getMaterial({
						type:mat,
						color: c,
						//	transparent:true,
						opacity:o,
						side: THREE.FrontSide,
						//map:this._map,
						//repeat: options.repeat
					})
					const object = new THREE.Mesh( bufferGeometry, math );
					model.object = object
					scene.add( object );
					object.castShadow = castShadow;
					//object.receiveShadow = receiveShadow;
					object.position.set( p[0],  p[1], p[2] );
					object.rotation.set( r[0],  r[1], r[2]);
					object.scale.set( scale[0], scale[1],scale[2] );
				},
				function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
				function ( error ) { console.log( 'An error happened' ); }
			);
		}
		else if (ext == 'stl'){
			// ASCII file
			const loader = new STLLoader();
			loader.load(file, function ( geometry ) {
			var material
				console.log(geometry)
				if ( geometry.hasColors )	{ material = new THREE.MeshPhongMaterial( { opacity: geometry.alpha, vertexColors: true } );	}
				else 						{ material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } ); }

			const mesh = new THREE.Mesh( geometry, material );
			
				mesh.castShadow = castShadow;
				mesh.receiveShadow = receiveShadow;
				scene.add( mesh );
				model.object = mesh
				mesh.scale.x = scale[0]
				mesh.scale.y = scale[1]
				mesh.scale.z = scale[2]
				mesh.position.set(p[0], p[1],p[2])
				mesh.rotation.set(r[0],r[1],r[2])
			});

		}
						
		// GLTF loader
		else if (ext == 'gltf'){
			const loader = new GLTFLoader();
			loader.load(
				file,
				function ( gltf ) {
					scene.add( gltf.scene );
					gltf.animations; // Array<THREE.AnimationClip>
					var theGLFT = gltf.scene;
					gltf.scene;   // THREE.Group
					gltf.scenes;  // Array<THREE.Group>
					gltf.cameras; // Array<THREE.Camera>
					gltf.asset;   // Object
					theGLFT.scale.x = scale[0];
					theGLFT.scale.y = scale[1];
					theGLFT.scale.z = scale[2];
				
					callback(theGLFT)
				},
				function (xhr)   { /* console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); */ },
				function (error) { /*	console.log( 'An error happened' ); */ }
			);
		}
		// GLB loader
		else if (ext == 'glb'){
				const gltfLoader = new GLTFLoader();
				gltfLoader.load( file, function ( gltf ) {
					const boomBox = gltf.scene;

					boomBox.scale.set( scale[0], scale[1], scale[2] );
					boomBox.traverse( function ( object ) {
						if ( object.isMesh ) {
							object.castShadow = castShadow;
							object.receiveShadow = receiveShadow;
						}
					} );
					scene.add(boomBox)
					//callback(boomBox)
					model.object = boomBox
				} );
		}
		// DAE loader
		else if (ext == 'dae'){
			const loader = new ColladaLoader( loadingManager );
			loader.load( file, function ( collada ) {
				sf = collada.scene;
				var avatar = collada.scene;
				let boxes = [];
				if(collada.animations[0]){
					var animations = collada.animations;
					clock = new THREE.Clock();
					mixerDAE = new THREE.AnimationMixer( avatar );
					mixerDAE.clipAction( animations[ 0 ] ).play();
				}
				//console.log(sf);
				sf.scale.x = scale[0]
				sf.scale.y = scale[1]
				sf.scale.z = scale[2]
				sf.position.set(p[0], p[1],p[2])
				sf.rotation.set(r[0],r[1],r[2])
				sf.traverse( function ( child ) {
					if ( child.isMesh ) {
						child.castShadow = castShadow;
						child.receiveShadow = receiveShadow;
					}
				} );
				model.object = sf
			
			});
		}
		function callback (e){
			sf = e;
			sf.position.set(p[0], p[1],p[2])
			sf.rotation.set(r[0],r[1],r[2])
			scene.add(sf);
			if (scale.length)	{ sf.scale.set(...scale) }
			else 				{ sf.scale.set(scale,scale,scale) }

			// change color, add shadow
			if(e.traverse){
				e.traverse( function ( child ) {
					child.castShadow = castShadow;
					child.receiveShadow = receiveShadow;
					if(child.material){
						// console.log(child.material);
						// if(child.material.color.r)
						if(	child.material.color){child.material.color.set = c;}
					}
					if ( child instanceof THREE.Mesh ) {
						//		child.material.map = texture;
						//child.castShadow = castShadow;
					}
				});
			}
			if (sf.animations){
				mixerFBX = new THREE.AnimationMixer( sf );
				const action = mixerFBX.clipAction( sf.animations[ 0 ] );
				action.play();
			}
			//position
			sf.position.set(p[0], p[1],p[2])
			sf.rotation.set(r[0],r[1],r[2])


			model.object = sf
		}
	}
}
/////////////////////////////////////////////////////////////////////////////////
function loadAnimation( animeName, modelId, _callback ) {
	if (actions[ modelId ][ animeName ]) {
		if (_callback) { _callback(); }
	} else {
		const loader2 = new XLoader( manager );
		loader2.load( [ '/assets/models/x/' + animeName + '.x', { putPos: false, putScl: false } ], function () {
			// !! important!
			// associate divided model and animation.
			loader2.assignAnimation( Models[ modelId ] );
			if (!animates[modelId]) { animates[ modelId ] = Models[ modelId ].animationMixer; }
			actions[ modelId ][ animeName ] = Models[ modelId ].animationMixer.clipAction( animeName );
			if ( animeName == 'stand' ) { actions[ modelId ][ animeName ].setLoop( THREE.LoopOnce ); }
			actions[ modelId ][ animeName ].clampWhenFinished = true;
			if ( _callback ) { _callback(); return; }
			actions[ modelId ][ animeName ].play();
		}, onProgress, onError );

	}

}

function mech1_changeAnime( event ) {
	const val = event.target.value;
	loadAnimation( val, 0, function () {
		Object.keys( actions[ 0 ] ).forEach( function ( p ) {
			if ( p == val ) { actions[ 0 ][ p ].play(); } else { actions[ 0 ][ p ].stop(); }
		} );
	} );
}
// Text
export class Text {
	constructor (options) {
		if(!options){options={}}
		this._text	= options.text	|| 'XR.js';
		this._color = options.color || 0xFFFFFF;
		this._specular 	= options.specular	|| 0xFFFFFF;
		this._size	= options.size	|| 1;
		this._thickness 	= options.thickness	|| 0.008;
		this._opacity 	= options.opacity;
		
		if (this._opacity != undefined){ this._opacity = 1 }
		this._font 	= options.font	|| '/assets/fonts/helvetiker_bold.json';
		this._segments 	= options.segments	|| 12;
		this._position 	= options.position	|| [0,0,0];
		this._name 		= options.name 		|| null;
		this._href 		= options.href 		|| null;
		this._rotation	= options.rotation	|| [0,0,0];
		var b = options.bevel;
		this._at = options.at || scene;
		var o = this._opacity ;
		
		console.log(this._opacity)
		var dafont 		= this._font;
		var texta 		= this._text;
		var thick 		= this._thickness;
		var size 		= this._size;
		var pos 		= this._position;
		var specular 	= this._specular;
		var color 		= this._color;
		var name1 		= this._name;
		var href 		= this._href;
		var r 			= this._rotation;
		var sdfg = this._at
		//var b = this._bevel;
		var segments = this._segments
			const font = new THREE.FontLoader();
			font.load( dafont, function ( font ) {
				const textGeo = new THREE.TextBufferGeometry( texta, {
					font: font,
					size: size,
					height: thick,
					curveSegments: segments,
					bevelEnabled: b,
					bevelThickness: 0.1,
					bevelSize: 0.02,
					bevelOffset:0.01,
					bevelSegments:3,
				});
				textGeo.computeBoundingBox();
				const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
				material = new THREE.MeshPhongMaterial({
					specular: specular,
					color:color,
					transparent:true,
					opacity:1
				});
				text = new THREE.Mesh( textGeo, material );
				text.castShadow 	= true;
				text.receiveShadow 	= false;
				text.name  			= name1;
				text.color 			= color;
				text.href  			= href;
				
				// if 'href' exists, make it clickable
				if (text.href){ mainmenu.add(text); }
				else          { scene.add(text);    }
				text.rotation.set(r[0],r[1],r[2])
				text.position.set(centerOffset + pos[0], pos[1],pos[2])
				//text.name = this._name
				//this.object = text
				//objects.push(mesh);
			});
	}
}

// Expload
export class Expload {
	constructor (options) {
		for ( let i = 0; i < 100; i ++ ) {
			var	material = new THREE.MeshBasicMaterial({
				color: Math.random() * 0xffffff,
				roughness: Math.random() * 1,
			});
			// Materials
			var ground_material = Physijs.createMaterial(material, 0, 1 );
			var text = new Physijs.ConvexMesh( new THREE.OctahedronGeometry( 0.1, 2 ), ground_material, 1 );
			text.position.y 	= 8;
			text.castShadow 	= false;
			text.receiveShadow 	= false;
			scene.add(text);
		}
	}
}

// hinge
export class Hinge {
	constructor (options) { if(!options){options={}}
		
		var bullet = new THREE.BoxGeometry( 4, 4, 4 );
		
		var hing,hing1;
		material = Physijs.createMaterial(new THREE.MeshLambertMaterial({ }),.2,.5);
		hing = new Physijs.BoxMesh( bullet, material );
		scene.add( hing );
		
		hing1 = new Physijs.BoxMesh( bullet, material,1);
		hing1.position.set(0,35,3);
		hing.position.set(0,35,-3);
		scene.add( hing1 );
		
		var constrainty = new Physijs.HingeConstraint(
			hing, // First object to be constrained
			hing1, // OPTIONAL second object - if omitted then physijs_mesh_1 will be constrained to the scene
			new THREE.Vector3( 0, 2, 0 ), // point in the scene to apply the constraint
			new THREE.Vector3( 0,0, 2 ) // Axis along which the hinge lies -
		);
		scene.addConstraint( constrainty );
		
	}
			
}
// slider
 export class Slider {
	 constructor (options) {
		 
		 var bullet = new THREE.BoxGeometry( 1, 1, 1 );
		 
		 var physijs_mesh_a, material;
		 material = Physijs.createMaterial(new THREE.MeshLambertMaterial({ }),.2,.5);
		 physijs_mesh_a = new Physijs.BoxMesh( bullet, material );
		 scene.add( physijs_mesh_a );
		 //var physijs_mesh_b;
		 //physijs_mesh_b = new Physijs.BoxMesh( bullet, material,1);
		 // hing.position.set(0,35,-3)
		 //scene.add( physijs_mesh_b);
		 var constraint = new Physijs.SliderConstraint(
			 physijs_mesh_a, // First object to be constrained
		//	 physijs_mesh_b, // OPTIONAL second object - if omitted then physijs_mesh_1
			 new THREE.Vector3( 0, 10, 0 ), // point in the scene to apply the constraint
			 new THREE.Vector3( 10, 0, 0 ) // Axis along which the hinge lies -
										  // in this case it is the X axis
		 );
		 scene.addConstraint( constraint );
		 constraint.setLimits(
			 1,  // lower limit of linear movement,  expressed in world units
			 10, // upper limit of linear movement,  expressed in world units
			 0,  // lower limit of angular movement, expressed in radians
			 0   // upper limit of angular movement, expressed in radians
		 );
		 //constraint.setRestitution(
		//	 linear, // amount of restitution when reaching the linear limits
		//	 angular // amount of restitution when reaching the angular limits
		 //);
		// constraint.enableLinearMotor( target_velocity, acceration_force );
		// constraint.disableLinearMotor();
		// constraint.enableAngularMotor( target_velocity, acceration_force );
		// constraint.disableAngularMotor();
	 }
			 
 }
					
					
var soundPlayer;
var listener;var audioFile;
// Audio
export class Audio {
	constructor (options) {
		if(!options){options={}}
		listener = new THREE.AudioListener();
		camera.add( listener );
		this._gain 		= options.gain 		|| 1;
		this._file		= options.file 		|| '/assets/audio/fur_elise.mp3';
		this._loop 		= options.loop 		|| false;
		this._detune 	= options.detune 	|| 0;
		this._rate 		= options.rate 		|| 1;
		this._rolloff 	= options.rolloff 	|| 1;
		this._distance 	= options.distance 	|| 1;
		this._analyser 	= options.analyser 	|| false;
		var loop 		= this._loop;
		var detune 		= this._detune;
		var gain 		= this._gain;
		var rate		= this._rate;
		var rolloff 	= this._rolloff;
		var distance 	= this._distance;
		audioFile 		= this._file
		
		if(this._type == 'live'){
		// listen for first click, then remove the listener
		document.addEventListener("click", firstClick);
		}
		else{ document.addEventListener("click", setupAudioListener); }
		

	}
}
// cross browser AudioContext setup
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext
var mediaIn
var audioBuffer,audiosrc
var audioElement = document.getElementById('audioElement')
					
function firstClick(e) {
var audioContext = new AudioContext();
			//navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(getStream).catch(handleError);
	//		startCapture()
	var audioelm = document.querySelector("audio");
	soundPlayer.setMediaElementSource(audioelm)
	soundPlayer.play();
	document.removeEventListener("click", firstClick);
//	if (this._type == 'live'){
	// navigator.mediaDevices.enumerateDevices().then(gotDevices).then(getStream).catch(handleError);
	//	audioSelect.onchange = getStream;
	//	videoSelect.onchange = getStream;
function gotDevices(deviceInfos) {
	for (let i = 0; i !== deviceInfos.length; ++i) {
		const deviceInfo = deviceInfos[i];
		const option = document.createElement("option");
		option.value = deviceInfo.deviceId;
		     if (deviceInfo.kind === "audioinput") { option.text = deviceInfo.label || "microphone " + (audioSelect.length + 1); audioSelect.appendChild(option);}
		else if (deviceInfo.kind === "videoinput") { option.text = deviceInfo.label || "camera "     + (videoSelect.length + 1); videoSelect.appendChild(option);}
		else { console.log("Found another kind of device: ", deviceInfo);
		}
	}
}

function getStream() {
	if (window.stream) {window.stream.getTracks().forEach(function (track) { track.stop(); });}
	const constraints = { audio: 'true' };
	// navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
}
	
function gotStream(stream) {
	window.stream = stream;
	audioElement.srcObject = stream;
	mediaIn = audioContext.setMediaElementSource(audioElement);
	// var aufioin = mediaIn
	// soundPlayer.play()
	 
	 audioElement.play()
	 var mybuffer = stream;
	 audioBuffer = audioContext.createBuffer(1, 400000, audioContext.sampleRate);
	 audioBuffer.getChannelData(0).set( mybuffer );
	 audiosrc = audioContext.createBufferSource();
	 audiosrc.buffer = audioBuffer;
	 audiosrc.start(0);
	 // audiosrc.connect(micGain);
	 soundPlayer.setBuffer( audioBuffer );
	// soundPlayer.play()
}
	//} else {
		/*
		// load a soundPlayer and set it as the PositionalAudio object's buffer
		const audioLoader = new THREE.AudioLoader();
		audioLoader.load( 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Bruckner_Symphony_No._5%2C_opening.wav', function( buffer ) {
			soundPlayer.setBuffer( buffer );
		//	soundPlayer.setLoop( loop );
		//	soundPlayer.detune = detune;
		//	soundPlayer.setPlaybackRate(rate);
			soundPlayer.setRefDistance( 1 );
			soundPlayer.setRolloffFactor( 60 );

			setTimeout(function(){
				soundPlayer.play();
			   }, 3020);
		});*/
	//}
}

// listen for key presses
$(document).on('keydown', function(e){
   /* ESC key */ if(e.keyCode == 27){ if((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) { document.exitFullscreen(); } else { } }
   /* ALT Key */ else if(e.altKey){ /* Toggle Fullscreen (⌘ F) */ if (e.keyCode == 70) { e.stopPropagation(); e.preventDefault(); toggleFullscreen(); } }
});

function setupAudioListener(f) {
	document.removeEventListener("click", setupAudioListener);
	const reflectionCube = new THREE.CubeTextureLoader().setPath( '/assets/img/cube/castle/' ).load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
	const grid = new THREE.GridHelper( 50, 50, 0x888888, 0x888888 );
	scene.add( grid );
	soundPlayer = new THREE.PositionalAudio( listener );
	audioLoader.load( audioFile, function( buffer ) {
		soundPlayer.setBuffer( buffer );
		soundPlayer.setLoop( true );
		// soundPlayer.detune = 1200;
		// soundPlayer.setPlaybackRate(0.5);
		// soundPlayer.setRolloffFactor( 0.5 );
		soundPlayer.setRefDistance( 1 );
		soundPlayer.setDirectionalCone( 180, 230, 0.1 );
		soundPlayer.play();
		const helper = new PositionalAudioHelper( soundPlayer, 0.1 );
		soundPlayer.add( helper );

		const gltfLoader = new GLTFLoader();
		gltfLoader.load( '/assets/models/glb/BoomBox.glb', function ( gltf ) {
			const boomBox = gltf.scene;
			boomBox.position.set( 0, 0.2, 0 );
			boomBox.scale.set( 20, 20, 20 );
			boomBox.traverse( function ( object ) {
				if ( object.isMesh ) {
					object.material.envMap = reflectionCube;
					object.geometry.rotateY( - Math.PI );
					object.castShadow = true;
				}
			} );
			boomBox.add( soundPlayer );
			scene.add( boomBox );
			//animate();
		} );
		// soundPlayer is damped behind this wall
		const wallGeometry = new THREE.BoxBufferGeometry( 2, 1, 0.1 );
		const wallMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true, opacity: 0.5 } );

		const wall = new THREE.Mesh( wallGeometry, wallMaterial );
		wall.position.set( 0, 0.5, - 0.5 );
		scene.add( wall );
		//	setTimeout(function(){ }, 1020);
		//	soundPlayer.play();
	});

}

// Shapes
export class Shapes {
	constructor (options) {
		if(!options){options={}}
		this._scale 	= options.scale 	|| [1,1];
		this._color 	= options.color 	|| 0xffffff;
		this._side 		= options.side 		|| "both";
		this._material 	= options.material 	|| "lambert";
		this._position 	= options.material 	|| [0,1,0];

		var  group = new THREE.Group();
		scene.add( group );

		const geometries = [
			//  new THREE.BoxBufferGeometry( 0.2, 0.2, 0.2 ),
			//  new THREE.ConeBufferGeometry( 0.2, 0.2, 64 ),
			new THREE.SphereBufferGeometry( 2, 64,64, 64 ),
			//   new THREE.IcosahedronBufferGeometry( 0.2, 8 ),
			//   new THREE.TorusBufferGeometry( 0.2, 0.04, 64, 32 )
		];

		for ( let i = 0; i <300; i ++ ) {
		//console.log("asdg")

		const geometry = geometries[ Math.floor( Math.random() * geometries.length ) ];
		var material = new THREE.MeshStandardMaterial( {
			color: 0xffffff,
			//roughness: Math.random() * 1,
			roughness: 0,
		});
		
		const object = new THREE.Mesh( geometry, material );
		object.position.x = Math.random() * 80 - 40;
		object.position.y = Math.random() * 80 - 40;
		object.position.z = Math.random() * 80 - 40;
		// object.rotation.x = Math.random() * 2 * Math.PI;
		// object.rotation.y = Math.random() * 2 * Math.PI;
		// object.rotation.z = Math.random() * 2 * Math.PI;
		// object.scale.setScalar( Math.random() + 0.01 );
		object.castShadow    = false;
		object.receiveShadow = false;
		group.add( object );
		}
	}
}



function changeVideo() {
	video = document.getElementById( 'video' );
	video.pause();
	video = false;
	var chosenFile = document.getElementById("myFile").files[0];
	document.getElementById("video").setAttribute("src", URL.createObjectURL(chosenFile));
	var sc = 2;
	document.getElementById("video").onloadeddata = function() {
		if(videomesh){
			var sc =  1;
			// video.play()
			// videotexture.needsUpdate = true
			if(videomesh){
				videomesh.scale.set(7,6,1 );
				videogeo = new THREE.PlaneGeometry(4,4,1,1)
				newRatio(video.videoHeight, video.videoWidth)
				console.log(video.videoHeight, video.videoWidth)
				videogeo.scale(1* sc,(video.videoHeight / video.videoWidth)* sc,1 );
			}
			
			videotexture.flipY = true;
			videogeo		= new THREE.PlaneGeometry(4,4,1,1)
			var material1	= new THREE.MeshBasicMaterial( { map: videotexture, side:2 } );
			var mesh1		= new THREE.Mesh( videogeo, material1 );
			scene.add(mesh1)
		}
	}
}
// Accelerometer
var acelFunction;

export class Accelerometer{
	constructor (options){
		if(!options){options={}}
		acelFunction = options;
		acelFunction.scale = options.scale || [-1,1]
		document.addEventListener("click", this.start, {once: true});
	}
	start(){
		DeviceOrientationEvent.requestPermission().then(response => {
			if (response == 'granted') {
				window.addEventListener('devicemotion', (e) => {
					acelFunction.action(scaleVector(-9.81,9.81,acelFunction.scale[0],acelFunction.scale[1],e.accelerationIncludingGravity));
					//console.log(e.rotationRate); // provided in °/sec // data specifying the device’s rate of rotation around three axes. The value of this property contains a measurement of gyroscope data whose bias has been removed by Core Motion algorithms.
				});
			}
		}).catch(handleError)
	}
}

// Gyroscope
var gyroFunction;
export class Gyroscope{
	constructor (options){
		if(!options){options={}}
		gyroFunction = options;
		gyroFunction.scale = options.scale || [-1,1];
		document.addEventListener("click", this.start , {once: true});
	}
	start(){
		DeviceOrientationEvent.requestPermission().then(response => {
			if (response == 'granted') {
				window.addEventListener('devicemotion', (e) => {
					//gyroFunction.action(scaleVector(-15,15,gyroFunction.scale[0],gyroFunction.scale[1],e.acceleration)); // returns meters per second squared (m/s2).
					gyroFunction.action(e.acceleration); // returns meters per second squared (m/s2).
					//console.log(e.rotationRate); // provided in °/sec // data specifying the device’s rate of rotation around three axes. The value of this property contains a measurement of gyroscope data whose bias has been removed by Core Motion algorithms.
			  })
		  }
	  }).catch(handleError)

	}
}

// Compass
var compassFunction;
export class Compass{
	constructor (options){
		if(!options){options={}}
		compassFunction = options
		document.addEventListener("click", this.start, {once: true});
	}
	start(){
	  DeviceOrientationEvent.requestPermission().then(response => {
		  if (response == 'granted') {
			  window.addEventListener('deviceorientation', (e) => { compassFunction.action(e); })
		  }
	  }).catch(handleError)
  }
}



function handleError(error) { console.log(error); }
			
// ========== MISC ========== //
// Car
var ground_material, car_material, wheel_material, wheel_geometry, ground, car = {};
export class Car {
	constructor (options) {
		
		if(!options){options={}}
		this._color 	= options.color 	|| 0xffffff;
		this._wheel 	= options.wheel 	|| 0x222222;
		this._speed 	= options.speed	    || 5;

		var carspeed = this._speed;
		
		loader = new THREE.TextureLoader();
		car_material   = Physijs.createMaterial( new THREE.MeshLambertMaterial({ color: this._color }),1, .2 );
		wheel_material = Physijs.createMaterial( new THREE.MeshLambertMaterial({ color: this._wheel }), 1, .5 );
		wheel_geometry = new THREE.CylinderGeometry( 2, 2, 1, 10 );
		car.body = new Physijs.BoxMesh( new THREE.BoxGeometry( 10, 3, 7 ), car_material, 100 );
		car.body.position.y = 8;
		// car.body.receiveShadow = ]
		car.body.castShadow = true;
		scene.add( car.body );

		car.wheel_fl = new Physijs.CylinderMesh( wheel_geometry, wheel_material, 500 );
		car.wheel_fl.rotation.x = Math.PI / 2;
		car.wheel_fl.position.set( -3.5, 6.5, 5 );
		car.wheel_fl.castShadow = true;
		scene.add( car.wheel_fl );
		car.wheel_fl_constraint = new Physijs.DOFConstraint( car.wheel_fl, car.body, new THREE.Vector3( -3.5, 6.5, 5 ) );
		scene.addConstraint( car.wheel_fl_constraint );
		car.wheel_fl_constraint.setAngularLowerLimit({ x: 0, y: -Math.PI / 8, z: 1 });
		car.wheel_fl_constraint.setAngularUpperLimit({ x: 0, y:  Math.PI / 8, z: 0 });

		car.wheel_fr = new Physijs.CylinderMesh( wheel_geometry, wheel_material, 500 );
		car.wheel_fr.rotation.x = Math.PI / 2;
		car.wheel_fr.position.set( -3.5, 6.5, -5 );
		car.wheel_fr.receiveShadow = car.wheel_fr.castShadow = true;
		scene.add( car.wheel_fr );
		car.wheel_fr_constraint = new Physijs.DOFConstraint( car.wheel_fr, car.body, new THREE.Vector3( -3.5, 6.5, -5 ) );
		scene.addConstraint( car.wheel_fr_constraint );
		car.wheel_fr_constraint.setAngularLowerLimit({ x: 0, y: -Math.PI / 8, z: 1 });
		car.wheel_fr_constraint.setAngularUpperLimit({ x: 0, y:  Math.PI / 8, z: 0 });

		car.wheel_bl = new Physijs.CylinderMesh( wheel_geometry, wheel_material, 500 );
		car.wheel_bl.rotation.x = Math.PI / 2;
		car.wheel_bl.position.set( 3.5, 6.5, 5 );
		car.wheel_bl.receiveShadow = car.wheel_bl.castShadow = true;
		scene.add( car.wheel_bl );
		car.wheel_bl_constraint = new Physijs.DOFConstraint( car.wheel_bl, car.body, new THREE.Vector3( 3.5, 6.5, 5 ) );
		scene.addConstraint( car.wheel_bl_constraint );
		car.wheel_bl_constraint.setAngularLowerLimit({ x: 0, y: 0, z: 0 });
		car.wheel_bl_constraint.setAngularUpperLimit({ x: 0, y: 0, z: 0 });

		car.wheel_br = new Physijs.CylinderMesh( wheel_geometry, wheel_material, 500 );
		car.wheel_br.rotation.x = Math.PI / 2;
		car.wheel_br.position.set( 3.5, 6.5, -5 );
		car.wheel_br.receiveShadow = car.wheel_br.castShadow = true;
		scene.add( car.wheel_br );
		car.wheel_br_constraint = new Physijs.DOFConstraint( car.wheel_br, car.body, new THREE.Vector3( 3.5, 6.5, -5 ) );
		scene.addConstraint( car.wheel_br_constraint );
		car.wheel_br_constraint.setAngularLowerLimit({ x: 0, y: 0, z: 0 });
		car.wheel_br_constraint.setAngularUpperLimit({ x: 0, y: 0, z: 0 });
		   
		   document.addEventListener( 'keydown', function( ev ) {
				   switch( ev.keyCode ) {
					   case 37: // left
						   car.wheel_fl_constraint.configureAngularMotor(1, -Math.PI/2, Math.PI/2, 1, 200);
						   car.wheel_fr_constraint.configureAngularMotor(1, -Math.PI/2, Math.PI/2, 1, 200);
						   car.wheel_fl_constraint.enableAngularMotor(1);
						   car.wheel_fr_constraint.enableAngularMotor(1);
						   break;
					   case 39: // right
						   car.wheel_fl_constraint.configureAngularMotor(1, -Math.PI/2, Math.PI/2, -1, 200);
						   car.wheel_fr_constraint.configureAngularMotor(1, -Math.PI/2, Math.PI/2, -1, 200);
						   car.wheel_fl_constraint.enableAngularMotor( 1 );
						   car.wheel_fr_constraint.enableAngularMotor( 1 );
						   break;
					   case 38: // up
						   car.wheel_bl_constraint.configureAngularMotor(2, 1, 0, carspeed, 2000);
						   car.wheel_br_constraint.configureAngularMotor(2, 1, 0, carspeed, 2000);
						   car.wheel_bl_constraint.enableAngularMotor(2);
						   car.wheel_br_constraint.enableAngularMotor(2);
						   break;
					   case 40: // down
						   car.wheel_bl_constraint.configureAngularMotor(2, 1, 0, -1 * carspeed, 2000);
						   car.wheel_br_constraint.configureAngularMotor(2, 1, 0, -1 * carspeed, 2000);
						   /* constraint.configureAngularMotor(
							   which, // which angular motor to configure - 0,1,2 match x,y,z
							   low_limit, // lower limit of the motor
							   high_limit, // upper limit of the motor
							   velocity, // target velocity
							   max_force // maximum force the motor can apply
						   );*/
						   car.wheel_bl_constraint.enableAngularMotor(2); // which angular motor to configure - 0,1,2 match x,y,z
						   car.wheel_br_constraint.enableAngularMotor(2);
						   break;
				   }
			   }
		   );
		   
		   document.addEventListener( 'keyup', function( ev ) {
				   switch( ev.keyCode ) {
					   case 37:car.wheel_fl_constraint.disableAngularMotor( 1 );car.wheel_fr_constraint.disableAngularMotor( 1 );break;
					   case 39:car.wheel_fl_constraint.disableAngularMotor( 1 );car.wheel_fr_constraint.disableAngularMotor( 1 );break;
					   case 38:car.wheel_bl_constraint.disableAngularMotor( 2 );car.wheel_br_constraint.disableAngularMotor( 2 );break;
					   case 40:car.wheel_bl_constraint.disableAngularMotor( 2 );car.wheel_br_constraint.disableAngularMotor( 2 );break;
				   }
			   }
		   );
}
}
// Pendulum
export class Pendulum{
	constructor (options){
		if(!options){options={}}
		var balls 		= options.balls 	|| 12;
		var radius 		= options.radius 	|| 0.3;
		var speed 		= options.speed 	|| 1.5;
		var distance 	= options.distance 	|| 0.7;
		var length 		= options.length 	|| 0;
		var power 		= options.power 	|| 0.3;

	   const meshes = []
	   const matcap = new THREE.TextureLoader().load('/assets/textures/matcap.png')
	   const init = () => {
		   for (let i = 0; i < balls; i++) {
			   const group = new THREE.Group()
			   scene.add(group)
			   const ballGeo = new THREE.SphereBufferGeometry(radius, 32, 32)
			   const ballMat = new THREE.MeshMatcapMaterial( { matcap: matcap })
			   const ball = new THREE.Mesh( ballGeo, ballMat )
			   ball.position.y = -6 - length
			   ball.castShadow = true
			   ball.receiveShadow = true
			   group.add( ball )

			   const hairGeo = new THREE.CylinderBufferGeometry(.006, .006, 8 + length,  32)
			   const hairMat = new THREE.MeshPhongMaterial( { color: 0xcccccc })
			   const hair = new THREE.Mesh( hairGeo, hairMat )
			   hair.position.y = -2
			   group.add( hair )
			   group.position.x = -3. + i * distance
			   group.position.y = 6
			   gsap.fromTo(group.rotation, { x: -1 * power, }, { duration: speed, x: power, repeat: -1, ease: 'power1.inOut', yoyo: true, delay: i * 0.1 })
			   meshes.push(group)
		   }
	   }
	   init();
	}
}
var multiplayerHead;

var initEventHandling, createTower, jengaOptions = {}, loader, table, blocks = [], table_material, block_material, intersect_plane, selected_block = null, mouse_position = new THREE.Vector3, block_offset = new THREE.Vector3, _i, _v3 = new THREE.Vector3;

// Jenga
export class Jenga {
	constructor (options) {
		controls.enabled = false;
		if(!options){options={}}
		this.rows = options.rows || 16
		this.block = options.block|| [1.5,1, 6]
		jengaOptions = {
			rows: this.rows,
			block:this.block,
		}
		//jengaRows = this.rows
		//scene = new Physijs.Scene({ fixedTimeStep: 1 / 120 });
		//scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
		scene.addEventListener('update',function() {
			if ( selected_block !== null ) {
				_v3.copy( mouse_position ).add( block_offset ).sub( selected_block.position ).multiplyScalar( 5 );
				_v3.y = 0;
				selected_block.setLinearVelocity( _v3 );
				// Reactivate all of the blocks
				_v3.set( 0, 0, 0 ); for ( _i = 0; _i < blocks.length; _i++ ) {blocks[_i].applyCentralImpulse( _v3 );}
			}
		});

		table_material = Physijs.createMaterial(new THREE.MeshLambertMaterial(), .9, .2 );
		block_material = Physijs.createMaterial(new THREE.MeshLambertMaterial(), .4, .4 );

		// Table
		var  table = new Physijs.BoxMesh(new THREE.BoxGeometry(50, 1, 50),table_material, 0, { restitution: .2, friction: .8 } );
		table.position.y = -.5;
		table.receiveShadow = true;
		scene.add( table );
		//camera.position.set( 25, 20, 25 );
		//camera.lookAt(new THREE.Vector3( 0, 7, 0 ));
		setTimeout(function () { createTower(); }, 1000);

	   intersect_plane = new THREE.Mesh(
		   new THREE.PlaneGeometry( 150, 150 , 150 , 150 ),
		   new THREE.MeshBasicMaterial({ opacity: 0.1, transparent: true,wireframe:true })
	   );
	   intersect_plane.rotation.x = Math.PI / -2;
	   scene.add( intersect_plane );

	   initEventHandling();
	   
	  // requestAnimationFrame( render );
	  // scene.simulate();
			
		var createTower = (function() {
			//console.log(jengaOptions.block)
			var block_length = jengaOptions.block[2],
			block_height =  jengaOptions.block[1],
			block_width =  jengaOptions.block[0],
			block_offset = 2,
			block_geometry = new THREE.BoxGeometry( block_length, block_height, block_width );
			// var erty = o.rows
			
			return function() {
				var i, j, rows = jengaOptions.rows, block;
				//	console.log(erty)
				for ( i = 0; i < rows; i++ ) {
					for ( j = 0; j < 3; j++ ) {
						block = new Physijs.BoxMesh( block_geometry, block_material );
						block.position.y = (block_height / 2) + block_height * i;
						if ( i % 2 === 0 ) {
							block.rotation.y = Math.PI / 2.01; // #TODO: There's a bug somewhere when this is to close to 2
							block.position.x = block_offset * j - ( block_offset * 3 / 2 - block_offset / 2 );
						}
						else { block.position.z = block_offset * j - ( block_offset * 3 / 2 - block_offset / 2 ); }
						block.receiveShadow = true;
						block.castShadow = true;
						scene.add( block );
						blocks.push( block );
					}
				}
			}
	 })();
}
}
initEventHandling = (function() {//console.log('sdf')
	var _vector = new THREE.Vector3, handleMouseDown, handleMouseMove, handleMouseUp;
	   handleMouseDown = function( e ) {e.preventDefault();console.log('sdf')
		   var ray, intersections;
		   _vector.set( ( e.clientX / window.innerWidth ) * 2 - 1, -( e.clientY / window.innerHeight ) * 2 + 1, 1 );
		   _vector.unproject( camera );
		   ray = new THREE.Raycaster( camera.position, _vector.sub( camera.position ).normalize() );
		   intersections = ray.intersectObjects( blocks );
		   if ( intersections.length > 0 ) {
			   selected_block = intersections[0].object;
			   _vector.set( 0, 0, 0 );
			   selected_block.setAngularFactor( _vector );
			   selected_block.setAngularVelocity( _vector );
			   selected_block.setLinearFactor( _vector );
			   selected_block.setLinearVelocity( _vector );
			   if (intersections[0]){
				   mouse_position.copy( intersections[0].point );
				   block_offset.subVectors( selected_block.position, mouse_position );
			   }
			   intersect_plane.position.y = mouse_position.y;
		   }
	   };
	   
	   handleMouseMove = function( e ) {
		   var ray, intersection, i, scalar;
		   if ( selected_block !== null ) {
			   _vector.set( (e.clientX / window.innerWidth  ) * 2 - 1, -(e.clientY / window.innerHeight ) * 2 + 1, 1 );
			   _vector.unproject( camera );
			   ray = new THREE.Raycaster( camera.position, _vector.sub( camera.position ).normalize() );
			   intersection = ray.intersectObject( intersect_plane );
				if( intersection[0]){ mouse_position.copy( intersection[0].point ); }
		   }
		   
	   };
	   
	   handleMouseUp = function( e ) {
		   e.preventDefault()
		   if ( selected_block !== null ) {
			   _vector.set(1,1,1);
			   selected_block.setAngularFactor(_vector);
			   selected_block.setLinearFactor(_vector);
			   selected_block = null;
		   }
	   };
	   
	   return function() {
			document.addEventListener( 'mousedown', handleMouseDown );
			document.addEventListener( 'mousemove', handleMouseMove );
			document.addEventListener( 'mouseup',   handleMouseUp );
	   };
   })();
 //var messh

// Mixer
export class Mixer {
	constructor (options) {
		if(!options){options={}}
		let mesh;
		// Create an AnimationMixer, and get the list of AnimationClip instances
		const mixer = new THREE.AnimationMixer( mesh );
		const clips = mesh.animations;
		// Update the mixer on each frame
		function update () { mixer.update( deltaSeconds ); }

		// Play a specific animation
		const clip = THREE.AnimationClip.findByName( clips, 'dance' );
		const action = mixer.clipAction( clip );
		action.play();

		// Play all animations
		clips.forEach( function ( clip ) {
			mixer.clipAction( clip ).play();
		} );
	}
}
