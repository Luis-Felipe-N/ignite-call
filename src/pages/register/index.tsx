import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { MultiStep } from '@/components/MultiStep'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import styles from './styles.module.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Usuário precisa conter no mínimo 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Usuário deve conter apenas letras e hífen',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'Nome precisa conter no mínimo 3 letras' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post(`/users`, {
        username: data.username,
        name: data.name,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (router.query.username) {
      const username = router.query.username
      setValue('username', String(username))
    }
  }, [router.query?.username, setValue])

  return (
    <main className={styles.register}>
      <header className={styles.register__header}>
        <strong>Bem-vindo ao Ignite Call!</strong>
        <p>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </p>
        <MultiStep size={4} />
      </header>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className={styles.register__box}
      >
        <label>
          Nome do usuário
          <Input prefix="cal.com/">
            <input
              placeholder="seu-usuario"
              {...register('username')}
              type="text"
            />
          </Input>
          {!!errors.username && <p>{errors.username.message}</p>}
        </label>

        <label>
          Nome completo
          <Input>
            <input
              type="text"
              placeholder="seu-nomecompleto"
              {...register('name')}
            />
          </Input>
          {!!errors.name && <p>{errors.name.message}</p>}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo <ArrowRight />
        </Button>
      </form>
    </main>
  )
}
