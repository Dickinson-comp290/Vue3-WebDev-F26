const myImage = document.querySelector('img');
//myHeading.textContent = 'It works!';

myImage.addEventListener('click', () => {
  const mySrc = myImage.getAttribute('src');
  if (mySrc === 'samoyed.png') {
    myImage.setAttribute('src', 'samoyed2.png');
  } else {
    myImage.setAttribute('src', 'samoyed.png');
  }
});
