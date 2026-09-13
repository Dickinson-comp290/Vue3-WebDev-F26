const myImage = document.querySelector('img');

myImage.addEventListener('click', () => {
  const mySrc = myImage.getAttribute('src');
  if (mySrc === 'images/rem_helper.png') {
    myImage.setAttribute('src', 'images/little-helper.png');
  } else {
    myImage.setAttribute('src', 'images/rem_helper.png');
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
    myHeading.textContent = `Look at my cool website, ${myName}`;
  }
}

if (!localStorage.getItem('name')) {
  setUserName();
} else {
  const storedName = localStorage.getItem('name');
  myHeading.textContent = `Mozilla is cool, ${storedName}`;
}

myButton.addEventListener('click', () => {
  setUserName();
});
