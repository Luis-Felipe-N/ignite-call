import { MultiStep } from '@/components/MultiStep'

import stylesRegister from '../styles.module.scss'
import styles from './styles.module.scss'

export default function TimeIntervals() {
  return (
    <main className={stylesRegister.register}>
      <header className={stylesRegister.register__header}>
        <strong>Conecte sua agenda!</strong>
        <p>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </p>
        <MultiStep size={4} currentStep={2} />
      </header>
    </main>
  )
}
