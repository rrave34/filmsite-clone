document.addEventListener('DOMContentLoaded', () => {

    const fetchData = async (url, errorHandler) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP hatası! Durum: ${response.status} - Dosya: ${url}`);
            return await response.json();
        } catch (error) {
            errorHandler(error);
            return null;
        }
    };

    const createMenu = (menuItems) => {
        const menuList = document.getElementById('main-menu');
        if (!menuList || !menuItems) return;
        menuList.innerHTML = '';
        menuItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.url;
            a.textContent = item.text;
            li.appendChild(a);
            menuList.appendChild(li);
        });
    };

    const createFeatureCards = (cards) => {
        const container = document.getElementById('features-container');
        if (!container || !cards) return;
        container.innerHTML = '';
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('feature-card');
            cardElement.innerHTML = `<i class="${card.icon}"></i><h3>${card.title}</h3><p>${card.description}</p>`;
            container.appendChild(cardElement);
        });
    };

    const createPosters = (movies) => {
        const posterContainer = document.getElementById('poster-container');
        if (!posterContainer || !movies) return;
        posterContainer.innerHTML = '';
        movies.forEach(movie => {
            const posterLink = document.createElement('a');
            posterLink.href = "#";
            posterLink.classList.add('poster-item');
            posterLink.innerHTML = `<img src="${movie.imgSrc}" alt="${movie.title}"><div class="poster-overlay"><i class="bi bi-eye-fill"></i><span class="view-count">${movie.views}</span></div>`;
            posterContainer.appendChild(posterLink);
        });
    };

    const createRecentLists = (lists) => {
        const listContainer = document.getElementById('recent-lists-container');
        if (!listContainer || !lists) return;
        listContainer.innerHTML = '';
        lists.forEach(list => {
            const listCard = document.createElement('a');
            listCard.href = "#";
            listCard.classList.add('list-card');
            const progressBarHtml = Array(4).fill(0).map((_, i) => `<span class="${i < 3 ? 'active' : ''}"></span>`).join('');
            listCard.innerHTML = `<img src="${list.imgSrc}" alt="${list.title}"><div class="list-card-overlay"><div class="progress-bar">${progressBarHtml}</div><i class="bi bi-list-task"></i></div>`;
            listContainer.appendChild(listCard);
        });
    };

    const createPopularMembers = (members) => {
        const membersContainer = document.getElementById('popular-members-container');
        if (!membersContainer || !members) return;
        membersContainer.innerHTML = '';
        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');
            memberCard.innerHTML = `<div class="avatar-wrapper"><img src="${member.avatarSrc}" alt="${member.username}"></div><div class="member-info"><span class="username">${member.username}</span><span class="score">Puan: ${member.puan}</span><span class="stats">${member.izledi} izledi</span><span class="stats">${member.yorumladı} yorumladı</span></div>`;
            membersContainer.appendChild(memberCard);
        });
    };

    const createRandomSuggestion = (movie) => {
        const container = document.getElementById('random-suggestion');
        if (!container || !movie) return;
        container.innerHTML = `<h2>Rastgele Film Önerisi</h2><a href="#" class="suggestion-card"><img src="${movie.imgSrc}" alt="${movie.title}"></a>`;
    };

    const createLatestComments = (comments) => {
        const container = document.getElementById('latest-comments');
        if (!container || !comments) return;
        let commentsHtml = '<h2>Son Yorumlar</h2><div class="comments-list">';
        comments.forEach(comment => {
            commentsHtml += `<div class="comment-item"><div class="comment-header"><span class="comment-user">${comment.username}</span><span class="comment-movie-title">${comment.movieTitle}</span></div><p class="comment-body">${comment.comment}</p></div>`;
        });
        commentsHtml += '</div>';
        container.innerHTML = commentsHtml;
    };
    
    const handleHeaderScroll = () => {
        const header = document.querySelector('.site-header');
        if (!header) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    };

    const handleMobileMenu = () => {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const headerRight = document.querySelector('.header-right');

        if (!menuToggle || !headerRight) return;

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            headerRight.classList.toggle('menu-open');
        });
    };

    const initApp = async () => {
        const menuItems = await fetchData('json/menu.json', e => console.error("Menü Yüklenemedi:", e));
        createMenu(menuItems);

        const featureCards = await fetchData('json/hower.json', e => console.error("Özellik Kartları Yüklenemedi:", e));
        createFeatureCards(featureCards);

        const movies = await fetchData('json/filmafis.json', e => console.error("Filmler Yüklenemedi:", e));
        createPosters(movies);

        const recentLists = await fetchData('json/sonlisteler.json', e => console.error("Listeler Yüklenemedi:", e));
        createRecentLists(recentLists);

        const popularMembers = await fetchData('json/populer-uyeler.json', e => console.error("Üyeler Yüklenemedi:", e));
        createPopularMembers(popularMembers);

        const randomMovie = await fetchData('json/rastgele-film.json', e => console.error("Rastgele Film Yüklenemedi:", e));
        createRandomSuggestion(randomMovie);

        const latestComments = await fetchData('json/son-yorumlar.json', e => console.error("Son Yorumlar Yüklenemedi:", e));
        createLatestComments(latestComments);

        handleHeaderScroll();
        handleMobileMenu();
    };

    initApp();
});