import express from 'express';
import { authorizeAndGetUrl, uploadVideo } from './index.js';

const app = express();
app.use(express.json());

app.listen(3002, () => {
    console.log('Server is running on port 3002');
});

app.get('/getAuthUrl', async (req, res) => {
    const url = await authorizeAndGetUrl();
    res.json({ url });
});

app.post('/upload', async (req, res) => {
    const { code, title, description } = req.body;

    const ytVideo = {
        title,
        description,
        filePath: 'src/your-video-file.mp4',
    }

    try {
        await uploadVideo(decodeURIComponent(code), ytVideo);
    } catch (error) {
        console.error('Error uploading video:', error);
        return res.status(500).send('Error uploading video');

    }
    res.send('Video uploaded successfully');
});
