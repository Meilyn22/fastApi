// JavaScript code to handle the form submission and image generation
const form = document.getElementById("image-form");
const downloadButton = document.getElementById("download-button");
const imageContainer = document.getElementById("image-container");
const image = document.getElementById("image");
const loadingIndicator = document.getElementById("loading-indicator");

form.addEventListener("submit", event => {
  event.preventDefault();

  // Get the prompt and size from the form
  const prompt = form.elements.prompt.value;
  const size = form.elements.size.value;

  // Show the loading indicator
  loadingIndicator.style.display = "block";

  if (size !== '256x256' && size !== '512x512' && size !== '1024x1024') {
    alert('Image size must be one of the following: 256x256, 512x512, 1024x1024');
    return;
    }

  // Use fetch to call the API endpoint and generate an image
  fetch("/create_image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt, size })
  })
    .then(response => response.json())
    .then(data => {
      // Hide the loading indicator
      loadingIndicator.style.display = "none";
      // Display the image and enable the download button
      image.src = data.image_url;
      downloadButton.disabled = false;
      imageContainer.style.display = "block";
    });
});

// Handle the download button click
downloadButton.addEventListener("click", () => {
  // Create a link to the image and use it to open the image in a new tab
  const link = document.createElement("a");
  link.href = image.src;
  link.target = "_blank"
  link.click();


});
 