
<template>
  <div>
    <h2>Сложная форма</h2>
    <FormGenerator
      :fields="fields"
      :form-data="formData"
      @save="saveForm"
      @cancel="resetForm"
      @error="showError"
    >
      <template #languages="{ field }">
        <div class="checkbox-group">
          <div v-for="lang in field.options" :key="lang.value" class="checkbox-item">
            <input
              type="checkbox"
              :id="lang.value"
              :value="lang.value"
              v-model="formData.languages"
            />
            <label :for="lang.value" class="checkbox-label">
              {{ lang.label }} ({{ lang.level }})
            </label>
          </div>
        </div>
      </template>
    </FormGenerator>
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
const formData = computed(() => store.state.complexFormData)
const message = ref('')

const fields = [
  { name: 'username', label: 'Логин', type: 'input', attrs: { placeholder: 'Введите логин' } },
  { name: 'email', label: 'Email', type: 'input', attrs: { type: 'email' } },
  { name: 'bio', label: 'О себе', type: 'textarea', attrs: { rows: 4 } },
  {
    name: 'experience',
    label: 'Опыт работы',
    type: 'select',
    options: [
      { value: 'junior', label: 'Меньше года' },
      { value: 'middle', label: '1-3 года' },
      { value: 'senior', label: 'Больше 3 лет' }
    ]
  },
  { name: 'remote', label: 'Готов к удалённой работе', type: 'checkbox' },
  {
    name: 'languages',
    label: 'Любимые языки программирования',
    type: 'checkbox',
    options: [
      { value: 'js', label: 'JavaScript', level: 'Высокий' },
      { value: 'py', label: 'Python', level: 'Средний' },
      { value: 'java', label: 'Java', level: 'Начальный' }
    ]
  }
]

const saveForm = (data: Record<string, any>) => {
  store.dispatch('saveComplexForm', data)
  message.value = 'Данные сохранены!'
  setTimeout(() => (message.value = ''), 2000)
}

const resetForm = () => {
  store.dispatch('resetComplexForm')
  message.value = 'Форма сброшена!'
  setTimeout(() => (message.value = ''), 2000)
}

const showError = (errorMessage: string) => {
  message.value = errorMessage
  setTimeout(() => (message.value = ''), 2000)
}
</script>

<style lang="scss" scoped>
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 5px;
}
.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.checkbox-label {
  font-size: 14px;
  color: #2c3e50;
  cursor: pointer;
  &:hover {
    color: #42b983;
  }
}
pre {
  text-align: left;
  margin-top: 20px;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
}
</style>