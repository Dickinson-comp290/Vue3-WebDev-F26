const myImage = document.querySelector('img');

myImage.addEventListener('click', () => {
  const mySrc = myImage.getAttribute('src');
  if (mySrc === 'images/slowdive.png') {
    myImage.setAttribute('src', 'images/slowdive2.png');
  } else {
    myImage.setAttribute('src', 'images/slowdive.png');
  }
});

let myButton = document.querySelector('button');
let myHeading = document.querySelector('h3');

function setUserName() {
  const myName = prompt('Please enter your name.');
  localStorage.setItem('name', myName);
  myHeading.textContent = `Welcome to the Space Station, ${myName}!`;
}

if (!localStorage.getItem('name')) {
  setUserName();
} else {
  const storedName = localStorage.getItem('name');
  myHeading.textContent = `Welcome back to the Space Station, ${storedName}.`;
}

myButton.addEventListener('click', () => {
  setUserName();
});
