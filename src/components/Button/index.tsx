import { Slot } from '@radix-ui/react-slot'
import { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

const SIZE_BUTTON = {
  sm: styles.button_sm,
  md: styles.button_md,
}

type SizeButton = keyof typeof SIZE_BUTTON

interface IButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: boolean
  size?: SizeButton
}

export function Button({ className, size = 'md', ...props }: IButtonIconProps) {
  const Component = props.as === true ? Slot : 'button'

  return (
    <Component
      className={`${styles.btn} ${SIZE_BUTTON[size]}  ${className}`}
      {...props}
    />
  )
}
