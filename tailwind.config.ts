import type { Config } from 'tailwindcss';

const config: Config = {
  // 1. FIX: Content paths
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
            './components/**/*.{js,ts,jsx,tsx}',
                './src/**/*.{js,ts,jsx,tsx}' // Dodaj ako koristiš src/
                  ],

                    // 2. FIX: Theme extension sa tipovima
                      theme: {
                          extend: {
                                colors: {
                                        primary: '#3b82f6' // Primer custom boje
                                              },
                                                    animation: {
                                                            'spin-slow': 'spin 3s linear infinite',
                                                                  },
                                                                        keyframes: {
                                                                                spin: {
                                                                                          '0%': { transform: 'rotate(0deg)' },
                                                                                                    '100%': { transform: 'rotate(360deg)' },
                                                                                                            },
                                                                                                                  } as Record<string, any>, // Tip za keyframes
                                                                                                                      },
                                                                                                                        },

                                                                                                                          // 3. FIX: Plugini sa tipovima
                                                                                                                            plugins: [
                                                                                                                                require('@tailwindcss/typography'), // Ako koristiš
                                                                                                                                    require('@tailwindcss/forms'),      // Ako koristiš
                                                                                                                                      ],

                                                                                                                                        // 4. FIX: Future flags
                                                                                                                                          future: {
                                                                                                                                              hoverOnlyWhenSupported: true,
                                                                                                                                                },

                                                                                                                                                  // Opciono: Isključi nepotrebne utilities
                                                                                                                                                    corePlugins: {
                                                                                                                                                        float: false,
                                                                                                                                                            clear: false,
                                                                                                                                                              }
                                                                                                                                                              };

                                                                                                                                                              export default config;
                                                                                                                                                              