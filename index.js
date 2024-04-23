const express = require('express');
const app = express();

// let counterMain = 0;
// let counterAbout = 0;
// let counter404 = 0;

const fs = require('fs').promises;

let myObj;
fs.readFile("./myObj.json", 'utf-8')
    .then(data => {
        myObj = JSON.parse(data);
        console.log(myObj);
    })
    .catch(err => {
        console.error(err);
    });

const write = (argToWriteToMyFile) => {
    const jsonStr = JSON.stringify(argToWriteToMyFile);
    fs.writeFile("./myObj.json", jsonStr, (err) => {
        if (err) throw err;
        console.log("Файл успешно сохранен");
    });
};

app.get('/', (req, res) => {
    myObj.counterMain += 1;
    res.send(`<h1>Добро пожаловать на сайт!</h1><a href="http://localhost:5000/about">На страницу "О нас"</a><p>Данная страница просмотрена ${myObj.counterMain} раз</p>`);
    write(myObj);
});

app.get('/about', (req, res) => {
    myObj.counterAbout += 1;
    res.send(`<h1>О нас</h1><a href="http://localhost:5000/">На "Главную" страницу</a><p>Данная страница просмотрена ${myObj.counterAbout} раз</p>`);
    write(myObj);
});

app.get('*', (req, res) => {
    myObj.counter404 += 1;
    res.send(`<h1>Страница не найдена</h1><h2>Ошибка 404!</h2><a href="http://localhost:5000/">На "Главную" страницу</a><Br><a href="http://localhost:5000/about">На страницу "О нас"</a><p>Данная страница отображается в связи с тем что Вы не угадали URL нашего сервера ${myObj.counter404} раз</p>`);
    write(myObj);
});

const port = 5000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});


// const fs = require('fs');

// const readWrite = fs.readFile("./read.txt", 'utf-8', (err, data) => {
//             if (err) {
//                 throw(err);
//             } else {
//                 write(data);
//             }
//         });


// const write = (data) => fs.writeFile("./write.js", data, (err) => {
//     if (err) throw err;
//     console.log("file was saved successfully");
// })



// const os = require('os');
// console.log(os.totalmem());
// // console.log(process.pid);
// // console.log(process.cwd());
