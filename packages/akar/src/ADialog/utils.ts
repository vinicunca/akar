import { onMounted, type Ref } from 'vue';

const DEFAULT_TITLE_NAME = 'DialogTitle';
const DEFAULT_CONTENT_NAME = 'DialogContent';

export interface WarningProps {
  componentLink?: string;
  contentElement: Ref<HTMLElement | undefined>;
  contentName?: string;
  descriptionId: string;
  titleId: string;
  titleName?: string;
};

export function useWarning({
  contentElement,
  contentName = DEFAULT_CONTENT_NAME,
  descriptionId,
  titleId,
  titleName = DEFAULT_TITLE_NAME,
}: WarningProps) {
  const TITLE_MESSAGE = `Warning: \`${contentName}\` requires a \`${titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleName}\`, you can wrap it with our VisuallyHidden component.

`;

  const DESCRIPTION_MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${contentName}.`;

  onMounted(() => {
    const hasTitle = document.getElementById(titleId);
    if (!hasTitle) {
      console.warn(TITLE_MESSAGE);
    }

    const describedById = contentElement.value?.getAttribute('aria-describedby');
    // if we have an id and the user hasn't set aria-describedby="undefined"
    if (descriptionId && !describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) {
        console.warn(DESCRIPTION_MESSAGE);
      }
    }
  });
}

export function getOpenState(open: boolean) {
  return open ? 'open' : 'closed';
}
