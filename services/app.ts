import { makeAutoObservable } from 'mobx'

export class App {
  darkTheme = false
  deletedPostTitle = ''

  constructor() {
    makeAutoObservable(this)
  }
}

export const app = new App()
