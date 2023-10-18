import { makeAutoObservable } from 'mobx'

export class App {
  darkTheme: boolean | null = null
  deletedPostTitle = ''

  constructor() {
    makeAutoObservable(this)
  }

  switchTheme(isThemeDark: boolean) {
    this.darkTheme = isThemeDark
  }

  // Keep recently deleted post title for show it on home screen with an Alert message.
  setDeletedPostTitle(title: string) {
    this.deletedPostTitle = title
  }
}

export const app = new App()
