import clsx from 'clsx'
import React from 'react'

import s from './styles.module.scss'

export type Props = {
  extraStyles?: string
  label?: string
  name: string
  type?: 'text' | 'email' | 'number' | 'button' | 'submit' | 'password'
  maxLength?: number
  min?: number
  max?: number
  inputMode?: 'text' | 'none' | 'url' | 'tel' | 'email' | 'numeric' | 'decimal' | 'search'
  pattern?: string
  autoComplete?: string
  placeholder?: string
  readOnly?: boolean
  isDisabled?: boolean
  children?: any
  required?: boolean
  value?: string
  defaultValue?: string
  ariaLabel?: string
  onChange: React.ChangeEventHandler
  onFocus?: React.FocusEventHandler
  onBlur?: React.FocusEventHandler
}

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <div className={clsx(s.formField, props.extraStyles)}>
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
          aria-label={props.ariaLabel}
          required={props.required}
          readOnly={props.readOnly}
          disabled={props.isDisabled}
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
