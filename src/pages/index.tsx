import Image from 'next/image'
import styles from './home/styles.module.scss'
import previewImage from '../assets/app-preview.png'
import { ClaimUsernameForm } from '@/components/Home/ClaimUsernameForm'

export default function Home() {
  return (
    <main className={styles.home}>
      <div className={styles.home__hero}>
        <h1>Agendamento descomplicado</h1>
        <p>
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </p>
        <ClaimUsernameForm />
      </div>
      <div className={styles.home__preview}>
        <Image
          height={442}
          src={previewImage}
          quality={100}
          priority
          alt={
            'Calendário do mes de setembro com os dias 19, 20, 23, 26, 27 e 30 marcados. A Imagem está simulando o funcionamento da aplicação'
          }
        />
      </div>
    </main>
  )
}
