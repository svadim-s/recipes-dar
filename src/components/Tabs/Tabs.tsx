import cls from './Tabs.module.scss'

interface TabsProps {
  name: string
  items: { value: string, label: string, disabled: boolean }[]
  value: string | null
  onChange: (value: string) => void
}

export const Tabs = ({ name, items, value, onChange }: TabsProps) => {  
  return (
    <div className={cls.Tabs}>
      {items.map((item) => (
        <div 
          className={
            `${cls.radio}
            ${value === item.value ? cls.checked : ''}
            ${item.disabled ? cls.disabled : ''}`
          }
          key={item.value}
          onClick={!item.disabled ? () => onChange(item.value) : undefined}
        >
          <input
            id={item.value}
            value={item.value}
            name={name}
            type="radio"
            className={cls.radioInput}
            checked={value === item.value}
            disabled={item.disabled}
            onChange={e => e.stopPropagation()}
          />
          <label htmlFor={item.value} className={cls.label}>{item.label}</label>
        </div>
      ))}
    </div>
  )
}