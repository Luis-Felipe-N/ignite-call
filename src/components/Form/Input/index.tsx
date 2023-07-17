import { ReactNode } from 'react'
import styles from './styles.module.scss'

const SIZE_INPUT = {
  sm: styles.input_sm,
  md: styles.input_md,
}

type SizeInput = keyof typeof SIZE_INPUT

interface IInputProps {
  prefix?: string
  label?: string
  sizeInput?: SizeInput
  children: ReactNode
}

export function Input({
  prefix,
  sizeInput = 'md',
  label,
  children,
}: IInputProps) {
  return (
    <div className={`${styles.input} ${SIZE_INPUT[sizeInput]}`}>
      <>
        {prefix && <span className={styles.input__prefix}>{prefix}</span>}
        {children}
      </>
    </div>
  )
}
