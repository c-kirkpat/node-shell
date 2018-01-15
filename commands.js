let request = require('request');
let fs = require('fs');
module.exports = {
    pwd: function(done) {
        // if(cmd === 'pwd'){
        //     cmd = process.cwd();
        // }
        done(process.cwd())
        
        //process.stdout.write(process.cwd());
       // process.stdout.write('\nprompt > ');
    },
    date: function(done){
        done(Date());
        // process.stdout.write(Date());
        // process.stdout.write('\nprompt > ');
    },
    ls: function(done){
        fs.readdir('.', function(err, files) {
            let fileArr = [];
            if (err) throw err;
            files.forEach(function(file) {
                fileArr.push(file);
              //process.stdout.write(file.toString() + "\n");
            });
            done(fileArr.join('\n'));
            //process.stdout.write("prompt > ");
          });
    },
    echo: function(done, strArr){
        //console.log(strArr);
        done(strArr.slice(1).join(' '))
        // process.stdout.write(strArr.slice(1).join(' '));
        // process.stdout.write('\nprompt > ');
    },
    cat: function(done, fileArr){
        //console.log(fileArr[1])
        fs.readFile(process.cwd() + '/' + fileArr[1], (err,data)=> {
            if(err) throw err;
            done(data);
            // process.stdout.write(data);
            // process.stdout.write('prompt > ');
        });
    },
    head: function(done, fileArr){
        fs.readFile(process.cwd() + '/' + fileArr[1],'utf8', (err,data)=> {
            if(err) throw err;
            done(data.split('\n').slice(0,5).join('\n'))
            // process.stdout.write(data.split('\n').slice(0,5).join('\n'));
            // process.stdout.write('prompt > ');
        });
    },
    tail: function(done, fileArr){
        fs.readFile(process.cwd() + '/' + fileArr[1],'utf8', (err,data)=> {
            if(err) throw err;
            done(data.split('\n').slice(-6).join('\n'));
            // process.stdout.write(data.split('\n').slice(-6).join('\n'));
            // process.stdout.write('prompt > ');
        });
    },
    sort: function(done, fileArr){
        fs.readFile(process.cwd() + '/' + fileArr[1],'utf8', (err,data)=> {
            if(err) throw err;
  
            process.stdout.write(data.split('\n').sort().join('\n')+'\n');
            process.stdout.write('prompt > ');
        });
    },
    wc: function(done, fileArr){
        fs.readFile(process.cwd() + '/' + fileArr[1],'utf8', (err,data)=> {
            if(err) throw err;
            done(data.split('\n').length + '\n')
            // process.stdout.write(data.split('\n').length + '\n');
            // process.stdout.write('prompt > ');
        });
    },
    uniq: function(done, fileArr){
        fs.readFile(process.cwd() + '/' + fileArr[1],'utf8', (err,data)=> {
            if(err) throw err;
            let split = data.split('\n');
            let newArr = [split[0]];
            for(let i = 1; i<split.length; i++){
                if(split[i] !== newArr[i-1]){
                    newArr.push(split[i]);
                }
            }
            done(newArr.join('\n')+'\n');
            // process.stdout.write(newArr.join('\n')+'\n');
            // process.stdout.write('prompt > ');
        });
    },
    curl: function(done, fileArr){
        let url = fileArr[1];
        request(url,function(error, response, body){
            if(error) throw error;
            done(body+'\n');
            // process.stdout.write(body+'\n');
            // process.stdout.write('prompt > ');
        })
    }
}
