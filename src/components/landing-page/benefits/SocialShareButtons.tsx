"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Mail, MessageCircle, Link2, Check } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { CalculatorResult } from "@/types/calculator"

interface SocialShareButtonsProps {
  shareText: string
  shareUrl: string
  result: CalculatorResult
}

export default function SocialShareButtons({ shareText, shareUrl }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText)
    const encodedUrl = encodeURIComponent(shareUrl)

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      email: `mailto:?subject=Mi ahorro con CalendUp&body=${encodedText}%0A%0A${encodedUrl}`,
    }

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400")
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Error copying to clipboard:", err)
    }
  }

  const shareButtons = [
    {
      name: "Twitter",
      icon: Twitter,
      color: "hover:bg-blue-400 hover:text-white",
      onClick: () => handleShare("twitter"),
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:bg-blue-600 hover:text-white",
      onClick: () => handleShare("facebook"),
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "hover:bg-blue-700 hover:text-white",
      onClick: () => handleShare("linkedin"),
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "hover:bg-green-500 hover:text-white",
      onClick: () => handleShare("whatsapp"),
    },
    {
      name: "Email",
      icon: Mail,
      color: "hover:bg-gray-600 hover:text-white",
      onClick: () => handleShare("email"),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="font-semibold text-gray-900 mb-2">Compartí tu resultado</h4>
        <p className="text-sm text-gray-600">Mostrá a tus colegas cuánto tiempo podrían ahorrar</p>
      </div>

      {/* Botones de redes sociales */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {shareButtons.map((button, index) => {
          const Icon = button.icon
          return (
            <motion.div
              key={button.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={button.onClick}
                className={`w-full flex flex-col items-center gap-1 p-3 h-auto transition-all ${button.color}`}
                title={`Compartir en ${button.name}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{button.name}</span>
              </Button>
            </motion.div>
          )
        })}
      </div>

      {/* Botón copiar enlace */}
      <Button
        variant="outline"
        onClick={handleCopyLink}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed hover:border-solid transition-all bg-transparent"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">¡Copiado!</span>
          </>
        ) : (
          <>
            <Link2 className="w-4 h-4" />
            <span>Copiar enlace</span>
          </>
        )}
      </Button>

      {/* Estadística de compartidos */}
      <div className="text-center text-xs text-gray-500 pt-2 border-t">
        <p>🎉 Muchos de profesionales ya descubrieron su ahorro y compartieron CalendUp</p>
      </div>
    </div>
  )
}
