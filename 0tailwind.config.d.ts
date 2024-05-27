declare module 'tailwind.config.js' {
  const config: {
    theme: {
      colors: {
        white: string;

        primary: string;
        darkprimary: string;

        success: string;
        darksuccess: string;

        error: string;
        darkerror: string;

        black: string;
        dark: string;
        gray: string;
        light: string;
      };
    };
  };
  export default config;
}
