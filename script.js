document.addEventListener("DOMContentLoaded", () => {
    fetch('menu.json')
        .then(res => res.json())
        .then(navItems => {
            const navMenu = document.getElementById("nav-menu");

            navItems.forEach(item => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = item.link;
                a.textContent = item.name;
                if (item.class) a.classList.add(item.class);
                li.appendChild(a);
                navMenu.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Menü yüklenemedi:", error);
        });
});
