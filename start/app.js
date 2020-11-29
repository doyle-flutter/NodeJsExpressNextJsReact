// * NodeJs(Express) Server :3000
// * NextJs React Server :3001

const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    next = require('next'),
    dev = process.env.NODE_ENV !== 'production',
    reactServerApp = next({dev}),
    reactHandle = reactServerApp.getRequestHandler();

app.set("etag", false); // 동적 요청에 Etag 미생성 // 미지정시 304
// app.use(express.static("public", { etag: false })); // 정적 요청에 Etag 미생성 // 미지정시 304
app.use(morgan('dev'));
app.listen(3000);

app.get('/', (req,res) => res.json("main"));

// (1) react, react-dom 패키지 다운
//  ./projectName > npm i -s react react-dom
// (2) pages 폴더 생성
reactServerApp.prepare().then(() => {
    const server = express();
    server.listen(3001);
    server.get('/firNext', (req, res) => reactServerApp.render(req, res, '/firNext'));
    server.get('*', (req, res) => reactHandle(req, res));
});

