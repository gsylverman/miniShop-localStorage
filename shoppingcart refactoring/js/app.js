//variables
const coursesList = document.getElementById("courses-list");
const shoppingCartContent = document.getElementById("cart-content").children[1];
const shoppingCart = document.getElementById("shopping-cart");

//Event listeners
eventF();
function eventF() {

    coursesList.addEventListener("click", adaugaCos);
    shoppingCart.addEventListener("click", cos);
    document.addEventListener("DOMContentLoaded", puneInCosdinLocal);

}

//functions
function puneInCosdinLocal() {
    let lista = localStorageGet();
    let temp = "";
    lista.forEach(element => {
        temp += "<tr>";
        temp += templateF(element);
        temp += "</tr>";
    });

    if (temp !== "") {
        shoppingCartContent.innerHTML = temp;
    }

}

//adauga in cos
function adaugaCos(e) {
    e.preventDefault();
    const cart = e.target.parentNode.parentNode;
    const continut = {
        poza: cart.querySelector("img").getAttribute("src"),
        titlu: cart.querySelector("h4").textContent,
        pret: cart.querySelector(".u-pull-right").textContent
    };
    let td = templateF(continut);
    const newRow = document.createElement("tr");
    newRow.innerHTML = td;
    shoppingCartContent.appendChild(newRow);

    let lista = localStorageGet();
    lista.push(continut);
    localStorage.setItem("items", JSON.stringify(lista));
}
// template pentru lista din cos de cumparaturi
function templateF(continut) {
    let template = `
    <td>
    <img src="${continut.poza}" width="120">
    </td>
    <td>${continut.titlu}</td>
    <td>${continut.pret}</td>
    <td>
    <a href="#" class="remove">X</a>
    </td>`;
    return template;
}

//sterge din cos si din local storage
function cos(e) {
    if (e.target.className === "remove") {
        e.target.parentNode.parentNode.remove();

        //remove one item from local storage
        let lista = localStorageGet();
        let index = e.target.parentNode.parentNode.children[1].textContent;
        lista.forEach(item => {
            if (index === item.titlu) {
                let ind = lista.indexOf(item);
                lista.splice(ind, 1);
            }
        });
        localStorage.setItem("items", JSON.stringify(lista));


    } else if (e.target.id = "remove") {
        e.target.parentNode.getElementsByTagName("tbody")[0].innerHTML = "";
        localStorage.clear();
    }
}

// get from local storage
function localStorageGet() {
    const localS = localStorage.getItem("items");
    let lista;
    if (localS === null) {
        lista = [];
    } else {
        lista = JSON.parse(localS);
    }
    return lista;
}

