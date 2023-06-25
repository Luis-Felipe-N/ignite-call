import styles from './styles.module.scss'

interface IMultiStep {
  currentStep?: number
  size: number
}

export function MultiStep({ currentStep = 1, size }: IMultiStep) {
  function createRangeArrayByNumber(number: number) {
    return Array.from(Array(number).keys())
  }

  return (
    <div className={styles.multiStep}>
      <span>
        Passo {currentStep} de {size}
      </span>
      <ul>
        {createRangeArrayByNumber(size).map((item) => {
          if (item + 1 <= currentStep) {
            return <li key={item} className={styles.active}></li>
          } else {
            return <li key={item}></li>
          }
        })}
      </ul>
    </div>
  )
}
