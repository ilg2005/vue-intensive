<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) in records"
        :key="record.id"
    >
      <td>{{ idx + 1 }}</td>
      <td>{{ currencyFilter(record.amount, 'RUB') }}</td>
      <td>{{ record.date }}</td>
      <td>{{ record.category }}</td>
      <td>
        <span :class="['white-text', 'badge', record.class ]">{{ record.typeDescr }}</span>
      </td>
      <td>
        <button
            v-tooltip="'Открыть запись'"
            class="btn-small btn"
            @click="$router.push('/detail')"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>

</template>

<script setup>
import {defineProps} from "vue";
import currencyFilter from "@/utils/currencyFilter";

defineProps({
  records: {
    type: Array,
    required: true,
  }
})
</script>

<style scoped>

</style>
