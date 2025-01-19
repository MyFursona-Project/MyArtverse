import type { PropsWithChildren } from "react"

interface FormProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}

export function Form(props: PropsWithChildren<FormProps>) {
  return (
    <form
      data-mav-form-wrapper=""
      onSubmit={props.onSubmit}
      className="flex flex-col gap-y-2.5"
    >
      {props.children}
    </form>
  )
}
