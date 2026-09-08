const myImage = document.querySelector('img');
console.log(myImage.getAttribute('src'));

myImage.addEventListener('click', () => {
  const mySrc = myImage.getAttribute('src');
  console.log(mySrc);
  if (mySrc === 'images/d4.png') {
    myImage.setAttribute('src', 'images/explode.png');
  }
});

let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

function setUserName() {
  const myName = prompt('Please enter your name.');
  localStorage.setItem('name', myName);
  myHeading.textContent = `welcome to dice roller, ${myName}`;
}

if (!localStorage.getItem('name')) {
  setUserName();
} else {
  const storedName = localStorage.getItem('name');
  myHeading.textContent = `welcome to dice roller, ${storedName}`;
}

myButton.addEventListener('click', () => {
  setUserName();
});

function setUserName() {
  const myName = prompt('Please enter your name.');
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem('name', myName);
    myHeading.textContent = `welcome to dice roller, ${myName}`;
  }
}
