import { Slot } from '@radix-ui/react-slot'
import { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface IButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: boolean
}

export function Button({ className, ...props }: IButtonIconProps) {
  const Component = props.as === true ? Slot : 'button'

  return <Component className={`${styles.btn} ${className}`} {...props} />
}
