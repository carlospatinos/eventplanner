var express = require('express');
var router = express.Router();
const QRCode = require('qrcode');

var sharp = require('sharp');
var path = require('path');
// var pathAll = require('path');
var bwipjs = require('bwip-js');
// var { fileURLToPath } = require('url');
var TextToSVG = require('text-to-svg');

const serviceURL = "https://eventplanner-by3d.onrender.com";

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
    var ticketId = "1111";
    var customerName = "1223333"

    const barcodeImageBuffer = await generateBarcode(ticketId)
    // Generate customer name for ticket as buffer
    const customerNameImageBuffer = await generateSVG(customerName)

    const rotated = await sharp(customerNameImageBuffer).rotate(270).toBuffer(); 

    const qrcodeImageBuffer = await generateQRCode(serviceURL + ticketId)

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
    await ticket.composite([
      // barcodeOverlay,
      qrCodeOverlay,
      svgOverlay,
    ]).toFile(outputPath)

    console.log('Ticket created!')


  } catch (err) {
    console.error('Error creating ticket:', err)
    throw err
  }


}

/* GET users listing. */
router.get('/', async function (req, res, next) {
  // Generate  barcode for the ticket as buffer
  var ticketId = "1111";
  var customerName = "Carlos"

  createTicket(customerName, ticketId, 'tickets/generated/g.png')

  res.render('download', {});
});

router.post('/', function (req, res, next) {

  // res.set('Content-Type', 'application/vnd.apple.pkpass');
  // res.status(200).send(newPass);

  let data = {
    name: "Employee Name",
    age: 27,
    department: "Police",
    id: "aisuoiqu3234738jdhf100223"
  }

  let stringdata = JSON.stringify(data)

  QRCode.toDataURL(stringdata, function (err, qrEncodedCode) {
    if (err) return console.log("error occurred")
    // Printing the code
    console.log(qrEncodedCode)
    res.render('download', { qr: qrEncodedCode });
  })

});

module.exports = router;
