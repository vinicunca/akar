import { defineNuxtPlugin, useAppConfig, useHead } from '#app';

export default defineNuxtPlugin({
  enforce: 'post',
  setup() {
    const appConfig = useAppConfig();

    if (import.meta.client) {
      function updateColor(type: 'primary' | 'neutral') {
        const color = localStorage.getItem(`pohon-ui-${type}`);
        if (color) {
          appConfig.pohon.colors[type] = color;
        }
      }

      function updateRadius() {
        const radius = localStorage.getItem('pohon-ui-radius');
        if (radius) {
          appConfig.theme.radius = Number.parseFloat(radius);
        }
      }

      function updateBlackAsPrimary() {
        const blackAsPrimary = localStorage.getItem('pohon-ui-black-as-primary');
        if (blackAsPrimary) {
          appConfig.theme.blackAsPrimary = blackAsPrimary === 'true';
        }
      }

      updateColor('primary');
      updateColor('neutral');
      updateRadius();
      updateBlackAsPrimary();
    }

    if (import.meta.server) {
      useHead({
        script: [
          {
            innerHTML: `
            let html = document.querySelector('style#pohon-colors').innerHTML;

            if (localStorage.getItem('pohon-ui-primary')) {
              const primaryColor = localStorage.getItem('pohon-ui-primary');
              if (primaryColor !== 'black') {
                html = html.replace(
                  /(--akar-primary-\\d{2,3}:\\s*var\\(--colors-)${appConfig.pohon.colors.primary}(-\\d{2,3}.*?\\))/g,
                  \`$1\${primaryColor}$2\`
                );
              }
            }
            if (localStorage.getItem('pohon-ui-neutral')) {
              let neutralColor = localStorage.getItem('pohon-ui-neutral');
              html = html.replace(
                /(--akar-neutral-\\d{2,3}:\\s*var\\(--colors-)${appConfig.pohon.colors.neutral}(-\\d{2,3}.*?\\))/g,
                \`$1\${neutralColor === 'neutral' ? 'old-neutral' : neutralColor}$2\`
              );
            }

            document.querySelector('style#pohon-colors').innerHTML = html;
            `.replace(/\s+/g, ' '),
            type: 'text/javascript',
            tagPriority: -1,
          },
          {
            innerHTML: `
            if (localStorage.getItem('pohon-ui-radius')) {
              document.querySelector('style#pohon-ui-radius').innerHTML = ':root { --pohon-ui-radius: ' + localStorage.getItem('pohon-ui-radius') + 'rem; }';
            }
          `.replace(/\s+/g, ' '),
            type: 'text/javascript',
            tagPriority: -1,
          },
          {
            innerHTML: `
            if (localStorage.getItem('pohon-ui-black-as-primary') === 'true') {
              document.querySelector('style#pohon-ui-black-as-primary').innerHTML = ':root { --akar-primary: black; } .dark { --akar-primary: white; }';
            } else {
              document.querySelector('style#pohon-ui-black-as-primary').innerHTML = '';
            }
          `.replace(/\s+/g, ' '),
          },
        ],
      });
    }
  },
});
