const myHeading = document.querySelector('h1');
myHeading.textContent = 'It works!';

myHeading.addEventListener('click', () => {
  const mySrc = myImage.getAttribute('src');
  if (mySrc === 'images/samoyed.png') {
    myImage.setAttribute('src', '');
  } else {
    myImage.setAttribute('src', 'samoyed.png');
  }
});
