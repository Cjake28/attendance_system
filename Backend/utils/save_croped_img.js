import * as tf from '@tensorflow/tfjs-node';
import * as blazeface from '@tensorflow-models/blazeface';

/**
 * Detects faces in an image buffer and returns cropped face BLOBs.
 * @param {Buffer} imageBuffer - The image buffer (BLOB).
 * @returns {Promise<Buffer[]>} - Array of cropped face BLOBs.
 */

const detectFaces = async (imageBuffer) => {
  try {
    // Decode image buffer into a tensor
    const input = tf.node.decodeImage(imageBuffer, 3);

    // Load the BlazeFace model
    const model = await blazeface.load();

    // Detect faces
    const predictions = await model.estimateFaces(input, false);

    if (predictions.length === 0) {
      console.log('No faces detected.');
      return [];
    }

    console.log(`Detected ${predictions.length} face(s).`);

    const croppedFaces = await Promise.all(predictions.map(async face => {
      // Extract coordinates
      let [startX, startY] = face.topLeft;
      let [endX, endY] = face.bottomRight;

      // Calculate width and height
      const faceWidth = endX - startX;
      const faceHeight = endY - startY;

      // Padding: more on top for hair, less on bottom
      const paddingX = faceWidth * 0.17;
      const paddingTop = faceHeight * 0.68;
      const paddingBottom = faceHeight * 0.08;

      // Adjust coordinates with padding
      startX = Math.max(0, startX - paddingX);
      startY = Math.max(0, startY - paddingTop);
      endX = Math.min(input.shape[1], endX + paddingX);
      endY = Math.min(input.shape[0], endY + paddingBottom);

      // Crop the face using TensorFlow slicing
      const croppedFaceTensor = input.slice([startY, startX, 0], [endY - startY, endX - startX, 3]);

      // Convert the cropped face tensor to a BLOB image
      const croppedFaceBuffer = await tf.node.encodeJpeg(croppedFaceTensor);

      return croppedFaceBuffer;
    }));

    return croppedFaces;
  } catch (error) {
    console.error('❌ Error detecting faces:', error);
    return [];
  }
};

export default detectFaces;