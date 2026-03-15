const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/proxy-image', async (req, res) => {
    const url = req.query.url;
    
    if (!url) {
        return res.status(400).send('URL required');
    }
    
    try {
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Referer': 'https://animepahe.si/',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            }
        });
        
        // Forward the content type header
        if (response.headers['content-type']) {
            res.setHeader('Content-Type', response.headers['content-type']);
        }
        if (response.headers['cache-control']) {
            res.setHeader('Cache-Control', response.headers['cache-control']);
        }
        
        // Pipe the image stream directly to the response
        response.data.pipe(res);
    } catch (error) {
        console.error('Image proxy error:', error.message);
        res.status(500).send('Error fetching image');
    }
});

module.exports = router;
