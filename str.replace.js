let str = document.querySelector("#text").textContent

let changeButton = document.querySelector('.replace')
changeButton.addEventListener('click', (e) => {
    document.getElementById("text").innerHTML = str.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2') })
