const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    next = require('next'),
    dev = process.env.NODE_ENV !== 'production',
    reactServerApp = next({dev}),
    reactHandle = reactServerApp.getRequestHandler();

// (1) react, react-dom 패키지 다운
//  ./projectName > npm i -s react react-dom
// (2) pages 폴더 생성
reactServerApp.prepare().then(() => {
    const server = express();
    server.get('/', (req,res) => reactServerApp.render(req,res,'/dd'));
    server.get('/firnext', (req,res) => reactServerApp.render(req,res,'/firNext'));
    server.get('/secnext', (req,res) => reactServerApp.render(req,res,'/secNext'));
    server.get('/prop/:id', (req,res) => reactServerApp.render(req,res,'/prop',{id: req.params.id}));
    server.get('*', (req, res) => reactHandle(req, res));
    server.listen(3001);
})
.catch((err) => {
    console.error(err.stack);
    process.exit(1);
});


app.set("etag", false); // 동적 요청에 Etag 미생성
// app.use(express.static("public", { etag: false })); // 정적 요청에 Etag 미생성
app.use(morgan('dev'));
app.listen(3000);

app.get('/', (req,res) => res.json("main"));
