'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'

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

type FormValues = {
  name: string
  email: string
  phone?: string
  company?: string
  budget?: string
  message: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const fieldClass =
  'border-0 border-b border-white/20 bg-transparent px-0 pb-3 pt-1 text-body text-white rounded-none h-auto md:text-body placeholder:text-white/30 focus-visible:border-brand-yellow focus-visible:ring-0 transition-colors'

const labelClass = 'text-white/40 text-xs tracking-widest uppercase font-medium'

export default function ContactForm() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const schema = z.object({
    name: z.string().trim().min(1, t('form.errors.name')),
    email: z
      .string()
      .trim()
      .min(1, t('form.errors.emailRequired'))
      .email(t('form.errors.emailInvalid')),
    phone: z.string().trim().optional(),
    company: z.string().trim().optional(),
    budget: z.string().trim().optional(),
    message: z.string().trim().min(10, t('form.errors.message')),
  })

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
        throw new Error(body.error || t('form.errors.generic'))
      }
      setStatus('success')
      reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : t('form.errors.genericShort'))
    }
  }

  if (status === 'success') {
    return (
      <div
        className="flex min-h-105 flex-col items-start justify-center gap-4 rounded-panel bg-primary p-8 ring-1 ring-white/10 md:p-10"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-yellow text-lg text-black">
          ✓
        </span>
        <h3 className="text-h4 font-medium tracking-tight text-white">
          {t('form.successTitle')}
        </h3>
        <p className="text-body leading-relaxed text-white/50">{t('form.successBody')}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 text-button font-medium text-white/40 underline underline-offset-4 hover:text-white transition-colors"
        >
          {t('form.successAgain')}
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-panel bg-primary p-8 ring-1 ring-white/10 md:p-10"
      noValidate
    >
      <FieldGroup className="gap-8">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name" className={labelClass}>{t('form.name')}</FieldLabel>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={t('form.namePlaceholder')}
            aria-invalid={!!errors.name}
            className={fieldClass}
            {...register('name')}
          />
          <FieldError errors={errors.name ? [errors.name] : undefined} className="text-fiery-red" />
        </Field>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email" className={labelClass}>{t('form.email')}</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={t('form.emailPlaceholder')}
              aria-invalid={!!errors.email}
              className={fieldClass}
              {...register('email')}
            />
            <FieldError errors={errors.email ? [errors.email] : undefined} className="text-fiery-red" />
          </Field>

          <Field>
            <FieldLabel htmlFor="phone" className={labelClass}>{t('form.phone')}</FieldLabel>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder={t('form.phonePlaceholder')}
              className={fieldClass}
              {...register('phone')}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="company" className={labelClass}>{t('form.company')}</FieldLabel>
            <Input
              id="company"
              type="text"
              autoComplete="organization"
              placeholder={t('form.companyPlaceholder')}
              className={fieldClass}
              {...register('company')}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="budget" className={labelClass}>{t('form.budget')}</FieldLabel>
            <select
              id="budget"
              className={cn(fieldClass, 'cursor-pointer outline-none')}
              {...register('budget')}
            >
              <option value="" className="bg-black text-white">{t('form.budgetPlaceholder')}</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b} className="bg-black text-white">
                  {b}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="message" className={labelClass}>{t('form.message')}</FieldLabel>
          <Textarea
            id="message"
            rows={4}
            placeholder={t('form.messagePlaceholder')}
            aria-invalid={!!errors.message}
            className={cn(fieldClass, 'min-h-0 resize-none')}
            {...register('message')}
          />
          <FieldError errors={errors.message ? [errors.message] : undefined} className="text-fiery-red" />
        </Field>

        <Separator className="bg-white/10" />

        {status === 'error' && (
          <p role="alert" className="text-sub text-fiery-red">
            {error}
          </p>
        )}

        <SlideButton
          type="submit"
          disabled={status === 'loading'}
          text={status === 'loading' ? t('form.sending') : t('form.submit')}
          variant="white"
          className="w-fit"
        />
      </FieldGroup>
    </form>
  )
}
