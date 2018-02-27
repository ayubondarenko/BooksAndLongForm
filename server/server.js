/**
 * Created by alexander on 23.11.17.
 */
const jsonServer = require('json-server');
// import {jsonServer} from 'json-server';


const server = jsonServer.create();


const path = require('path');
const fullPath = path.join(__dirname, 'db.json');

const router = jsonServer.router(fullPath);

const middlewares = jsonServer.defaults();
server.use(middlewares);

// server.use(jsonServer.rewriter({
//     '/validForm/': '/#!/validForm/',
//     '/api/*': '/$1',
//     '/aaa/': '/bbb/',
//     '/blog/:resource/:id/show': '/:resource/:id'
// }));

server.use('/longForm', function (req, res) {
    console.log('redirect');

    console.log('старый урл: ', req.baseUrl);
    console.log('новый урл: ','/#!'+ req.baseUrl);

    res.redirect('/#!/longForm');
});

server.use('/book/*', function (req, res) {
    console.log('redirect:');
    console.log('старый урл: ', req.baseUrl);
    console.log('новый урл: ','/#!'+ req.baseUrl);
    res.redirect('/#!'+ req.baseUrl);
});
//
server.use('/nodata', function (req, res) {
    console.log('redirect');
    res.redirect('/#!/nodata');
});

server.use(router);


server.listen(3000, () => {
    console.log('JSON Server загружен с данными из:', fullPath);
});