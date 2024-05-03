import {Router} from 'express';
import path from "path";

const router = Router();
const basePath = __dirname.includes('/src/routes') ? path.join(__dirname, '..', '..') : __dirname;

router.get('/privacy-policy', (req, res) => {
    res.sendFile(path.join(basePath, 'public', 'privacy-policy.html'));
});

router.get('/data-deletion', (req, res) => {
    res.sendFile(path.join(basePath, 'public', 'data-deletion.html'));
});


export default router;