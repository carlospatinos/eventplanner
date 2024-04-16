// Make sure the csv file has headers
// node --env-file=.env scripts/importG.js
const { exec } = require('child_process');
const { mongoServerUrl } = require('../util/config');

exec('mongoimport --uri "' + mongoServerUrl + '" --drop --collection guestData --file scripts/invitados.csv --type csv --headerline', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    console.log(err)
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});