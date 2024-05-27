declare module 'tailwind.config.js' {
  const config: {
    theme: {
      colors: {
        header: string;
        background: string;
        
        primary: string;
        darkprimary: string;
        
        success: string;
        darksuccess: string;
        
        warning: string;
        darkwarning: string;
        
        error: string;
        darkerror: string;

        black: string;
        dark: string;
        gray: string;
        light: string;
        white: string;
      };
    };
  };
  export default config;
}
