"use client"

import * as LucideIcons from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

interface EmptyStateProps {
  icon: keyof typeof LucideIcons
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  const Icon = LucideIcons[icon] as LucideIcons.LucideIcon
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-dashed border-2 border-primary/30 glass-card bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-4 mb-4 backdrop-blur-sm"
          >
            <Icon className="h-8 w-8 text-primary" />
          </motion.div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
          {action && (
            <Link href={action.href}>
              <Button>{action.label}</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

