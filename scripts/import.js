// Make sure the csv file has headers
// node --env-file=.env scripts/import.js
const { exec } = require('child_process');
URI = process.env.MONGOSERVER_URI
exec('mongoimport --uri "' + URI + '" --drop --collection guests --file utils/invitados.csv --type csv --headerline', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    console.log(err)
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});