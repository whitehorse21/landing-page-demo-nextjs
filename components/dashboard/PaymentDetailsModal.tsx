'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Transaction {
  id: number
  type: 'Payment' | 'Refund'
  descriptionKey: string
  amount: string
  date: string
  status: 'Completed' | 'Pending'
  method: string
}

interface PaymentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
}

const PaymentDetailsModal = ({ isOpen, onClose, transaction }: PaymentDetailsModalProps) => {
  const { t } = useLanguage()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!transaction) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const transactionId = `TXN-${transaction.date.replace(/-/g, '')}-${String(transaction.id).padStart(3, '0')}`

  const getMethodKey = (method: string): string => {
    const methodMap: Record<string, string> = {
      'Credit Card': 'dashboard.payments.methods.creditCard',
      'Debit Card': 'dashboard.payments.methods.debitCard',
      'PayPal': 'dashboard.payments.methods.paypal',
    }
    return methodMap[method] || method
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      // Only close when explicitly set to false (via close button), not on outside click
      if (!open) {
        onClose()
      }
    }}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('dashboard.payments.details.title')}
              </DialogTitle>
              <Badge
                variant={transaction.status === 'Completed' ? 'default' : 'secondary'}
                className={
                  transaction.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                }
              >
                {transaction.status === 'Completed'
                  ? t('dashboard.payments.status.completed')
                  : t('dashboard.payments.status.pending')}
              </Badge>
            </div>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {t('dashboard.payments.details.transactionId')}: {transactionId}
            </DialogDescription>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {t('dashboard.payments.details.description')}
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {t(transaction.descriptionKey)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {t('dashboard.payments.details.type')}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {transaction.type === 'Payment'
                    ? t('dashboard.payments.type.payment')
                    : t('dashboard.payments.type.refund')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {t('dashboard.payments.details.method')}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t(getMethodKey(transaction.method))}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {t('dashboard.payments.details.date')}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatDate(transaction.date)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {formatTime(transaction.date)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {t('dashboard.payments.details.amount')}
                </p>
                <p
                  className={`text-2xl font-bold ${
                    transaction.type === 'Refund'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {transaction.amount}
                </p>
              </div>
            </div>
          </div>

          {transaction.status === 'Completed' && (
            <div className="flex gap-4">
              <Button className="flex-1">
                {t('dashboard.payments.details.actions.downloadReceipt')}
              </Button>
              {transaction.type === 'Payment' && (
                <Button variant="outline" className="flex-1">
                  {t('dashboard.payments.details.actions.requestRefund')}
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentDetailsModal
