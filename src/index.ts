import dotenv from 'dotenv';
import { requireEnvVars } from './utils';
import Bunpro from './bunpro';

dotenv.config();

const main = async () => {
  const requiredEnvVars = ['BUNPRO_EMAIL', 'BUNPRO_PASSWORD'];

  dotenv.config();
  requireEnvVars(requiredEnvVars);

  await Bunpro.login();
};

main();
