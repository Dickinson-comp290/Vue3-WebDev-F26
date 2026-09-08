const myImage = document.querySelector('img');
console.log(myImage.getAttribute('src'));

myImage.addEventListener('click', () => {
  const mySrc = myImage.getAttribute('src');
  console.log(mySrc);
  if (mySrc === 'images/d4.png') {
    myImage.setAttribute('src', 'images/explode.png');
  }
});
