
const progress = document.querySelector('.progress-bars-wrapper');
const percentBars = document.querySelectorAll('.progress-percent');
const percentages = [80, 95, 90, 75, 75, 35, 45, 40];


// Navbar
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navbarLinks = document.querySelectorAll('.navbar-link');
const navbarOffsetTop = navbar.offsetTop;
const section2Offset = document.querySelector('.section-2').offsetTop;
const section3Offset = document.querySelector('.section-3').offsetTop;

window.addEventListener('scroll', ()=>{
    mainFn()
});


const mainFn = ()=>{
    if(window.pageYOffset >= navbarOffsetTop){
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky')
    }

    
    sections.forEach((section, i) => {

        if(window.pageYOffset >= (section.offsetTop-200)) {
            navbarLinks.forEach(navbarLink =>{
                navbarLink.classList.remove('change');
                navbarLink.setAttribute("pointer-events", "none");
            })
            navbarLinks[i].classList.add('change');
        }
    });

    if(window.pageYOffset >= section2Offset - 100 && window.pageYOffset < section3Offset - 100) {
        percentBars.forEach((percentBar, i) =>{
            percentBar.style.width = `${percentages[i]}%`;
            percentBar.previousElementSibling.firstElementChild.textContent = percentages[i];
        });
    } else {
        percentBars.forEach((percentBar, i) =>{
            percentBar.style.width = 0;
        });
    }
}
// End of Navbar

// Contact Form
const contactForm = document.querySelector('.contact-form');
const senderName = document.getElementById('name');
const senderEmail = document.getElementById('email');
const senderSubject = document.getElementById('subject');
const senderMessage = document.getElementById('message');
const inputs = document.querySelectorAll(".form-input");
const submitButton = document.getElementById('submit-btn')
let sentMessages = 0;
let errorMessages = 0;

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    if(validate() === false){
        return;
    }

    let formData = {
        name: senderName.value,
        email: senderEmail.value,
        subject: senderSubject.value,
        message: senderMessage.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/', true)
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function (){ 
        if(xhr.responseText === 'success'){
            if(sentMessages === 0){
                document.querySelector(".success").innerHTML = "<h2 class='message-sent'>Thank you, I've received your message.</h1>";
            }else if (sentMessages === 1){
                document.querySelector(".success").innerHTML = "<h2 class='message-sent'>Thank you. I've received your message, again. &#128513;</h1>"; 
            } else {
                document.querySelector(".success").innerHTML = "<h2 class='message-sent'>Three is the limit, please try again later &#128526;</h1>";
                senderName.disabled = true;
                senderEmail.disabled = true;
                senderSubject.disabled = true;
                senderMessage.disabled = true;
                submitButton.disabled = true;
                submitButton.classList.add('disable-btn');
            }
            senderName.value = '';
            senderEmail.value = '';
            senderSubject.value = '';
            senderMessage.value = '';

            sentMessages++;
        } else {
            if(errorMessages === 0){
                document.querySelector(".success").innerHTML = "<h2 class='message-sent'>Uh, oh. Something went wrong.......</h1>";
                errorMessages++;
            }else{
                document.querySelector(".success").innerHTML = "<h2 class='message-sent'>There must be an issue, please try again later.</h1>"; 
            }
            senderName.value = '';
            senderEmail.value = '';
            senderSubject.value = '';
            senderMessage.value = '';
        }
    }
    xhr.send(JSON.stringify(formData));
});

const validate = ()=> {
    if(senderName.value === ""){
        document.getElementById('name-validation').innerHTML = "Please enter your name before submitting";
        senderName.classList.add('validation-failed');
        return false;
    }
    if(senderEmail.value === ""){
        document.getElementById('email-validation').innerHTML = "Please enter your email before submitting"
        senderEmail.classList.add('validation-failed');
        return false;
    }
    if(senderSubject.value === ""){
        document.getElementById('subject-validation').innerHTML = "Please enter a subject before submitting"
        senderSubject.classList.add('validation-failed');
        return false;
    }
    if(senderMessage.value === ""){
        document.getElementById('message-validation').innerHTML = "Please enter a message before submitting"
        senderMessage.classList.add('validation-failed');
        return false;
    }
}

inputs.forEach((input) =>{
    input.addEventListener('input', (e)=>{
        input.classList.remove('validation-failed');
        input.nextElementSibling.innerHTML = "";
    })
})
// End of Contact Form

// window.addEventListener('resize', ()=>{
//     window.location.reload();
// });