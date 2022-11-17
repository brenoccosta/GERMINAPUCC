// BRENO COLTRO DA COSTA
// FERNANDO DE FACIO ROSSETTI
// GIOVANE BRUNO NARDARI
// LUIS HENRRIQUE CREPALDI MOLAS

const express = require('express'),
    users = require('./routes/users'),
    products = require('./routes/products'),
    news = require('./routes/news'),
    register = require('./routes/register'),
    about = require('./routes/about');


const app = express();
const PORT = 3000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'))

app.use('/',users);
app.use('/produtos',products);
app.use('/noticias',news);
app.use('/cadastro',register);
app.use('/sobre',about);

app.listen(PORT, function() {
    console.log(`O servidor está escutando na porta ${PORT}!`)
});


// CARROSSEL DE NOTÍCIAS
// let slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("demo");
//   let captionText = document.getElementById("caption");
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " active";
//   captionText.innerHTML = dots[slideIndex-1].alt;
// }
