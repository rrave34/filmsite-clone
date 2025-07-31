document.addEventListener("DOMContentLoaded", () => {
    fetch("json/menu.json")
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
        });

    fetch("json/hower.json")
        .then(res => res.json())
        .then(howItems => {
            const howContainer = document.getElementById("how-cards");
            howItems.forEach(item => {
                const card = document.createElement("div");
                card.className = `how-card with-border ${item.class || ""}`;
                card.innerHTML = `
                  <div class="icon"><i class="fas ${item.icon}"></i></div>
                  <h3>${item.title}</h3>
                  <p>${item.description}</p>
                `;
                howContainer.appendChild(card);
            });
        });
    
    fetch("json/populer-uyeler.json")
        .then(res => res.json())
        .then(members => {
            const container = document.getElementById("members-container");
            if (container) {
                members.forEach(member => {
                    const card = document.createElement("div");
                    card.className = "member-card";
                    card.innerHTML = `
                        <div class="member-avatar-wrapper">
                            <img src="${member.avatar}" alt="${member.username} avatar">
                        </div>
                        <h3 class="member-username">${member.username}</h3>  
                        <p class="member-stat">Puan: ${member.puan}</p>
                        <p class="member-stat">${member.izledi} izledi</p>
                        <p class="member-stat">${member.yorumladı} yorumladı</p>
                    `;
                    container.appendChild(card);  //Oluşturlan kartı kapsayıcının içine ekler.
                });
            }
        })
        .catch(error => console.error('Popüler üyeler yüklenirken hata:', error));

    fetch("json/filmafis.json")
        .then(res => res.json())
        .then(filmItems => {
            const filmContainer = document.getElementById("film-cards");
            filmItems.forEach(item => {
                const card = document.createElement("div");
                card.className = `how-card no-border ${item.class || ""}`;
                card.innerHTML = `
                  <img src="${item.image}" alt="${item.title}">
                  <div class="card-overlay">
                    <i class="fas fa-eye"></i>
                    <span>${item.views || 0} izlenme</span>
                  </div>
                  <h3>${item.title}</h3>
                  <p>${item.description}</p>
                `;
                filmContainer.appendChild(card);
            });
        });

    fetch("json/soneklenen.json")
        .then(res => res.json())
        .then(filmItems => {
            const filmContainer = document.getElementById("film-cards2");
            filmItems.forEach(item => {
                const card = document.createElement("div");
                card.className = `soneklenen-card`;
                card.innerHTML = `<img src="${item.image}" alt="${item.title}">`;
                filmContainer.appendChild(card);
            });
        });

    fetch("json/rastgele-film.json")
        .then(res => res.json()) //fetch ile yapılan ağ isteğinin ilk yanıtını işler. , Ayrıca Json nesnesine dönüştürme işlemi başlatır.
        .then(movie => {
            const container = document.getElementById("random-movie-container"); 
            if (container) {
                container.innerHTML = `
                    <h2 class="section-title-center">Rastgele Film Önerisi</h2>
                    <div class="suggestion-card">
                        <img src="${movie.image}" alt="${movie.title} film afişi">
                    </div>
                `;
            }
        })
        .catch(error => console.error('Rastgele film yüklenirken hata:', error));

    fetch("json/son-yorumlar.json")
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(comments => {
            const container = document.getElementById("recent-comments-container");
            if (container) {
                let commentsHTML = '<h2 class="section-title-left">Son Yorumlar</h2><ul class="comments-list">';

                comments.forEach(comment => {
                    commentsHTML += `
                        <li class="comment-item">
                            <div class="comment-user-avatar">user</div>
                            <div class="comment-content">
                                <span class="comment-movie-title">${comment.movieTitle}</span>
                                <p>${comment.commentText}</p>
                            </div>
                        </li>
                    `;
                });

                commentsHTML += '</ul>';
                container.innerHTML = commentsHTML;
            }
        })
        .catch(error => console.error('Yorumlar yüklenirken hata:', error));
});