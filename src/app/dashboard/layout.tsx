import { AuthProvider } from '@/components/auth/AuthProvider'
import AdminLayout from '@/components/admin/AdminLayout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AdminLayout>
        {children}
      </AdminLayout>
    </AuthProvider>
  )
}
