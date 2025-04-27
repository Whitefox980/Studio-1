/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
      // Ignoriši nepotrebne module
          config.resolve.fallback = { 
                fs: false,
                      net: false,
                            tls: false,
                                };
                                    return config;
                                      },
                                        experimental: {
                                            serverComponentsExternalPackages: ["firebase-admin"],
                                              },
                                              };
                                              
                                              module.exports = nextConfig; */