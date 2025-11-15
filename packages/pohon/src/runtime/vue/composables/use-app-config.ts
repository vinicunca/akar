import appConfig from '#build/app.config';
import { reactive } from 'vue';

const _appConfig = reactive(appConfig);

export const useAppConfig = () => _appConfig;
