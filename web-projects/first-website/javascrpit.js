const myImage = document.querySelector('img');
//myHeading.textContent = 'It works!';

myImage.addEventListener('click', () => {
  const mySrc = myImage.getAttribute('src');
  if (
    mySrc ===
    '/workspaces/Vue3-WebDev-F26/web-projects/first-website/images/samyed.png'
  ) {
    myImage.setAttribute(
      'src',
      '/workspaces/Vue3-WebDev-F26/web-projects/first-website/images/samoyed2.png'
    );
  } else {
    myImage.setAttribute(
      'src',
      '/workspaces/Vue3-WebDev-F26/web-projects/first-website/images/samyed.png'
    );
  }
});
