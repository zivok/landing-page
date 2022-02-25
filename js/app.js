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