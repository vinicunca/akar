import { toSentenceCase } from '@vinicunca/perkakas';

const components = [
  'accordion',
  'alert',
  'avatar',
  'button',
  'input',
].map((component) => ({
  label: toSentenceCase(component.split('/').pop() as string),
  icon: 'i-lucide-box',
  to: `/components/${component}`,
}));

export function useNavigation() {
  const items = [
    { label: 'Home', icon: 'i-lucide-home', to: '/' },
    // { label: 'Chat', icon: 'i-lucide-message-circle', to: '/chat' },
  ];

  return {
    items,
    components,
  };
}
