import Express from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';

const app = Express();

const proxy = createProxyMiddleware({
    target: 'http://localhost:3001',
    onProxyReq: fixRequestBody,
    onError: (err, req, res) => {
        res.writeHead(500, {
            'Content-Type': 'text/plain',
        }).end('Proxy Error');
    },
});

app.use('/proxy', proxy);

app.listen(9000, () => {
    console.log('Server start on http://localhost:9000');
});