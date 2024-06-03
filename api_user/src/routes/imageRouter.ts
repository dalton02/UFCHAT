import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import sharp from 'sharp';

const app = express();  
const imageRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage: storage})

imageRouter.post('/',upload.single('image'),async (req: Request, res: Response) => {
    try{
    if (!req.file) {
    return res.status(404).json({ message: 'No file uploaded' });
    }
    const image = req.file.buffer;
    const cookies = JSON.parse(req.body.cookies);
    await sharp(image).webp().toFile(`resource/images/${cookies.login}.webp`);
    console.log("Imagem inserida com sucesso");
    return res.status(200).json({ message: 'Imagem inserida com sucesso' });
    }
    catch(err){
    return res.status(500).json({ message: 'Erro ao inserir imagem' });    
    }
});



export { imageRouter };
