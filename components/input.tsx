import clsx from 'clsx'
import React from 'react'

import s from './input.module.scss'

interface Props {
  label?: string
}

export interface InputProps extends Props, React.InputHTMLAttributes<HTMLInputElement> {
  hasButton?: boolean
  component?: JSX.Element
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className={clsx(s.formField, props.className)}>
      {props.label && (
        <label className={s.label} htmlFor={props.name}>
          {props.label}
        </label>
      )}
      <div className={s.inputGroup}>
        <input
          ref={ref}
          className={s.input}
          name={props.name}
          id={props.name}
          type={props.type || 'text'}
          maxLength={props.maxLength}
          min={props.min}
          max={props.max}
          inputMode={props.inputMode}
          pattern={props.pattern}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          value={props.value}
          defaultValue={props.defaultValue}
          aria-label={props['aria-label']}
          required={props.required}
          readOnly={props.readOnly}
          disabled={props.disabled}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
        {props.children}
      </div>
    </div>
  )
})

Input.displayName = 'Input'
