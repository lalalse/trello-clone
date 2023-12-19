"use client"

import { createBoard } from "@/actions/create-board"
import { Button } from "@/components/ui/button"
import { useFormState } from "react-dom"
import { FormInput } from "@/components/form/form-input"
import { useAction } from "@/lib/hooks/use-action"
import { revalidatePath } from "next/cache"
import { FormSubmit } from "@/components/form/form-submit"

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS")
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    execute({ title })
  }
  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput
          id="title"
          label="Title"
          errors={fieldErrors} />
      </div>
      <FormSubmit>
        Save
      </FormSubmit>
    </form>
  )
}