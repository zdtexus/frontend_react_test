import { Input as NextInput } from "@nextui-org/react"
import type React from "react"
import { useController, type Control } from "react-hook-form"

type Props = {
  name: string
  label: string
  placeholder?: string
  type?: string
  control: Control<any>
  required?: string
  endContext?: JSX.Element
}

export const Input: React.FC<Props> = ({
  name,
  label,
  placeholder,
  type,
  control,
  required = "",
  endContext,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  })

  return (
    <div>
      <NextInput
        id={name}
        label={label}
        type={type}
        placeholder={placeholder}
        value={field.value}
        name={field.value}
        isInvalid={invalid}
        onChange={field.onChange}
        onBlur={field.onBlur}
        errorMessage={`${errors[name]?.message ?? ""}`}
      />
    </div>
  )
}
