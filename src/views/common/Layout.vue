<script setup>
import { Header, Sidebar,  Footer, BreadCrumb } from '@/views/common'

</script>

<template>
    <div>
        <Header/>
        <Sidebar/>
            <div class="content-wrapper">
                <BreadCrumb/>
                <slot/>
            </div>

        <Footer/>
    </div>
</template>

<style scoped>

</style>