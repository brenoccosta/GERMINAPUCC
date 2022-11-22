let button = document.querySelector('.registerbtn');

let inputValidator = {
    "nome": false,
    "sobrenome": false,
    "email": false,
    "senha": false,
    "senha2": false
};

function validateInput(){
    let control = 1;
    for(key in inputValidator){
        control = control * inputValidator[key];
    }
    if(control){
        button.style.backgroundColor='green';
        button.disabled = false;
    }
    else{
        button.style.backgroundColor='#8a8a8a';
        button.disabled = true;
    }
}

function validaCampo(query,cond){
    let obj = document.querySelector(query);
    obj.addEventListener('change', (e) => {
        if(e.target.value.length>0 && e.target.value.match(cond)){
            e.target.style.border = '1px solid green';
            inputValidator[e.target.getAttribute('name')] = true;
        }
        else{
            e.target.style.border = '1px solid red';
            inputValidator[e.target.getAttribute('name')] = false;
        }
        validateInput();
    }) 
}

let format2 = /^[A-zÀ-ÿ]+\s?(\s[A-zÀ-ÿ]+)*$/
// let format = /[^`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~^\d]/g;
validaCampo('input[name=nome]',format2);
validaCampo('input[name=sobrenome]',format2)
// let nomes = document.querySelectorAll('input[name=nome]');
// console.log(nomes.length);



// for (let i=0;i<nomes.length;i++){
//     nomes[i].addEventListener('change', (e) => {
//         if(!format.test(e.target.value) && e.target.value.length>0){
//             e.target.style.border = '1px solid green';
//             inputValidator.nome = true;
//             inputValidator.sobrenome = true;
//         }
//         else{
//             e.target.style.border = '1px solid red';
//             inputValidator.nome = false;
//             inputValidator.sobrenome = false;
//         }
//         validateInput();
//     })
// }

// REMOVER USERNAME

// let username = document.querySelector('input[name=username]');


emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// let email = document.querySelector('input[name=email]');
// email.addEventListener('change', (e) => {
//     if(e.target.value.match(emailRegex) ){
//         e.target.style.border = '1px solid green';
//         inputValidator.email = true;
//     }
//     else{
//         e.target.style.border = '1px solid red';
//         inputValidator.email = false;
//     }
//     validateInput();
// })
validaCampo('input[name=email]',emailRegex);

let letter = document.getElementById('letter');
let capital = document.getElementById('capital');
let number = document.getElementById('number');
let length = document.getElementById("length");

let senha = document.querySelector('input[name=psw]');
senha.onfocus = function(){
    document.getElementById("message").style.display = "block";
};

let passwordValidation = {
    'letter': false,
    'capital': false,
    'number': false,
    'length': false
};

let control = 1;
senha.onblur = function(){
    document.getElementById("message").style.display = "none";
    for(key in passwordValidation){
        control = control * passwordValidation[key];
    }
    if(control){
        inputValidator.senha = true;
    }
    else{
        inputValidator.senha = false;
    }
    validateInput();
}


senha.onkeyup = function(e){
    console.log(senha.value);
    
    // Validação de letras minúsculas
    if(senha.value.match(/[a-z]/g)){
        letter.classList.remove('invalid');
        letter.classList.add('valid');
        passwordValidation.letter = true;
    }else{
        letter.classList.remove('valid');
        letter.classList.add('invalid');
        passwordValidation.letter = false;
    }

    // Validação de letras maiúsculas
    if(senha.value.match(/[A-Z]/g)){  
        capital.classList.remove("invalid");
        capital.classList.add("valid");
        passwordValidation.capital = true;
    }else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
        passwordValidation.capital = false;
    }
    
    // Validação de número
    if(senha.value.match(/[0-9]/g)) {  
        number.classList.remove("invalid");
        number.classList.add("valid");
        passwordValidation.number = true;
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
        passwordValidation.number = false
    }
    
    // Validate length
    if(senha.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
        passwordValidation.length = true;
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
        passwordValidation.length = false
    }

   
    if((senha2.value != '') && senha.value != senha2.value){
        document.getElementById('psw-repeat').style.border = '1px solid red';
        //passwordValidation.repeat = false;
        inputValidator.senha2 = false;

    }
}


window.onclick = function(){
    console.log(inputValidator);
    console.log(passwordValidation);
}

let senha2 = document.querySelector('input[name=psw-repeat]');
senha2.addEventListener('change', (e) =>{
    if(e.target.value === senha.value){
        e.target.style.border = '1px solid green';
        inputValidator.senha2 = true;
        //passwordValidation.repeat = true;
    }
    else{
        e.target.style.border = '1px solid red';
        inputValidator.senha2 = false;
    }
    validateInput();
})


