const http = require('http');
const port = 8000;
const books = require('./books');



const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'application/json');
    // Define a regular expression to match URLs like /book/:id
    const urlPattern = /^\/book\/(\d+)$/;
    const match = urlPattern.exec(req.url);
    // if (req.url == "/book") {
    //     res.writeHead(200);
    //     res.end(JSON.stringify(books));
    // }
    if (match) {
        const bookId = match[1];
        let book = books.books.filter((item, index) => item.id == bookId);
        if (book.length > 0) {
            res.end(JSON.stringify(book));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Bad-Request: Resource not found" }));
        }

    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Bad-Request: Resource not found" }));
    }
    // switch (req.url) {
    //     case "/book":
    //         res.writeHead(200);
    //         res.end(JSON.stringify(books));
    //         break;
    //     // case "/book/details":
    //     //     let bookId = 1001;
    //     //     let book = books.books.filter((item, index) => item.id == bookId);
    //     //     res.writeHead(200);
    //     //     res.end(JSON.stringify(book));
    //     //     break;
    //     default:
    //         res.writeHead(404);
    //         res.end(JSON.stringify({ error: "Resource not found" }));
    // }

});

server.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
});