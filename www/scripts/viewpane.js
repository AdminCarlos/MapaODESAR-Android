var Viewpane=function(t){function e(o){if(i[o])return i[o].exports;var n=i[o]={exports:{},id:o,loaded:!1};return t[o].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var i={};return e.m=t,e.c=i,e.p="/dist",e(0)}([function(t,e,i){t.exports=i(1)},function(t,e,i){"use strict";var o=i(2),n=i(14),s=i(6),r=i(3),a=i(13);o.Entity=n,o.Loop=s,o.Vector=r,o.FOCUS_TYPE=a,t.exports=o},function(t,e,i){"use strict";function o(t){return t&&"[object String]"===Object.prototype.toString.call(t)?document.getElementById(t):t&&t.tagName?t:null}function n(t,e,i){h.call(this,[n.EVENT_CLICK,n.EVENT_UPDATE,n.EVENT_RENDER,n.EVENT_START,n.EVENT_STOP,n.EVENT_END]),t=o(t),e=o(e);var p=this,l=new a(e),f=e.getBoundingClientRect(),d=i.focus||c.create(f.width,f.height,0);this.scene=new r(t,d,i),this.scene.addObserver(r.EVENT_UPDATE,function(t){p.notify(n.EVENT_UPDATE,t)}),this.scene.addObserver(r.EVENT_RENDER,function(t){p.notify(n.EVENT_RENDER,t)}),this.viewpane=l,this.scene.addEntity(l),this.speedSnap=new u(this.scene,i),this.speedSnap.addObserver(u.EVENT_STOP,function(){p.notify(n.EVENT_END)});var y=!0,m=c.create(),v=c.create(),E=c.create();this.userinput=new s(t,{onStart:function(t){E.set(t),E.z=p.scene.camera.getPosition().z,y=!0,v.set(E),m.set(v),p.userInputStart()},onScale:function(t,e){E.set(e),E.z=p.scene.camera.getPosition().z,t.z=p.scene.convertZScaleToPosition(t.z),y=!1,m.set(v),v.set(E),p.moveBy(t,E)},onEnd:function(t){if(y===!1){if(m.subtract(v),m.z=0,m.getLength()>5)return p.userInputStop(E,m)}else{var e=p.scene.getPosition(),i=E.clone();i.z=0,i.invertProject(p.scene.camera.eye,E.z),i.subtract(e),i.z=0,p.notify(n.EVENT_CLICK,t,i)}p.userInputStop(E,c.origin)},onChange:function(t){E.set(t),E.z=p.scene.camera.getPosition().z,v.set(E),m.set(E),p.userInputChange()}}),this.fit()}var s=i(4),r=i(12),a=i(14),c=i(3),u=i(15),h=i(10);n.EVENT_CLICK="onClick",n.EVENT_UPDATE="onUpdate",n.EVENT_RENDER="onRender",n.EVENT_START="onInputStart",n.EVENT_STOP="onInputStop",n.EVENT_END="onEnd",n.prototype.deactivate=function(){this.userinput.deactivate()},n.prototype.activate=function(){this.userinput.activate()},n.prototype.isActive=function(){return this.userinput.isActive()},n.prototype.userInputStart=function(){this.speedSnap.stop(),this.scene.activate(),this.notify(n.EVENT_START)},n.prototype.userInputChange=function(){this.notify(n.EVENT_CHANGE)},n.prototype.userInputStop=function(t,e){this.scene.isActive()&&(this.scene.deactivate(),this.speedSnap.from.set(this.scene.getPosition()),this.speedSnap.start(e,t),this.notify(n.EVENT_STOP))},n.prototype.setFocus=function(t,e){this.scene.setFocus(t,e)},n.prototype.repaint=function(){this.scene.calculate(),this.scene.render()},n.prototype.getViewportCenter=function(){return this.scene.camera.screenHalfDimensions},n.prototype.getZCenter=function(){var t=this.scene.camera.getZRange();return(t.max-t.min)/2},n.prototype.zoomAt=function(t,e){t.z=this.scene.camera.getPosition().z,this.scene.camera.zoomAt(t,e),this.repaint()},n.prototype.moveBy=function(t,e){this.scene.moveVisual(t,e)},n.prototype.addEntity=function(t){this.scene.addEntity(t)},n.prototype.fit=function(){this.scene.fitToViewport()},n.prototype.createEntity=function(t){var e=new a(o(t));return this.addEntity(e),e},n.prototype.setPosition=function(t){this.scene.setPosition(t)},n.prototype.getPosition=function(){return this.scene.getPosition()},n.prototype.getScene=function(){return this.scene},n.prototype.getViewpane=function(){return this.viewpane},n.prototype.dispose=function(){this.userinput.dispose(),this.scene.dispose()},t.exports=n},function(t){"use strict";function e(t,e,i){return 0===n.length?new o(t,e,i):n.pop().setValues(t||0,e||0,i||0)}function i(t){n.push(t)}function o(t,e,i){this.setValues(t||0,e||0,i||0)}var n=[],s={x:0,y:0,z:0};o.prototype.setValues=function(t,e,i){return this.x=t,this.y=e,this.z=i,this},o.prototype.reset=function(){return this.setValues(0,0,0),this},o.prototype.dispose=function(){n.push(this)},o.prototype.clone=function(){return e(this.x,this.y,this.z)},o.prototype.set=function(t){return this.setValues(t.x,t.y,t.z)},o.prototype.setDelta=function(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this},o.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this},o.prototype.subtract=function(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this},o.prototype.negate=function(){return this.multiplyScalar(-1)},o.prototype.multiply=function(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this},o.prototype.addScalar=function(t){return this.x+=t,this.y+=t,this.z+=t,this},o.prototype.multiplyScalar=function(t){return this.x*=t,this.y*=t,this.z*=t,this},o.prototype.normalize=function(){var t=this.getLength();return this.multiplyScalar(1/t)},o.prototype.getLength=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},o.prototype.zoomAt=function(t,e,i){var o=i/t.z;return this.x+=(t.x-e.x)*o,this.y+=(t.y-e.y)*o,this.z+=i,this},o.prototype.zoomAtAndMoveVisual=function(t,e,i){var o=i.z/t.z;return this.x+=(t.x-e.x)*o,this.y+=(t.y-e.y)*o,this.z+=i.z,o=this.z/t.z,this.x+=i.x*(1-o),this.y+=i.y*(1-o),this},o.prototype.scaleByZ=function(t,e){var i=t.z/(t.z-e);this.x*=i,this.y*=i,this.z=e},o.prototype.project=function(t){var e=t.z/(this.z-t.z);return this.x=t.x-(this.x-t.x)*e,this.y=t.y-(this.y-t.y)*e,this.z=0,this},o.prototype.invertProject=function(t,e){return this.z=0,this.zoomAt(t,this,e)},o.prototype.moveVisual=function(t,e){var i=this.z/t.z;return this.x+=e.x*(1-i),this.y+=e.y*(1-i),this},o.prototype.toTranslate=function(t){return t=t||s,"translate3d("+(this.x+t.x)+"px, "+(this.y+t.y)+"px, "+(this.z+t.z)+"px)"},o.prototype.toRotate=function(){return"rotateX("+this.x+"deg) rotateY("+this.y+"deg) rotateZ("+this.z+"deg)"},o.prototype.toString=function(){return"["+this.x+", "+this.y+", "+this.z+"]"},t.exports={create:e,dispose:i,origin:new o}},function(t,e,i){"use strict";function o(t,e){var i=this;this.$element=t,this.elementBound={},this.updateElementBound(),this.__updateLayout=function(){i.updateElementBound()},r.addObserver("end",this.__updateLayout),this.onStart=e.onStart||Function.prototype,this.onScale=e.onScale||Function.prototype,this.onEnd=e.onEnd||Function.prototype,this.onChange=e.onChange||Function.prototype,this.controls=[],this.controls.push(n(t,this.elementBound,this.onStart,this.onScale,this.onEnd,this.onChange)),this.controls.push(s(t,this.elementBound,this.onStart,this.onScale,this.onEnd))}var n=i(5),s=i(7),r=i(9);o.prototype.isActive=function(){return this.controls[0].activated},o.prototype.deactivate=function(){for(var t=0,e=this.controls.length;e>t;t+=1)this.controls[t].activated=!1},o.prototype.activate=function(){for(var t=0,e=this.controls.length;e>t;t+=1)this.controls[t].activated=!0},o.prototype.updateElementBound=function(){var t=this.$element.getBoundingClientRect();this.elementBound.top=t.top+(document.documentElement.scrollTop||document.body.scrollTop),this.elementBound.left=t.left+(document.documentElement.scrollLeft||document.body.scrollLeft),this.elementBound.width=t.width,this.elementBound.height=t.height},o.prototype.dispose=function(){r.removeObserver("end",this.__updateLayout),this.__updateLayout=null;for(var t=0,e=this.controls.length;e>t;t+=1)this.controls[t].dispose()},t.exports=o},function(t,e,i){"use strict";function o(t,e,i,o){return t.x=.5*(o.pageX-i.pageX)+i.pageX-e.left,t.y=.5*(o.pageY-i.pageY)+i.pageY-e.top,t.z=0,t}function n(t,e){var i=e.pageX-t.pageX,o=e.pageY-t.pageY;return Math.sqrt(i*i+o*o)}function s(t,e,i,s,c,u){function h(t){z=0,S=0,T.setValues(t.pageX-e.left,t.pageY-e.top,0),g.set(T)}function p(t,i){z=n(t,i),T=o(T,e,t,i),g.set(T)}function l(t){var e=0!==E;if(v.activated&&t.preventDefault(),b=!1,E=t.touches.length,V.start(),1===t.touches.length)h(t.touches[0]);else if(p(t.touches[0],t.touches[1]),e)return void u(T);i(T)}function f(t){if(0!==E){if(t.stopPropagation(),1===t.touches.length)return h(t.touches[0]),void u(T);b=!1,E=0,V.stop(),c(t)}}function d(){b=!0}function y(t){return t.touches.length>2?void 0:v.activated===!1?void l(t):1===t.touches.length&&0===E?void d(t):void l(t)}function m(t){v.activated===!1||0===E&&b===!1||(b===!0&&l(t),t.preventDefault(),t.stopPropagation(),V.currentEvent=t)}var v={activated:!0,dispose:function(){this.activated=!1,t.removeEventListener("touchmove",m),t.removeEventListener("touchstart",y),t.removeEventListener("touchend",f),document.body.removeEventListener("touchend",f)}},E=0,T=r.create(),g=r.create(),x=r.create(),z=0,S=0;t.addEventListener("touchmove",m),t.addEventListener("touchstart",y),t.addEventListener("touchend",f),document.body.addEventListener("touchend",f);var V={currentEvent:null,start:function(){this.loopState=a.CONTINUE,a.add(this)},stop:function(){this.loopState=a.EXIT},calculate:function(){var t=this.currentEvent;if(null!=t)return S=z,g.set(T),t.touches.length>1?(z=n(t.touches[0],t.touches[1]),T=o(T,e,t.touches[0],t.touches[1]),x.setDelta(T,g),x.z=0===S?1:z/S):(T.setValues(t.touches[0].pageX-e.left,t.touches[0].pageY-e.top,0),x.setDelta(T,g),x.z=1),this.currentEvent=null,s(x,T),this.loopState},render:Function.prototype},b=!1;return v}var r=i(3),a=i(6);t.exports=s},function(t){"use strict";function e(){var t=o.animations;t.length=0,o.animations=o.nextAnimations,o.nextAnimations=t}var i=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,20)},o={EXIT:!0,CONTINUE:!1,ENABLED:!1,animations:[],nextAnimations:[],add:function(t){(t.calculate||t.render)&&(o.animations.push(t),o.start())},start:function(){o.ENABLED===!1&&(o.ENABLED=!0,o.tick())},tick:function(){var t,n=Date.now();for(t=0;t<o.animations.length;t+=1)o.animations[t].calculate(n)!==o.EXIT&&o.nextAnimations.push(o.animations[t]);for(e(),t=0;t<o.animations.length;t+=1)o.animations[t].render(n)!==o.EXIT&&o.nextAnimations.push(o.animations[t]);e(),o.animations.length>0?i.call(window,o.tick):o.ENABLED=!1}};t.exports=o},function(t,e,i){"use strict";function o(t,e,i,o,c){function u(t){if(v!==!0&&(v=!0,m.activated!==!1)){var o=t.pageX-e.left,n=t.pageY-e.top;t.preventDefault(),T.setValues(o,n,T.z),i(T)}}function h(t){if(v!==!1&&m.activated!==!1){var i=t.pageX-e.left,n=t.pageY-e.top;t.preventDefault(),t.stopPropagation(),E.set(T),T.setValues(i,n,T.z),g.setDelta(T,E),g.z=1,o(g,T)}}function p(t){v!==!1&&(v=!1,c(t))}function l(t){if(m.activated!==!1){t.preventDefault();var n=t.pageX-e.left,s=t.pageY-e.top,a=t.wheelDelta;v===!1?(v=!0,x.start(),T.set(n,s,a),i(T)):(x.keepAlive(),E.set(T),T.set(n,s,T.z+a),g.setDelta(T,E),g.z=1+g.z/r,o(g,T))}}function f(t){if(m.activated!==!1){t.preventDefault();var n=t.pageX-e.left,s=t.pageY-e.top,a=t.deltaY;v===!1?(v=!0,x.start(),T.setValues(n,s,a),i(T)):(x.keepAlive(),E.set(T),T.setValues(n,s,T.z+a),g.setDelta(T,E),g.z=1+g.z/r,o(g,T))}}function d(t){v!==!1&&(v=!1,c(t))}function y(t){t=t?t:window.event;var e=t.relatedTarget||t.toElement;e&&"HTML"!==e.nodeName||d(t)}var m={activated:!0,dispose:function(){this.activated=!1,t.removeEventListener("mousedown",u),t.removeEventListener("mousemove",h),t.removeEventListener("mouseup",p),t.removeEventListener("mousewheel",l),t.removeEventListener("wheel",f),document.body.removeEventListener("mousemove",d),document.body.removeEventListener("mouseout",y)}},v=!1,E=s.create(),T=s.create(),g=s.create();t.addEventListener("mousedown",u),t.addEventListener("mousemove",h),t.addEventListener("mouseup",p),t.addEventListener("mousewheel",l),t.addEventListener("wheel",f),document.body.addEventListener("mousemove",d),document.body.addEventListener("mouseout",y);var x=new n(function(){v!==!1&&(v=!1,c())},a);return m}var n=i(8),s=i(3),r=1e3,a=50;t.exports=o},function(t,e,i){"use strict";function o(t,e){this.STATE=n.EXIT,this.ttl=e,this.sendTimeout=t||Function.prototype}var n=i(6);window.Timeout=o,o.prototype.start=function(){return this.keepAlive(),this.isActive()===!1&&(this.STATE=n.CONTINUE,n.add(this)),this},o.prototype.isActive=function(){return this.STATE===n.CONTINUE},o.prototype.getTime=function(){return this.lastUpdate},o.prototype.calculate=function(t){return this.time=t-this.lastUpdate,this.time>this.ttl&&(this.sendTimeout(t,t-this.lastUpdate),this.STATE=n.EXIT),this.STATE},o.prototype.render=Function.prototype,o.prototype.keepAlive=function(){return this.lastUpdate=Date.now(),this.lastUpdate},t.exports=o},function(t,e,i){"use strict";var o=i(10),n=i(11),s=o.call({EVENT_START:"start",EVENT_UPDATE:"update",EVENT_END:"end",viewportSize:{x:0,y:0},updateViewportSize:function(){return this.viewportSize.x=Math.max(document.documentElement.clientWidth,window.innerWidth||0),this.viewportSize.y=Math.max(document.documentElement.clientHeight,window.innerHeight||0),this.viewportSize},getViewportSize:function(){return this.viewportSize}});window.addEventListener("resize",n({timeout:500,debounce:250,start:function(){s.notify(s.EVENT_START,s.updateViewportSize())},update:function(){s.notify(s.EVENT_UPDATE,s.updateViewportSize())},end:function(){s.notify(s.EVENT_END,s.updateViewportSize())}})),window.addEventListener("orientationchange",function(){var t=s.updateViewportSize();setTimeout(function(){s.notify(s.EVENT_START,t),setTimeout(function(){s.notify(s.EVENT_END,t)},1)},100)}),s.updateViewportSize(),t.exports=s},function(t){"use strict";function e(){return this.addObserver=i,this.removeObserver=o,this.notify=n,this.__observables={},this}function i(t,e){this.__observables[t]=this.__observables[t]||[];var i=this.__observables[t];return i.indexOf(e)<0&&i.push(e),this}function o(t,e){if(null==this.__observables[t])return this;var i=this.__observables[t].indexOf(e);return i>=0&&this.__observables[t].splice(i,1),this}function n(t){var e=this.__observables[t];if(null!=e&&0!==e.length){for(var i=Array.prototype.slice.call(arguments,1),o=0,n=e.length;n>o;o+=1)e[o].apply(null,i);return this}}t.exports=e},function(t,e,i){"use strict";function o(t){t.timeout=t.timeout||500,t.debounce=t.debounce||250,t.start=t.start||Function.prototype,t.update=t.update||Function.prototype,t.end=t.end||Function.prototype;var e=!1,i=null,o=0,s=new n(function(){e=!1,t.end(i),i=null},t.timeout);return function(n){if(i=n,e===!1)return e=!0,t.start(i),s.start();var r=s.keepAlive();o+t.debounce<r&&(o=r,t.update(i))}}var n=i(8);t.exports=o},function(t,e,i){"use strict";function o(t,e,i){c.call(this,[o.EVENT_UPDATE,o.EVENT_RENDER]);var n=this,a=new s(t,e,i);this.camera=a,this.entities=[],this.rubberZ=i.rubberZ!==!1,this.__update=function(){n.update()},r.addObserver("end",this.__update)}var n=i(6),s=i(13),r=i(9),a=i(3),c=i(10);o.EVENT_UPDATE="onUpdate",o.EVENT_RENDER="onRender",o.prototype.setFocus=function(t,e){this.camera.setFocus(t,e),this.update()},o.prototype.update=function(){this.camera.update(),this.moveToFocus(this.camera.position),this.calculate(),this.render()},o.prototype.activate=function(){this.loopState=n.CONTINUE,n.add(this)},o.prototype.deactivate=function(){this.loopState=n.EXIT},o.prototype.isActive=function(){return this.loopState===n.CONTINUE},o.prototype.convertZScaleToPosition=function(t){return this.camera.getZTranslationOfScale(t)},o.prototype.addEntity=function(t){this.entities.push(t)},o.prototype.convertToWorldTranslation=function(t,e,i){var o=this.camera.getPosition();return t.set(o),t.zoomAtAndMoveVisual(this.camera.eye,i,e),t.subtract(o),t},o.prototype.getRubberband=function(t){var e=this.camera.getRestrictToFocusZ(),i=this.camera.getRestrictToFocusXY();return t.x=i.left+i.right,t.y=i.top+i.bottom,t.z=e-this.camera.getPosition().z,t},o.prototype.moveToFocus=function(t){var e=this.camera.getPosition(),i=this.camera.getRestrictToFocusZ();this.camera.zoomAt(t,i-e.z);var o=this.camera.getRestrictToFocusXY();e.setValues(e.x+o.right+o.left,e.y+o.top+o.bottom,e.z),this.camera.alignToPixelGrid()},o.prototype.setPosition=function(t){this.camera.setPosition(t)},o.prototype.getPosition=function(){return this.camera.getPosition()},o.prototype.fitToViewport=function(){this.camera.position.x=0,this.camera.position.y=0,this.camera.position.z=this.camera.getZFit();var t=this.camera.getRestrictToFocusXY();this.camera.position.x=t.left+t.right,this.camera.position.y=t.top+t.bottom,this.camera.alignToPixelGrid(),this.calculate(),this.render()},o.prototype.move=function(t){return this.camera.getPosition().add(t)},o.prototype.moveVisual=function(t,e,i){i=i||.3;var o=a.create();this.convertToWorldTranslation(o,t,e);var n=this.camera.getPosition(),s=Math.abs(t.z)>Math.abs(t.x)+Math.abs(t.y),r=o.z<0,c=o.z>0,u=this.camera.getRestrictToFocusZ(o),h=u-this.camera.getPosition().z-o.z;if((0>h&&c||h>0&&r)&&(this.rubberZ===!0?n.zoomAt(this.camera.eye,e,-o.z*(1-i)):n.zoomAt(this.camera.eye,e,h)),s===!1){var p=this.camera.getRestrictToFocusXY();p.left+p.right!==0&&(o.x*=i),p.top+p.bottom!==0&&(o.y*=i)}n.add(o),o.dispose()},o.prototype.calculate=function(){for(var t=this.entities,e=this.camera.getPosition(),i=0,s=t.length;s>i;i+=1)t[i].calculate(e);return this.notify(o.EVENT_UPDATE,e),n.CONTINUE},o.prototype.render=function(){for(var t=this.entities,e=this.camera.getPosition(),i=0,n=t.length;n>i;i+=1)t[i].render(e);return this.notify(o.EVENT_RENDER,e),this.loopState},o.prototype.dispose=function(){var t=this.entities;r.removeObserver("end",this.__update);for(var e=0,i=t.length;i>e;e+=1)t[e].dispose()},t.exports=o},function(t,e,i){"use strict";function o(t,e,i){i.typeOfFocus=i.typeOfFocus||a.LARGEST,i.perspective=null==i.perspective?1e3:i.perspective,i.origin=i.origin||{x:.5,y:.5},this.options=i,this.$screen=t,this.typeOfFocus=i.typeOfFocus,this.adjustFocusBy=!1,this.focusPlane=e,this.eye=r.create(),this.position=r.create(),this.screenHalfDimensions=r.create(),this.xyCorrection=new s,this.maxZ=r.create(),this.minZ=r.create(),this.update()}function n(t,e,i){return t.z-t.z*(e/i)}function s(){this.toString=function(){return"("+this.left+","+this.top+","+this.right+","+this.bottom+")"},this.reset=function(){return this.left=this.right=this.top=this.bottom=0,this},this.reset()}var r=i(3),a={LARGEST:"fitLargestDimension",BOTH:"fitBothDimensions"};o.FOCUS_TYPE=a,o.prototype.setFocus=function(t,e){this.focusPlane.x=parseFloat(t),this.focusPlane.y=parseFloat(e)},o.prototype.update=function(){var t=this.$screen.getBoundingClientRect();if(this.screenHalfDimensions.x=.5*t.width,this.screenHalfDimensions.y=.5*t.height,this.adjustFocusBy=!1,this.typeOfFocus===a.LARGEST){var e=this.focusPlane.x/t.width,i=this.focusPlane.y/t.height;this.adjustFocusBy=e>i?"x":"y"}this.eye.setValues(t.width*this.options.origin.x,t.height*this.options.origin.y,this.options.perspective),this.maxZ.setValues(.25*this.eye.z,.25*this.eye.z,0),this.minZ.setValues(n(this.eye,this.focusPlane.x,t.width),n(this.eye,this.focusPlane.y,t.height),0),this.$screen.style.webkitPerspective=this.eye.z+"px",this.$screen.style.perspective=this.eye.z+"px",this.$screen.style.webkitPerspectiveOrigin=this.eye.x+"px "+this.eye.y+"px",this.$screen.style.perspectiveOrigin=this.eye.x+"px "+this.eye.y+"px"},o.prototype.getZTranslationOfScale=function(t){return 1===t?0:this.position.z-(this.eye.z-t*(this.eye.z-this.position.z))},o.prototype.getZFit=function(){var t=2*this.screenHalfDimensions.x,e=2*this.screenHalfDimensions.y;return Math.min(n(this.eye,this.focusPlane.x,t),n(this.eye,this.focusPlane.y,e))},o.prototype.getRestrictToFocusZ=function(t){t=t||r.origin;var e=this.position.z+t.z,i=e<this.minZ.x,o=e<this.minZ.y;return this.typeOfFocus===a.BOTH&&(i||o)?Math.max(this.minZ.x,this.minZ.y):this.typeOfFocus===a.LARGEST&&i&&o?Math.min(this.minZ.x,this.minZ.y):e>this.maxZ.x||e>this.maxZ.y?Math.min(this.maxZ.x,this.maxZ.y):e},o.prototype.getZRange=function(){var t,e;return this.typeOfFocus===a.BOTH?t=Math.max(this.minZ.x,this.minZ.y):this.typeOfFocus===a.LARGEST&&(t=Math.min(this.minZ.x,this.minZ.y)),e=Math.min(this.maxZ.x,this.maxZ.y),{max:e,min:t}},o.prototype.getRestrictToFocusXY=function(t){t=t||r.origin;var e=this.xyCorrection.reset(),i=(this.eye.z-this.position.z)/(this.eye.z-0),o=this.screenHalfDimensions.x*i,n=this.screenHalfDimensions.y*i,s=.5*this.focusPlane.x,a=.5*this.focusPlane.y,c=Math.abs(o-s),u=Math.abs(n-a),h=this.position.z/this.eye.z,p=this.screenHalfDimensions.x+(this.eye.x-this.screenHalfDimensions.x)*h,l=this.screenHalfDimensions.y+(this.eye.y-this.screenHalfDimensions.y)*h,f=p-(this.position.x+t.x+s),d=l-(this.position.y+t.y+a);return o-s>0?e.left=f:Math.abs(f)-c>0&&(e.left=Math.min(0,f+c),e.right=Math.max(0,f-c)),n-a>0?e.top=d:Math.abs(d)-u>0&&(e.top=Math.min(0,d+u),e.bottom=Math.max(0,d-u)),e},o.prototype.moveVisual=function(t){this.position.moveVisual(this.eye,t)},o.prototype.getPosition=function(){return this.position},o.prototype.setPosition=function(t){return this.position.set(t)},o.prototype.zoomAt=function(t,e){this.position.zoomAt(this.eye,t,e)},o.prototype.alignToPixelGrid=function(){var t=window.devicePixelRatio||1,e=Math.round(this.position.x*t)/t,i=Math.round(this.position.y*t)/t,o=this.position.z;this.position.setValues(e,i,o)},t.exports=o},function(t,e,i){"use strict";function o(t){this.element=t,this.style=t.style,this.position=n.create(),this.rotation=n.create()}var n=i(3);o.prototype.getPosition=function(){return this.position},o.prototype.setPosition=function(t){return this.position.set(t)},o.prototype.getRotation=function(){return this.rotation},o.prototype.setRotation=function(t){return this.rotation.set(t)},o.prototype.calculate=function(t){this.transform=this.position.toTranslate(t)+" "+this.rotation.toRotate()},o.prototype.render=function(){var t=this.transform;this.style.webkitTransform=t,this.style.mozTransform=t,this.style.transform=t},o.prototype.dispose=function(){this.transform="",this.render()},o.prototype.add=function(t){this.position.add(t)},t.exports=o},function(t,e,i){"use strict";function o(t,e){r.call(this,[o.EVENT_START,o.EVENT_STOP]),this.scene=t,this.friction=e.friction||a,this.from=n.create(),this.work=n.create(),this.speedVector=n.create(),this.rubberband=n.create()}var n=i(3),s=i(6),r=i(10),a=.95,c=20;o.EVENT_START="start",o.EVENT_STOP="stop",o.prototype.start=function(t,e){this.scene.convertToWorldTranslation(this.speedVector,t,e);var i=this.speedVector.getLength(),n=c*(-Math.log(i)/Math.log(a));this.startTime=Date.now(),this.duration=Math.max(400,n),this.notify(o.EVENT_START),this.loopState=s.CONTINUE,s.add(this)},o.prototype.stop=function(){this.loopState=s.EXIT},o.prototype.calculate=function(t){var e=this.speedVector,i=Math.min(1,(t-this.startTime)/this.duration),o=this.scene.getRubberband(this.rubberband);return o.multiplyScalar(i),e.multiplyScalar(a),o.x&&(e.x*=i),o.y&&(e.y*=i),i>=1?(this.scene.move(o),this.stop()):(this.work.set(o).subtract(e),this.scene.move(this.work)),this.scene.calculate(),s.CONTINUE},o.prototype.render=function(){return this.scene.render(),this.loopState===s.EXIT&&this.notify(o.EVENT_STOP),this.loopState},t.exports=o}]);