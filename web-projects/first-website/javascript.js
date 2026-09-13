const myImage = document.querySelector('img');

myImage.addEventListener('click', () => {
  const mySrc = myImage.getAttribute('src');
  if (mySrc === 'samoyed.png') {
    myImage.setAttribute('src', 'samoyed2.png');
  } else {
    myImage.setAttribute('src', 'samoyed.png');
  }
});

const listItems = document.querySelectorAll('li');

function toggleDone(e) {
  if (!e.target.className) {
    e.target.className = 'done';
  } else {
    e.target.className = '';
  }
}

listItems.forEach((item) => {
  item.addEventListener('click', toggleDone);
});

let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

myButton.addEventListener('click', () => {
  setUserName();
});

if (!localStorage.getItem('name')) {
  setUserName();
} else {
  const storedName = localStorage.getItem('name');
  myHeading.textContent = `Welcome, ${storedName}`;
}

function setUserName() {
  const myName = prompt('Please enter your name.');
  if (!myName) {
    setUserName();
    localStorage.setItem('name', myName);
  } else {
    localStorage.setItem('name', myName);
    myHeading.textContent = `Welcome, ${myName}`;
  }
}
