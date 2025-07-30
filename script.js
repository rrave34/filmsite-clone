fetch("menu.json")
    .then(response => response.json())
    .then(data => {
        data.menu.forEach(item => {
            console.log(item.name);
            {

            }
        });

        document.getElementById("loginBtn").textContent = data.buttons.login;
        document.getElementById("registerBtn").textContent = data.buttons.register;
    })
    .catch(err => console.error(err));
