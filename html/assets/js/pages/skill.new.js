window.currentIconColor = "red";

window.setColor = function(colorClass) {
    document.querySelector(".chooser>.current-icon-color").value = colorClass;
    document.querySelectorAll(".chooser .current").forEach(el => {
        el.classList.remove("red");
        el.classList.remove("blue");
        el.classList.remove("green");
        el.classList.remove("orange");
        el.classList.add(colorClass);
        window.currentIconColor = colorClass
    });
}

window.searchIcon = function(searchTerm) {
    get(`/api/search-icon?search=${searchTerm}`).then(JSON.parse).then(d => {
        let code = `<div class="row">`;
        for (let i = 1; i <= d.length; i++) {
            code += `<div class="col-2" onclick="setIcon('${d[i]}')"> <i>${d[i]}</i> </div>`;
            if (i % 5 == 0) {
                code += `</div><div class="row">`;
            }
        }
        code += `</div>`;
        document.querySelector("#icon-chooser .icons").innerHTML = code;
    });
}

window.setIcon = function(code) {
    document.querySelector(".chooser>.current").innerHTML = code;
    document.querySelector(".chooser>.current-icon").value = code;
}

window.searchRepos = function(value) {
    get(`/api/git/repos/${value}`).then(JSON.parse).then(d => {
        let code = ``;
        for (let i = 0; i < d.length; i++) {
            const repo = d[i];
            code += `<span onclick="loadRepo('${repo.full_name}')">${repo.full_name}</span>`;
        }
        document.querySelector("#search-repos-results").innerHTML = code;
    })
}