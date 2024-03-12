import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate';
import router from './router'
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js'
import 'admin-lte/dist/js/adminlte.min.js'

import 'admin-lte/plugins/summernote/summernote-bs4.min.css'
import 'admin-lte/plugins/codemirror/theme/monokai.css'
import 'admin-lte/plugins/summernote/summernote-bs4.min.js'
import 'admin-lte/plugins/chart.js/Chart.js'
import 'admin-lte/plugins/chart.js/Chart.bundle.js'

import "skeleton-screen-css";
import './style.css'
import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'
import jquery from 'jquery';
window.$ = window.jQuery = jquery;

const app = createApp(App)
const pinia = createPinia();
pinia.use(createPersistedState());
app.use(pinia);
app.use(router);
app.mount('#app');