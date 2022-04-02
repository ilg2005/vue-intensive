<template>
  <app-page title="Список заявок">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

    <RequestTable  :requests="requests"/>

    <teleport to="body">
      <AppModal v-if="modal" title="Создать заявку" @close="modal = false">
        <RequestModal @close="modal = false"/>
      </AppModal>
    </teleport>
  </app-page>
</template>

<script setup>
import {ref} from 'vue';
import AppPage from "@/components/ui/AppPage";
import RequestTable from "@/components/request/RequestTable";
import AppModal from "@/components/ui/AppModal";
import RequestModal from "@/components/request/RequestModal";
import {useStore} from "vuex";

const store = useStore()

const requests = store.getters['request/REQUESTS'];
const modal = ref(false);
</script>
