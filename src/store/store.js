import { writable } from "svelte/store";

const storedSelectedEmails = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem("selectedEmails")) || [] : [];
export const selectedEmails = writable(storedSelectedEmails);

if (typeof localStorage !== 'undefined') {
    selectedEmails.subscribe(value => {
        localStorage.setItem("selectedEmails", JSON.stringify(value));
    });
}


const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light';
export const theme = writable(storedTheme);

if (typeof localStorage !== 'undefined') {
  theme.subscribe(value => {
    localStorage.setItem('theme', value);
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
}


