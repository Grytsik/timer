import { makeAutoObservable } from "mobx";

//Стор для изменения темы
class switchThemeClass {
	theme = localStorage.getItem('theme') || 'light';

	constructor() {
		makeAutoObservable(this);
	}

	toggleTheme() {
		this.theme = this.theme === 'light' ? 'dark' : 'light';
		localStorage.setItem('theme', this.theme);
	}
}

const switchTheme = new switchThemeClass();

export default switchTheme;