/** @type {import('next').NextConfig} */
const nextConfig = {


    

    images: {
        domains: ['localhost','telechat-server-3l6y.onrender.com','telechat.blob.core.windows.net'], // Add 'localhost' to the list of domains
      },

      env:{
        NEXT_PUBLIC_AGORA_APP_ID:"f952c220b8234f8d9b164a5215632832",
        
      }
};

export default nextConfig;
