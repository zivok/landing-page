const sections = document.querySelectorAll("section");
const nav = document.querySelector("nav");

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

document.body.addEventListener("click", function(ev) {
    if (ev.target.matches(".hamburger")) {
        nav.classList.toggle("open")
    } else if (nav.classList.contains("open")) {
        nav.classList.remove("open");
    }
})

function Interval(values = {}) {
    const {element, inf, sup} = values;
    this.inf = element ? element.offsetTop : inf;
    this.sup = element ? element.offsetTop + element.offsetHeight : sup;
}

Interval.prototype.includes = function(value) {
    return value >= this.inf && value <= this.sup;
}

Interval.prototype.displace = function(value) {
    this.inf += value;
    this.sup += value;
    return this;
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

const backTopBtn = document.querySelector(".backTopBtn");

function updateBackTopBtn(currentPosition) {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const maxDistance = vh / 2;
    if (new Interval({inf:maxDistance, sup:sections[sections.length - 1].offsetTop}).includes(currentPosition)) {
        backTopBtn.classList.add("floating");
    } else {
        backTopBtn.classList.remove("floating");
    }
    
}

document.addEventListener("scroll", function() {
    const currentPosition = document.documentElement.scrollTop;
    updateActiveSection(currentPosition);
    updateBackTopBtn(currentPosition)
});

backTopBtn.addEventListener("click", function() {
    window.scrollTo(0, 0);
});