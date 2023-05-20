const html = document.documentElement;
const canvas = document.querySelector('.animation-scrolling')
const context = canvas.getContext("2d");

// Creates a function for our current frame that returns the file path and file number of the desired image file.
const currentFrame = index => (
    `./speaker-loop/${index.toString().padStart(4, '0')}.png`
)

const frameCount = 720;
canvas.width = 1080;
canvas.height = 1080;

// Creates a variable for our image, sets its source and draws the image to the canvas on load.
const img = new Image();
img.src = currentFrame(1);
img.onload  = function() {
    context.drawImage(img, 0, 0);
}

// Listens for user scroll 
window.addEventListener('scroll', () => { 
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});


const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      }
};
      
preloadImages();