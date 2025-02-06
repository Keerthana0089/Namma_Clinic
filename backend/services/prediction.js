const tf = require('@tensorflow/tfjs-node');
const path = require('path');

// Load your AI model (assuming it's a TensorFlow.js model)
const modelPath = path.join(__dirname, 'path_to_model/model.json');
let model;

// Load the model asynchronously
const loadModel = async () => {
    model = await tf.loadGraphModel(`file://${modelPath}`);
};

// Function to make prediction
const makePrediction = async (xrayFilePath) => {
    if (!model) {
        await loadModel();
    }

    const image = await tf.node.decodeImage(xrayFilePath);
    const resizedImage = tf.image.resizeBilinear(image, [224, 224]);  // Resize image to match model input
    const normalizedImage = resizedImage.div(255.0).expandDims(0);

    const prediction = model.predict(normalizedImage);

    const result = prediction.dataSync()[0] > 0.5 ? 'Tumor Detected' : 'No Tumor';
    const confidence = prediction.dataSync()[0];

    return { result, confidence };
};

module.exports = { makePrediction };
