<template>
  <a-layout>
    <a-layout-header class="header">
      <img src="@public/icons/pin.svg" @click="togglePin" :class="{ active: isPinned }" alt="Pin">
      <!--      <div  class="tabs"></div>-->
      <a-tabs
          class="tabs"
          v-model:activeKey="activeKey"
          type="editable-card"
          tab-position="top"
          @edit="onEdit">
        <a-tab-pane v-for="tab in tabList" :key="tab.label" :tab="tab.label" :closable="!isLocked"/>
      </a-tabs>

      <img src="@public/icons/lock.svg" @click="toggleLock" :class="{ active: isLocked }" alt="Lock">
    </a-layout-header>
    <a-layout-content style="display:flex;padding: 24px; min-height: 280px; margin-top: 10px">
      <router-view/>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {message} from "ant-design-vue";

const isPinned = ref(false);
const isLocked = ref(false);
const activeKey = ref('新标签页1');
let tabList = ref([
  {label: "新标签页1", routeName: "newTab"}
])
const add = () => {
  activeKey.value = `新标签页${tabList.value.length + 1}`;
  tabList.value.push({label: `新标签页${tabList.value.length + 1}`, routeName: 'newTab'});
};

const remove = (targetKey: string) => {
  let lastIndex = 0;
  tabList.value.forEach((pane, i) => {
    if (pane.label === targetKey) {
      lastIndex = i - 1;
    }
  });
  tabList.value = tabList.value.filter(pane => pane.label !== targetKey);
  if (tabList.value.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = tabList.value[lastIndex].label;
    } else {
      activeKey.value = tabList.value[0].label;
    }
  }
};

const onEdit = (targetKey: string | MouseEvent, action: string) => {
  if (action === 'add') {
    console.log("添加标签")
    add();
  } else {
    if (tabList.value.length === 1) {
      message.error("唯一标签不可删除")
    } else {
      remove(targetKey as string);
    }
  }
};

function togglePin() {
  isPinned.value = !isPinned.value;
}

function toggleLock() {
  isLocked.value = !isLocked.value;
}
</script>

<style scoped>
body {
  background: #f2f2f2;
}

.header {
  width: 100%;
  background: #f2f2f2;
  display: flex;
  padding: 10px;
  align-items: center; /* 垂直居中 */
  justify-content: space-between;
}

:deep(.header .tabs) {
  width: 90%;
}

:deep(.ant-tabs-nav) {
  margin-bottom: 0;
}

.header img {
  width: 5%;
  height: 20px;
  display: flex;
  opacity: 0.5;
}

.header img.active {
  opacity: 1;
}
</style>
