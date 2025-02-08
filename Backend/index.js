const tf = require('@tensorflow/tfjs-node');
const blazeface = require('@tensorflow-models/blazeface');
const { createCanvas, loadImage } = require('canvas');

async function detectAndCropFaces(imagePath) {
  const img = await loadImage(imagePath);

  // Convert the image to a Tensor
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const input = tf.browser.fromPixels(canvas);

  // Load the BlazeFace model
  const model = await blazeface.load();

  // Detect faces
  const predictions = await model.estimateFaces(input, false);

  if (predictions.length === 0) {
    console.log('No faces detected.');
    return [];
  }

  console.log(`Detected ${predictions.length} face(s).`);

  const croppedFaces = [];

  predictions.forEach((face, index) => {
    let [startX, startY] = face.topLeft;
    let [endX, endY] = face.bottomRight;

    const faceWidth = endX - startX;
    const faceHeight = endY - startY;

    // Adjust padding: more padding at the top, less at the bottom
    const paddingX = faceWidth * 0.23; // 23% of face width
    const paddingTop = faceHeight * 0.5; // 50% of face height (more for hair)
    const paddingBottom = faceHeight * 0.035; // 3.5% of face height (less for bottom)

    startX = Math.max(0, startX - paddingX);
    startY = Math.max(0, startY - paddingTop);
    endX = Math.min(img.width, endX + paddingX);
    endY = Math.min(img.height, endY + paddingBottom);

    const width = endX - startX;
    const height = endY - startY;

    console.log(`Face ${index + 1}: Width = ${width}px, Height = ${height}px`);

    // Crop the face
    const faceCanvas = createCanvas(width, height);
    const faceCtx = faceCanvas.getContext('2d');
    faceCtx.drawImage(
      canvas,
      startX, // Source X
      startY, // Source Y
      width,  // Source Width
      height, // Source Height
      0,      // Target X
      0,      // Target Y
      width,  // Target Width
      height  // Target Height
    );

    // Get the cropped face as a Buffer
    const faceBuffer = faceCanvas.toBuffer('image/jpeg', { quality: 0.95 });
    croppedFaces.push(faceBuffer);
  });

  return croppedFaces;
}

// Example usage
(async () => {
  const imagePath = 'Elon_Musk.jpg'; // Replace with your image path
  const faces = await detectAndCropFaces(imagePath);

  if (faces.length > 0) {
    faces.forEach((faceBuffer, index) => {
      console.log(`Face ${index + 1}: ${faceBuffer.length} bytes`);
      console.log(faceBuffer);
    });
  }
})();


// for (const image of images) {
//   const imageBuffer = image.buffer; 

//   // Detect and crop faces
//   const croppedFaces = await detectFaces(imageBuffer);

//   // Store each cropped face image
//   for (const croppedFace of croppedFaces) {
//       await storeStudentImage(user_id, croppedFace);
//   }
// }

// // for (const image of images) {
// //     const imageBuffer = image.buffer; 
// //     await storeStudentImage(user_id, imageBuffer);
// // }
