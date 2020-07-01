(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{16:function(e,t,n){e.exports=n(40)},39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(15),u=n.n(c),o=n(1),l=n.n(o),i=n(3),s=n(4),f=function(e){var t=e.value,n=e.handlerFunction;return a.a.createElement("div",null,a.a.createElement("label",null,"Filter: "),a.a.createElement("input",{value:t,onChange:n}))},p=function(e){var t=e.formFields,n=e.handlerFunction;return a.a.createElement("form",{onSubmit:n},t.map((function(e){return a.a.createElement("div",{key:e.label},a.a.createElement("label",null,e.label),a.a.createElement("input",{value:e.value,onChange:e.handlerFunction}))})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},m=function(e){var t=e.persons,n=e.filterVal,r=e.deleteFunction;return a.a.createElement("ul",null,t.filter((function(e){return e.name.toUpperCase().includes(n.toUpperCase())})).map((function(e){return a.a.createElement("li",{key:e.name},e.name," : ",e.number,a.a.createElement("button",{onClick:function(){return r(e)}},"delete"))})))},d=function(e){var t=e.message,n=e.isError;return null===t?null:void 0!==n&&n?a.a.createElement("div",{className:"error"},t):a.a.createElement("div",{className:"notification"},t)},b=n(5),v=n.n(b),h="/api/persons",E={getAll:function(){var e=Object(i.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get(h);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),createEntry:function(){var e=Object(i.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.post(h,t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),deleteEntry:function(){var e=Object(i.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.delete("".concat(h,"/").concat(t));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),updateEntry:function(){var e=Object(i.a)(l.a.mark((function e(t,n){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.patch("".concat(h,"/").concat(t),n);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},k=function(){var e=Object(r.useState)(new Array(0)),t=Object(s.a)(e,2),n=t[0],c=t[1],u=Object(r.useState)(""),o=Object(s.a)(u,2),b=o[0],v=o[1],h=Object(r.useState)(""),k=Object(s.a)(h,2),y=k[0],w=k[1],x=Object(r.useState)(""),j=Object(s.a)(x,2),O=j[0],g=j[1],F=Object(r.useState)(null),S=Object(s.a)(F,2),C=S[0],A=S[1],N=Object(r.useState)(null),U=Object(s.a)(N,2),D=U[0],J=U[1];Object(r.useEffect)((function(){var e=function(){var e=Object(i.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.getAll();case 2:t=e.sent,c(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();try{e()}catch(t){V("Error fetching data from the server.",5e3)}}),[]);var T=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2500;A(e),setTimeout((function(){return A(null)}),t)},V=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2500;J(e),setTimeout((function(){return A(null)}),t)},B=function(e){return n.find((function(t){return t.name===e}))},I=function(){var e=Object(i.a)(l.a.mark((function e(t){var r,a,u,o,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),r=B(b)){e.next=17;break}return e.prev=3,a={name:b,number:y},e.next=7,E.createEntry(a);case 7:u=e.sent,c(n.concat(u)),T("".concat(u.name," added to phonebook.")),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),V("Error adding entry to the phonebook");case 15:e.next=30;break;case 17:if(!window.confirm("".concat(r.name," is already in the phonebook. Update the number?"))){e.next=30;break}return e.prev=18,o={number:y},e.next=22,E.updateEntry(r.id,o);case 22:i=e.sent,c(n.map((function(e){return e.name===i.name?i:e}))),T("Number for ".concat(r.name," updated.")),e.next=30;break;case 27:e.prev=27,e.t1=e.catch(18),V("Error updating entry ".concat(r.name));case 30:v(""),w("");case 32:case"end":return e.stop()}}),e,null,[[3,12],[18,27]])})));return function(t){return e.apply(this,arguments)}}(),M=function(){var e=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Do you really want to delete ".concat(t.name," from the phonebook?"))){e.next=11;break}return e.prev=1,e.next=4,E.deleteEntry(t.id);case 4:c(n.filter((function(e){return e.id!==t.id}))),T("".concat(t.name," deleted from phonebook.")),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.error("Error deleting entry.");case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),P=[{label:"name",value:b,handlerFunction:function(e){return v(e.target.value)}},{label:"number",value:y,handlerFunction:function(e){return w(e.target.value)}}];return a.a.createElement("div",null,a.a.createElement("h1",null,"Phonebook"),a.a.createElement(d,{message:C}),a.a.createElement(d,{message:D,isError:!0}),a.a.createElement(f,{value:O,handlerFunction:function(e){return g(e.target.value)}}),a.a.createElement("h2",null,"Add new"),a.a.createElement(p,{formFields:P,handlerFunction:I}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(m,{persons:n,filterVal:O,deleteFunction:M}))};n(39);u.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(k,null)),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.6af39074.chunk.js.map