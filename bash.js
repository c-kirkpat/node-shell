// Output a prompt
let commands = require('./commands')
process.stdout.write('prompt > ');

function done(output){
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim().split(' '); // remove the newline 
  //console.log(cmd); 
  commands[cmd[0]](done, cmd);

  if(cmd === 'date'){
      cmd = Date();
  }
  //process.stdout.write(cmd);
  //process.stdout.write('\nprompt > ');

});

