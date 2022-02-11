import { makeAutoObservable } from 'mobx'

export class App {
  darkTheme = false
  deletionAlert = ''

  constructor() {
    makeAutoObservable(this)
  }
}

export const app = new App()
