import fs from 'fs';

const handleError = (error: any, message: string) => {
  console.error(`${message}:`, error);
}

const requireEnvVars = (vars: string[]) => {
  vars.forEach((variable) => {
    if (!process.env[variable]) {
      throw new Error(`Missing environment variable: ${variable}`);
    }
  });
};

const readFileAsArray = (filePath: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      const lines = data.split(/\r?\n/).filter(Boolean);
      resolve(lines);
    });
  });
}


export {
  handleError,
  requireEnvVars,
  readFileAsArray,
};