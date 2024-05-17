<template>
  <main class="min-h-screen bg-gray-800 flex justify-center items-center flex-col">
    <div class="flex flex-col bg-[#2f3640] w-2/4 rounded-t-3xl">
      <div class="searchBox">
        <input class="searchInput border-b border-gray-400" type="text" name="" placeholder="Search something"
          v-model="value" @keyup.enter="searchValueChange" />
        <button class="searchButton" @click="searchValueChange">
          <FileSearchOutlined style="font-size: 24px;" />
        </button>
      </div>
      <div class="">
        <transition-group name="fade" tag="div" class="max-h-80 flex flex-col w-full overflow-y-auto">
          <a :href="item" v-for="(item, index) in fakeContent" :key="index"
            class="text-white p-6 border-b-2 border-gray-700 text-left hover:bg-gray-700 flex items-center gap-4 truncate">
            {{ item }}
          </a>
        </transition-group>
      </div>
    </div>
  </main>
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

/* The emerging W3C standard that is currently Firefox only */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.7) rgba(132, 124, 124, 0);
}

/* Works on Chrome/Edge/Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: rgba(12, 12, 12, 0.085);
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.7);
  border-radius: 20px;
  border: 3px solid rgba(0, 0, 0, 0.146);
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}

.searchBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: #2f3640;
  border-radius: 50px;
  position: relative;
}

.searchButton {
  color: white;
  position: absolute;
  right: 8px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--gradient-2,
      linear-gradient(90deg, #2af598 0%, #009efd 100%));
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

/*hover effect*/
button:hover {
  color: #fff;
  background-color: #1a1a1a;
  box-shadow: rgba(0, 0, 0, 0.5) 0 10px 20px;
  transform: translateY(-3px);
}

/*button pressing effect*/
button:active {
  box-shadow: none;
  transform: translateY(0);
}

.searchInput {
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 15px;
  padding: 24px 46px 24px 26px;
  width: 100%;
}
</style>
