var version = require('./version.json');
console.log('green abyss client bundle version: ' + version.gitIdString);

window.THREE = require('three');

require('three/examples/js/controls/VRControls');
require('three/examples/js/effects/VREffect');
require('vendor/SkyShader');

var WebVRPolyfill = require('webvr-polyfill');
var App = require('ThreeAppBase');
var GameWorld = require('GameWorld');
var googleApi = require('./googleApi');
var onVR = require('utils/devices/onVR');

googleApi.init({
	client_id: '1003887978766-ks5t12lss4gehrtbvcidpau0lj6vs0nf.apps.googleusercontent.com'
});

function onLoad() {
	var app = new App();

	var gameWorld = new GameWorld({
		scene: app.scene,
		renderer: app.renderer
	});
	function onVRChangeCamera(state) {
		app.camera = state ? gameWorld.cameraFirstPerson : gameWorld.cameraThirdPerson;
	}
	onVR(onVRChangeCamera);
	app.registerOnEnterFrame(gameWorld.onEnterFrame.bind(gameWorld));
	app.registerOnResize(gameWorld.onResize.bind(gameWorld));

}

window.addEventListener('load', onLoad);
