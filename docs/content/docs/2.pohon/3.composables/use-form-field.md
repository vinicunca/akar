---
title: useFormField
description: 'A composable to integrate custom inputs with the Form component'
navigation: false
---

## Usage

Use the auto-imported `useFormField` composable to integrate custom inputs with a [Form](/docs/components/form).

```vue
<script setup lang="ts">
const { id, emitFormBlur, emitFormInput, emitFormChange } = useFormField()
</script>
```
