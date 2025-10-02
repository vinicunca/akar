import type { ComponentMeta, PropertyMeta, PropertyMetaSchema } from 'vue-component-meta';
import { createWriteStream } from 'node:fs';

export function stringifyJson(obj: any) {
  return JSON
    .stringify(obj, null, 2)
    // Nuxt content's MDC is picky with quotes so we need the triple slashes
    .replace(/\\"/g, '\'');
}

export function writeToJson(
  { filePath, data }:
  { filePath: string; data: any },
): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(filePath);
    stream.on('error', reject);
    stream.on('finish', resolve);

    stream.write('{\n');

    const keys = Object.keys(data);

    Object.keys(data).forEach((key, index) => {
      stream.write(`  "${key}": ${stringifyJson(data[key])}`);
      if (index < keys.length - 1) {
        stream.write(',');
      }
      stream.write('\n');
    });

    stream.write('}\n');
  });
}

export function parseTypeFromSchema(schema: PropertyMetaSchema): string {
  if (typeof schema === 'object' && (schema.kind === 'enum' || schema.kind === 'array')) {
    const isFlatEnum = schema.schema?.every((val) => typeof val === 'string');
    const enumValue = schema?.schema?.filter((i) => i !== 'undefined') ?? [];

    if (isFlatEnum && /^[A-Z]/.test(schema.type)) {
      return enumValue.join(' | ');
    } else if (typeof schema.schema?.[0] === 'object' && schema.schema?.[0].kind === 'enum') {
      return schema.schema.map((s: PropertyMetaSchema) => parseTypeFromSchema(s)).join(' | ');
    } else {
      return schema.type;
    }
  } else if (typeof schema === 'object' && (schema.kind === 'object' || schema.kind === 'event')) {
    return schema.type;
  } else if (typeof schema === 'string') {
    return schema;
  } else {
    return '';
  }
}

export function parseMetaProps(metaProps: ComponentMeta['props']) {
  return metaProps
    // Exclude global props
    .filter((prop) => !prop.global)
    .map((prop) => {
      let defaultValue = prop.default;
      let type = prop.type;
      const { name, description, required } = prop;

      if (name === 'as') {
        defaultValue = defaultValue ?? '"div"';
      }

      if (defaultValue === 'undefined') {
        defaultValue = undefined;
      }

      if (!type.includes('AcceptableValue')) {
        type = parseTypeFromSchema(prop.schema) || type;
      }

      return {
        name,
        description,
        type: type.replace(/\s*\|\s*undefined/g, ''),
        required,
        default: defaultValue ?? undefined,
      };
    })
    .sort((a, b) => {
      if (a.name === 'as') {
        return -1;
      }

      if (b.name === 'as') {
        return 1;
      }

      if (a.name === 'pohon') {
        return 1;
      }

      if (b.name === 'pohon') {
        return -1;
      }

      return a.name.localeCompare(b.name);
    });
};

export function parsePohonMetaProps(metaProps: ComponentMeta['props']) {
  return metaProps
    // Exclude global props
    .filter((prop) => !prop.global)
    .map((sch) => stripeTypeScriptInternalTypesSchema(sch))
    .sort((a, b) => {
      if (a.name === 'as') {
        return -1;
      }

      if (b.name === 'as') {
        return 1;
      }

      if (a.name === 'pohon') {
        return 1;
      }

      if (b.name === 'pohon') {
        return -1;
      }

      return a.name.localeCompare(b.name);
    });
}

export function parseMetaSlots(metaSlots: ComponentMeta['slots']) {
  const defaultSlot = metaSlots?.[0];
  const slots: Array<{ name: string; description: string; type: string }> = [];

  if (defaultSlot && defaultSlot.type !== '{}') {
    const schema = defaultSlot.schema;
    if (typeof schema === 'object' && schema.schema) {
      Object.values(schema.schema).forEach((childMeta: PropertyMeta) => {
        slots.push({
          name: childMeta.name,
          description: childMeta.description ?? '',
          type: parseTypeFromSchema(childMeta.schema),
        });
      });
    }
  }

  return slots;
}

export function parseMetaEvents(
  metaEvents: ComponentMeta['events'],
  eventDescriptionMap: Map<string, string> = new Map(),
) {
  return metaEvents
    .map(({ name, type }) => {
      return ({
        name,
        description: eventDescriptionMap.get(name) ?? '',
        type: type.replace(/\s*\|\s*undefined/g, ''),
      });
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function parseMetaExposed(metaExposed: ComponentMeta['exposed']) {
  return metaExposed
    .filter((expose) => typeof expose.schema === 'object' && expose.schema.kind === 'event')
    .map((expose) => ({
      name: expose.name,
      description: expose.description,
      type: expose.type,
    }));
}

function stripeTypeScriptInternalTypesSchema(type: any, topLevel: boolean = true): any {
  if (!type) {
    return type;
  }

  if (!topLevel && type.declarations && type.declarations.find((d: any) => d.file.includes('node_modules/typescript') || d.file.includes('@vue/runtime-core'))) {
    return false;
  }

  if (Array.isArray(type)) {
    return type.map((sch: any) => stripeTypeScriptInternalTypesSchema(sch, false)).filter((r) => r !== false);
  }

  if (Array.isArray(type.schema)) {
    return {
      ...type,
      declarations: undefined,
      schema: type.schema.map((sch: any) => stripeTypeScriptInternalTypesSchema(sch, false)).filter((r: any) => r !== false),
    };
  }

  if (!type.schema || typeof type.schema !== 'object') {
    return typeof type === 'object' ? { ...type, declarations: undefined } : type;
  }

  const schema: any = {};
  Object.keys(type.schema).forEach((sch) => {
    if (sch === 'schema' && type.schema[sch]) {
      schema[sch] = schema[sch] || {};
      Object.keys(type.schema[sch]).forEach((sch2) => {
        const res = stripeTypeScriptInternalTypesSchema(type.schema[sch][sch2], false);
        if (res !== false) {
          schema[sch][sch2] = res;
        }
      });
      return;
    }
    const res = stripeTypeScriptInternalTypesSchema(type.schema[sch], false);

    if (res !== false) {
      schema[sch] = res;
    }
  });

  return {
    ...type,
    declarations: undefined,
    schema,
  };
}
