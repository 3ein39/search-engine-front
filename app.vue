<template>
  <div
    class="min-h-screen bg-gradient-to-br from-sky-600 to-cyan-500 py-6 flex flex-col justify-center"
  >
    <div class="relative py-8 px-28">
      <div
        class="relative px-4 py-10 bg-sky-100 mx-8 shadow rounded-3xl w-auto mx-auto"
      >
        <div class="max-w-md mx-auto">
          <div class="flex items-center space-x-5">
            <a-input-search
              size="large"
              @change="searchValueChange"
              v-model:value="value"
              class="w-full px-5 py-3 outline-none focus:outline-none bg-cyan-100 rounded-full"
              placeholder="Search..."
              enter-button
            />
          </div>
          <div class="mt-5">
            <transition-group name="fade" tag="div" class="flex flex-col gap-4">
              <div
                v-for="(item, index) in fakeContent"
                :key="index"
                class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex flex-col gap-4 rounded-lg p-4 shadow-2xl"
              >
                <div class="flex items-center space-x-4">
                  <a :href=" item " class="text-lg text-gray-800 truncate">{{ item }}</a>
                </div>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- The rest of your code remains the same -->
<script setup>

const value = ref("");
const fakeContent = ref([]);


const searchValueChange = async () => {
  const { data } = await useFetch(`/api/server?value=${value.value}`);
  console.log(data.value.links.length);
  fakeContent.value = data.value.links;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
