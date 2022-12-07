import { makeAutoObservable } from 'mobx'

export class App {
  darkTheme = false
  deletedPostTitle = ''

  constructor() {
    makeAutoObservable(this)
  }

  switchTheme(isThemeDark: boolean) {
    this.darkTheme = isThemeDark
  }

  setDeletedPostTitle(title: string) {
    this.deletedPostTitle = title
  }
}

export const app = new App()
