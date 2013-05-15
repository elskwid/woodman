/*!
Woodman - v0.5.0 - 2013-05-15
 Copyright 2013 Joshfire; MIT license
 https://github.com/joshfire/woodman

Based on log4j v2.0
 Copyright © 1999-2013 Apache Software Foundation. All Rights Reserved.
 Apache License, Version 2.0
 http://logging.apache.org/log4j/2.x/

Built with RequireJS optimizer r.js 2.1.2
 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 new BSD or MIT licensed
 http://github.com/jrburke/requirejs

Includes Almond 0.2.3
 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved
 Available via the MIT or new BSD license
 http://github.com/jrburke/almond

Includes Socket.IO.js build:0.9.11, development
 Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 MIT Licensed

Portions adapted from log4javascript
 Copyright Tim Down
 Apache License, Version 2.0
 http://log4javascript.org/
*/
(function(e){var t,n,r;(function(e){function d(e,t){return h.call(e,t)}function v(e,t){var n,r,i,s,o,u,a,f,c,h,p=t&&t.split("/"),d=l.map,v=d&&d["*"]||{};if(e&&e.charAt(0)===".")if(t){p=p.slice(0,p.length-1),e=p.concat(e.split("/"));for(f=0;f<e.length;f+=1){h=e[f];if(h===".")e.splice(f,1),f-=1;else if(h===".."){if(f===1&&(e[2]===".."||e[0]===".."))break;f>0&&(e.splice(f-1,2),f-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((p||v)&&d){n=e.split("/");for(f=n.length;f>0;f-=1){r=n.slice(0,f).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=f;break}}}if(s)break;!u&&v&&v[r]&&(u=v[r],a=f)}!s&&u&&(s=u,o=a),s&&(n.splice(0,o,s),e=n.join("/"))}return e}function m(t,n){return function(){return s.apply(e,p.call(arguments,0).concat([t,n]))}}function g(e){return function(t){return v(t,e)}}function y(e){return function(t){a[e]=t}}function b(t){if(d(f,t)){var n=f[t];delete f[t],c[t]=!0,i.apply(e,n)}if(!d(a,t)&&!d(c,t))throw new Error("No "+t);return a[t]}function w(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function E(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=Object.prototype.hasOwnProperty,p=[].slice;o=function(e,t){var n,r=w(e),i=r[0];return e=r[1],i&&(i=v(i,t),n=b(i)),i?n&&n.normalize?e=n.normalize(e,g(t)):e=v(e,t):(e=v(e,t),r=w(e),i=r[0],e=r[1],i&&(n=b(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return m(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:E(e)}}},i=function(t,n,r,i){var s,l,h,p,v,g=[],w;i=i||t;if(typeof r=="function"){n=!n.length&&r.length?["require","exports","module"]:n;for(v=0;v<n.length;v+=1){p=o(n[v],i),l=p.f;if(l==="require")g[v]=u.require(t);else if(l==="exports")g[v]=u.exports(t),w=!0;else if(l==="module")s=g[v]=u.module(t);else if(d(a,l)||d(f,l)||d(c,l))g[v]=b(l);else{if(!p.p)throw new Error(t+" missing "+l);p.p.load(p.n,m(i,!0),y(l),{}),g[v]=a[l]}}h=r.apply(a[t],g);if(t)if(s&&s.exports!==e&&s.exports!==a[t])a[t]=s.exports;else if(h!==e||!w)a[t]=h}else t&&(a[t]=r)},t=n=s=function(t,n,r,a,f){return typeof t=="string"?u[t]?u[t](n):b(o(t,n).f):(t.splice||(l=t,n.splice?(t=n,n=r,r=null):t=e),n=n||function(){},typeof r=="function"&&(r=a,a=f),a?i(e,t,n,r):setTimeout(function(){i(e,t,n,r)},15),s)},s.config=function(e){return l=e,s},r=function(e,t,n){t.splice||(n=t,t=[]),!d(a,e)&&!d(f,e)&&(f[e]=[e,t,n])},r.amd={jQuery:!0}})(),r("../deps/almond",function(){}),r("lifecycle",[],function(){var e=function(){this.started=!1};return e.prototype.start=function(e){return e=e||function(){},this.started=!0,e()},e.prototype.stop=function(e){return e=e||function(){},this.started=!1,e()},e.prototype.isStarted=function(){return this.started},e}),r("loglevel",[],function(){var e=["error","warn","info","log","trace"],t=function(t){var n=0,r=e.length;for(n=0;n<r;n++)if(e[n]===t)return n;return-1};return{registerLevel:function(n,r){var i=0;if(t(n)!==-1)throw new Error('Log level "'+n+'" '+"cannot be registered as it already exists");if(r){i=t(r);if(i===-1)throw new Error('The log level "'+r+'" '+"cannot be used as reference level as it does not exist")}e.splice(i,0,n)},isBelow:function(e,n){return e==="off"?!0:e==="all"?n==="all":n==="off"?!1:n==="all"?!0:t(e)<=t(n)}}}),r("logevent",[],function(){var e=function(e,t,n){this.time=new Date,this.loggerName=e,this.level=t,this.message=n};return e.prototype.getLoggerName=function(){return this.loggerName},e.prototype.getLevel=function(){return this.level},e.prototype.getMessage=function(){return this.message},e.prototype.getMillis=function(){return this.time.getTime()},e}),r("utils",[],function(){var e=Object.prototype.toString,t=Array.isArray||function(t){return e.call(t)==="[object Array]"},n=function(t){return e.call(t)==="[object String]"},r=function(e){return e===Object(e)},i=function(t){return e.call(t)==="[object Function]"},s=function(t){return e.call(t)==="[object Date]"},o={},u=function(e,t,n){if(!e)return;if(Array.prototype.forEach&&e.forEach===Array.prototype.forEach)e.forEach(t,n);else if(e.length===+e.length){for(var r=0,i=e.length;r<i;r++)if(r in e&&t.call(n,e[r],r,e)===o)return}else for(var s in e)if(e.hasOwnProperty(s)&&t.call(n,e[s],s,e)===o)return},a=function(e,t,n){var r=[];return e?Array.prototype.map&&e.map===Array.prototype.map?e.map(t,n):(u(e,function(e,i,s){r[r.length]=t.call(n,e,i,s)}),e.length===+e.length&&(r.length=e.length),r):r};return{isArray:t,isString:n,isObject:r,isFunction:i,isDate:s,each:u,map:a}}),r("layouts/simpleobjectserializer",["require","../utils"],function(e){function n(e){var t=String(e);return t.length===1&&(t="0"+t),t}var t=e("../utils"),r=function(e,i){var s=null;return i=typeof i!="undefined"?i:1,typeof e=="undefined"?undefined:t.isString(e)?e:t.isDate(e)?e.getUTCFullYear()+"-"+n(e.getUTCMonth()+1)+"-"+n(e.getUTCDate())+"T"+n(e.getUTCHours())+":"+n(e.getUTCMinutes())+":"+n(e.getUTCSeconds())+"."+String((e.getUTCMilliseconds()/1e3).toFixed(3)).slice(2,5)+"Z":i<=0?"…":(t.isArray(e)?(s=[],t.each(e,function(e){s.push(r(e,i-1))})):t.isObject(e)?(s={},t.each(e,function(e,t){s[t]=r(e,i-1)})):t.isFunction(e)?s="[func]":s=e,s)};return function(e,t,n){var i=r(e,t);return n?JSON.stringify(i):JSON.stringify(i,null,2)}}),r("message",["require","./utils","./layouts/simpleobjectserializer"],function(e){var t=e("./utils"),n=e("./layouts/simpleobjectserializer"),r=function(e){this.formatString="",this.params=[];if(!e)return;e=t.isArray(e)?e:[e],e.length>0&&t.isString(e[0])&&e[0].indexOf("{}")!==-1?(this.formatString=e[0],this.params=e.slice(1)):this.params=e};return r.prototype.getFormattedMessage=function(e){e=e||{},e.separator=t.isString(e.separator)?e.separator:" ",e.compactObjects=e.compactObjects||!1,e.objectDepth=e.objectDepth||2;var n=0,r=0,i=this.params.length,s="",o=0,u=this.formatString.indexOf("{}");while(u!==-1)s+=this.formatString.substring(o,u),n<i&&(r=this.params[n],s+=this.getFormattedParam(r,e)),n+=1,o=u+2,u=this.formatString.indexOf("{}",o);for(!0;n<i;n++)r=this.params[n],n>0&&(s+=e.separator),s+=this.getFormattedParam(r,e);return s},r.prototype.getFormattedParam=function(e,r){return r=r||{},r.objectDepth=r.objectDepth||2,t.isString(e)?e:e.toString&&e.toString!==Object.prototype.toString?e.toString():n(e,r.objectDepth,r.compactObjects)},r.prototype.getParameters=function(){return this.params},r.prototype.getFormat=function(){return this.formatString},r}),r("logger",["require","./loglevel","./logevent","./message"],function(e){var t=e("./loglevel"),n=e("./logevent"),r=e("./message"),i=function(e,t){this.name=e,this.loggerContext=t,this.parent=null,this.children=[],this.appenders=[],this.filter=null,this.level="inherit",this.additive=!0};return i.prototype.log=function(){this.trace("log",arguments)},i.prototype.info=function(){this.trace("info",arguments)},i.prototype.warn=function(){this.trace("warn",arguments)},i.prototype.error=function(){this.trace("error",arguments)},i.prototype.trace=function(e,i){var s=0,o=[],u=null,a=i.length;for(s=0;s<i.length;s++)o[s]=i[s];a===1&&o[0]instanceof r?u=o[0]:u=new r(o);var f=new n(this.name,e,u),l="neutral",c=null;this.loggerContext&&(c=this.loggerContext.getFilter()),c&&(l=c.filter(f)),l==="neutral"&&(t.isBelow(e,this.level)?l="accept":l="deny");if(l!=="accept")return;if(this.filter){l=this.filter.filter(f);if(l==="deny")return}this.append(f)},i.prototype.append=function(e){var t=0,n=0;for(t=0,n=this.appenders.length;t<n;t+=1)this.appenders[t].append(e);this.additive&&this.parent&&this.parent.append(e)},i.prototype.reset=function(){this.appenders=[],this.level="inherit",this.filter=null,this.additive=!0},i.prototype.initialize=function(e){e=e||{},this.level=typeof e.level!="undefined"?e.level:"inherit",this.additive=typeof e.additivity!="undefined"?e.additivity:!0,this.appenders=e.appenders||[],this.filter=e.filter||null},i}),r("filter",[],function(){var e=function(){};return e.prototype.filter=function(e){return e?"accept":"deny"},e}),r("filters/compositefilter",["require","../filter"],function(e){var t=e("../filter"),n=function(e){t.call(this),this.filters=e||[]};return n.prototype=new t,n.prototype.filter=function(e){var t=0,n=this.filters.length,r="neutral";for(t=0;t<n;t++){r=this.filters[t].filter(e);if(r!=="neutral")break}return r},n}),r("loggercontext",["require","./lifecycle","./logger","./utils","./filters/compositefilter"],function(e){var t=e("./lifecycle"),n=e("./logger"),r=e("./utils"),i=e("./filters/compositefilter"),s=function(){t.call(this),this.startTime=new Date,this.rootLogger=new n("[root]",this),this.loggers={},this.appenders={},this.filters={},this.layouts={},this.createdAppenders=[],this.filter=null};return s.prototype=new t,s.prototype.registerAppender=function(e,t){this.appenders[e]=t},s.prototype.registerFilter=function(e,t){this.filters[e]=t},s.prototype.registerLayout=function(e,t){this.layouts[e]=t},s.prototype.getFilter=function(){return this.filter},s.prototype.createFilter=function(e){var t=[],n=[],s=null;return e?(r.isArray(e)?t=e:r.each(e,function(e,n){r.isArray(e)?(r.each(e,function(e){e.type||(e.type=n)}),t=t.concat(e)):(e.type||(e.type=n),t.push(e))}),r.each(t,function(e){if(r.isFunction(e.filter)){n.push(e);return}var t=this.filters[e.type];if(!t)throw new Error('Unknown filter type "'+e.type+'"');n.push(new t(e))},this),n.length>1?s=new i(n):n.length===1&&(s=n[0]),s):null},s.prototype.initialize=function(e){e&&r.isString(e)&&e.match(/^console(\s|$)/i)?e={loggers:[{level:"all",appenders:[{type:"Console",name:"console",layout:{type:"pattern",pattern:e.substring("console ".length)||"%d{yyyy-MM-dd HH:mm:ss} [%c] %p - %m%n"}}]}]}:e=JSON.parse(JSON.stringify(e||{}));var t=[],n=[],i={};this.reset(),r.isArray(e)?t=e:(e.configuration&&(e=e.configuration),r.isArray(e.loggers)?t=e.loggers:(t=[],t=r.each(e.loggers,function(e,n){n==="root"&&(e.root=!0),r.isArray(e)?r.each(e,function(e){t.push(e)}):t.push(e)})),r.isArray(e.appenders)?n=e.appenders:r.each(e.appenders,function(e,t){r.isArray(e)?(r.each(e,function(e){e.type||(e.type=t)}),n=n.concat(e)):(e.type||(e.type=t),n.push(e))})),r.each(t,function(e){var t=[];e["appender-ref"]&&(r.isArray(e["appender-ref"])?t=r.map(e["appender-ref"],function(e){return e.ref}):t.push(e["appender-ref"].ref),delete e["appender-ref"]),r.isArray(e.appenders)&&r.each(e.appenders,function(e){r.isObject(e)?(n.push(e),t.push(e.name)):t.push(e)}),e.appenders=t}),this.filter=this.createFilter(e.filters),r.each(n,function(e){var t=this.appenders[e.type],n=null,s=null,o=null;if(!t)throw new Error('Unknown appender type for "'+e.name+'": '+e.type);if(i[e.name])throw new Error('Appender "'+e.name+'" referenced twice in the configuration');e.layout?(n=e.layout,s=this.layouts[n.type]):r.each(this.layouts,function(t,r){e[r]&&(n=e[r],s=t)});if(!s)throw new Error('No proper layout defined for appender "'+e.name+'"');e.layout=new s(n,this),e.filters?e.filter=this.createFilter(e.filters):e.filter&&(e.filter=this.createFilter([e.filter])),o=new t(e),this.createdAppenders.push(o),i[e.name]=o},this),r.each(t,function(e){var t=null;e.appenders=r.map(e.appenders,function(t){var n=i[t];if(!n)throw new Error('Logger "'+e.name+'" references undefined appender "'+t+'"');return i[t]}),e.filters?e.filter=this.createFilter(e.filters):e.filter&&(e.filter=this.createFilter(e.filter)),e.root||!e.name?t=this.getLogger():t=this.getLogger(e.name),t.initialize(e)},this),this.propagateLevels()},s.prototype.getLogger=function(e){var t=null,r="",i=0;return e?(t=this.loggers[e],t?t:(t=new n(e,this),i=e.lastIndexOf("."),i!==-1?r=this.getLogger(e.substring(0,i)):r=this.rootLogger,t.parent=r,t.level=r.level,t.filter=r.filter,r.children=r.children||[],r.children.push(t),this.loggers[e]=t,t)):this.rootLogger},s.prototype.getStartTime=function(){return this.startTime.getTime()},s.prototype.reset=function(){var e="";for(e in this.loggers)this.loggers[e].reset();this.rootLogger.reset(),this.rootLogger.level="all",this.createdAppenders=[],this.started=!1},s.prototype.propagateLevels=function(){this.rootLogger.level==="inherit"&&(this.rootLogger.level="all"),r.each(this.loggers,function(e){var t=e;while(t.level==="inherit")t=t.parent;e.level=t.level,e.filter||(e.filter=t.filter)})},s.prototype.start=function(e){e=e||function(){};var t=this,n=this.createdAppenders.length,i=!1,s=function(r){if(i)return;if(r)return i=!0,e(r);n-=1;if(n===0)return t.started=!0,e()};if(!(n>0))return this.started=!0,e();r.each(this.createdAppenders,function(e){e.start(function(e){return s(e)})})},s.prototype.stop=function(e){e=e||function(){};var t=this,n=this.createdAppenders.length,i=!1,s=function(r){if(i)return;if(r)return i=!0,e(r);n-=1;if(n===0)return t.started=!1,e()};if(!(n>0))return this.started=!1,e();r.each(this.createdAppenders,function(e){e.stop(function(e){return s(e)})})},s.prototype.load=function(e,t){this.initialize(e),this.start(t)},s}),r("logmanager",["require","./loggercontext","./loglevel"],function(e){var t=e("./loggercontext"),n=e("./loglevel"),r=new t;return{registerAppender:function(e,t){return r.registerAppender(e,t)},registerFilter:function(e,t){return r.registerFilter(e,t)},registerLayout:function(e,t){return r.registerLayout(e,t)},registerLevel:function(e,t){return n.registerLevel(e,t)},load:function(e,t){return r.load(e,t)},unload:function(e){return r.stop(e)},initialize:function(e){return r.initialize(e)},start:function(e){return r.start(e)},stop:function(e){return r.stop(e)},getLogger:function(e){return r.getLogger(e)}}}),r("appender",["require","./lifecycle","./loglevel"],function(e){var t=e("./lifecycle"),n=e("./loglevel"),r=function(e){e=e||{},t.call(this),this.name=e.name,this.layout=e.layout,this.filter=e.filter,this.level=e.level||"all"};return r.prototype=new t,r.prototype.getName=function(){return this.name},r.prototype.append=function(e){if(!this.isStarted())throw new Error('Appender "'+this.name+'" '+"must be started before it may be used");var t="neutral";this.filter&&(t=this.filter.filter(e)),t==="neutral"&&(n.isBelow(e.getLevel(),this.level)?t="accept":t="deny");if(t!=="accept")return;this.doAppend(e)},r.prototype.doAppend=function(){},r.prototype.getLayout=function(){return this.layout},r}),r("appenders/consoleappender",["require","../appender"],function(e){var t=e("../appender"),n=function(e){e=e||{},t.call(this,e),this.appendStrings=typeof e.appendStrings!="undefined"?e.appendStrings:!0};return n.prototype=new t,n.prototype.doAppend=function(e){var t=this.getLayout(),n=e.getLevel(),r=null;this.appendStrings?(r=t.toMessageString(e),r&&r.lastIndexOf("\n")===r.length-1&&(r=r.substring(0,r.length-1)),this.doAppendMessage(n,r)):(e=t.toLogEvent(e),this.doAppendMessage(n,e))},n.prototype.doAppendMessage=function(e,t){if(typeof console=="undefined")return;e==="info"?console.info(t):e==="warn"?console.warn(t):e==="error"?console.error(t):console.log(t)},n}),r("appenders/nodejs/fileappender",["require","../../appender"],function(t){var n=t("../../appender"),r=t,i=null;try{typeof global!="undefined"&&global.process&&global.process.versions&&global.process.versions.node&&typeof e=="function"?i=e("fs"):i=r("fs")}catch(s){}var o=function(e){e=e||{},n.call(this,e),this.fileName=e.fileName,this.appendToFile=typeof e.append!="undefined"?!!e.append:!0,this.appendStrings=typeof e.appendStrings!="undefined"?e.appendStrings:!0,this.stream=null};return o.prototype=new n,o.prototype.doAppend=function(e){var t=this.getLayout(),n=null;this.appendStrings?n=t.toMessageString(e):(e=t.toLogEvent(e),t.compactObjects||t.compact?n=JSON.stringify(e):n=JSON.stringify(e,null,2)),process.platform==="win32"&&(n=n.replace(/\n/g,"\r\n")),this.stream.write(n)},o.prototype.start=function(e){return e=e||function(){},this.isStarted()?e():i?(this.stream=i.createWriteStream(this.fileName,{flags:this.appendToFile?"a":"w",encoding:"utf8"}),this.started=!0,e()):e("The File Appender only runs in a Node.js runtime environment")},o.prototype.stop=function(e){e=e||function(){};var t=this;if(!this.isStarted())return e();if(!this.stream)return this.started=!1,e();this.stream.end(function(){return t.started=!1,t.stream=null,e()})},o}),r("appenders/nodejs/rollingfileappender",["require","../../appender"],function(t){var n=t("../../appender"),r=t,i=null;try{typeof global!="undefined"&&global.process&&global.process.versions&&global.process.versions.node&&typeof e=="function"?i=e("fs"):i=r("fs")}catch(s){}var o=function(e){e=e||{},n.call(this,e),this.fileName=e.fileName,this.triggeringPolicy=e.triggeringPolicy,this.appendStrings=typeof e.appendStrings!="undefined"?e.appendStrings:!0,this.stream=null};return o.prototype=new n,o.prototype.needsRolling=function(){if(this.triggeringPolicy){if(this.triggeringPolicy.size&&this.currentLogSize>this.triggeringPolicy.size)return!0;if(this.triggeringPolicy.time&&this.currentLogDate&&Date.now()-this.currentLogDate>1e3*this.triggeringPolicy.time)return!0}return!1},o.prototype.genFileName=function(){var e=function(e,t,n){return n=n||"0",e+="",e.length>=t?e:(new Array(t-e.length+1)).join(n)+e},t=function(t){return e(t,2)},n=new Date,r=""+n.getFullYear()+"-"+t(n.getMonth()+1)+"-"+t(n.getDate())+"-"+t(n.getHours())+"h"+t(n.getMinutes());!this.currentTimestamp||r!==this.currentTimestamp?(this.currentTimeStampIdx=0,this.currentTimestamp=r):this.currentTimeStampIdx++;var i=this.currentTimestamp+"_"+t(this.currentTimeStampIdx)+"_"+this.fileName;return i},o.prototype.createNewlog=function(){this.stream&&this.stream.end(),this.stream=i.createWriteStream(this.genFileName(),{flags:"w",encoding:"utf8"}),this.currentLogSize=0,this.currentLogDate=new Date},o.prototype.doAppend=function(e){var t=this.getLayout(),n=null;this.needsRolling()&&this.createNewlog(),this.appendStrings?n=t.toMessageString(e):(e=t.toLogEvent(e),t.compactObjects||t.compact?n=JSON.stringify(e):n=JSON.stringify(e,null,2)),process.platform==="win32"&&(n=n.replace(/\n/g,"\r\n")),this.currentLogSize+=Buffer.byteLength(n,"utf8"),this.stream.write(n)},o.prototype.start=function(e){return e=e||function(){},this.isStarted()?e():i?(this.createNewlog(),this.started=!0,e()):e("The File Appender only runs in a Node.js runtime environment")},o.prototype.stop=function(e){e=e||function(){};var t=this;if(!this.isStarted())return e();if(!this.stream)return this.started=!1,e();this.stream.end(function(){return t.started=!1,t.stream=null,e()})},o}),r("filters/regexfilter",["require","../filter","../utils"],function(e){var t=e("../filter"),n=e("../utils"),r=function(e){t.call(this),e=e||{},this.regex=e.regex||"",n.isString(this.regex)&&(this.regex=new RegExp(this.regex)),this.useRawMsg=!!e.useRawMsg,this.onMatch=e.match||e.onMatch||"neutral",this.onMismatch=e.mismatch||e.onMismatch||"deny"};return r.prototype=new t,r.prototype.filter=function(e){var t="";return this.useRawMsg?t=e.getMessage().getFormat():t=e.getMessage().getFormattedMessage(),this.regex.test(t)?this.onMatch:this.onMismatch},r}),r("layout",[],function(){var e=function(e,t){this.config=e||{},this.loggerContext=t};return e.prototype.toLogEvent=function(e){return e},e.prototype.toMessageString=function(e){var t=e.getMessage();return e.getMillis()+" "+e.getLevel()+" "+e.getLoggerName()+" "+t.getFormattedMessage()},e}),r("layouts/jsonlayout",["require","../layout","./simpleobjectserializer"],function(e){var t=e("../layout"),n=e("./simpleobjectserializer"),r=function(e,n){e=e||{},t.call(this,e,n),this.compact=e.compact||!1,this.depth=e.depth||2,this.messageAsObject=e.messageAsObject||!1};return r.prototype=new t,r.prototype.toMessageString=function(e){var t=e.getMessage(),r=this.messageAsObject?this.depth+1:2;t?this.messageAsObject?t=JSON.parse(n(t,this.depth,!0)):t=t.getFormattedMessage():t="";var i={time:e.getMillis(),loggerName:e.getLoggerName(),level:e.getLevel(),message:t};return n(i,r,this.compact)},r}),r("layouts/simpledateformat",[],function(){var e=/('[^']*')|(G+|y+|M+|d+|F+|E+|a+|H+|k+|K+|h+|m+|s+|S+|Z+)|([a-zA-Z]+)|([^a-zA-Z']+)/g,t=["January","February","March","April","May","June","July","August","September","October","November","December"],n=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],r=0,i=1,s=2,o=3,u=4,a=5,f={G:r,y:o,M:u,w:s,W:s,D:s,d:s,F:s,E:i,a:r,H:s,k:s,K:s,h:s,m:s,s:s,S:s,Z:a},l=function(e,t){while(e.length<t)e="0"+e;return e},c=function(e,t,n){return t>=4?e:e.substr(0,Math.max(n,t))},h=function(e,t){var n=""+e;return l(n,t)},p=function(e){this.formatString=e};return p.prototype.format=function(p){var d="",v,m=this.formatString;while(v=e.exec(m)){var g=v[1],y=v[2],b=v[3],w=v[4];if(g)g==="''"?d+="'":d+=g.substring(1,g.length-1);else if(!b)if(w)d+=w;else if(y){var E=y.charAt(0),S=y.length,x="";switch(E){case"G":x="AD";break;case"y":x=p.getFullYear();break;case"M":x=p.getMonth();break;case"d":x=p.getDate();break;case"F":x=1+Math.floor((p.getDate()-1)/7);break;case"E":x=n[p.getDay()];break;case"a":x=p.getHours()>=12?"PM":"AM";break;case"H":x=p.getHours();break;case"k":x=p.getHours()||24;break;case"K":x=p.getHours()%12;break;case"h":x=p.getHours()%12||12;break;case"m":x=p.getMinutes();break;case"s":x=p.getSeconds();break;case"S":x=p.getMilliseconds();break;case"Z":x=p.getTimezoneOffset()}switch(f[E]){case r:d+=c(x,S,2);break;case i:d+=c(x,S,3);break;case s:d+=h(x,S);break;case o:if(S<=3){var T=""+x;d+=T.substr(2,2)}else d+=h(x,S);break;case u:S>=3?d+=c(t[x],S,S):d+=h(x+1,S);break;case a:var N=x>0,C=N?"-":"+",k=Math.abs(x),L=""+Math.floor(k/60);L=l(L,2);var A=""+k%60;A=l(A,2),d+=C+L+A}}}return d},p}),r("layouts/patternlayout",["require","../layout","./simpledateformat"],function(e){var t=e("../layout"),n=e("./simpledateformat"),r={absolute:"HH:mm:ss,SSS",compact:"yyyyMMddHHmmssSSS",date:"dd MMM yyyy HH:mm:ss,SSS",iso8601:"yyyy-MM-dd HH:mm:ss,SSS",iso8601_basic:"yyyy-MM-DD HHmmss,SSS"},i={trace:37,log:30,info:36,warn:33,error:31},s=function(e,n){t.call(this,e,n),this.pattern=this.config.pattern||s.DEFAULT_CONVERSION_PATTERN,this.compactObjects=this.config.compactObjects||!1};return s.prototype=new t,s.DEFAULT_CONVERSION_PATTERN="%m%n",s.TTCC_CONVERSION_PATTERN="%r %p %c - %m%n",s.SIMPLE_CONVERSION_PATTERN="%d %p %c - %m%n",s.prototype.toMessageString=function(e){return this.formatLogEvent(e,this.pattern)},s.prototype.formatLogEvent=function(e,t){var s="",o=[],u={matched:"",padding:"",truncation:"",pattern:"",params:"",text:""},a="",f=0,l=[],c="",h=0,p=0,d="",v=null,m=/%(-?[0-9]+)?(\.?[0-9]+)?(logger|date|highlight|message|level|relative|[cdhmnpr%])(?:\{([^\}]+)\})?|([^%]+)/g;while(o=m.exec(t)){u.matched=o[0],u.padding=o[1],u.truncation=o[2],u.pattern=o[3],u.params=o[4],u.text=o[5],c="";if(u.text){s+=u.text;continue}switch(u.pattern){case"logger":case"c":a=e.getLoggerName(),u.params?(f=parseInt(u.params,10),l=a.split("."),f>=l.length?c=a:c=l.slice(l.length-f).join(".")):c=a;break;case"date":case"d":d=u.params||"ISO8601",d==="ISO8601"?d=r.iso8601:d==="ABSOLUTE"?d=r.absolute:d==="COMPACT"?d=r.compact:d==="DATE"?d=r.date:d==="ISO8601_BASIC"&&(d=r.iso8601_basic),v=new Date(e.getMillis()),c=(new n(d)).format(v);break;case"highlight":case"h":a=u.params||"",c="["+(i[e.getLevel()]||0)+"m"+this.formatLogEvent(e,a)+"[0m";break;case"message":case"m":c+=e.getMessage().getFormattedMessage({separator:u.params,compactObjects:this.compactObjects});break;case"n":c="\n";break;case"level":case"p":c=e.getLevel();break;case"relative":case"r":f=e.getMillis()-this.loggerContext.getStartTime(),c=""+f;break;case"%":c="%";break;default:c=u.matched}u.truncation&&(f=parseInt(u.truncation.substr(1),10),p=c.length,f<p&&(c=c.substring(p-f,p)));if(u.padding)if(u.padding.charAt(0)==="-"){p=parseInt(u.padding.substr(1),10);for(h=c.length;h<p;h++)c+=" "}else{p=parseInt(u.padding,10),a="";for(h=c.length;h<p;h++)a+=" ";c=a+c}s+=c}return s},s}),r("woodman-node",["require","./logmanager","./appenders/consoleappender","./appenders/nodejs/fileappender","./appenders/nodejs/rollingfileappender","./filters/regexfilter","./layout","./layouts/jsonlayout","./layouts/patternlayout"],function(e){var t=e("./logmanager"),n=e("./appenders/consoleappender"),r=e("./appenders/nodejs/fileappender"),i=e("./appenders/nodejs/rollingfileappender"),s=e("./filters/regexfilter"),o=e("./layout"),u=e("./layouts/jsonlayout"),a=e("./layouts/patternlayout");return t.registerAppender("console",n),t.registerAppender("Console",n),t.registerAppender("ConsoleAppender",n),t.registerAppender("file",r),t.registerAppender("File",r),t.registerAppender("FileAppender",r),t.registerAppender("rollingfile",i),t.registerAppender("RollingFile",i),t.registerAppender("RollingFileAppender",i),t.registerFilter("regex",s),t.registerFilter("RegexFilter",s),t.registerLayout("default",o),t.registerLayout("json",u),t.registerLayout("JSONLayout",u),t.registerLayout("pattern",a),t.registerLayout("PatternLayout",a),t}),n(["./woodman-node"],function(e){module.exports=e},null,!0)})(require);