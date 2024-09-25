const requireEnvVars = (vars: string[]) => {
  vars.forEach((variable) => {
    if (!process.env[variable]) {
      throw new Error(`Missing environment variable: ${variable}`);
    }
  });
};

export { requireEnvVars };