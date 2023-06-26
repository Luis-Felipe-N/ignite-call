import { Button } from '@/components/Button'
import { MultiStep } from '@/components/MultiStep'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'

import stylesRegister from '../styles.module.scss'
import styles from './styles.module.scss'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSigned = session.status === 'authenticated'

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

          {!hasAuthError && isSigned ? (
            <Button
              size="sm"
              onClick={() => signIn('google')}
              disabled={!hasAuthError && isSigned}
            >
              Conectado <Check />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => signIn('google')}
              disabled={!hasAuthError && isSigned}
            >
              Conectar <ArrowRight />
            </Button>
          )}
        </div>
        {hasAuthError && (
          <p className={styles.connectcalendar__msgerror}>
            Falha ao conectar-se ao Google. Por favor, verifique se você
            concedeu permissão ao Google Calendar.
          </p>
        )}
        <Button disabled={hasAuthError || !isSigned}>
          Proximo passo <ArrowRight />
        </Button>
      </div>
    </main>
  )
}
