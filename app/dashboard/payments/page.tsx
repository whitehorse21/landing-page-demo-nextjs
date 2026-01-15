'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { SkeletonTableRow, SkeletonCard } from '@/components/dashboard/SkeletonLoader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const Payments = () => {
  const { t } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Pending'>('All')
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 10

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const transactions = [
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

  // Filter transactions by status
  const filteredTransactions = statusFilter === 'All' 
    ? transactions 
    : transactions.filter(t => t.status === statusFilter)

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [statusFilter])

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
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.payments.summary.totalSpent')}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            ${totalSpent.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.payments.summary.pendingPayments')}</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
            ${transactions
              .filter(t => t.status === 'Pending')
              .reduce((sum, t) => {
                const amountStr = t.amount.replace(/[^0-9.]/g, '')
                return sum + (parseFloat(amountStr) || 0)
              }, 0)
              .toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.payments.summary.totalTransactions')}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {transactions.length}
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('dashboard.payments.transactionHistory')}</h2>
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">{t('dashboard.payments.filter.status')}:</span>
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {(['All', 'Completed', 'Pending'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status)
                    setCurrentPage(1)
                  }}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
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
                <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {t(transaction.descriptionKey)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {transaction.method}
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
    </div>
  )
}

export default Payments
