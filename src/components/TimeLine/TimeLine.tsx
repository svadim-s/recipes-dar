import cls from "./TimeLine.module.scss"

interface TimeLineProps {
  steps?: string[]
}

export const TimeLine = (props: TimeLineProps) => {
  const { steps } = props

  return (
    <div className={cls.TimeLine}>
      <div className={cls.list}>
        {steps?.map((step, id) => (
          <li className={cls.step} key={id}>
            <div className={cls.circle} />
            <p className={cls.text}>{step}</p>
          </li>
        ))}
      </div>
    </div>
  )
}