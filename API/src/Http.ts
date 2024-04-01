import express, { Request, Response } from 'express';
const bodyParser = require('body-parser');


export function createServer() {
    const app = express();

    app.use(bodyParser.json());

    app.use((req: Request, res: Response, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send('WebSocket Server - Conecte-se via WebSocket!');
    });




    return app;
}
