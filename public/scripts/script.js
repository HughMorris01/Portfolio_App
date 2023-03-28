const navbar = document.querySelector('.navbar');
const navbarOffsetTop = navbar.offsetTop;
const sections = document.querySelectorAll('section');
const navbarLinks = document.querySelectorAll('.navbar-link');
const navbarLinkHovers = document.querySelectorAll('navbar-link:hover');
const progress = document.querySelector('.progress-bars-wrapper');
const section2Offset = document.querySelector('.section-2').offsetTop;
const section3Offset = document.querySelector('.section-3').offsetTop;
const percentBars = document.querySelectorAll('.progress-percent');
const percentages = [80, 95, 89, 74, 75, 35, 45, 40];

window.addEventListener('scroll', ()=>{
    mainFn()
});

const mainFn = ()=>{
    if(window.pageYOffset >= navbarOffsetTop){
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky')
    }

    const sections = document.querySelectorAll('section');
    const navbarLinks = document.querySelectorAll('.navbar-link');
    sections.forEach((section, i) => {

        if(window.pageYOffset >= (section.offsetTop-200)) {
            navbarLinks.forEach(navbarLink =>{
                navbarLink.classList.remove('change');
                navbarLink.setAttribute("pointer-events", "none");
            })
            navbarLinks[i].classList.add('change');
        }
    });

    if(window.pageYOffset >= section2Offset && window.pageYOffset < section3Offset - 300) {
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

const contactForm = document.querySelector('.contact-form');
let senderName = document.getElementById('name');
let senderEmail = document.getElementById('email');
let senderSubject = document.getElementById('subject');
let senderMessage = document.getElementById('message');
let sentMessages = 0;

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    // if(senderName.value === ""){
    //     alert('bugger off')
    //     return;
    // TODO - IMPLEMENT FORM VALIDATION
    // }
if(sentMessages <= 2) {
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
            }
            senderName.value = '';
            senderEmail.value = '';
            senderSubject.value = '';
            senderMessage.value = '';

            sentMessages++;
        } else {
            if(sentMessages === 0){
                document.querySelector(".success").innerHTML = "<h2 class='message-sent'>Uh, oh. Something went wrong.......</h1>";
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
}
});

// window.addEventListener('resize', ()=>{
//     window.location.reload();
// });