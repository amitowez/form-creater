<template>
  <form @submit.prevent="handleSave">
    <div v-for="(field, index) in fields" :key="index" class="field">
      <label>{{ field.label }}</label>
      <input
        v-if="field.type === 'input'"
        v-model="formData[field.name]"
        v-bind="field.attrs"
      />
      <select
        v-if="field.type === 'select'"
        v-model="formData[field.name]"
        v-bind="field.attrs"
      >
        <option v-for="option in field.options" :value="option.value" :key="option.value">
          {{ option.label }}
        </option>
      </select>
      <input
        v-if="field.type === 'checkbox' && !$slots[field.name]"
        type="checkbox"
        v-model="formData[field.name]"
        v-bind="field.attrs"
      />
      <textarea
        v-if="field.type === 'textarea'"
        v-model="formData[field.name]"
        v-bind="field.attrs"
      ></textarea>
      <slot :name="field.name" :field="field" :value="formData[field.name]"></slot>
    </div>
    <button type="submit">Сохранить</button>
    <button type="button" @click="handleCancel">Отмена</button>
  </form>
</template>

<script setup lang="ts">
interface Field {
  name: string
  label: string
  type: 'input' | 'select' | 'checkbox' | 'textarea'
  attrs?: Record<string, any>
  options?: { value: string; label: string }[]
}

const props = defineProps<{
  fields: Field[]
  formData: Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'save', value: Record<string, any>): void
  (e: 'cancel'): void
  (e: 'error', message: string): void 
}>()

const handleSave = () => {
  const requiredFields = props.fields.filter(
    (field) => field.type === 'input' || field.type === 'textarea'
  )
  const emptyFields = requiredFields.filter(
    (field) => !props.formData[field.name] || props.formData[field.name].trim() === ''
  )

  if (emptyFields.length > 0) {
    const emptyFieldNames = emptyFields.map((field) => field.label).join(', ')
    emit('error', `Заполните поля: ${emptyFieldNames}`)
    return
  }

  emit('save', props.formData)
}

const handleCancel = () => emit('cancel')
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  &:last-child {
    background-color: #ff6347;
  }
}
</style>