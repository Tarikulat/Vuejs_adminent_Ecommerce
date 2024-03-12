<script setup>
import { useRoute } from "vue-router";

 const route = useRoute();

</script>

<template>
    <div>
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">{{ route.meta.title }}</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><router-link :to="{ name: 'dashboard' }">Dashboard </router-link> / {{ route.meta.title }}</li>
                    </ol>
                </div><!-- /.col -->
                </div><!-- /.row -->
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>
