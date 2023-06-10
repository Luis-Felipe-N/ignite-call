import { Button } from '@/components/Button'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import styles from './styles.module.scss'

const ClaimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Usuário precisa conter no mínimo 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Usuário deve conter apenas letras e hífen',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(ClaimUsernameFormSchema),
  })

  function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleClaimUsername)}
        className={styles.claim}
      >
        <div className={styles.claim__inputbox}>
          <span className={styles.claim__inputbox_prefix}>ignite.com/</span>
          <input
            className={styles.claim__inputbox_input}
            placeholder="seu-username"
            type="text"
            {...register('username')}
          />
        </div>
        <Button>
          Reservar <ArrowRight size={18} />
        </Button>
      </form>
      <div className={styles.claimerros}>
        <p>
          {errors.username ? (
            <span>{errors.username.message}</span>
          ) : (
            'Digite o usuário desejado!'
          )}
        </p>
      </div>
    </>
  )
}
