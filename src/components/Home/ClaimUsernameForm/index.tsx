import { Button } from '@/components/Button'
import { ArrowRight } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import styles from './styles.module.scss'
import { Input } from '@/components/Input'
import { useRouter } from 'next/router'

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
  const claimUsernameForm = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(ClaimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data
    await router.push(`/register?username=${username}`)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = claimUsernameForm

  return (
    <>
      <form
        onSubmit={handleSubmit(handleClaimUsername)}
        className={styles.claim}
      >
        <FormProvider {...claimUsernameForm}>
          <Input sizeInput="sm" prefix="ignite.com/">
            <input
              placeholder="seu-username"
              type="text"
              {...register('username')}
            />
          </Input>
        </FormProvider>

        <Button size="sm">
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
