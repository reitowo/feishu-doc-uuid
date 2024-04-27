<script setup>
import {computed, onBeforeUnmount, onMounted, reactive, ref, watch} from 'vue'
import { bitable, ToastType, FieldType } from '@lark-base-open/js-sdk';
import Button from 'primevue/button';
import InputSwitch from 'primevue/inputswitch';
import Panel from 'primevue/panel';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import { v4 as uuidv4 } from 'uuid';

const forceReplace = ref(false);

const fillGuids = async () => {
  const selection = await bitable.base.getSelection();
  
  if (!selection.fieldId) {
    await bitable.ui.showToast({
      toastType: ToastType.error,
      message: '未选择有效列'
    })
    return
  }

  const fieldMeta = await table.getFieldMetaById(selection.fieldId);
  if (fieldMeta.type != FieldType.Text) {
    await bitable.ui.showToast({
      toastType: ToastType.error,
      message: '只能对文本字段使用'
    })
    return
  }
  
  const table = await bitable.base.getTable(selection.tableId)
  const recordList = await table.getRecordList();
  for (const record of recordList) {
    const cell = await record.getCellByField(selection.fieldId);
    const val = await cell.getValue();
    if (!val || forceReplace.value) {
      await cell.setValue(uuidv4())
    }
  }

  await bitable.ui.showToast({
    toastType: ToastType.success,
    message: '填充完成'
  })
}

const oneValue = ref(uuidv4())
const generateOne = () => {
  oneValue.value = uuidv4()
}

</script>

<template>
  <main>
    <div class="flex flex-column gap-2">
      <div class="pb-1 text-lg"> 快捷生成 </div>
      <InputGroup>
        <InputText v-model="oneValue" @click="(e) => {
          e.target.select()
        }"/>
        <Button icon="pi pi-refresh" label="生成" severity="primary" @click="generateOne"/>
      </InputGroup>

      <div class="pt-3 pb-1 text-lg"> 填充列 </div>
      <div class="flex flex-row gap-2 align-items-center">
          <InputSwitch v-model="forceReplace" />
          <div> 覆盖现有值 </div>
      </div>
      <Button label="填充 UUID" @click="fillGuids"/>
    </div>
  </main>
</template>

<style scoped>

</style>
