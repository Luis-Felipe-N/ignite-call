import { Button } from '@/components/Button'
import { MultiStep } from '@/components/MultiStep'
import { ArrowRight } from 'phosphor-react'

import stylesRegister from '../styles.module.scss'
import styles from './styles.module.scss'

export default function Register() {
  // async function handleRegister() {}

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

      <div className={styles.connectcalendar}>
        <div className={styles.connectcalendar__connect}>
          <strong>Google Agenda</strong>

          <Button>
            Conectar <ArrowRight />
          </Button>
        </div>
        <Button disabled>
          Proximo passo <ArrowRight />
        </Button>
      </div>
    </main>
  )
}
