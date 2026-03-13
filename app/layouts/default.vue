<template>
  <div class="layout">
    <LayoutDefaultHeader/>
    <main class="layout__main">
      <slot/>
    </main>
    <!--    <LayoutDefaultFooter/>-->
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  height: 100vh;
  max-width: 100vw;
  min-width: 100vw;
  background: radial-gradient(
      circle at 0% 0%,
      rgb(var(--color-bg)) 0%,
      rgb(var(--color-bg)) 50%,
      rgb(var(--color-primary) / 0.3) 100%
  );
  overflow: hidden;
}

.layout__main {
  min-height: 0;
  margin: 0 auto;
  width: 1190px;
  max-width: 100vw;
  min-width: 320px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
