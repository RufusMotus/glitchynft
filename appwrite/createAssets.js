const fs = require("fs");
const sdk = require("node-appwrite");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

let client = new sdk.Client();
let database = new sdk.Database(client);

function sleep(offset) {
  return new Promise((resolve) => setTimeout(resolve, 500 * offset));
}

client
  .setEndpoint(process.env.VITE_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.VITE_APP_APPWRITE_PROJECT)
  .setKey(process.env.API_KEY);

function sendData(collection, data, offset) {
  return new Promise((resolve, reject) => {
    sleep(offset).then(() => {
      database
        .createDocument(collection, "unique()", JSON.stringify(data))
        .then(
          (res) => {
            console.log(`Creating ${data.assetName} asset`);
            resolve();
          },
          (err) => {
            console.error("Head asset error: ", err);
          }
        );
    });
  });
}

function headAssetsPromise() {
  return new Promise((resolve, reject) => {
    const headData = fs.readFileSync(`${__dirname}/head.json`);
    const parsedHeadData = JSON.parse(headData);
    let headPromises = [];
    parsedHeadData.forEach((head, index) => {
      headPromises.push(sendData("headAssets", head, index));
    });
    Promise.all(headPromises).then(() => resolve());
  });
}

function faceAssetsPromise() {
  return new Promise((resolve, reject) => {
    const faceData = fs.readFileSync(`${__dirname}/face.json`);
    const parsedFaceData = JSON.parse(faceData);
    let facePromises = [];
    parsedFaceData.forEach((face, index) => {
      facePromises.push(sendData("faceAssets", face, index));
    });
    Promise.all(facePromises).then(() => resolve());
  });
}

function leftArmAssetsPromise() {
  return new Promise((resolve, reject) => {
    const leftArmData = fs.readFileSync(`${__dirname}/leftArm.json`);
    const parsedLeftArmData = JSON.parse(leftArmData);
    let leftArmPromises = [];
    parsedLeftArmData.forEach((leftArm, index) => {
      leftArmPromises.push(sendData("leftArmAssets", leftArm, index));
    });
    Promise.all(leftArmPromises).then(() => resolve());
  });
}

function leftHandAssetsPromise() {
  return new Promise((resolve, reject) => {
    const leftHandData = fs.readFileSync(`${__dirname}/leftHand.json`);
    const parsedLeftHandData = JSON.parse(leftHandData);
    let leftHandPromises = [];
    parsedLeftHandData.forEach((leftHand, index) => {
      leftHandPromises.push(sendData("leftHandAssets", leftHand, index));
    });
    Promise.all(leftHandPromises).then(() => resolve());
  });
}

function bodyAssetsPromise() {
  return new Promise((resolve, reject) => {
    const bodyData = fs.readFileSync(`${__dirname}/body.json`);
    const parsedBodyData = JSON.parse(bodyData);
    let bodyPromises = [];
    parsedBodyData.forEach((body, index) => {
      bodyPromises.push(sendData("bodyAssets", body, index));
    });
    Promise.all(bodyPromises).then(() => resolve());
  });
}

function rightArmAssetsPromise() {
  return new Promise((resolve, reject) => {
    const rightArmData = fs.readFileSync(`${__dirname}/rightArm.json`);
    const parsedRightArmData = JSON.parse(rightArmData);
    let rightArmPromises = [];
    parsedRightArmData.forEach((rightArm, index) => {
      rightArmPromises.push(sendData("rightArmAssets", rightArm, index));
    });
    Promise.all(rightArmPromises).then(() => resolve());
  });
}

function rightHandAssetsPromise() {
  return new Promise((resolve, reject) => {
    const rightHandData = fs.readFileSync(`${__dirname}/rightHand.json`);
    const parsedRightHandData = JSON.parse(rightHandData);
    let rightHandPromises = [];
    parsedRightHandData.forEach((rightHand, index) => {
      rightHandPromises.push(sendData("rightHandAssets", rightHand, index));
    });
    Promise.all(rightHandPromises).then(() => resolve());
  });
}

function leftLegAssetsPromise() {
  return new Promise((resolve, reject) => {
    const leftLegData = fs.readFileSync(`${__dirname}/leftLeg.json`);
    const parsedLeftLegData = JSON.parse(leftLegData);
    let leftLegPromises = [];
    parsedLeftLegData.forEach((leftLeg, index) => {
      leftLegPromises.push(sendData("leftLegAssets", leftLeg, index));
    });
    Promise.all(leftLegPromises).then(() => resolve());
  });
}
function rightLegAssetsPromise() {
  return new Promise((resolve, reject) => {
    const rightLegData = fs.readFileSync(`${__dirname}/rightLeg.json`);
    const parsedRightLegData = JSON.parse(rightLegData);
    let rightLegPromises = [];
    parsedRightLegData.forEach((rightLeg, index) => {
      rightLegPromises.push(sendData("rightLegAssets", rightLeg, index));
    });
    Promise.all(rightLegPromises).then(() => resolve());
  });
}

console.log("Creating assets:");

headAssetsPromise().then(() =>
  faceAssetsPromise().then(() =>
    leftArmAssetsPromise().then(() =>
      leftHandAssetsPromise().then(() =>
        bodyAssetsPromise().then(() =>
          rightArmAssetsPromise().then(() =>
            rightHandAssetsPromise().then(() =>
              leftLegAssetsPromise().then(() =>
                rightLegAssetsPromise().then(() =>
                  console.log(
                    "\n######################\n#                    #\n# ALL ASSETS CREATED #\n#                    #\n######################"
                  )
                )
              )
            )
          )
        )
      )
    )
  )
);
