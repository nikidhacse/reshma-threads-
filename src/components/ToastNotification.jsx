import React from 'react'
import { useStore } from '../context/StoreContext'
import { CheckCircle2, Info, AlertCircle } from 'lucide-react'

export const ToastNotification = () => {
  const { toastMessage } = useStore()

  if (!toastMessage) return null

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-gold" />,
    info: <Info className="w-5 h-5 text-brown" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="glass-panel-dark text-white px-5 py-4 rounded-xl shadow-gold-glow flex items-center gap-3 border border-gold/30">
        {icons[toastMessage.type] || icons.success}
        <span className="text-sm font-medium tracking-wide">{toastMessage.msg}</span>
      </div>
    </div>
  )
}
