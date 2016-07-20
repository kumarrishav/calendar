define(["components/react","components/react-dom","components/lodash","components/moment","components/cldr/en","components/cldr/core","components/jsspeechrecognizer","components/chrono"],function(e,t,n,i,r,o,s,a){"use strict";function c(e){this.message=`The response returned a ${e} HTTP status code.`,this.statusCode=e,this.name="HttpError",Error.call(this)}e="default"in e?e.default:e,t="default"in t?t.default:t,n="default"in n?n.default:n,i="default"in i?i.default:i,s="default"in s?s.default:s,a="default"in a?a.default:a;var l=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,i,r){var o=t&&t.defaultProps,s=arguments.length-3;if(n||0===s||(n={}),n&&o)for(var a in o)void 0===n[a]&&(n[a]=o[a]);else n||(n=o||{});if(1===s)n.children=r;else if(s>1){for(var c=Array(s),l=0;l<s;l++)c[l]=arguments[l+3];n.children=c}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:n,_owner:null}}}(),u=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},h=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),p=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},f=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},d=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)},g=function(){function e(t){u(this,e),Object.assign(this,t||{})}return e.prototype.main=function(){throw new Error("Not implemented!")},e}(),m=function(e){function t(n){u(this,t);var i=f(this,e.call(this,n));return i.state={login:"mozilla"},i.server=n.server,i.onChange=i.onChange.bind(i),i.onFormSubmit=i.onFormSubmit.bind(i),i}return p(t,e),t.prototype.onChange=function(e){var t=e.target.value;this.setState({login:t})},t.prototype.onFormSubmit=function(e){e.preventDefault(),this.server.login(this.state.login,"password").then(function(){location.hash="reminders"})},t.prototype.render=function(){return l("form",{className:"user-login",onSubmit:this.onFormSubmit},void 0,l("input",{value:this.state.login,placeholder:"Family name",className:"user-login__name-field",onChange:this.onChange}),l("button",{className:"user-login__login-button"},void 0,l("img",{src:"css/icons/next.svg"})))},t}(e.Component),y=["login","logout"],v=y[0],b=function(n){function i(){return u(this,i),f(this,n.apply(this,arguments))}return p(i,n),i.prototype.main=function(){var e=arguments.length<=0||void 0===arguments[0]?v:arguments[0];switch(y.includes(e)||(console.error(`Bad users route: "${e}". Falling back to ${v}.`),e=v),e){case"login":this.login();break;case"logout":this.logout()}},i.prototype.login=function(){t.render(e.createElement(m,{server:this.server}),this.mountNode)},i.prototype.logout=function(){this.server.logout().then(function(){location.hash="users/login"})},i}(g),w=["red","orange","green","blue","violet"],S=function(e){function t(n){u(this,t);var i=f(this,e.call(this,n));return TwitterCldr.set_data(TwitterCldrDataBundle),i.listFormatter=new TwitterCldr.ListFormatter,i.reminder=n.reminder,i.onDelete=n.onDelete,i}return p(t,e),t.prototype.getColour=function(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=e.join(" "),n=function(e){var t=0,n=void 0,i=void 0,r=void 0;if(0===e.length)return 0;for(n=0,r=e.length;n<r;n++)i=e.charCodeAt(n),t=(t<<5)-t+i,t|=0;return t};return w[n(t)%w.length]},t.prototype.render=function(){var e=this.reminder,t=["reminders__item-content",this.getColour(e.recipients)].join(" ");return l("li",{className:"reminders__item"},void 0,l("div",{className:"reminders__item-time"},void 0,l("div",{},void 0,i(e.datetime).format("LT"))),l("div",{className:t},void 0,l("h3",{className:"reminders__item-recipient"},void 0,this.listFormatter.format(e.recipients)),l("p",{className:"reminders__item-text"},void 0,e.content,l("button",{className:"reminders__delete",onClick:this.onDelete},void 0,"Delete"))))},t}(e.Component),k=function(e){function t(n){u(this,t);var r=f(this,e.call(this,n));return r.state={reminders:[]},r.speechController=n.speechController,r.server=n.server,r.refreshInterval=null,r.debugEvent=r.debugEvent.bind(r),r.onReminder=r.onReminder.bind(r),i.locale(navigator.languages||navigator.language||"en-US"),r}return p(t,e),t.prototype.componentDidMount=function(){var e=this;this.server.reminders.getAll().then(function(t){t=t.map(function(e){return{id:e.id,recipients:e.recipients,content:e.action,datetime:e.due}}),e.setState({reminders:t})}),this.refreshInterval=setInterval(function(){e.speechController.idle&&location.reload(!0)},3e5),this.speechController.on("wakelistenstart",this.debugEvent),this.speechController.on("wakelistenstop",this.debugEvent),this.speechController.on("wakeheard",this.debugEvent),this.speechController.on("speechrecognitionstart",this.debugEvent),this.speechController.on("speechrecognitionstop",this.debugEvent),this.speechController.on("reminder",this.debugEvent),this.speechController.on("reminder",this.onReminder)},t.prototype.componentWillUnmount=function(){clearInterval(this.refreshInterval),this.speechController.off("wakelistenstart",this.debugEvent),this.speechController.off("wakelistenstop",this.debugEvent),this.speechController.off("wakeheard",this.debugEvent),this.speechController.off("speechrecognitionstart",this.debugEvent),this.speechController.off("speechrecognitionstop",this.debugEvent),this.speechController.off("reminder",this.debugEvent),this.speechController.off("reminder",this.onReminder)},t.prototype.debugEvent=function(e){return void 0!==e.result?void console.log(e.type,e.result):void console.log(e.type)},t.prototype.onReminder=function(e){var t=this,n=e.result;this.server.reminders.set({recipients:n.users,action:n.action,due:Number(n.time)}).then(function(e){var i=t.state.reminders;i.push({id:e.id,recipients:e.recipients,content:e.action,datetime:e.due}),t.setState({reminders:i}),console.log("Voice confirmation:",n.confirmation),t.speechController.speak(n.confirmation)}).catch(function(e){console.error("Saving the reminder failed.",e)})},t.prototype.onDelete=function(e){var t=this;this.server.reminders.delete(e).then(function(){var n=t.state.reminders.filter(function(t){return t.id!==e});t.setState({reminders:n})}).catch(function(){console.error(`The reminder ${e} could not be deleted.`)})},t.prototype.render=function(){var e=this,t=this.state.reminders;t=t.sort(function(e,t){return e.datetime-t.datetime}),t=n.groupBy(t,function(e){return i(e.datetime).format("YYYY/MM")}),Object.keys(t).forEach(function(e){t[e]=n.groupBy(t[e],function(e){return i(e.datetime).format("YYYY/MM/DD")})});var r=Object.keys(t).map(function(n){var r=i(n,"YYYY/MM").format("MMMM"),o=t[n];return l("div",{},n,l("h2",{className:"reminders__month"},void 0,r),Object.keys(o).map(function(t){var n=i(t,"YYYY/MM/DD"),r=o[t];return l("div",{className:"reminders__day"},t,l("div",{className:"reminders__day-date"},void 0,l("div",{className:"reminders__day-mday"},void 0,n.format("DD")),l("div",{className:"reminders__day-wday"},void 0,n.format("ddd"))),l("ol",{className:"reminders__list"},void 0,r.map(function(t){return l(S,{reminder:t,onDelete:e.onDelete.bind(e,t.id)},t.id)})))}))});return l("section",{className:"reminders"},void 0,r)},t}(e.Component),E=function(e){function t(n){u(this,t);var i=f(this,e.call(this,n));return i.state={isListening:!1},i.speechController=n.speechController,i.server=n.server,i.bleep=new Audio,i.bleep.src="media/cue.wav",i.speechController.on("wakeheard",function(){i.bleep.pause(),i.bleep.currentTime=0,i.bleep.play(),i.setState({isListening:!0})}),i.speechController.on("speechrecognitionstop",function(){i.setState({isListening:!1})}),i.click=i.click.bind(i),i}return p(t,e),t.prototype.click=function(){return this.state.isListening?(this.bleep.pause(),this.setState({isListening:!1}),void this.speechController.stopSpeechRecognition()):(this.bleep.pause(),this.bleep.currentTime=0,this.bleep.play(),this.setState({isListening:!0}),void this.speechController.startSpeechRecognition())},t.prototype.render=function(){if(!this.server.isLoggedIn)return null;var e=this.state.isListening?"listening":"";return l("div",{className:e,onClick:this.click},void 0,l("div",{className:"microphone__background"}),l("img",{className:"microphone__icon",src:"css/icons/microphone.svg"}))},t}(e.Component),R=function(n){function i(){return u(this,i),f(this,n.apply(this,arguments))}return p(i,n),i.prototype.main=function(){t.render(e.createElement(k,{speechController:this.speechController,server:this.server}),this.mountNode),t.render(e.createElement(E,{speechController:this.speechController,server:this.server}),document.querySelector(".microphone"))},i}(g),C=function(e){if(!e||"string"!=typeof e)throw new Error("Event name should be a valid non-empty string!")},O=function(e){if("function"!=typeof e)throw new Error("Handler should be a function!")},L=function(e,t){if(e&&e.indexOf(t)<0)throw new Error(`Event "${t}" is not allowed!`)},j=Object.freeze({allowedEvents:Symbol("allowedEvents"),listeners:Symbol("listeners")}),T=function(){function e(t){if(u(this,e),"undefined"!=typeof t&&!Array.isArray(t))throw new Error("Allowed events should be a valid array of strings!");this[j.listeners]=new Map,this[j.allowedEvents]=t}return e.prototype.on=function(e,t){C(e),L(this[j.allowedEvents],e),O(t);var n=this[j.listeners].get(e);n||(n=new Set,this[j.listeners].set(e,n)),n.add(t)},e.prototype.once=function e(t,n){var i=this;O(n);var e=function(r){i.off(t,e),n.call(i,r)};this.on(t,e)},e.prototype.off=function(e,t){C(e),L(this[j.allowedEvents],e),O(t);var n=this[j.listeners].get(e);n&&(n.delete(t),n.size||this[j.listeners].delete(e))},e.prototype.offAll=function(e){if("undefined"==typeof e)return void this[j.listeners].clear();C(e),L(this[j.allowedEvents],e);var t=this[j.listeners].get(e);t&&(t.clear(),this[j.listeners].delete(e))},e.prototype.emit=function(e,t){var n=this;C(e),L(this[j.allowedEvents],e);var i=this[j.listeners].get(e);i&&i.forEach(function(e){try{e.call(n,t)}catch(e){console.error(e)}})},e.prototype.hasListeners=function(e){return C(e),L(this[j.allowedEvents],e),this[j.listeners].has(e)},e}(),P=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];u(this,e);var n=t.minimumConfidence||.35,i=t.bufferCount||80,r=t.maxVoiceActivityGap||300,o=t.numGroups||60,a=t.groupSize||5;this.recogniser=new s,this.recogniser.keywordSpottingMinimumConfidence=n,this.recogniser.keywordSpottingBufferCount=i,this.recogniser.keywordSpottingMaxVoiceActivityGap=r,this.recogniser.numGroups=o,this.recogniser.groupSize=a,Object.seal(this)}return e.prototype.startListening=function(){var e=this;return new Promise(function(t){e.recogniser.closeMic(),e.recogniser.openMic(),e.recogniser.isRecording()||e.recogniser.startKeywordSpottingRecording(),t()})},e.prototype.stopListening=function(){var e=this;return new Promise(function(t){e.recogniser.isRecording()&&e.recogniser.stopRecording(),e.recogniser.closeMic(),t()})},e.prototype.loadModel=function(e){if(this.recogniser.isRecording())throw new Error("Load the model data before listening for wakeword");this.recogniser.model=e},e.prototype.setOnKeywordSpottedCallback=function(e){this.recogniser.keywordSpottedCallback=e},e}(),M=Object.freeze({isListening:Symbol("isListening"),recognition:Symbol("recognition"),supportsRecognition:Symbol("supportsRecognition")}),N=function(){function e(){u(this,e),this[M.isListening]=!1;var t=window.SpeechRecognition||window.webkitSpeechRecognition,n=!!t;this[M.supportsRecognition]=n,n?(this[M.recognition]=new t,this[M.recognition].continuous=!0):this[M.recognition]=null,Object.seal(this)}return e.prototype.listenForUtterance=function(){var e=this;return this[M.supportsRecognition]?this[M.isListening]?Promise.reject(new Error("Speech recognition is already listening")):new Promise(function(t,n){e[M.isListening]=!0,e[M.recognition].onresult=function(n){if(e[M.isListening]){e[M.recognition].stop(),e[M.isListening]=!1;var i=n.results[0][0];return t({confidence:i.confidence,utterance:i.transcript})}},e[M.recognition].onerror=function(t){return e[M.recognition].stop(),e[M.isListening]=!1,n(t)},e[M.recognition].start()}):Promise.reject(new Error("Speech recognition not supported in this browser"))},e.prototype.abort=function(){return this[M.recognition].stop(),this[M.isListening]=!1,Promise.resolve()},e}(),U=Object.freeze({synthesis:Symbol("synthesis"),supportsSynthesis:Symbol("supportsSynthesis"),preferredVoice:Symbol("preferredVoice"),initialised:Symbol("initialised"),setPreferredVoice:Symbol("setPreferredVoice")}),_=.8,A=.9,V=function(){function e(){u(this,e);var t=window.speechSynthesis;this[U.initialised]=!1,this[U.supportsSynthesis]=!!t,this[U.preferredVoice]=null,this[U.supportsSynthesis]?(this[U.synthesis]=t,this[U.setPreferredVoice](),this[U.synthesis].onvoiceschanged=this[U.setPreferredVoice].bind(this)):this[U.synthesis]=null,Object.seal(this)}return e.prototype.speak=function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];if(e){var t=new SpeechSynthesisUtterance(e);this[U.preferredVoice]&&(t.voice=this[U.preferredVoice]),t.lang="en",t.pitch=_,t.rate=A,this[U.synthesis].speak(t)}},e.prototype[U.setPreferredVoice]=function(){if(!this[U.initialised]){var e=this[U.synthesis].getVoices();if(e.length){var t=e.filter(function(e){return"en"===e.lang||e.lang.startsWith("en-")}),n=t.filter(function(e){return e.name.includes("Female")});n.length?this[U.preferredVoice]=n[0]:t.length&&(this[U.preferredVoice]=t[0]),this[U.initialised]=!0,this[U.synthesis].onvoiceschanged=null}}},e}(),F=Object.freeze({listFormatter:Symbol("listFormatter"),getLocalised:Symbol("getLocalised"),formatUser:Symbol("formatUser"),formatAction:Symbol("formatAction"),formatTime:Symbol("formatTime"),isToday:Symbol("isToday"),isTomorrow:Symbol("isTomorrow"),isThisMonth:Symbol("isThisMonth"),formatHoursAndMinutes:Symbol("formatHoursAndMinutes")}),D="en",x={en:{template:`OK, I'll remind [users] [action] [time].`,formatUser:function(e){return e.replace(/\bme\b/gi,"you").replace(/\bI\b/gi,"you").replace(/\bmy\b/gi,"your").replace(/\bmine\b/gi,"yours")}},fr:{template:`OK, je rappelerai [users] [action] [time].`,formatUser:function(e){return e}},ja:{template:`承知しました。[time][users]に[action]をリマインドします。`,formatUser:function(e){return e}}},z=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?D:arguments[0];u(this,e),this.locale=t,TwitterCldr.set_data(TwitterCldrDataBundle),this[F.listFormatter]=new TwitterCldr.ListFormatter}return e.prototype.getReminderMessage=function(e){console.log(e);var t=this[F.getLocalised]("template"),n={users:this[F.formatUser](e),action:this[F.formatAction](e),time:this[F.formatTime](e)};return t.replace(/\[([^\]]+)\]/g,function(e,t){return n[t]})},e.prototype[F.getLocalised]=function(e){var t=this.locale;return x[this.locale]&&x[this.locale][e]||(t=D),x[t][e]},e.prototype[F.formatUser]=function(e){var t=this[F.getLocalised]("formatUser"),n=e.users.map(t);return this[F.listFormatter].format(n)},e.prototype[F.formatAction]=function(e){var t=this[F.getLocalised]("formatUser"),n=t(e.action),i=new RegExp(`\\bthat \\[action\\]`,"iu"),r=new RegExp(`\\bit is \\[action\\]`,"iu");return i.test(e.match)?`that ${n}`:r.test(e.match)?`that it is ${n}`:`to ${n}`},e.prototype[F.formatTime]=function(e){var t=e.time,n="";if(this[F.isToday](t)){var r=this[F.formatHoursAndMinutes](t);n=`at ${r} today`}else if(this[F.isTomorrow](t)){var o=this[F.formatHoursAndMinutes](t);n=`at ${o} tomorrow`}else n=this[F.isThisMonth](t)?i(t).format("[on the] Do"):i(t).format("[on] MMMM [the] Do");return n},e.prototype[F.isToday]=function(e){var t=i().startOf("day"),n=i().add(1,"day").startOf("day");return i(e).isBetween(t,n)},e.prototype[F.isTomorrow]=function(e){var t=i().add(1,"day").startOf("day"),n=i().add(2,"day").startOf("day");return i(e).isBetween(t,n)},e.prototype[F.isThisMonth]=function(e){var t=i().startOf("month"),n=i().add(1,"month").startOf("month");return i(e).isBetween(t,n)},e.prototype[F.formatHoursAndMinutes]=function(e){if(e=i(e),0===e.minute())return e.format("h A");if(15===e.minute())return e.format("[quarter past] h A");if(30===e.minute())return e.format("[half past] h A");if(45===e.minute()){var t=e.add(1,"hour");return t.format("[quarter to] h A")}return e.format("h m A")},e}(),W=Object.freeze({confirmation:Symbol("confirmation"),patterns:Symbol("patterns"),parseUsers:Symbol("parseUsers"),parseAction:Symbol("parseAction"),parseDatetime:Symbol("parseDatetime"),normalise:Symbol("normalise"),init:Symbol("init"),buildPatterns:Symbol("buildPatterns"),splitOnPlaceholders:Symbol("splitOnPlaceholders"),escape:Symbol("escape")}),I={en:{patterns:[`Remind [users] to [action] at [time].`,`Remind [users] to [action] on [time].`,`Remind [users] to [action] by [time].`,`Remind [users] at [time] to [action].`,`Remind [users] on [time] to [action].`,`Remind [users] by [time] to [action].`,`Remind [users] that it is [action] on [time].`,`Remind [users] that it is [action] at [time].`,`Remind [users] that it is [action] by [time].`,`Remind [users] that [time] is [action].`,`Remind [users] that [action] at [time].`,`Remind [users] that [action] on [time].`,`Remind [users] that [action] by [time].`],placeholders:{users:"( \\S+ | \\S+,? and \\S+ )",action:"(.+)",time:"(.+)"},punctuation:new RegExp(`[-‐–—,;:!?.…'‘’"“”()\\[\\]§@*/&#†‡′″]+$`,"u"),listBreaker:new RegExp(`,|, and\\b|\\band\\b`,"gu")},fr:{patterns:[`Rappelle [users] de [action] [time].`,`Rappelle [users] d'[action] [time].`,`Rappelle-[users] de [action] [time].`,`Rappelle-[users] d'[action] [time].`],placeholders:{users:"( \\S+ | \\S+ et \\S+ )",action:"(.+)",time:"(.+)"},punctuation:new RegExp(`[-‐–—,;:!?.…’"“”«»()\\[\\]§@*/&#†‡]+$`,"u"),listBreaker:new RegExp(`,|\\bet\\b`,"gu")},ja:{patterns:[`[time][action]を[users]に思い出させて。`,`[time][users]に[action]を思い出させて。`,`[time][users]は[action]と言うリマインダーを作成して。`],placeholders:{users:"(\\S+|\\S+、\\S+)",action:"(.+)",time:"(.+)"},punctuation:new RegExp(`[-‾_＿－‐—―〜・･,，、､;；:：!！?？.．‥…。｡＇‘’"＂“”(（)）\\[［\\]］{｛}｝`+`〈〉《》「｢」｣『』【】〔〕‖§¶@＠*＊/／\＼&＆#＃%％‰†‡′″〃※]+$`,"u"),listBreaker:new RegExp(`、`,"gu")}},Y=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?"en":arguments[0];u(this,e),this.locale=t,this[W.confirmation]=new z(t),this[W.patterns]={},this[W.init](),window.intentParser=this,Object.seal(this)}return e.prototype.parse=function(){var e=this,t=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return t?new Promise(function(n,i){var r=e[W.patterns][e.locale].some(function(r){if(!r.regexp.test(t))return!1;var o=r.regexp.exec(t);o.shift();var s=e[W.parseUsers](o[r.placeholders.users]),a=e[W.parseAction](o[r.placeholders.action]),c=e[W.parseDatetime](o[r.placeholders.time]);if(null===c)return i("Time could not be parsed."),!1;var l=r.match,u=e[W.confirmation].getReminderMessage({users:s,action:a,time:c,match:l});return n({users:s,action:a,time:c,confirmation:u}),!0});if(!r)return i("Unsupported intent format.")}):Promise.reject("Empty string.")},e.prototype[W.parseUsers]=function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return e.split(I[this.locale].listBreaker).map(function(e){return e.trim()})},e.prototype[W.parseAction]=function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return e.trim()},e.prototype[W.parseDatetime]=function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];e=e.trim();var t=a.parseDate(e);return t},e.prototype[W.normalise]=function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments.length<=1||void 0===arguments[1]?this.locale:arguments[1];return e.replace(/\s+/g," ").trim().replace(I[t].punctuation,"")},e.prototype[W.init]=function(){var e=this;Object.keys(I).forEach(function(t){e[W.patterns][t]=I[t].patterns.map(function(n){return e[W.buildPatterns](t,n,I[t].placeholders)})})},e.prototype[W.buildPatterns]=function(){var e=arguments.length<=0||void 0===arguments[0]?this.locale:arguments[0],t=this,n=arguments.length<=1||void 0===arguments[1]?"":arguments[1],i=arguments[2],r=this[W.normalise](n,e),o=this[W.splitOnPlaceholders](r),s={},a=0,c=o.map(function(e){if(e.startsWith("[")){var n=e.substr(1).replace(new RegExp("\\]$","u"),"");return s[n]=a,a++,i[n]}return" "===e?"\\b \\b":t[W.escape](e).replace(new RegExp("^ ","u"),"\\b").replace(new RegExp(" $","u"),"\\b")}),l=new RegExp(`^${c.join("")}$`,"iu");return{regexp:l,placeholders:s,match:n}},e.prototype[W.splitOnPlaceholders]=function(e){var t=[""],n=0;return e.split("").forEach(function(e){"["===e&&""!==t[n]&&(n++,t[n]=""),t[n]+=e,"]"===e&&(n++,t[n]="")}),t},e.prototype[W.escape]=function(e){return e.replace(new RegExp("\\.","gu"),"\\.").replace(new RegExp("\\/","gu"),"\\/").replace(new RegExp("\\(","gu"),"\\(").replace(new RegExp("\\)","gu"),"\\)")},e}(),B=Object.freeze({wakewordRecogniser:Symbol("wakewordRecogniser"),wakewordModelUrl:Symbol("wakewordModelUrl"),speechRecogniser:Symbol("speechRecogniser"),speechSynthesis:Symbol("speechSynthesis"),idle:Symbol("idle"),initialiseSpeechRecognition:Symbol("initialiseSpeechRecognition"),startListeningForWakeword:Symbol("startListeningForWakeword"),stopListeningForWakeword:Symbol("stopListeningForWakeword"),listenForUtterance:Symbol("listenForUtterance"),handleSpeechRecognitionEnd:Symbol("handleSpeechRecognitionEnd"),intentParser:Symbol("intentParser")}),H=["wakelistenstart","wakelistenstop","wakeheard","speechrecognitionstart","speechrecognitionstop","reminder"],G=function(e){function t(){u(this,t);var n=f(this,e.call(this,H));return n[B.idle]=!0,n[B.wakewordModelUrl]="data/wakeword_model.json",n[B.speechRecogniser]=new N,n[B.speechSynthesis]=new V,n[B.wakewordRecogniser]=new P,n[B.intentParser]=new Y,n[B.wakewordRecogniser].setOnKeywordSpottedCallback(function(){n.emit(H[2],{type:H[2]}),n.startSpeechRecognition()}),Object.seal(n),n}return p(t,e),t.prototype.start=function(){return this[B.initialiseSpeechRecognition]().then(this[B.startListeningForWakeword].bind(this))},t.prototype.startSpeechRecognition=function(){var e=this;return this[B.idle]=!1,this[B.stopListeningForWakeword]().then(this[B.listenForUtterance].bind(this)).then(this[B.handleSpeechRecognitionEnd].bind(this)).then(this[B.startListeningForWakeword].bind(this)).catch(function(t){console.log("startSpeechRecognition err",t),e.emit(H[4],{type:H[4]}),e[B.startListeningForWakeword]()})},t.prototype.stopSpeechRecognition=function(){return this[B.speechRecogniser].abort().then(this[B.startListeningForWakeword].bind(this))},t.prototype.speak=function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];this[B.speechSynthesis].speak(e)},t.prototype[B.initialiseSpeechRecognition]=function(){var e=this;return fetch(this[B.wakewordModelUrl]).then(function(e){return e.json()}).then(function(t){e[B.wakewordRecogniser].loadModel(t)})},t.prototype[B.startListeningForWakeword]=function(){return this.emit(H[0],{type:H[0]}),this[B.idle]=!0,this[B.wakewordRecogniser].startListening()},t.prototype[B.stopListeningForWakeword]=function(){return this.emit(H[1],{type:H[1]}),this[B.wakewordRecogniser].stopListening()},t.prototype[B.listenForUtterance]=function(){return this.emit(H[3],{type:H[3]}),this[B.speechRecogniser].listenForUtterance()},t.prototype[B.handleSpeechRecognitionEnd]=function(e){var t=this;this.emit(H[4],{type:H[4],result:e}),this[B.intentParser].parse(e.utterance).then(function(e){t.emit(H[5],{type:H[5],result:e})}).catch(function(t){console.error("Error while parsing the sentence:",t),console.error("Sentence was:",e.utterance)})},h(t,[{key:"idle",get:function(){return this[B.idle]}}]),t}(T),J="cue-",q="https://calendar.knilxof.org",$=1,K=/([A-Z])/g,Z=Object.freeze({values:Symbol("values"),storage:Symbol("storage"),updateSetting:Symbol("updateSetting"),stringToSettingTypedValue:Symbol("stringToSettingTypedValue"),getDefaultSettingValue:Symbol("getDefaultSettingValue"),onStorage:Symbol("onStorage")}),Q=Object.freeze({SESSION:Object.freeze({key:"session"})}),X=function(e){function t(){var n=arguments.length<=0||void 0===arguments[0]?localStorage:arguments[0];u(this,t);var i=f(this,e.call(this));return i[Z.storage]=n||{getItem:function(){return null},setItem:function(){},removeItem:function(){},clear:function(){}},i[Z.values]=new Map,Object.keys(Q).forEach(function(e){var t=Q[e],n=i[Z.storage].getItem(`${J}${t.key}`);i[Z.values].set(t,i[Z.stringToSettingTypedValue](t,n))}),window.addEventListener("storage",i[Z.onStorage].bind(i)),Object.seal(i),i}return p(t,e),t.prototype.clear=function(){var e=this;return new Promise(function(t){Object.keys(Q).forEach(function(t){var n=Q[t];e[Z.updateSetting](n,e[Z.getDefaultSettingValue](n))}),t()})},t.prototype[Z.updateSetting]=function(e,t){var n=this[Z.values].get(e);n!==t&&(this[Z.values].set(e,t),t!==this[Z.getDefaultSettingValue](e)?this[Z.storage].setItem(`${J}${e.key}`,t):this[Z.storage].removeItem(`${J}${e.key}`),this.emit(e.key.replace(K,function(e){return`-${e.toLowerCase()}`}),t))},t.prototype[Z.stringToSettingTypedValue]=function(e,t){return null===t?this[Z.getDefaultSettingValue](e):"boolean"===e.type?"true"===t:"number"===e.type?Number(t):t},t.prototype[Z.getDefaultSettingValue]=function(e){return void 0!==e.defaultValue?e.defaultValue:"boolean"!==e.type&&("number"===e.type?0:null)},t.prototype[Z.onStorage]=function(e){if(e.key.startsWith(J)){var t=e.key.substring(J.length),n=Object.keys(Q).find(function(e){return Q[e].key===t});if(!n)return void console.warn(`Changed unknown storage entry with app specific prefix: ${e.key}`);var i=Q[n];this[Z.updateSetting](i,this[Z.stringToSettingTypedValue](i,e.newValue))}},h(t,[{key:"session",get:function(){return this[Z.values].get(Q.SESSION)},set:function(e){this[Z.updateSetting](Q.SESSION,e)}},{key:"origin",get:function(){return q}},{key:"apiVersion",get:function(){return $}}]),t}(T);c.prototype=Object.create(Error.prototype);var ee=Object.freeze({settings:Symbol("settings"),online:Symbol("online"),init:Symbol("init"),fetch:Symbol("fetch")}),te=function(e){function t(n){u(this,t);var i=f(this,e.call(this,["online"]));return i[ee.settings]=n,i[ee.online]=!1,Object.seal(i),i[ee.init](),i}return p(t,e),t.prototype[ee.init]=function(){var e=this;this[ee.online]=navigator.onLine,window.addEventListener("online",function(t){e[ee.online]=t,e.emit("online",t)}),window.addEventListener("offline",function(t){e[ee.online]=t,e.emit("online",t)}),"connection"in navigator&&"onchange"in navigator.connection&&navigator.connection.addEventListener("change",function(){var t=navigator.onLine;e[ee.online]=t,e.emit("online",t)})},t.prototype.fetchJSON=function(e){var t=arguments.length<=1||void 0===arguments[1]?"GET":arguments[1],n=arguments.length<=2||void 0===arguments[2]?void 0:arguments[2],i="application/json";return this[ee.fetch](e,i,t,n).then(function(e){var t=e.headers.get("Content-Type")||"";if(!e.ok||t.startsWith(i))return e.json()})},t.prototype.fetchBlob=function(e,t,n,i){return this[ee.fetch](e,t,n,i).then(function(e){return e.blob()})},t.prototype[ee.fetch]=function(e,t){var n=arguments.length<=2||void 0===arguments[2]?"GET":arguments[2],i=arguments.length<=3||void 0===arguments[3]?void 0:arguments[3];n=n.toUpperCase();var r={method:n,headers:{Accept:t},cache:"no-store"};return this[ee.settings].session&&(r.headers.Authorization=`Bearer ${this[ee.settings].session}`),void 0!==i&&(r.headers["Content-Type"]="application/json;charset=UTF-8",r.body=JSON.stringify(i)),fetch(e,r).then(function(e){if(!e.ok)throw new c(e.status);return e})},h(t,[{key:"origin",get:function(){return this[ee.settings].origin}},{key:"online",get:function(){return this[ee.online]}}]),t}(T),ne=Object.freeze({api:Symbol("api"),settings:Symbol("settings"),listenForMessages:Symbol("listenForMessages")}),ie=function(e){function t(n,i){u(this,t);var r=f(this,e.call(this,["message"]));return r[ne.api]=n,r[ne.settings]=i,Object.seal(r),r}return p(t,e),t.prototype.subscribeToNotifications=function(){var e=this;return navigator.serviceWorker?(navigator.serviceWorker.addEventListener("message",this[ne.listenForMessages].bind(this)),navigator.serviceWorker.ready.then(function(e){return e.pushManager.getSubscription().then(function(t){return t||e.pushManager.subscribe({userVisibleOnly:!0})})}).then(function(t){return e[ne.api].post("subscriptions",{subscription:t,title:`Browser ${navigator.userAgent}`})}).catch(function(e){if("denied"===Notification.permission)throw new Error("Permission request was denied.");if(!(e instanceof c&&409===e.statusCode))throw new Error(`There was an error while subscribing to push notifications: ${e}`)})):Promise.reject("No service worker supported")},t.prototype[ne.listenForMessages]=function(e){return e.data?void this.emit("message",e.data):void console.error("Received a push message without a payload.")},t}(T),re=Object.freeze({settings:Symbol("settings"),net:Symbol("net"),getURL:Symbol("getURL"),onceOnline:Symbol("onceOnline"),onceReady:Symbol("onceReady"),getChannelValues:Symbol("getChannelValues"),updateChannelValue:Symbol("updateChannelValue")}),oe=function(){function e(t,n){u(this,e),this[re.net]=t,this[re.settings]=n,Object.freeze(this)}return e.prototype.get=function(e){var t=this;return this[re.onceReady]().then(function(){return t[re.net].fetchJSON(t[re.getURL](e))})},e.prototype.post=function(e,t){var n=this;return this[re.onceReady]().then(function(){return n[re.net].fetchJSON(n[re.getURL](e),"POST",t)})},e.prototype.put=function(e,t){var n=this;return this[re.onceReady]().then(function(){return n[re.net].fetchJSON(n[re.getURL](e),"PUT",t)})},e.prototype.delete=function(e,t){var n=this;return this[re.onceReady]().then(function(){return n[re.net].fetchJSON(n[re.getURL](e),"DELETE",t)})},e.prototype.blob=function(e,t){var n=this,i=arguments.length<=2||void 0===arguments[2]?"image/jpeg":arguments[2];return this[re.onceReady]().then(function(){return t?n[re.net].fetchBlob(n[re.getURL](e),i,"PUT",t):n[re.net].fetchBlob(n[re.getURL](e),i)})},e.prototype[re.getURL]=function(e){if(!e||"string"!=typeof e)throw new Error("Path should be a valid non-empty string.");return`${this[re.net].origin}/api/v${this[re.settings].apiVersion}/${e}`},e.prototype[re.onceReady]=function(){return Promise.all([this[re.onceOnline]()])},e.prototype[re.onceOnline]=function(){var e=this[re.net];return e.online?Promise.resolve():new Promise(function(t){return e.once("online",function(){return t()})})},e}(),se=Object.freeze({api:Symbol("api"),settings:Symbol("settings")}),ae=function(){function e(t,n){u(this,e),this[se.api]=t,this[se.settings]=n,Object.seal(this)}return e.prototype.getAll=function(){return this[se.api].get("reminders")},e.prototype.get=function(e){return this[se.api].get(`reminders/${e}`)},e.prototype.set=function(e){return this[se.api].post(`reminders`,e)},e.prototype.delete=function(e){return this[se.api].delete(`reminders/${e}`)},e}(),ce=Object.freeze({settings:Symbol("settings"),net:Symbol("net"),webPush:Symbol("webPush"),api:Symbol("api")}),le=function(e){function t(){var n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],i=n.settings,r=n.net;u(this,t);var o=f(this,e.call(this,["login","online","push-message"]));return o[ce.settings]=i||new X,o[ce.net]=r||new te(o[ce.settings]),o[ce.api]=new oe(o[ce.net],o[ce.settings]),o[ce.webPush]=new ie(o[ce.api],o[ce.settings]),o.reminders=new ae(o[ce.api],o[ce.settings]),o[ce.net].on("online",function(e){return o.emit("online",e);
}),o[ce.webPush].on("message",function(e){return o.emit("push-message",e)}),window.server=o,Object.seal(o),o}return p(t,e),t.prototype.clear=function(){var e=arguments.length<=0||void 0===arguments[0]||arguments[0],t=[this[ce.settings].clear()];return navigator.serviceWorker||e||t.push(navigator.serviceWorker.ready.then(function(e){return e.unregister()})),Promise.all(t)},t.prototype.login=function(e,t){var n=this;return this[ce.api].post("login",{user:e,password:t}).then(function(e){n[ce.settings].session=e.token,n.emit("login")})},t.prototype.logout=function(){return this[ce.settings].session=null,Promise.resolve()},t.prototype.subscribeToNotifications=function(){return this.isLoggedIn?this[ce.webPush].subscribeToNotifications():Promise.reject(new Error("Error while subscribing to push notifications: user is not logged in"))},h(t,[{key:"online",get:function(){return this[ce.net].online}},{key:"isLoggedIn",get:function(){return!!this[ce.settings].session}}]),t}(T),ue=Object.freeze({controllers:Symbol("controllers"),speechController:Symbol("speechController"),server:Symbol("server"),subscribeToNotifications:Symbol("subscribeToNotifications"),onHashChanged:Symbol("onHashChanged")}),he=function(e){function t(){u(this,t);var n=f(this,e.call(this)),i=document.querySelector(".app-view-container"),r=new G,o=new le,s={mountNode:i,speechController:r,server:o},a=new b(s),c=new R(s);return n[ue.controllers]={"":a,"users/(.+)":a,reminders:c},n[ue.speechController]=r,n[ue.server]=o,window.addEventListener("hashchange",n[ue.onHashChanged].bind(n)),n}return p(t,e),t.prototype.main=function(){var e=this;screen&&"orientation"in screen&&"lock"in screen.orientation&&screen.orientation.lock("landscape").catch(function(e){console.error(e)}),this[ue.speechController].start().then(function(){console.log("Speech controller started")}),this[ue.server].on("login",function(){return e[ue.subscribeToNotifications]()}),this[ue.server].on("push-message",function(t){e[ue.speechController].speak(`${t.title}: ${t.body}`)}),location.hash="",setTimeout(function(){e[ue.server].isLoggedIn?(e[ue.subscribeToNotifications](),location.hash="reminders"):location.hash="users/login"})},t.prototype[ue.onHashChanged]=function(){var e=window.location.hash.slice(1);for(var t of Object.keys(this[ue.controllers])){var n=e.match(new RegExp(`^${t}$`));if(n){var i;(i=this[ue.controllers][t]).main.apply(i,d(n.slice(1)));break}}},t.prototype[ue.subscribeToNotifications]=function(){this[ue.server].subscribeToNotifications().catch(function(e){console.error("Error while subscribing to notifications:",e)})},t}(g),pe=new he;pe.main()});
//# sourceMappingURL=app.js.map
