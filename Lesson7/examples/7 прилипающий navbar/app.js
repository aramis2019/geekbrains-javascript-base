"use strict";
const nav = document.querySelector("nav");
document.body.style.paddingTop = nav.offsetHeight+'px';

const headroom = new Headroom(nav);
headroom.init();
