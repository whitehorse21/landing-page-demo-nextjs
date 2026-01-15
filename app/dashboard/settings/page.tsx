'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { SkeletonCard } from '@/components/dashboard/SkeletonLoader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Settings = () => {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile')
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    bio: '',
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-9 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <Card>
          <CardContent className="p-1 inline-flex">
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>
        <SkeletonCard />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard.settings.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('dashboard.settings.subtitle')}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'profile' | 'security' | 'preferences')}>
        <TabsList>
          <TabsTrigger value="profile">{t('dashboard.settings.tabs.profile')}</TabsTrigger>
          <TabsTrigger value="security">{t('dashboard.settings.tabs.security')}</TabsTrigger>
          <TabsTrigger value="preferences">{t('dashboard.settings.tabs.preferences')}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('dashboard.settings.profile.title')}
                </h2>
                <div className="flex items-center gap-6 mb-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'} alt={user?.firstName} />
                    <AvatarFallback>{user?.firstName?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline">
                      {t('dashboard.settings.profile.changePhoto')}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>{t('dashboard.settings.profile.firstName')}</Label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>{t('dashboard.settings.profile.lastName')}</Label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>{t('dashboard.settings.profile.email')}</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>{t('dashboard.settings.profile.phone')}</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <Label>{t('dashboard.settings.profile.bio')}</Label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <Button>
                {t('dashboard.settings.profile.saveChanges')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('dashboard.settings.security.title')}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label>{t('dashboard.settings.security.currentPassword')}</Label>
                  <Input type="password" className="mt-2" />
                </div>
                <div>
                  <Label>{t('dashboard.settings.security.newPassword')}</Label>
                  <Input type="password" className="mt-2" />
                </div>
                <div>
                  <Label>{t('dashboard.settings.security.confirmNewPassword')}</Label>
                  <Input type="password" className="mt-2" />
                </div>
                <Button>
                  {t('dashboard.settings.security.updatePassword')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('dashboard.settings.preferences.title')}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {t('dashboard.settings.preferences.emailNotifications')}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('dashboard.settings.preferences.emailNotificationsDescription')}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {t('dashboard.settings.preferences.smsNotifications')}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('dashboard.settings.preferences.smsNotificationsDescription')}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Settings
