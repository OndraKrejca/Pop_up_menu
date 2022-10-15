import sublinks from "./data.js"

const getElement = function (el) {
    const element = document.querySelector(el)

    if (element) {
        return element
    } else {
        throw new Error("WONG!!!!!")
    }
}

const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebarWrapper = document.querySelector(".sidebar-wrapper");
const sidebar = document.querySelector(".sidebar-links");
const linksBtns = [...document.querySelectorAll(".link-btn")];
const submenu = document.querySelector(".submenu");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".nav");

toggleBtn.addEventListener("click", (e) => {
    sidebarWrapper.classList.add("show")
})

closeBtn.addEventListener("click", () => {
    sidebarWrapper.classList.remove("show")
})

sidebar.innerHTML = sublinks.map(oneItem => {

    const { page, links } = oneItem

    return `
        <article>
        <h4>${page}</h4>
        <div class="sidebar-sublinks">
            ${links.map(oneitem => {
        // const {icon, label, url:links} = oneitem

        return `
                <a href="${oneitem.url}"><i class="${oneitem.icon}"></i>${oneitem.label}</a>
                `
    }).join("")}

        </div>
    </article>
    
    `
}).join("")

linksBtns.forEach(oneItem => {
    oneItem.addEventListener("mouseover", e => {

        const text = e.currentTarget.textContent
        const item = e.currentTarget.getBoundingClientRect()
        const centre = (item.left + item.right) / 2
        const bottom = item.bottom - 5

        const value = sublinks.find(({ page }) => page === text)

        if (value) {
            const { page, links } = value

            submenu.classList.add("show")
            submenu.style.left = centre + "px"
            submenu.style.top = bottom + "px"

            let col = "col-2"

            if (links.length === 3) {
                col = "col-3"
            }

            if (links.length > 3) {
                col = "col-4"
            }

            submenu.innerHTML =
                `
                    <section>
                    <h4>${page}</h4>
                    <div class="submenu-center ${col}">
                    ${links.map(oneItem => {
                    return `
                        <a href="${oneItem.url}"><i class="${oneItem.icon}"></i>${oneItem.label}</a>
                        `
                }).join("")}
                    </div>
                    </section>
                `

        }

    })
})

hero.addEventListener("mouseover", e => {

    submenu.classList.remove("show")

})


nav.addEventListener("mouseover", e => {
    if (!e.target.classList.contains("link-btn")) {
        submenu.classList.remove("show")
    }
})