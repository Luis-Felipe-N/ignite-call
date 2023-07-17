import React from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'

import styles from './styles.module.scss'

interface CheckBoxProps extends Checkbox.CheckboxProps {}

export function CheckBox({ ...props }: CheckBoxProps) {
  return (
    <Checkbox.Root className={styles.checkBox} {...props}>
      <Checkbox.Indicator>
        <Check width={16} weight="bold" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}
