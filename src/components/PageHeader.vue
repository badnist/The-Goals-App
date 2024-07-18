<script setup>

const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    weekday: 'long'
})
</script>

<template>
    <Header>
        <p>{{ date }}</p>
    </Header>
    <header class="page-header">
        <RouterLink class="semi-discreet-anchor icon-entry" to="/tasks">
            <IconSword size="28" style="color: var(--primary-color-1)" />
            <h2>🎯The Goals App </h2>
        </RouterLink>
    </header>



</template>
<style></style>
