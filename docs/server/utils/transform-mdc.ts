import { toCamelCase } from '@vinicunca/perkakas';

interface ComponentAttributes {
  ':prose'?: string;
  ':props'?: string;
  ':external'?: string;
  ':externalTypes'?: string;
  ':ignore'?: string;
  ':hide'?: string;
  ':slots'?: string;
}

interface ThemeConfig {
  prose: boolean;
  componentName: string;
}

interface CodeConfig {
  props: Record<string, unknown>;
  external: Array<string>;
  externalTypes: Array<string>;
  ignore: Array<string>;
  hide: Array<string>;
  componentName: string;
  slots?: Record<string, string>;
}

interface RawDocument {
  title: string;
  body: any;
}

export function transformMdc(doc: RawDocument): RawDocument {
  const componentName = toCamelCase(doc.title);
  console.log('🚀 ~ transformMDC ~ componentName:', componentName);

  return doc;
}
