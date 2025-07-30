fetch("menu.json")
    .then(response => response.json())
    .then(data => {
        data.forEach((item) => { 
            console.log(item.name)
        data.menu.forEach(item => {
            const li= document.createElement("li");
            li.textContent = item;
            menu.appendChild(li)
        })    
        document.getElementById(menu)
        })
    }
    )
