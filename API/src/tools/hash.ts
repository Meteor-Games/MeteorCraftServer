// tools.ts
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';

interface HashObject {
    files: string[];
    folders: HashObject[];
}

// Função para calcular o hash de um arquivo
function calcularHashArquivo(caminhoArquivo: string): string {
    const conteudo = fs.readFileSync(caminhoArquivo);
    return crypto.createHash('sha256').update(conteudo).digest('hex');
}

// Função para calcular o hash de uma pasta e suas subpastas recursivamente
function calcularHashPasta(caminhoPasta: string): HashObject {
    const hashObj: HashObject = { files: [], folders: [] };

    const conteudo = fs.readdirSync(caminhoPasta);
    for (const item of conteudo) {
        const caminhoCompleto = path.join(caminhoPasta, item);
        if (fs.statSync(caminhoCompleto).isDirectory()) {
            const subHash = calcularHashPasta(caminhoCompleto);
            hashObj.folders.push(subHash);
        } else {
            const hashArquivo = calcularHashArquivo(caminhoCompleto);
            hashObj.files.push(hashArquivo);
        }
    }

    return hashObj;
}

/**
 * Calculates the hash of a file using the specified algorithm.
 * @param filePath The file path to calculate the hash.
 * @param algorithm The hash algorithm to use (default: 'sha256').
 * @returns A Promise that resolves with the file hash in hexadecimal format.
 */
export function calculateFileHash(filePath: string, algorithm: string = 'sha256'): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const hash = crypto.createHash(algorithm);
        const stream = fs.createReadStream(filePath);

        stream.on('data', (data) => hash.update(data));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', (err) => reject(err));
    });
}

/**
 * Calculates the hash of all files in a folder (including subfolders).
 * @param folderPath The folder path to calculate the hash.
 * @param algorithm The hash algorithm to use (default: 'sha256').
 * @returns A Promise that resolves with the folder hash in hexadecimal format.
 */
export function calculateFolderHash(folderPath: string, algorithm: string = 'sha256'): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        let hash = crypto.createHash(algorithm);

        function calculateDirectoryHash(dirPath: string) {
            const directories = fs.readdirSync(dirPath);
            directories.forEach((directory) => {
                const fullPath = path.join(dirPath, directory);
                if (fs.statSync(fullPath).isDirectory()) {
                    calculateDirectoryHash(fullPath);
                } else {
                    const data = fs.readFileSync(fullPath);
                    hash.update(data);
                }
            });
        }

        calculateDirectoryHash(folderPath);
        resolve(hash.digest('hex'));
    });
}
