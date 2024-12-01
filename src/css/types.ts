import type { InjectionKey } from 'vue';
import type { SystemFonts } from './modules/fonts.module.css';
import type { SystemColors } from './modules/colors.module.css';

export const systemFontKey = Symbol() as InjectionKey<SystemFonts>;
export const systemColorKey = Symbol() as InjectionKey<SystemColors>;
