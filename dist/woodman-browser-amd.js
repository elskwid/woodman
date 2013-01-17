/*! Woodman - v0.1.1 - 2013-01-17 - https://github.com/joshfire/woodman
Copyright 2013 Joshfire; MIT license
Based on log4j v2.0: http://logging.apache.org/log4j/2.x/
Portions adapted from log4javascript: http://log4javascript.org/ (copyright Tim Down, Apache License, Version 2.0) */

define("lifecycle",[],function(){var e=function(){this.started=!1};return e.prototype.start=function(e){return e=e||function(){},this.started=!0,e()},e.prototype.stop=function(e){return e=e||function(){},this.started=!1,e()},e.prototype.isStarted=function(){return this.started},e}),define("loglevel",[],function(){var e=["error","warn","info","log","trace"],t=function(t){var n=0,r=e.length;for(n=0;n<r;n++)if(e[n]===t)return n;return-1};return{registerLevel:function(n,r){var i=0;if(t(n)!==-1)throw new Error('Log level "'+n+'" '+"cannot be registered as it already exists");if(r){i=t(r);if(i===-1)throw new Error('The log level "'+r+'" '+"cannot be used as reference level as it does not exist")}e.splice(i,0,n)},isBelow:function(e,n){return e==="off"?!0:e==="all"?n==="all":n==="off"?!1:n==="all"?!0:t(e)<=t(n)}}}),define("logevent",[],function(){var e=function(e,t,n){this.time=new Date,this.loggerName=e,this.level=t,this.message=n};return e.prototype.getLoggerName=function(){return this.loggerName},e.prototype.getLevel=function(){return this.level},e.prototype.getMessage=function(){return this.message},e.prototype.getMillis=function(){return this.time.getTime()},e}),define("logger",["./loglevel","./logevent"],function(e,t){var n=function(e,t){this.name=e,this.loggerContext=t,this.parent=null,this.children=[],this.appenders=[],this.level="inherit",this.additive=!0};return n.prototype.log=function(){this.trace("log",arguments)},n.prototype.info=function(){this.trace("info",arguments)},n.prototype.warn=function(){this.trace("warn",arguments)},n.prototype.error=function(){this.trace("error",arguments)},n.prototype.trace=function(n,r){var i=0,s=[],o=null;if(e.isBelow(n,this.level)){for(i=0;i<r.length;i++)s[i]=r[i];o=new t(this.name,n,s),this.append(o)}},n.prototype.append=function(e){var t=0,n=0;for(t=0,n=this.appenders.length;t<n;t+=1)this.appenders[t].append(e);this.additive&&this.parent&&this.parent.append(e)},n.prototype.reset=function(){this.appenders=[],this.level="inherit",this.additive=!0},n.prototype.initialize=function(e){e=e||{},this.level=typeof e.level!="undefined"?e.level:"inherit",this.additive=typeof e.additivity!="undefined"?e.additivity:!0,this.appenders=e.appenders||[]},n}),define("appender",["./lifecycle","./loglevel"],function(e,t){var n=function(t){t=t||{},e.call(this),this.name=t.name,this.layout=t.layout,this.level=t.level||"all"};return n.prototype=new e,n.prototype.getName=function(){return this.name},n.prototype.append=function(e){if(!this.isStarted())throw new Error('Appender "'+this.name+'" '+"must be started before it may be used");t.isBelow(e.getLevel(),this.level)&&this.doAppend(e)},n.prototype.doAppend=function(){},n.prototype.getLayout=function(){return this.layout},n}),define("layout",[],function(){var e=function(e,t){this.config=e||{},this.loggerContext=t};return e.prototype.toLogEvent=function(e){return e},e.prototype.toMessageString=function(e){var t=e.getMessage();return e.getMillis()+" "+e.getLevel()+" "+e.getLoggerName()+" "+(t.toString?t.toString():String(t))},e}),define("utils",[],function(){var e=Array.isArray||function(e){return toString.call(e)==="[object Array]"},t=function(e){return toString.call(e)==="[object String]"},n=function(e){return e===Object(e)},r=function(e){return toString.call(e)==="[object Function]"},i={},s=function(e,t,n){if(!e)return;if(Array.prototype.forEach&&e.forEach===Array.prototype.forEach)e.forEach(t,n);else if(e.length===+e.length){for(var r=0,s=e.length;r<s;r++)if(r in e&&t.call(n,e[r],r,e)===i)return}else for(var o in e)if(e.hasOwnProperty(o)&&t.call(n,e[o],o,e)===i)return},o=function(e,t,n){var r=[];return e?Array.prototype.map&&e.map===Array.prototype.map?e.map(t,n):(s(e,function(e,i,s){r[r.length]=t.call(n,e,i,s)}),e.length===+e.length&&(r.length=e.length),r):r};return{isArray:e,isString:t,isObject:n,isFunction:r,each:s,map:o}}),define("loggercontext",["./lifecycle","./logger","./appender","./layout","./utils"],function(e,t,n,r,i){var s=function(){e.call(this),this.startTime=new Date,this.rootLogger=new t("[root]",this),this.loggers={},this.appenders={},this.layouts={},this.createdAppenders=[]};return s.prototype=new e,s.prototype.registerAppender=function(e,t){this.appenders[e]=t},s.prototype.registerLayout=function(e,t){this.layouts[e]=t},s.prototype.registerLayout=function(e,t){this.layouts[e]=t},s.prototype.initialize=function(e){e=JSON.parse(JSON.stringify(e||{}));var t=[],n=[],r={};this.reset(),i.isArray(e)?t=e:(e.configuration&&(e=e.configuration),i.isArray(e.loggers)?t=e.loggers:t=i.map(e.loggers,function(e,t){return t==="root"&&(e.root=!0),e}),i.isArray(e.appenders)?n=e.appenders:i.each(e.appenders,function(e,t){i.isArray(e)?(i.each(e,function(e){e.type||(e.type=t)}),n=n.concat(e)):(e.type||(e.type=t),n.push(e))})),i.each(t,function(e){var t=[];e["appender-ref"]&&(i.isArray(e["appender-ref"])?t=i.map(e["appender-ref"],function(e){return e.ref}):t.push(e["appender-ref"].ref),delete e["appender-ref"]),i.isArray(e.appenders)&&i.each(e.appenders,function(e){i.isObject(e)?(n.push(e),t.push(e.name)):t.push(e)}),e.appenders=t}),i.each(n,function(e){var t=this.appenders[e.type],n=null,s=null,o=null;if(!t)throw new Error('Unknown appender type for "'+e.name+'": '+e.type);if(r[e.name])throw new Error('Appender "'+e.name+'" referenced twice in the configuration');e.layout?(n=e.layout,s=this.layouts[n.type]):i.each(this.layouts,function(t,r){e[r]&&(n=e[r],s=t)});if(!s)throw new Error('No proper layout defined for appender "'+e.name+'"');e.layout=new s(n,this),o=new t(e),this.createdAppenders.push(o),r[e.name]=o},this),i.each(t,function(e){var t=null;e.appenders=i.map(e.appenders,function(t){var n=r[t];if(!n)throw new Error('Logger "'+e.name+'" references undefined appender "'+t+'"');return r[t]}),e.root||!e.name?t=this.getLogger():t=this.getLogger(e.name),t.initialize(e)},this),this.propagateLevels()},s.prototype.getLogger=function(e){var n=null,r="",i=0;return e?(n=this.loggers[e],n?n:(n=new t(e,this),i=e.lastIndexOf("."),i!==-1?r=this.getLogger(e.substring(0,i)):r=this.rootLogger,n.parent=r,n.level=r.level,r.children=r.children||[],r.children.push(n),this.loggers[e]=n,n)):this.rootLogger},s.prototype.getStartTime=function(){return this.startTime.getTime()},s.prototype.reset=function(){var e="";for(e in this.loggers)this.loggers[e].reset();this.rootLogger.reset(),this.rootLogger.level="all",this.createdAppenders=[],this.started=!1},s.prototype.propagateLevels=function(){this.rootLogger.level==="inherit"&&(this.rootLogger.level="all"),i.each(this.loggers,function(e){var t=e;while(t.level==="inherit")t=t.parent;e.level=t.level})},s.prototype.start=function(e){e=e||function(){};var t=this,n=this.createdAppenders.length,r=!1,s=function(i){if(r)return;if(i)return r=!0,e(i);n-=1;if(n===0)return t.started=!0,e()};i.each(this.createdAppenders,function(e){e.start(function(e){return s(e)})})},s.prototype.stop=function(e){e=e||function(){};var t=this.createdAppenders.length,n=!1,r=function(r){if(n)return;if(r)return n=!0,e(r);t-=1;if(t===0)return e()};i.each(this.createdAppenders,function(e){e.stop(function(e){return r(e)})})},s.prototype.load=function(e,t){this.initialize(e),this.start(t)},s}),define("logmanager",["./loggercontext"],function(e){var t=new e;return{registerAppender:function(e,n){return t.registerAppender(e,n)},registerLayout:function(e,n){return t.registerLayout(e,n)},load:function(e,n){return t.load(e,n)},unload:function(e){return t.stop(e)},getLogger:function(e){return t.getLogger(e)}}}),define("appenders/consoleappender",["../appender"],function(e){var t=function(t){t=t||{},e.call(this,t),this.appendStrings=typeof t.appendStrings!="undefined"?t.appendStrings:!0};return t.prototype=new e,t.prototype.doAppend=function(e){var t=this.getLayout(),n=e.getLevel(),r=null;this.appendStrings?(r=t.toMessageString(e),this.doAppendMessage(n,r)):(e=t.toLogEvent(e),this.doAppendMessage(n,e))},t.prototype.doAppendMessage=function(e,t){if(typeof console=="undefined")return;e==="info"?console.info(t):e==="warn"?console.warn(t):e==="error"?console.error(t):console.log(t)},t}),define("layouts/jsonlayout",["../layout"],function(e){var t=function(t){return t.replace(/\r\n|\r|\n/g,"\\r\\n")},n=function(t){return t&&t.toString?t.toString():String(t)},r=function(t,n){e.call(this,t,n)};return r.prototype=new e,r.prototype.toMessageString=function(e){var r=this,i=this.getDataValues(e,this.combineMessages),s="{"+this.lineBreak,o,u,a=function f(e,i,s){var o,u=typeof e;if(e instanceof Date)o=String(e.getTime());else if(s&&e instanceof Array){o="["+r.lineBreak;for(var a=0,l=e.length;a<l;a++){var c=i+r.tab;o+=c+f(e[a],c,!1),a<e.length-1&&(o+=","),o+=r.lineBreak}o+=i+"]"}else u!=="number"&&u!=="boolean"?o='"'+t(n(e).replace(/\"/g,'\\"'))+'"':o=e;return o};for(o=0,u=i.length-1;o<=u;o++)s+=this.tab+'"'+i[o][0]+'"'+this.colon+a(i[o][1],this.tab,!0),o<u&&(s+=","),s+=this.lineBreak;return s+="}"+this.lineBreak,s},r}),define("layouts/simpledateformat",[],function(){var e=/('[^']*')|(G+|y+|M+|d+|F+|E+|a+|H+|k+|K+|h+|m+|s+|S+|Z+)|([a-zA-Z]+)|([^a-zA-Z']+)/g,t=["January","February","March","April","May","June","July","August","September","October","November","December"],n=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],r=0,i=1,s=2,o=3,u=4,a=5,f={G:r,y:o,M:u,w:s,W:s,D:s,d:s,F:s,E:i,a:r,H:s,k:s,K:s,h:s,m:s,s:s,S:s,Z:a},l=function(e,t){while(e.length<t)e="0"+e;return e},c=function(e,t,n){return t>=4?e:e.substr(0,Math.max(n,t))},h=function(e,t){var n=""+e;return l(n,t)},p=function(e){this.formatString=e};return p.prototype.format=function(p){var d="",v,m=this.formatString;while(v=e.exec(m)){var g=v[1],y=v[2],b=v[3],w=v[4];if(g)g==="''"?d+="'":d+=g.substring(1,g.length-1);else if(!b)if(w)d+=w;else if(y){var E=y.charAt(0),S=y.length,x="";switch(E){case"G":x="AD";break;case"y":x=p.getFullYear();break;case"M":x=p.getMonth();break;case"d":x=p.getDate();break;case"F":x=1+Math.floor((p.getDate()-1)/7);break;case"E":x=n[p.getDay()];break;case"a":x=p.getHours()>=12?"PM":"AM";break;case"H":x=p.getHours();break;case"k":x=p.getHours()||24;break;case"K":x=p.getHours()%12;break;case"h":x=p.getHours()%12||12;break;case"m":x=p.getMinutes();break;case"s":x=p.getSeconds();break;case"S":x=p.getMilliseconds();break;case"Z":x=p.getTimezoneOffset()}switch(f[E]){case r:d+=c(x,S,2);break;case i:d+=c(x,S,3);break;case s:d+=h(x,S);break;case o:if(S<=3){var T=""+x;d+=T.substr(2,2)}else d+=h(x,S);break;case u:S>=3?d+=c(t[x],S,S):d+=h(x+1,S);break;case a:var N=x>0,C=N?"-":"+",k=Math.abs(x),L=""+Math.floor(k/60);L=l(L,2);var A=""+k%60;A=l(A,2),d+=C+L+A}}}return d},p}),define("layouts/simpleobjectserializer",["../utils"],function(e){var t=function n(t,r){r=typeof r!="undefined"?r:1;var i="",s=!1;return typeof t=="undefined"?"[undefined]":r===0?"[...]":(e.isArray(t)?(i+="[",e.each(t,function(e,t){t>0&&(i+=", "),i+=n(e,r-1)}),i+="]"):e.isString(t)?i+='"'+t.replace(/"/g,'\\"')+'"':e.isObject(t)?(i+="{",s=!1,e.each(t,function(e,t){i+=t+": "+n(e,r-1)+", ",s=!0}),s&&(i=i.substring(0,i.length-2)),i+="}"):e.isFunction(t)?i+="[func]":i+=t,i)};return function(e,n){return t(e,n)}}),define("layouts/patternlayout",["../layout","./simpledateformat","./simpleobjectserializer"],function(e,t,n){var r=/%(-?[0-9]+)?(\.?[0-9]+)?([cdmnpr%])(?:\{([^\}]+)\})?|([^%]+)/g,i={absolute:"HH:mm:ss,SSS",compact:"yyyyMMddHHmmssSSS",date:"dd MMM yyyy HH:mm:ss,SSS",iso8601:"yyyy-MM-dd HH:mm:ss,SSS",iso8601_basic:"yyyy-MM-DD HHmmss,SSS"},s=Array.isArray||function(e){return toString.call(e)==="[object Array]"},o=function(e){return toString.call(e)==="[object String]"},u=function(t,n){e.call(this,t,n),this.pattern=this.config.pattern||u.DEFAULT_CONVERSION_PATTERN};return u.prototype=new e,u.DEFAULT_CONVERSION_PATTERN="%m%n",u.TTCC_CONVERSION_PATTERN="%r %p %c - %m%n",u.SIMPLE_CONVERSION_PATTERN="%d %p %c - %m%n",u.prototype.toMessageString=function(e){var u="",a=[],f={matched:"",padding:"",truncation:"",pattern:"",params:"",text:""},l="",c="",h=0,p=[],d="",v=0,m=0,g="",y=null;while(a=r.exec(this.pattern)){f.matched=a[0],f.padding=a[1],f.truncation=a[2],f.pattern=a[3],f.params=a[4],f.text=a[5],d="";if(f.text){u+=f.text;continue}switch(f.pattern){case"c":c=e.getLoggerName(),f.params?(h=parseInt(f.params,10),p=c.split("."),h>=p.length?d=c:d=p.slice(p.length-h).join(".")):d=c;break;case"d":g=f.params||"ISO8601",g==="ISO8601"?g=i.iso8601:g==="ABSOLUTE"?g=i.absolute:g==="COMPACT"?g=i.compact:g==="DATE"?g=i.date:g==="ISO8601_BASIC"&&(g=i.iso8601_basic),y=new Date(e.getMillis()),d=(new t(g)).format(y);break;case"m":p=s(e.getMessage())?e.getMessage():[e.getMessage()],l=f.params||" ";for(v=0,m=p.length;v<m;v++)v>0&&(d+=l),o(p[v])?d+=p[v]:d+=n(p[v],2);break;case"n":d="\n";break;case"p":d=e.getLevel();break;case"r":h=e.getMillis()-this.loggerContext.getStartTime(),d=""+h;break;case"%":d="%";break;default:d=f.matched}f.truncation&&(h=parseInt(f.truncation.substr(1),10),m=d.length,h<m&&(d=d.substring(m-h,m)));if(f.padding)if(f.padding.charAt(0)==="-"){m=parseInt(f.padding.substr(1),10);for(v=d.length;v<m;v++)d+=" "}else{m=parseInt(f.padding,10),c="";for(v=d.length;v<m;v++)c+=" ";d=c+d}u+=d}return u.lastIndexOf("\n")===u.length-1&&(u=u.substring(0,u.length-1)),u},u}),define("woodman-browser",["./logmanager","./appender","./layout","./appenders/consoleappender","./layouts/jsonlayout","./layouts/patternlayout"],function(e,t,n,r,i,s){return e.registerAppender("console",r),e.registerLayout("default",n),e.registerLayout("json",i),e.registerLayout("pattern",s),e}),define("woodman",["./woodman-browser"],function(e){return e});