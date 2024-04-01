import { Request, Response } from 'express';
import { createServer } from "./Http";
import fs from 'fs';
import path from 'path';
import multer from 'multer';

const port = parseInt(process.env.PORT || '80', 10);
const app = createServer();

interface HashObject {
    files: string[];
    folders: HashObject[];
}


const modpacksDirectory = path.join(process.cwd(), 'modpacks');
if (!fs.existsSync(modpacksDirectory)) {
    fs.mkdirSync(modpacksDirectory);
}
const tempfiles = path.join(process.cwd(), 'tempfiles');
const upload = multer({ dest: tempfiles });

// Função para verificar se o UUID é válido
function isValidUUID(uuid:string) {
	// Implemente sua lógica para verificar se o UUID é válido
	// Pode ser uma validação simples ou consultar um banco de dados, por exemplo
	return true; // Retorne true se o UUID for válido
}

// app.use((req: Request, res: Response) => {
//     res.status(404).send('Página não encontrada');
// });

// Rota para acessar qualquer arquivo dentro da pasta da modpack por meio do UUID
app.get('/getModpackFile/:uuid/*', (req:Request, res) => {
    const {uuid } = req.params;
    const modpackPath = path.join(modpacksDirectory, uuid);
    const requestedFilePath = path.join(modpackPath, req.params['0']);
    // console.log(requestedFilePath)
    // Verificar se o UUID é válido e se o diretório existe
    if (!isValidUUID(uuid) || !fs.existsSync(requestedFilePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    try {
        let fileContent = fs.readFileSync(requestedFilePath);

        // // Verificar se o arquivo solicitado é o modpack.json
        // if (requestedFilePath.endsWith('modpack.json')) {
        //     // Se for, ajuste o campo "token" para uma string vazia
        //     let modpackInfo = JSON.parse(fileContent.toString('utf-8'));
        //     modpackInfo.token = "";
        //     fileContent = Buffer.from(JSON.stringify(modpackInfo, null, 2), 'utf-8');
        // }

        return res.status(200).send(fileContent);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'An error occurred' });
    }
});


// Função para mapear a pasta atual
function mapearPastaAtual(caminho: string): { pastas: string[], arquivos: string[] } {
    const pastas: string[] = [];
    const arquivos: string[] = [];

    // Lê o conteúdo da pasta
    const conteudo = fs.readdirSync(caminho);

    // Itera sobre cada item do conteúdo
    for (const item of conteudo) {
        const caminhoCompleto = path.join(caminho, item);

        // Verifica se é um diretório (pasta)
        if (fs.statSync(caminhoCompleto).isDirectory()) {
            pastas.push(item);
        } else {
            arquivos.push(item);
        }
    }

    return { pastas, arquivos };
}

const HashUpdate = ()=>{
    console.log(mapearPastaAtual(modpacksDirectory))
}

HashUpdate()

app.listen(port, () => {
    console.log(`Servidor WebSocket iniciado na porta ${port}`);
})
