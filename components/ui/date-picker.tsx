'use client'

import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  selected?: Date | null
  onChange: (date: Date | null) => void
  placeholder?: string
  minDate?: Date
  maxDate?: Date
  className?: string
  label?: string
}

export const DatePickerInput = ({
  selected,
  onChange,
  placeholder = 'Select date',
  minDate,
  maxDate,
  className,
  label,
}: DatePickerProps) => {
  return (
    <div className={cn('relative w-full sm:w-auto', className)}>
      {label && (
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <DatePicker
          selected={selected}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText={placeholder}
          dateFormat="MMM dd, yyyy"
          className={cn(
            'w-full sm:w-[200px] pl-10 pr-4 py-2.5',
            'bg-white dark:bg-gray-800',
            'border border-gray-300 dark:border-gray-600',
            'rounded-lg',
            'text-sm font-medium',
            'text-gray-900 dark:text-white',
            'hover:border-emerald-500 dark:hover:border-emerald-400',
            'hover:shadow-md',
            'focus:border-emerald-500 dark:focus:border-emerald-400',
            'focus:ring-2 focus:ring-emerald-500/30 dark:focus:ring-emerald-400/30',
            'focus:outline-none',
            'transition-all duration-200 ease-in-out',
            'shadow-sm',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'cursor-pointer'
          )}
          calendarClassName="!font-sans react-datepicker-responsive react-datepicker-solid-bg"
          wrapperClassName="w-full"
          popperClassName="react-datepicker-popper-responsive"
          popperPlacement="bottom-start"
        />
      </div>
    </div>
  )
}
