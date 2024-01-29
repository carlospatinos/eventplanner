var express = require('express');
var router = express.Router();
// const QRCode = require('qrcode');
var stream = require('stream');
var Canvas = require('canvas');



var sharp = require('sharp');
var path = require('path');
// var pathAll = require('path');
var bwipjs = require('bwip-js');
// var { fileURLToPath } = require('url');
var TextToSVG = require('text-to-svg');

const serviceURL = "https://eventplanner-by3d.onrender.com";
const arrivingEndPoint = "/arrived?userId="

async function generateQRCode(text) {
  let qrcodeBuffer = await bwipjs.toBuffer({
    bcid: 'qrcode',
    text,
    scale: 5,
  })

  return qrcodeBuffer
}

// Create a Barcode
async function generateBarcode(text) {
  let svg = bwipjs.toSVG({
    bcid: 'code128', // Barcode type
    text, // Text to encode
    width: 80,
    // includetext: true, // Show human-readable text
    textxalign: 'center', // Always good to set this
    textcolor: 'ff0000', // Red text
    rotate: 'L',
  })
  return Buffer.from(svg)
}

async function generateSVG(text) {
  const textToSVG = TextToSVG.loadSync()
  try {
    const svg = textToSVG.getSVG(text, {
      fontSize: 35,
      anchor: 'top',
      attributes: { fill: 'white' },
    })
    
    return Buffer.from(svg)
  } catch (err) {
    console.error('Error generating SVG:', err)
    throw err
  }
}

async function createTicket(customerName, ticketId, outputPath) {

  try {// Generate  barcode for the ticket as buffer
    const barcodeImageBuffer = await generateBarcode(ticketId)
    // Generate customer name for ticket as buffer
    const customerNameImageBuffer = await generateSVG(ticketId)
    const rotated = await sharp(customerNameImageBuffer).rotate(270).toBuffer(); 
    const qrcodeImageBuffer = await generateQRCode(serviceURL + arrivingEndPoint + ticketId)

    const ticketTemplatePath = path.join(__dirname, '../tickets/_template.png')
    console.log(ticketTemplatePath)

    const ticket = sharp(ticketTemplatePath)
    // console.log(ticket)

    // Params to overlay QR code onto the template
    const qrCodeOverlay = {
      input: qrcodeImageBuffer,
      left: 1640,// Y position for QR code
      top: 100, // X position for QR code 
    }

    const barcodeOverlay = {
      input: barcodeImageBuffer,
      left: 1663,
      top: 50,
    }

    const svgOverlay = {
      input: rotated,
      left: 60,
      top: 220,
    }

    var actualTicket = await ticket.composite([
      // barcodeOverlay,
      qrCodeOverlay,
      svgOverlay,
    ]);
    
    // actualTicket.toFile(outputPath);

    console.log('Ticket created!');

    return actualTicket.toBuffer();

  } catch (err) {
    console.error('Error creating ticket:', err)
    throw err
  }
}

function imageToPdf(imageBuffer) {
  const img = new Canvas.Image();
  img.src = imageBuffer;
  const canvas = new Canvas.createCanvas(img.width, img.height, 'pdf');
  const context = canvas.getContext('2d');
  context.drawImage(img, 0, 0, img.width, img.height);
  return canvas.toBuffer();
}

/* GET users listing. */
router.post('/', async function (req, res, next) {
  console.log(req.body.downloadFormat);

  var ticketId = "1111";
  var customerName = "Carlos"
  var generatedTicket = await createTicket(customerName, ticketId, 'tickets/generated/' + ticketId + '.png')
  

  switch (req.body.downloadFormat) {
    case "pdf":
      var pdfFile = imageToPdf(generatedTicket);
      // var fileContents = Buffer.from(pdfFile, "base64");
      var fileName = customerName + ".pdf";
      res.writeHead(200, {'content-type' : 'application/pdf'});
      res.write( pdfFile );
      res.end();  
      break;
    case "pkass":
    case "png":
    default:
      // Generate  barcode for the ticket as buffer
      var fileContents = Buffer.from(generatedTicket, "base64");    
      var fileName = customerName + ".png";
      var readStream = new stream.PassThrough();
      readStream.end(fileContents);

      res.set('Content-disposition', 'attachment; filename=' + fileName);
      res.set('Content-Type', 'text/plain');

      readStream.pipe(res);
  }
});

// router.post('/', function (req, res, next) {

//   // res.set('Content-Type', 'application/vnd.apple.pkpass');
//   // res.status(200).send(newPass);

//   let data = {
//     name: "Employee Name",
//     age: 27,
//     department: "Police",
//     id: "aisuoiqu3234738jdhf100223"
//   }

//   let stringdata = JSON.stringify(data)

//   QRCode.toDataURL(stringdata, function (err, qrEncodedCode) {
//     if (err) return console.log("error occurred")
//     // Printing the code
//     console.log(qrEncodedCode)
//     res.render('download', { qr: qrEncodedCode });
//   })

// });

module.exports = router;
