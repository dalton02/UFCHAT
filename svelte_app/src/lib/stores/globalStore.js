import {writable} from 'svelte/store';

const theme = writable("light");
const nick = writable("");

export {theme,nick};