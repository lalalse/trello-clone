"use client"

import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"

interface FormSubmitProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?: ButtonProps["variant"]
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant
}: FormSubmitProps) => {
  const { pending } = useFormStatus()
  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size="sm"
      className={cn(className)}>
      {children}
    </Button>
  )
}