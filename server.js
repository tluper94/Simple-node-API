const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');

// Helper Functions
function resJSON(res, obj) {
  console.log(obj);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(obj));
}

function static(res, file, type) {
  fs.readFile(file, (err, data) => {
    res.writeHead(200, { 'Content-Type': `text/${type}` });
    res.write(data);
    res.end();
  });
}

// END Helper Functions

// Route's Functions
function home(req, res) {
  static(res, 'index.html', 'html');
}

function API(req, res, params) {
  const randomPlay = Math.ceil(Math.random() * 3);

  console.log(params['play']);

  let play;
  let obj;

  switch (randomPlay) {
    case 1:
      play = 'rock';
      break;
    case 2:
      play = 'paper';
      break;
    case 3:
      play = 'scissor';
  }

  if (params['play'] === 'rock' && play === 'scissor') {
    obj = {
      computer: play,
      result: 'You Won!',
    };

    resJSON(res, obj);
  } else if (params['play'] === 'paper' && play === 'rock') {
    obj = {
      computer: play,
      result: 'You Won!',
    };

    resJSON(res, obj);
  } else if (params['play'] === 'scissor' && play === 'paper') {
    obj = {
      computer: play,
      result: 'You Won!',
    };

    resJSON(res, obj);
  } else if (params['play'] == play) {
    obj = {
      computer: play,
      result: 'Draw!',
    };

    resJSON(res, obj);
  } else {
    obj = {
      computer: play,
      result: 'You Lost:(',
    };

    resJSON(res, obj);
  }
}

function CSS(req, res) {
  static(res, 'css/style.css', 'css');
}

function js(req, res) {
  static(res, 'js/main.js', 'javascript');
}

function notFound(req, res) {
  figlet('404!!', function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    res.write(data);
    res.end();
  });
}

// End Route's Functions

// Sever
const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  console.log(Math.ceil(Math.random() * 3));

  // Routes
  if (page === '/') {
    home(req, res);
  } else if (page === '/api') {
    API(req, res, params);
  } else if (page === '/css/style.css') {
    CSS(req, res);
  } else if (page === '/js/main.js') {
    js(req, res);
  } else notFound(req, res);
});

server.listen(8000, () => {
  console.log('Listening on port 8000');
});
