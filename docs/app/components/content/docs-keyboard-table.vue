<script lang="ts" setup>
import { PKbd } from '#components';

type KeyboardDef = {
  keys: Array<string>;
  description: string;
};

interface KeyboardTableProps {
  name: string;
  data: Array<KeyboardDef>;
}
const props = defineProps<KeyboardTableProps>();
</script>

<template>
  <ProseTable>
    <ProseThead>
      <ProseTr>
        <ProseTh>
          Key
        </ProseTh>
        <ProseTh>
          <span class="shadow-[0_0_0_1px_rgb(255_255_255/10%),_0_3px_0_rgb(255_255_255/10%)] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,23,_24,_0.2)]" />
          Description
        </ProseTh>
      </ProseTr>
    </ProseThead>

    <ProseTbody>
      <ProseTr
        v-for="(prop, index) in props.data"
        :key="`${prop}-${index}`"
      >
        <ProseTd>
          <div class="flex gap-1 items-center">
            <PKbd
              v-for="(key, propIndex) in prop.keys"
              :key="`${key}-${propIndex}`"
            >
              {{ key }}
            </PKbd>
          </div>
        </ProseTd>

        <ProseTd class="akar:align-middle">
          <MDC
            v-if="prop.description"
            :value="prop.description"
            class="color-text-toned mt-1"
            :cache-key="`${props.name}-${prop.keys.join('-')}-description`"
          />
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
