import Link from 'next/link'

import s from './Header.module.scss'
import { ThemeSwitch } from './ThemeSwitch'

export function Header() {
  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <Link href='/'>
          <a className={s.linkToHome}>
            <div className={s.logoWrapper}>
              <svg className={s.logo} xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 576 512'>
                {/* Font Awesome Free 5.15.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) */}
                <path d='M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z' />
              </svg>
            </div>
            <span>Home</span>
          </a>
        </Link>
        <ThemeSwitch />
      </div>
    </header>
  )
}
