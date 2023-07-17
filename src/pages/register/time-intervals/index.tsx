import { Button } from '@/components/Button'
import { CheckBox } from '@/components/Form/CheckBox'
import { Input } from '@/components/Form/Input'
import { MultiStep } from '@/components/MultiStep'
import { api } from '@/lib/axios'
import { convertTimeStringInMinutes } from '@/utils/convert-time-string-in-minutes'
import { getWeekDays } from '@/utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import stylesRegister from '../styles.module.scss'
import styles from './styles.module.scss'

const timeIntervalsFormShema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Selecione pelo menos um dia da semana',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringInMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringInMinutes(interval.endTime),
        }
      })
    })
    .refine((intervals) =>
      intervals.every(
        (interval) =>
          interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
      ),
    ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormShema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormShema>

export default function TimeIntervals() {
  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormShema),
    defaultValues: {
      intervals: [
        {
          weekDay: 0,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 1,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 2,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 3,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 4,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 5,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 6,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },
      ],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const intervals = watch('intervals')

  const weekDays = getWeekDays()

  async function handleSetTimeInterval(data: any) {
    const { intervals } = data as TimeIntervalsFormOutput

    const responseData = await api.post('/users/time-intervals', intervals)

    console.log(responseData.data)
  }

  return (
    <main className={stylesRegister.register}>
      <header className={stylesRegister.register__header}>
        <strong>Conecte sua agenda!</strong>
        <p>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </p>
        <MultiStep size={4} currentStep={3} />
      </header>
      <form
        className={styles.timeInterval}
        onSubmit={handleSubmit(handleSetTimeInterval)}
      >
        <div className={styles.timeInterval__container}>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.timeInterval__item}>
              <label>
                <Controller
                  control={control}
                  name={`intervals.${index}.enabled`}
                  render={({ field }) => {
                    return (
                      <CheckBox
                        onCheckedChange={(checked) => {
                          field.onChange(checked === true)
                        }}
                        checked={field.value}
                      />
                    )
                  }}
                />
                {/* <CheckBox /> */}
                {weekDays[field.weekDay]}
              </label>

              <div className={styles.timeInterval__item_inputs}>
                <Input sizeInput="sm">
                  <input
                    placeholder="19:00"
                    type="time"
                    step={60}
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.startTime`)}
                  />
                </Input>

                <Input sizeInput="sm">
                  <input
                    type="time"
                    placeholder="19:00"
                    step={60}
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </Input>
              </div>
            </div>
          ))}
        </div>

        {errors.intervals && (
          <p className={styles.timeInterval__msgerror}>
            {errors.intervals.message}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Proximo passo <ArrowRight />
        </Button>
      </form>
    </main>
  )
}
