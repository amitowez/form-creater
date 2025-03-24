<template>
  <div>
    <h2>Простая форма</h2>
    <FormGenerator
      :fields="fields"
      :form-data="formData"
      @save="saveForm"
      @cancel="resetForm"
      @error="showError"
    />
    <Notification :message="message" />
    <pre>{{ formData }}</pre>
  </div>
</template>

<script setup lang="ts">
import FormGenerator from '@/components/FormGenerator.vue'
import Notification from '@/components/Notification.vue'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'

const store = useStore()
const formData = computed(() => store.state.simpleFormData)
const message = ref('')

const fields = [
  { name: 'name', label: 'Имя', type: 'input', attrs: { placeholder: 'Введите имя' } },
  {
    name: 'country',
    label: 'Страна',
    type: 'select',
    options: [
      { value: 'ru', label: 'Россия' },
      { value: 'us', label: 'США' },
      { value: 'jp', label: 'Япония' }
    ]
  },
  { name: 'subscribe', label: 'Подписаться на новости', type: 'checkbox' },
  { name: 'comment', label: 'Комментарий', type: 'textarea', attrs: { rows: 3 } }
]

const saveForm = (data: Record<string, any>) => {
  store.dispatch('saveSimpleForm', data)
  message.value = 'Данные сохранены!'
  setTimeout(() => (message.value = ''), 2000)
}

const resetForm = () => {
  store.dispatch('resetSimpleForm')
  message.value = 'Форма сброшена!'
  setTimeout(() => (message.value = ''), 2000)
}

const showError = (errorMessage: string) => {
  message.value = errorMessage
  setTimeout(() => (message.value = ''), 2000)
}
</script>

<style lang="scss" scoped>
pre {
  text-align: left;
  margin-top: 20px;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
}
</style>