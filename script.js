document.addEventListener("DOMContentLoaded", () => {
    // Menü verisini yükle
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

    // How-card verisini yükle
    fetch('hower.json')
        .then(res => res.json())
        .then(howItems => {
            const howContainer = document.querySelector(".how-cards");
            howItems.forEach(item => {
                const card = document.createElement("div");
                card.className = `how-card ${item.class}`;
                card.innerHTML = `
                    <div class="icon"><i class="fas ${item.icon}"></i></div>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                `;
                howContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error("How kartları yüklenemedi:", error);
        });
});
