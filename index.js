const express = require('express');
const app = express();
const port = 80;
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('uwu.json', 'UTF-8'));
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({
  type: () => true
}));

app.use(express.static('html'));

app.get('/listing', (req, res) => {
  res.send(data);
});

function options(short) {
  return Object.entries(data).filter(pair => {
    const link = pair[0];
    return link.startsWith(short);
  });
}

app.get('/options', (req, res) => {
  res.status(300).sendFile(__dirname + '/html/options.html');
})

app.get('/options/:link', (req, res) => {
  res.send(JSON.stringify(options(req.params.link)));
})

app.get('/:link', (req, res) => {
  const pairs = options(req.params.link);
  if(data[req.params.link]) {
    res.redirect(data[req.params.link]);
  } else if(pairs.length === 1) {
    res.redirect(pairs[0][1]);
  } else if(pairs.length >= 1) {
    res.redirect('/options?' + encodeURIComponent(req.params.link));
  } else {
    res.send('No such link.');
  }
});

function saveState() {
  return new Promise((res, rej) => {
    fs.writeFile('uwu.json', JSON.stringify(data), 'UTF-8', err => {
      if(err) {
        rej(err); return;
      }
      res();
    });
  });
}

app.post('/', async (req, res) => {
  switch(req.body.action) {
    case "create":
    data[req.body.from] = req.body.to;
    break;
    case "change":
    delete data[req.body['old-name']];
    data[req.body.from] = req.body.to;
    break;
    case "delete":
    delete data[req.body.from];
    break;
  }
  await saveState();
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});