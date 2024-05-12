import { useState } from "react"
import cls from "./DropDown.module.scss"
import ArrowIcon from "../../assets/ArrowDropDown.svg"

interface DropDownProps {
  items: string[]
  value: string | null
  onChange: (value: string) => void
}

export const DropDown = ({ items, value, onChange }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleTagSelect = (tag: string) => {
    onChange(tag);
    setIsOpen(false);
  };

  return (
    <div className={cls.DropDown}>
      <div className={cls.select} onClick={toggleDropDown}>
        <p className={cls.selectText}>{value}</p>
        <img src={ArrowIcon} alt="Arrow" />
      </div>
      {isOpen && (
        <ul className={`${cls.list} ${items.length > 8 ? cls.scrollable : ""}`}>
          {items.map((item) => (
            <li
              key={item} 
              className={`${cls.option} ${value === item ? cls.selected : ''}`}
              onClick={() => handleTagSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}