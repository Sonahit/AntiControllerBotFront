import "core-js";
import "regenerator-runtime/runtime";

import "./index";
//import sass
import "@sass/index.scss";

//import images
import "@img/tg.png";
import "@img/vk.png";

document.querySelector(".social .arrow").addEventListener("click", e => e.currentTarget.parentNode.classList.toggle("hide"));
