<script setup lang="ts">
import CreatePackage from '~/components/modules/packages/CreatePackage.vue';


const showPackageAuthorModal = ref<boolean>(false)

const closeAuthorModal = () => {
  showPackageAuthorModal.value = false
}
</script>

<template>
  <LazyCommonPageTitle title="Packages">

    <Button @click="showPackageAuthorModal = true">
      Add new package
    </Button>
  </LazyCommonPageTitle>

  <CreatePackage :visible="showPackageAuthorModal" @close="closeAuthorModal" />


</template>

<style scoped></style>
