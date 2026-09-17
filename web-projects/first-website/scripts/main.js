// Store a reference to the <h1> in a variable
const myHeading = document.querySelector('h1');
// Update the text content of the <h1>
myHeading.textContent = 'Hello world!';

const myImage = document.querySelector('img');

myImage.addEventListener('click', () => {
  const mySrc = myImage.getAttribute('src');
  if (mySrc === 'images/sweetpotatobrownies.png') {
    myImage.setAttribute('src', 'images/sweetpotato.png');
  } else {
    myImage.setAttribute('src', 'images/sweetpotatobrownies.png');
  }
});
let myButton = document.querySelector('button');
let myHead = document.querySelector('h1');

function setUserName() {
  const myName = prompt('Please enter your name.');
  localStorage.setItem('name', myName);
  myHead.textContent = `Fiber is Cool, ${myName}`;
}
if (!localStorage.getItem('name')) {
  setUserName();
} else {
  const storedName = localStorage.getItem('name');
  myHead.textContent = `Mozilla is cool, ${storedName}`;
}
myButton.addEventListener('click', () => {
  setUserName();
});
