import type { PMessages } from '../types'
import { defineLocale } from '../composables/define-locale'
import en from './en'

export default defineLocale<PMessages>({
  name: 'English (United Kingdom)',
  code: 'en-GB',
  messages: en.messages
})
