import { createApp } from 'vue';
import router from '~~/router';
import App from './App.vue';

import 'uno.css';
import './drawer.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
