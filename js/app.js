import Interval from "./Interval.js";
const sections = document.querySelectorAll("section");
const nav = document.querySelector("nav");
const backTopBtn = document.querySelector(".backTopBtn");

function buildMenu() {
    const menu = document.createElement("ul");
    for (let section of sections) {
        const a = document.createElement("a");
        const li = document.createElement("li");
        li.appendChild(a);
        menu.appendChild(li);
        a.href = `#${section.id}`;
        a.textContent = section.dataset.name;
    }
    nav.appendChild(menu);
}

function updateActiveSection(currentPosition) {
    for (let section of sections) {
        if (new Interval({element: section}).displace(- section.offsetHeight / 2).includes(currentPosition)) {
            section.classList.add("active__section");
        } else {
            section.classList.remove("active__section");
        }
    }
}

function updateBackTopBtn(currentPosition) {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const maxDistance = vh / 2;
    if (new Interval({inf:maxDistance, sup:sections[sections.length - 1].offsetTop}).includes(currentPosition)) {
        backTopBtn.classList.add("floating");
    } else {
        backTopBtn.classList.remove("floating");
    } 
}

function scrollHandler() {
    const currentPosition = document.documentElement.scrollTop;
    updateActiveSection(currentPosition);
    updateBackTopBtn(currentPosition)
}

function hamburgerBtnHandler(ev) {
    if (ev.target.matches(".hamburger")) {
        nav.classList.toggle("open")
    } else if (nav.classList.contains("open")) {
        nav.classList.remove("open");
    }
}

document.body.addEventListener("click", hamburgerBtnHandler);

document.addEventListener("scroll", scrollHandler);

backTopBtn.addEventListener("click", function() {
    window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", buildMenu);