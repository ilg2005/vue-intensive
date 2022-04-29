<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ i18n.amount }}</th>
      <th>{{ i18n.date }}</th>
      <th>{{ i18n.category }}</th>
      <th>{{ i18n.type }}</th>
      <th>{{ i18n.open }}</th>
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
            v-tooltip="`${i18n.openRecord}`"
            class="btn-small btn"
            @click="$router.push(`/detail/${record.id}`)"
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
import {useStore} from "vuex";

const i18n = useStore().getters.TRANSLATION;

defineProps({
  records: {
    type: Array,
    required: true,
  }
})
</script>

<style scoped>

</style>
