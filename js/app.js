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

function Interval(element) {
    this.h1 = element.offsetTop - element.offsetHeight / 2;
    this.h2 = element.offsetTop + element.offsetHeight / 2;
}

Interval.prototype.includes = function(value) {
    return value >= this.h1 && value <= this.h2;
}

function updateActiveSection() {
    const currentPosition = document.documentElement.scrollTop;
    for (let section of sections) {
        if (new Interval(section).includes(currentPosition)) {
            section.classList.add("active__section");
        } else {
            section.classList.remove("active__section");
        }
    }
}

const backTopBtn = document.querySelector(".backTopBtn");

function updateBackTopBtn() {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const maxDistance = vh / 2;
    if (document.documentElement.scrollTop > maxDistance) {
        backTopBtn.classList.remove("hidden");
    } else {
        backTopBtn.classList.add("hidden");
    }
}

document.addEventListener("scroll", function() {
    updateActiveSection();
    updateBackTopBtn()
});

backTopBtn.addEventListener("click", function() {
    window.scrollTo(0, 0);
});