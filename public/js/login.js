// BRENO COLTRO DA COSTA
// FERNANDO DE FACIO ROSSETTI
// GIOVANE BRUNO NARDARI
// LUIS HENRRIQUE CREPALDI MOLAS
 
let modal = document.getElementById("myModal");
let btn = document.getElementById("conta");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}