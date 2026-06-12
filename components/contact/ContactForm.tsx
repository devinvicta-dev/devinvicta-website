'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import SlideButton from '@/components/ui/SlideButton'
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const BUDGETS = [
  '$500 – $1,500',
  '$1,500 – $3,000',
  '$3,000 – $7,500',
  '$7,500 – $15,000',
  '$15,000+',
]

const schema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .email('Please enter a valid email address.'),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  budget: z.string().trim().optional(),
  message: z.string().trim().min(10, 'Please enter a message of at least 10 characters.'),
})

type FormValues = z.infer<typeof schema>

type Status = 'idle' | 'loading' | 'success' | 'error'

const fieldClass =
  'border-0 border-b border-black/15 bg-transparent px-0 pb-2.5 pt-1 text-body text-black rounded-none h-auto md:text-body placeholder:text-dark-gray/70 focus-visible:border-black focus-visible:ring-0 transition-colors'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      budget: '',
      message: '',
    },
  })

  async function onSubmit(values: FormValues) {
    if (status === 'loading') return
    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong. Please try again.')
      }
      setStatus('success')
      reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div
        data-anim
        className="flex min-h-[420px] flex-col items-start justify-center gap-3 rounded-panel bg-white p-8 ring-1 ring-black/5 sm:p-10"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-fiery-red text-xl text-white">
          ✓
        </span>
        <h3 className="text-h4 font-semibold tracking-[-0.02em] text-black">
          Message sent. Thank you!
        </h3>
        <p className="text-body leading-[1.7] text-dark-gray">
          We&apos;ve received your message and will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 text-button font-semibold text-black underline underline-offset-4 hover:opacity-60"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      data-anim
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-panel bg-white p-8 ring-1 ring-black/5 sm:p-10"
      noValidate
    >
      <FieldGroup className="gap-7">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your name"
            aria-invalid={!!errors.name}
            className={fieldClass}
            {...register('name')}
          />
          <FieldError errors={errors.name ? [errors.name] : undefined} />
        </Field>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Your email"
              aria-invalid={!!errors.email}
              className={fieldClass}
              {...register('email')}
            />
            <FieldError errors={errors.email ? [errors.email] : undefined} />
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Your phone"
              className={fieldClass}
              {...register('phone')}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="company">Company</FieldLabel>
            <Input
              id="company"
              type="text"
              autoComplete="organization"
              placeholder="Company name"
              className={fieldClass}
              {...register('company')}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="budget">Budget</FieldLabel>
            <select
              id="budget"
              className={cn(fieldClass, 'cursor-pointer outline-none')}
              {...register('budget')}
            >
              <option value="">Select your budget...</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            rows={4}
            placeholder="Enter your message..."
            aria-invalid={!!errors.message}
            className={cn(fieldClass, 'min-h-0 resize-none')}
            {...register('message')}
          />
          <FieldError errors={errors.message ? [errors.message] : undefined} />
        </Field>

        <Separator className="bg-black/10" />

        {status === 'error' && (
          <p role="alert" className="text-sub text-fiery-red">
            {error}
          </p>
        )}

        <SlideButton
          type="submit"
          disabled={status === 'loading'}
          text={status === 'loading' ? 'Sending...' : 'Submit'}
          className="w-fit"
        />
      </FieldGroup>
    </form>
  )
}
