<template>
  <div class="filter">
    <div class="form-control">
      <input type="text"
             placeholder="Начните писать имя"
             v-model.trim="fullname"
      >
    </div>
    <div class="form-control">
      <select
              v-model="state"

      >
        <option v-for="(value, state) in TextMap"
                :key="state"
                :value=state>{{ value }}
        </option>
      </select>
    </div>
    <button class="btn warning"
            v-if="isFilterActive"
            @click="reset"
    >Сбросить фильтр
    </button>
  </div>
</template>

<script setup>
import {TextMap} from '@/components/ui/AppStatus';
import {computed, ref, defineEmits, defineProps, watch} from "vue";
defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue' ])

const fullname = ref();
const state = ref();

watch([fullname, state], (values) => {
  emits('update:modelValue', {
    fullname: values[0],
    state: values[1],
  })
})

const isFilterActive = computed(() => fullname.value || state.value);
const reset = () => {
  fullname.value = '';
  state.value = '';
}

</script>

<style scoped>
</style>
