//variable

const shoppingCart = document.getElementById("shopping-cart");
const listaCursuri = document.getElementById("courses-list");
const cartContent = document.getElementById("cart-content");

//event listeners
eListener();

function eListener() {
    //shopping cart
    shoppingCart.addEventListener("click", e => {
        if (e.target.className === "remove") {
            e.target.parentNode.parentNode.remove();

            //localStorage

            const localS = localStorage.getItem("produse");
            let lista;
            if (localS === null) {
                lista = [];
            } else {
                lista = JSON.parse(localS);
            }
            let titluSelectat = e.target.parentNode.parentNode.children[1].textContent;
            lista.forEach(item => {
                if (titluSelectat === item.titlu) {
                    let index = lista.indexOf(item);
                    lista.splice(index, 1);
                }

            })

            localStorage.setItem("produse", JSON.stringify(lista));



        } else if (e.target.id === "clear-cart") {
            e.target.parentNode.children[0].children[1].innerHTML = "";
            localStorage.clear();
        }
    });

    //lista cursuri
    listaCursuri.addEventListener("click", adaugaInCos);

    //pune itemurile din localStorage in lista de cumparaturi la refresh pagina
    document.addEventListener("DOMContentLoaded", function (e) {
        const localS = localStorage.getItem("produse");
        let lista;
        if (localS === null) {
            lista = [];
        } else {
            lista = JSON.parse(localS);
        }
        let elemente = "";
        lista.forEach(item => {
            elemente += creareProdus(item.titlu, item.sursaPoza, item.pret);

        });
        cartContent.children[1].insertAdjacentHTML("beforeend", elemente);
    });
}

//functions
function adaugaInCos(e) {
    e.preventDefault();
    let dinLista = e.target.parentNode;
    let titlu = dinLista.children[0].textContent;
    let sursaPoza = dinLista.parentNode.children[0].getAttribute("src");
    let pret = dinLista.children[3].children[0].textContent;

    if (e.target.className === "u-full-width button-primary button input add-to-cart") {
        let produsCreat = creareProdus(titlu, sursaPoza, pret);
        cartContent.children[1].insertAdjacentHTML("beforeend", produsCreat);

        //put in localStorage
        const localS = localStorage.getItem("produse");
        let lista;
        if (localS === null) {
            lista = [];
        } else {
            lista = JSON.parse(localS);
        }
        const obj = {
            titlu,
            sursaPoza,
            pret
        };
        lista.push(obj);
        localStorage.setItem("produse", JSON.stringify(lista));

    }
}

function creareProdus(titlu, sursaPoza, pret) {
    let produsInCos = `
        <tr>
        <td>
            <img src="${sursaPoza}" width="120">
        </td>
        <td>${titlu}</td>
            <td>${pret}</td><td><a href="#" class="remove">X</a>
        </td>
        </tr>
        `;
    return produsInCos;
}








