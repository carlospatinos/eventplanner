const { exec } = require('child_process');
URI=process.env.ATLAS_URI
exec('mongoimport --uri "' + URI + '" --drop --collection guests --file utils/mongo-initial-records.csv --type csv --headerline', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    console.log(err)
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});