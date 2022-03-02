const RemoveBG = require("remove.bg");
const randomstring = require("randomstring");
const {encode, decode} = require('node-base64-image');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const path = require('path');

const { RemoveBgResult, RemoveBgError, removeBackgroundFromImageBase64 } = RemoveBG;
const apiKey = 'jZ7zkyvk2cCYijVGUX1dgseF';

exports.removeBgPreview = async (base64img, outputFile) => {

  if (!outputFile) {
    const inputFile = path.resolve(__dirname, `../out/img-${randomstring.generate(7)}`);
    outputFile = `${inputFile}-removebg-preview.png`;
  }

  const result = await removeBackgroundFromImageBase64({
    base64img,
    apiKey,
    size: "regular",
    outputFile
  });

  return result?.base64img ? outputFile : '';
}

exports.removeBg = async (base64img) => {

  try {
    // const inputFile = path.resolve(__dirname, `/out/img-${randomstring.generate(7)}`);
    const inputFile = path.resolve(__dirname, `../out/img-k6kuZaW`)
    const previewFile = `${inputFile}-removebg-preview.png`;
    const outputFile = `${inputFile}-removebg-full.png`;
    const script =  path.resolve(__dirname, `../scripts/recoverFull.sh`);

    console.log(inputFile);
    console.log(outputFile);
    console.log(script);

    let ext = 'png';
    ext = base64img.split(';')[0].split('/')[1];
    
    // await decode(Buffer.from(base64img.split(',')[1], 'base64'), { fname: inputFile, ext});

    // removeBgPreview(base64img, previewFile)
    // .then(oFile  => {
    //   if (oFile) {
        await execFile('bash', [script, `${inputFile}.${ext}`], {})
      // }
    // })                
  // }

    const image = await encode(outputFile, {string: true, local: true});

    return 'data:image/png;base64,' + image;
  } catch (err) { console.log(err); throw(err);}
}

// module.exports = removeBgPreview; //Works well if there is only one thing to exprot 
