import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // http-backend 사용
  .use(initReactI18next)
  .init({
    fallbackLng: 'kr',
    debug: true,
    interpolation: {
      escapeValue: false, // 리액트에서는 이미 방어하고 있으므로 escapse 하지 않음
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // 언어 파일 경로
    },
  });

export default i18n;
