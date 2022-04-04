<template>
  <div class="form-control">
    <input type="text"
           class="mr-2"
           placeholder="Начните писать имя"
           v-model.trim="fullname"
           @input="$emit('filter', fullname)"
    >

    <select class="mr-2"
            v-model="state"
            @change="$emit('filter', state)"

    >
      <option v-for="(value, state) in TextMap"
              :key="state"
              :value=state>{{ value }}
      </option>
    </select>
    <button class="btn warning"
            v-if="isFilterActive"
            @click="reset"
    >Сбросить фильтр
    </button>
  </div>

</template>

<script setup>
import {TextMap} from '@/components/ui/AppStatus';
import {computed, ref, defineEmits} from "vue";

const emits = defineEmits(['filter'])

const fullname = ref();
const state = ref();

const isFilterActive = computed(() => fullname.value || state.value);
const reset = () => {
  fullname.value = null;
  state.value = null;
  emits('filter', null);
}

</script>

<style scoped>
.form-control {
  display: flex;
}

.mr-2 {
  margin-right: 2rem;
}
</style>
