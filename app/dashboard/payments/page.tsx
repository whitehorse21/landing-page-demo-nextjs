'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { SkeletonTableRow, SkeletonCard } from '@/components/dashboard/SkeletonLoader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DatePickerInput } from '@/components/ui/date-picker'
import PaymentDetailsModal from '@/components/dashboard/PaymentDetailsModal'

interface Transaction {
  id: number
  type: 'Payment' | 'Refund'
  descriptionKey: string
  amount: string
  date: string
  status: 'Completed' | 'Pending'
  method: 'Credit Card' | 'Debit Card' | 'PayPal'
}

const Payments = () => {
  const { t } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Pending'>('All')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const itemsPerPage = 10

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const transactions: Transaction[] = [
    { id: 1, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.parisTrip', amount: '-$1,200', date: '2026-01-15', status: 'Completed', method: 'Credit Card' },
    { id: 2, type: 'Refund', descriptionKey: 'dashboard.payments.descriptions.cancelledLondonTrip', amount: '+$1,400', date: '2025-12-20', status: 'Completed', method: 'Credit Card' },
    { id: 3, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.tokyoTrip', amount: '-$2,100', date: '2026-01-20', status: 'Pending', method: 'PayPal' },
    { id: 4, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.barcelonaTrip', amount: '-$950', date: '2025-11-10', status: 'Completed', method: 'Credit Card' },
    { id: 5, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.romeTrip', amount: '-$1,350', date: '2025-10-25', status: 'Completed', method: 'Debit Card' },
    { id: 6, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.dubaiTrip', amount: '-$2,500', date: '2025-10-15', status: 'Completed', method: 'Credit Card' },
    { id: 7, type: 'Refund', descriptionKey: 'dashboard.payments.descriptions.cancelledRomeTrip', amount: '+$1,350', date: '2025-10-28', status: 'Completed', method: 'Credit Card' },
    { id: 8, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.newYorkTrip', amount: '-$1,800', date: '2025-09-20', status: 'Completed', method: 'PayPal' },
    { id: 9, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.sydneyTrip', amount: '-$2,300', date: '2025-09-10', status: 'Completed', method: 'Credit Card' },
    { id: 10, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.baliTrip', amount: '-$1,100', date: '2025-08-25', status: 'Completed', method: 'Debit Card' },
    { id: 11, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.santoriniTrip', amount: '-$1,650', date: '2025-08-15', status: 'Completed', method: 'Credit Card' },
    { id: 12, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.amsterdamTrip', amount: '-$1,400', date: '2025-07-20', status: 'Completed', method: 'Debit Card' },
    { id: 13, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.pragueTrip', amount: '-$1,200', date: '2025-07-10', status: 'Completed', method: 'Credit Card' },
    { id: 14, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.viennaTrip', amount: '-$1,550', date: '2025-06-25', status: 'Completed', method: 'PayPal' },
    { id: 15, type: 'Refund', descriptionKey: 'dashboard.payments.descriptions.cancelledAmsterdamTrip', amount: '+$1,400', date: '2025-07-22', status: 'Completed', method: 'Credit Card' },
    { id: 16, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.istanbulTrip', amount: '-$1,300', date: '2025-06-15', status: 'Completed', method: 'Credit Card' },
    { id: 17, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.lisbonTrip', amount: '-$1,100', date: '2025-05-30', status: 'Completed', method: 'Debit Card' },
    { id: 18, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.athensTrip', amount: '-$1,250', date: '2025-05-20', status: 'Completed', method: 'Credit Card' },
    { id: 19, type: 'Refund', descriptionKey: 'dashboard.payments.descriptions.cancelledPragueTrip', amount: '+$1,200', date: '2025-07-12', status: 'Completed', method: 'Credit Card' },
    { id: 20, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.londonTrip', amount: '-$1,400', date: '2025-05-10', status: 'Completed', method: 'PayPal' },
    { id: 21, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.parisTrip', amount: '-$1,200', date: '2025-04-25', status: 'Completed', method: 'Credit Card' },
    { id: 22, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.barcelonaTrip', amount: '-$950', date: '2025-04-15', status: 'Completed', method: 'Debit Card' },
    { id: 23, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.romeTrip', amount: '-$1,350', date: '2025-03-30', status: 'Completed', method: 'Credit Card' },
    { id: 24, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.santoriniTrip', amount: '-$1,650', date: '2025-03-20', status: 'Completed', method: 'PayPal' },
    { id: 25, type: 'Payment', descriptionKey: 'dashboard.payments.descriptions.baliTrip', amount: '-$1,100', date: '2025-03-10', status: 'Completed', method: 'Credit Card' },
  ]

  const getMethodKey = (method: string): string => {
    const methodMap: Record<string, string> = {
      'Credit Card': 'dashboard.payments.methods.creditCard',
      'Debit Card': 'dashboard.payments.methods.debitCard',
      'PayPal': 'dashboard.payments.methods.paypal',
    }
    return methodMap[method] || method
  }

  // Filter transactions by status and date range
  const filteredTransactions = transactions.filter(t => {
    // Status filter
    const statusMatch = statusFilter === 'All' || t.status === statusFilter
    
    // Date range filter
    let dateMatch = true
    if (startDate || endDate) {
      const transactionDate = new Date(t.date)
      if (startDate) {
        const start = new Date(startDate)
        start.setHours(0, 0, 0, 0)
        if (transactionDate < start) dateMatch = false
      }
      if (endDate) {
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999)
        if (transactionDate > end) dateMatch = false
      }
    }
    
    return statusMatch && dateMatch
  })

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [statusFilter, startDate, endDate])

  // Pagination logic for filtered transactions
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex)

  const totalSpent = transactions
    .filter(t => t.type === 'Payment' && t.status === 'Completed')
    .reduce((sum, t) => {
      const amountStr = t.amount.replace(/[^0-9.]/g, '')
      const amount = parseFloat(amountStr) || 0
      return sum + amount
    }, 0)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-9 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Summary Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-10 w-full sm:w-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <th key={i} className="px-6 py-3">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[1, 2, 3, 4, 5].map((i) => (
                  <SkeletonTableRow key={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard.payments.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('dashboard.payments.subtitle')}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer transition-all hover:shadow-lg ${
            statusFilter === 'All' ? 'ring-2 ring-emerald-500' : ''
          }`}
          onClick={() => {
            setStatusFilter('All')
            setCurrentPage(1)
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xl text-gray-600 dark:text-gray-400">{t('dashboard.payments.filter.all')}</p>
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            {transactions.length}
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
            {transactions.filter(t => t.type === 'Payment').length} {t('dashboard.payments.type.payment_plural').toLowerCase()}, {transactions.filter(t => t.type === 'Refund').length} {t('dashboard.payments.type.refund_plural').toLowerCase()}
          </p>
        </div>
        <div 
          className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer transition-all hover:shadow-lg ${
            statusFilter === 'Completed' ? 'ring-2 ring-emerald-500' : ''
          }`}
          onClick={() => {
            setStatusFilter('Completed')
            setCurrentPage(1)
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xl text-gray-600 dark:text-gray-400">{t('dashboard.payments.status.completed')}</p>
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-5xl font-bold text-emerald-600 dark:text-emerald-400">
            {transactions.filter(t => t.status === 'Completed').length}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
            ${transactions
              .filter(t => t.status === 'Completed' && t.type === 'Payment')
              .reduce((sum, t) => {
                const amountStr = t.amount.replace(/[^0-9.]/g, '')
                return sum + (parseFloat(amountStr) || 0)
              }, 0)
              .toLocaleString()} {t('dashboard.payments.summary.spent')}
          </p>
        </div>
        <div 
          className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer transition-all hover:shadow-lg ${
            statusFilter === 'Pending' ? 'ring-2 ring-emerald-500' : ''
          }`}
          onClick={() => {
            setStatusFilter('Pending')
            setCurrentPage(1)
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xl text-gray-600 dark:text-gray-400">{t('dashboard.payments.status.pending')}</p>
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-5xl font-bold text-yellow-600 dark:text-yellow-400">
            {transactions.filter(t => t.status === 'Pending').length}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
            ${transactions
              .filter(t => t.status === 'Pending')
              .reduce((sum, t) => {
                const amountStr = t.amount.replace(/[^0-9.]/g, '')
                return sum + (parseFloat(amountStr) || 0)
              }, 0)
              .toLocaleString()} {t('dashboard.payments.summary.pending')}
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('dashboard.payments.transactionHistory')}</h2>
              {/* Status Filter */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{t('dashboard.payments.filter.status')}:</span>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 flex-wrap">
                  {(['All', 'Completed', 'Pending'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status)
                        setCurrentPage(1)
                      }}
                      className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                        statusFilter === status
                          ? 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {status === 'All' 
                        ? t('dashboard.payments.filter.all')
                        : t(`dashboard.payments.status.${status.toLowerCase()}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Date Range Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">{t('dashboard.payments.filter.dateRange')}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
                <DatePickerInput
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholder={t('dashboard.payments.filter.from')}
                />
                <DatePickerInput
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  placeholder={t('dashboard.payments.filter.to')}
                  minDate={startDate || undefined}
                />
                {(startDate || endDate) && (
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStartDate(null)
                        setEndDate(null)
                        setCurrentPage(1)
                      }}
                      className="whitespace-nowrap h-[42px] px-4 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {t('dashboard.payments.filter.clear')}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('dashboard.payments.table.date')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('dashboard.payments.table.description')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('dashboard.payments.table.method')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('dashboard.payments.table.amount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('dashboard.payments.table.status')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedTransactions.map((transaction) => (
                <tr 
                  key={transaction.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedTransaction(transaction)
                    setIsModalOpen(true)
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {t(transaction.descriptionKey)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {t(getMethodKey(transaction.method))}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                      transaction.type === 'Refund'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}
                    >
                      {transaction.status === 'Completed'
                        ? t('dashboard.payments.status.completed')
                        : t('dashboard.payments.status.pending')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t('dashboard.payments.pagination.showing')} {startIndex + 1} {t('dashboard.payments.pagination.to')} {Math.min(endIndex, filteredTransactions.length)} {t('dashboard.payments.pagination.of')} {filteredTransactions.length} {t('dashboard.payments.pagination.results')}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {t('dashboard.payments.pagination.previous')}
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {t('dashboard.payments.pagination.next')}
              </button>
            </div>
          </div>
        )}
      </div>

      <PaymentDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTransaction(null)
        }}
        transaction={selectedTransaction}
      />
    </div>
  )
}

export default Payments
