// Store a reference to the <h1> in a variable
//const myHeading = document.querySelector('h1');
// Update the text content of the <h1>
//myHeading.textContent = 'Hello world!';

//Altered the code a bit to work only for the bottom image.
const bottomImage = document.getElementById('bottomImage');

bottomImage.addEventListener('click', () => {
  const mySrc = bottomImage.getAttribute('src');
  if (mySrc === 'images/currywurst.jpg') {
    bottomImage.setAttribute('src', 'images/Doner.jpg');
  } else if (mySrc === 'images/Doner.jpg') {
    bottomImage.setAttribute('src', 'images/BerlinerDonut.jpg');
  } else {
    bottomImage.setAttribute('src', 'images/currywurst.jpg');
  }
});

let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

function setUserName() {
  const myName = prompt('Please enter your name.');
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem('name', myName);
    myHeading.textContent = `Willkommen, ${myName}`;
  }
  localStorage.setItem('name', myName);
  myHeading.textContent = `Willkommen, ${myName}`;
}

if (!localStorage.getItem('name')) {
  setUserName();
} else {
  const storedName = localStorage.getItem('name');
  myHeading.textContent = `Willkommen, ${storedName}`;
}
myButton.addEventListener('click', () => {
  setUserName();
});
