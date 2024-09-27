import dotenv from 'dotenv';
import { handleError, readFileAsArray, requireEnvVars } from './utils';
import Bunpro from './bunpro';

dotenv.config();

const main = async () => {
  try {
    const words = await readFileAsArray('./data/items.txt');

    const requiredEnvVars = ['BUNPRO_EMAIL', 'BUNPRO_PASSWORD'];
    requireEnvVars(requiredEnvVars);

    const bunpro = new Bunpro({
      email: process.env.BUNPRO_EMAIL || '',
      password: process.env.BUNPRO_PASSWORD || '',
    });
    await bunpro.init();

    console.log('- Logging in...');
    const login = await bunpro.login();
    if (login) {

      console.log('- Adding vocab items...');

      for (const word of words) {
        await bunpro.addVocabItem(word, true);
      }
    
      console.log('- Logging out...');
      await bunpro.logout();
    }

    await bunpro.close();
  } catch (error) {
    handleError(error, 'Error reading file:');
  }
};

main();
