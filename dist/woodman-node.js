/*! Woodman - v0.1.2 - 2013-01-18 - https://github.com/joshfire/woodman
Copyright 2013 Joshfire; MIT license
Based on log4j v2.0: http://logging.apache.org/log4j/2.x/
Portions adapted from log4javascript: http://log4javascript.org/ (copyright Tim Down, Apache License, Version 2.0) */

var requirejs,require,define;(function(e){function c(e,t){return f.call(e,t)}function h(e,t){var n,r,i,s,o,a,f,l,c,h,p=t&&t.split("/"),d=u.map,v=d&&d["*"]||{};if(e&&e.charAt(0)===".")if(t){p=p.slice(0,p.length-1),e=p.concat(e.split("/"));for(l=0;l<e.length;l+=1){h=e[l];if(h===".")e.splice(l,1),l-=1;else if(h===".."){if(l===1&&(e[2]===".."||e[0]===".."))break;l>0&&(e.splice(l-1,2),l-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((p||v)&&d){n=e.split("/");for(l=n.length;l>0;l-=1){r=n.slice(0,l).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=l;break}}}if(s)break;!a&&v&&v[r]&&(a=v[r],f=l)}!s&&a&&(s=a,o=f),s&&(n.splice(0,o,s),e=n.join("/"))}return e}function p(t,r){return function(){return n.apply(e,l.call(arguments,0).concat([t,r]))}}function d(e){return function(t){return h(t,e)}}function v(e){return function(t){s[e]=t}}function m(n){if(c(o,n)){var r=o[n];delete o[n],a[n]=!0,t.apply(e,r)}if(!c(s,n)&&!c(a,n))throw new Error("No "+n);return s[n]}function g(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function y(e){return function(){return u&&u.config&&u.config[e]||{}}}var t,n,r,i,s={},o={},u={},a={},f=Object.prototype.hasOwnProperty,l=[].slice;r=function(e,t){var n,r=g(e),i=r[0];return e=r[1],i&&(i=h(i,t),n=m(i)),i?n&&n.normalize?e=n.normalize(e,d(t)):e=h(e,t):(e=h(e,t),r=g(e),i=r[0],e=r[1],i&&(n=m(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},i={require:function(e){return p(e)},exports:function(e){var t=s[e];return typeof t!="undefined"?t:s[e]={}},module:function(e){return{id:e,uri:"",exports:s[e],config:y(e)}}},t=function(t,n,u,f){var l,h,d,g,y,b=[],w;f=f||t;if(typeof u=="function"){n=!n.length&&u.length?["require","exports","module"]:n;for(y=0;y<n.length;y+=1){g=r(n[y],f),h=g.f;if(h==="require")b[y]=i.require(t);else if(h==="exports")b[y]=i.exports(t),w=!0;else if(h==="module")l=b[y]=i.module(t);else if(c(s,h)||c(o,h)||c(a,h))b[y]=m(h);else{if(!g.p)throw new Error(t+" missing "+h);g.p.load(g.n,p(f,!0),v(h),{}),b[y]=s[h]}}d=u.apply(s[t],b);if(t)if(l&&l.exports!==e&&l.exports!==s[t])s[t]=l.exports;else if(d!==e||!w)s[t]=d}else t&&(s[t]=u)},requirejs=require=n=function(s,o,a,f,l){return typeof s=="string"?i[s]?i[s](o):m(r(s,o).f):(s.splice||(u=s,o.splice?(s=o,o=a,a=null):s=e),o=o||function(){},typeof a=="function"&&(a=f,f=l),f?t(e,s,o,a):setTimeout(function(){t(e,s,o,a)},15),n)},n.config=function(e){return u=e,n},define=function(e,t,n){t.splice||(n=t,t=[]),!c(s,e)&&!c(o,e)&&(o[e]=[e,t,n])},define.amd={jQuery:!0}})(),define("../deps/almond",function(){}),define("lifecycle",[],function(){var e=function(){this.started=!1};return e.prototype.start=function(e){return e=e||function(){},this.started=!0,e()},e.prototype.stop=function(e){return e=e||function(){},this.started=!1,e()},e.prototype.isStarted=function(){return this.started},e}),define("loglevel",[],function(){var e=["error","warn","info","log","trace"],t=function(t){var n=0,r=e.length;for(n=0;n<r;n++)if(e[n]===t)return n;return-1};return{registerLevel:function(n,r){var i=0;if(t(n)!==-1)throw new Error('Log level "'+n+'" '+"cannot be registered as it already exists");if(r){i=t(r);if(i===-1)throw new Error('The log level "'+r+'" '+"cannot be used as reference level as it does not exist")}e.splice(i,0,n)},isBelow:function(e,n){return e==="off"?!0:e==="all"?n==="all":n==="off"?!1:n==="all"?!0:t(e)<=t(n)}}}),define("logevent",[],function(){var e=function(e,t,n){this.time=new Date,this.loggerName=e,this.level=t,this.message=n};return e.prototype.getLoggerName=function(){return this.loggerName},e.prototype.getLevel=function(){return this.level},e.prototype.getMessage=function(){return this.message},e.prototype.getMillis=function(){return this.time.getTime()},e}),define("logger",["./loglevel","./logevent"],function(e,t){var n=function(e,t){this.name=e,this.loggerContext=t,this.parent=null,this.children=[],this.appenders=[],this.level="inherit",this.additive=!0};return n.prototype.log=function(){this.trace("log",arguments)},n.prototype.info=function(){this.trace("info",arguments)},n.prototype.warn=function(){this.trace("warn",arguments)},n.prototype.error=function(){this.trace("error",arguments)},n.prototype.trace=function(n,r){var i=0,s=[],o=null;if(e.isBelow(n,this.level)){for(i=0;i<r.length;i++)s[i]=r[i];o=new t(this.name,n,s),this.append(o)}},n.prototype.append=function(e){var t=0,n=0;for(t=0,n=this.appenders.length;t<n;t+=1)this.appenders[t].append(e);this.additive&&this.parent&&this.parent.append(e)},n.prototype.reset=function(){this.appenders=[],this.level="inherit",this.additive=!0},n.prototype.initialize=function(e){e=e||{},this.level=typeof e.level!="undefined"?e.level:"inherit",this.additive=typeof e.additivity!="undefined"?e.additivity:!0,this.appenders=e.appenders||[]},n}),define("appender",["./lifecycle","./loglevel"],function(e,t){var n=function(t){t=t||{},e.call(this),this.name=t.name,this.layout=t.layout,this.level=t.level||"all"};return n.prototype=new e,n.prototype.getName=function(){return this.name},n.prototype.append=function(e){if(!this.isStarted())throw new Error('Appender "'+this.name+'" '+"must be started before it may be used");t.isBelow(e.getLevel(),this.level)&&this.doAppend(e)},n.prototype.doAppend=function(){},n.prototype.getLayout=function(){return this.layout},n}),define("layout",[],function(){var e=function(e,t){this.config=e||{},this.loggerContext=t};return e.prototype.toLogEvent=function(e){return e},e.prototype.toMessageString=function(e){var t=e.getMessage();return e.getMillis()+" "+e.getLevel()+" "+e.getLoggerName()+" "+(t.toString?t.toString():String(t))},e}),define("utils",[],function(){var e=Array.isArray||function(e){return toString.call(e)==="[object Array]"},t=function(e){return toString.call(e)==="[object String]"},n=function(e){return e===Object(e)},r=function(e){return toString.call(e)==="[object Function]"},i=function(e){return toString.call(e)==="[object Date]"},s={},o=function(e,t,n){if(!e)return;if(Array.prototype.forEach&&e.forEach===Array.prototype.forEach)e.forEach(t,n);else if(e.length===+e.length){for(var r=0,i=e.length;r<i;r++)if(r in e&&t.call(n,e[r],r,e)===s)return}else for(var o in e)if(e.hasOwnProperty(o)&&t.call(n,e[o],o,e)===s)return},u=function(e,t,n){var r=[];return e?Array.prototype.map&&e.map===Array.prototype.map?e.map(t,n):(o(e,function(e,i,s){r[r.length]=t.call(n,e,i,s)}),e.length===+e.length&&(r.length=e.length),r):r};return{isArray:e,isString:t,isObject:n,isFunction:r,isDate:i,each:o,map:u}}),define("loggercontext",["./lifecycle","./logger","./appender","./layout","./utils"],function(e,t,n,r,i){var s=function(){e.call(this),this.startTime=new Date,this.rootLogger=new t("[root]",this),this.loggers={},this.appenders={},this.layouts={},this.createdAppenders=[]};return s.prototype=new e,s.prototype.registerAppender=function(e,t){this.appenders[e]=t},s.prototype.registerLayout=function(e,t){this.layouts[e]=t},s.prototype.registerLayout=function(e,t){this.layouts[e]=t},s.prototype.initialize=function(e){e=JSON.parse(JSON.stringify(e||{}));var t=[],n=[],r={};this.reset(),i.isArray(e)?t=e:(e.configuration&&(e=e.configuration),i.isArray(e.loggers)?t=e.loggers:t=i.map(e.loggers,function(e,t){return t==="root"&&(e.root=!0),e}),i.isArray(e.appenders)?n=e.appenders:i.each(e.appenders,function(e,t){i.isArray(e)?(i.each(e,function(e){e.type||(e.type=t)}),n=n.concat(e)):(e.type||(e.type=t),n.push(e))})),i.each(t,function(e){var t=[];e["appender-ref"]&&(i.isArray(e["appender-ref"])?t=i.map(e["appender-ref"],function(e){return e.ref}):t.push(e["appender-ref"].ref),delete e["appender-ref"]),i.isArray(e.appenders)&&i.each(e.appenders,function(e){i.isObject(e)?(n.push(e),t.push(e.name)):t.push(e)}),e.appenders=t}),i.each(n,function(e){var t=this.appenders[e.type],n=null,s=null,o=null;if(!t)throw new Error('Unknown appender type for "'+e.name+'": '+e.type);if(r[e.name])throw new Error('Appender "'+e.name+'" referenced twice in the configuration');e.layout?(n=e.layout,s=this.layouts[n.type]):i.each(this.layouts,function(t,r){e[r]&&(n=e[r],s=t)});if(!s)throw new Error('No proper layout defined for appender "'+e.name+'"');e.layout=new s(n,this),o=new t(e),this.createdAppenders.push(o),r[e.name]=o},this),i.each(t,function(e){var t=null;e.appenders=i.map(e.appenders,function(t){var n=r[t];if(!n)throw new Error('Logger "'+e.name+'" references undefined appender "'+t+'"');return r[t]}),e.root||!e.name?t=this.getLogger():t=this.getLogger(e.name),t.initialize(e)},this),this.propagateLevels()},s.prototype.getLogger=function(e){var n=null,r="",i=0;return e?(n=this.loggers[e],n?n:(n=new t(e,this),i=e.lastIndexOf("."),i!==-1?r=this.getLogger(e.substring(0,i)):r=this.rootLogger,n.parent=r,n.level=r.level,r.children=r.children||[],r.children.push(n),this.loggers[e]=n,n)):this.rootLogger},s.prototype.getStartTime=function(){return this.startTime.getTime()},s.prototype.reset=function(){var e="";for(e in this.loggers)this.loggers[e].reset();this.rootLogger.reset(),this.rootLogger.level="all",this.createdAppenders=[],this.started=!1},s.prototype.propagateLevels=function(){this.rootLogger.level==="inherit"&&(this.rootLogger.level="all"),i.each(this.loggers,function(e){var t=e;while(t.level==="inherit")t=t.parent;e.level=t.level})},s.prototype.start=function(e){e=e||function(){};var t=this,n=this.createdAppenders.length,r=!1,s=function(i){if(r)return;if(i)return r=!0,e(i);n-=1;if(n===0)return t.started=!0,e()};i.each(this.createdAppenders,function(e){e.start(function(e){return s(e)})})},s.prototype.stop=function(e){e=e||function(){};var t=this.createdAppenders.length,n=!1,r=function(r){if(n)return;if(r)return n=!0,e(r);t-=1;if(t===0)return e()};i.each(this.createdAppenders,function(e){e.stop(function(e){return r(e)})})},s.prototype.load=function(e,t){this.initialize(e),this.start(t)},s}),define("logmanager",["./loggercontext"],function(e){var t=new e;return{registerAppender:function(e,n){return t.registerAppender(e,n)},registerLayout:function(e,n){return t.registerLayout(e,n)},load:function(e,n){return t.load(e,n)},unload:function(e){return t.stop(e)},getLogger:function(e){return t.getLogger(e)}}}),define("appenders/consoleappender",["../appender"],function(e){var t=function(t){t=t||{},e.call(this,t),this.appendStrings=typeof t.appendStrings!="undefined"?t.appendStrings:!0};return t.prototype=new e,t.prototype.doAppend=function(e){var t=this.getLayout(),n=e.getLevel(),r=null;this.appendStrings?(r=t.toMessageString(e),this.doAppendMessage(n,r)):(e=t.toLogEvent(e),this.doAppendMessage(n,e))},t.prototype.doAppendMessage=function(e,t){if(typeof console=="undefined")return;e==="info"?console.info(t):e==="warn"?console.warn(t):e==="error"?console.error(t):console.log(t)},t}),define("appenders/node.js/fileappender",["../../appender"],function(e){var t=function(t){e.call(this,t),this.filename=null};t.prototype=new e,t.prototype.doAppend=function(e){}}),define("layouts/simpleobjectserializer",["../utils"],function(e){function t(e){var t=String(e);return t.length===1&&(t="0"+t),t}var n=function(r,i){var s=null;return i=typeof i!="undefined"?i:1,typeof r=="undefined"?undefined:e.isString(r)?r:e.isDate(r)?r.getUTCFullYear()+"-"+t(r.getUTCMonth()+1)+"-"+t(r.getUTCDate())+"T"+t(r.getUTCHours())+":"+t(r.getUTCMinutes())+":"+t(r.getUTCSeconds())+"."+String((r.getUTCMilliseconds()/1e3).toFixed(3)).slice(2,5)+"Z":i<=0?"…":(e.isArray(r)?(s=[],e.each(r,function(e){s.push(n(e,i-1))})):e.isObject(r)?(s={},e.each(r,function(e,t){s[t]=n(e,i-1)})):e.isFunction(r)?s="[func]":s=r,s)};return function(e,t,r){var i=n(e,t);return r?JSON.stringify(i):JSON.stringify(i,null,2)}}),define("layouts/jsonlayout",["../layout","./simpleobjectserializer"],function(e,t){var n=function(t,n){t=t||{},e.call(this,t,n),this.compact=t.compact||!1,this.depth=t.depth||2};return n.prototype=new e,n.prototype.toMessageString=function(e){return t(e,this.depth,this.compact)},n}),define("layouts/simpledateformat",[],function(){var e=/('[^']*')|(G+|y+|M+|d+|F+|E+|a+|H+|k+|K+|h+|m+|s+|S+|Z+)|([a-zA-Z]+)|([^a-zA-Z']+)/g,t=["January","February","March","April","May","June","July","August","September","October","November","December"],n=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],r=0,i=1,s=2,o=3,u=4,a=5,f={G:r,y:o,M:u,w:s,W:s,D:s,d:s,F:s,E:i,a:r,H:s,k:s,K:s,h:s,m:s,s:s,S:s,Z:a},l=function(e,t){while(e.length<t)e="0"+e;return e},c=function(e,t,n){return t>=4?e:e.substr(0,Math.max(n,t))},h=function(e,t){var n=""+e;return l(n,t)},p=function(e){this.formatString=e};return p.prototype.format=function(p){var d="",v,m=this.formatString;while(v=e.exec(m)){var g=v[1],y=v[2],b=v[3],w=v[4];if(g)g==="''"?d+="'":d+=g.substring(1,g.length-1);else if(!b)if(w)d+=w;else if(y){var E=y.charAt(0),S=y.length,x="";switch(E){case"G":x="AD";break;case"y":x=p.getFullYear();break;case"M":x=p.getMonth();break;case"d":x=p.getDate();break;case"F":x=1+Math.floor((p.getDate()-1)/7);break;case"E":x=n[p.getDay()];break;case"a":x=p.getHours()>=12?"PM":"AM";break;case"H":x=p.getHours();break;case"k":x=p.getHours()||24;break;case"K":x=p.getHours()%12;break;case"h":x=p.getHours()%12||12;break;case"m":x=p.getMinutes();break;case"s":x=p.getSeconds();break;case"S":x=p.getMilliseconds();break;case"Z":x=p.getTimezoneOffset()}switch(f[E]){case r:d+=c(x,S,2);break;case i:d+=c(x,S,3);break;case s:d+=h(x,S);break;case o:if(S<=3){var T=""+x;d+=T.substr(2,2)}else d+=h(x,S);break;case u:S>=3?d+=c(t[x],S,S):d+=h(x+1,S);break;case a:var N=x>0,C=N?"-":"+",k=Math.abs(x),L=""+Math.floor(k/60);L=l(L,2);var A=""+k%60;A=l(A,2),d+=C+L+A}}}return d},p}),define("layouts/patternlayout",["../layout","./simpledateformat","./simpleobjectserializer"],function(e,t,n){var r={absolute:"HH:mm:ss,SSS",compact:"yyyyMMddHHmmssSSS",date:"dd MMM yyyy HH:mm:ss,SSS",iso8601:"yyyy-MM-dd HH:mm:ss,SSS",iso8601_basic:"yyyy-MM-DD HHmmss,SSS"},i={trace:37,log:30,info:36,warn:33,error:31},s=Array.isArray||function(e){return toString.call(e)==="[object Array]"},o=function(e){return toString.call(e)==="[object String]"},u=function(t,n){e.call(this,t,n),this.pattern=this.config.pattern||u.DEFAULT_CONVERSION_PATTERN,this.compactObjects=this.config.compactObjects||!1};return u.prototype=new e,u.DEFAULT_CONVERSION_PATTERN="%m%n",u.TTCC_CONVERSION_PATTERN="%r %p %c - %m%n",u.SIMPLE_CONVERSION_PATTERN="%d %p %c - %m%n",u.prototype.toMessageString=function(e){return this.formatLogEvent(e,this.pattern)},u.prototype.formatLogEvent=function(e,u){var a="",f=[],l={matched:"",padding:"",truncation:"",pattern:"",params:"",text:""},c="",h="",p=0,d=[],v="",m=0,g=0,y="",b=null,w=/%(-?[0-9]+)?(\.?[0-9]+)?([cdhmnpr%])(?:\{([^\}]+)\})?|([^%]+)/g;while(f=w.exec(u)){l.matched=f[0],l.padding=f[1],l.truncation=f[2],l.pattern=f[3],l.params=f[4],l.text=f[5],v="";if(l.text){a+=l.text;continue}switch(l.pattern){case"c":h=e.getLoggerName(),l.params?(p=parseInt(l.params,10),d=h.split("."),p>=d.length?v=h:v=d.slice(d.length-p).join(".")):v=h;break;case"d":y=l.params||"ISO8601",y==="ISO8601"?y=r.iso8601:y==="ABSOLUTE"?y=r.absolute:y==="COMPACT"?y=r.compact:y==="DATE"?y=r.date:y==="ISO8601_BASIC"&&(y=r.iso8601_basic),b=new Date(e.getMillis()),v=(new t(y)).format(b);break;case"h":h=l.params||"",v="["+(i[e.getLevel()]||0)+"m"+this.formatLogEvent(e,h)+"[0m";break;case"m":d=s(e.getMessage())?e.getMessage():[e.getMessage()],c=l.params||" ";for(m=0,g=d.length;m<g;m++)m>0&&(v+=c),o(d[m])?v+=d[m]:v+=n(d[m],2,this.compactObjects);break;case"n":v="\n";break;case"p":v=e.getLevel();break;case"r":p=e.getMillis()-this.loggerContext.getStartTime(),v=""+p;break;case"%":v="%";break;default:v=l.matched}l.truncation&&(p=parseInt(l.truncation.substr(1),10),g=v.length,p<g&&(v=v.substring(g-p,g)));if(l.padding)if(l.padding.charAt(0)==="-"){g=parseInt(l.padding.substr(1),10);for(m=v.length;m<g;m++)v+=" "}else{g=parseInt(l.padding,10),h="";for(m=v.length;m<g;m++)h+=" ";v=h+v}a+=v}return a.lastIndexOf("\n")===a.length-1&&(a=a.substring(0,a.length-1)),a},u}),define("woodman-node",["./logmanager","./appenders/consoleappender","./appenders/node.js/fileappender","./layout","./layouts/jsonlayout","./layouts/patternlayout"],function(e,t,n,r,i,s){return e.registerAppender("console",t),e.registerAppender("ConsoleAppender",t),e.registerAppender("file",n),e.registerAppender("FileAppender",n),e.registerLayout("default",r),e.registerLayout("json",i),e.registerLayout("JSONLayout",i),e.registerLayout("pattern",s),e.registerLayout("PatternLayout",s),e}),require(["./woodman-node"],function(e){module.exports=e},null,!0);