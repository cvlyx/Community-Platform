"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, Shield, CheckCircle, ArrowRight } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 relative z-10">
      {/* Hero Section */}
      <motion.section
        className="text-center py-16 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Find Trusted Local Services
          </h1>
        </motion.div>
        <motion.p
          variants={itemVariants}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Connect with skilled professionals in your community. From electricians to tutors, 
          find the help you need, when you need it.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/auth/signup">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/providers">
            <Button size="lg" variant="outline">
              Browse Providers
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Features */}
      <section className="py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Briefcase,
              title: "Post a Job",
              description: "Need help? Post your job and let skilled providers find you.",
            },
            {
              icon: Users,
              title: "Find Providers",
              description: "Browse verified service providers in your area with skills you need.",
            },
            {
              icon: Shield,
              title: "Trust & Verify",
              description: "Our trust system ensures you work with reliable, verified professionals.",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="h-full transition-all hover:shadow-xl bg-gradient-to-br from-card via-card to-primary/5 hover:to-primary/10">
                <CardHeader>
                  <feature.icon className="h-10 w-10 mb-4 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 glass-card rounded-2xl px-6 border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"
      >
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle className="h-12 w-12 mx-auto text-primary" />
          </motion.div>
          <h2 className="text-3xl font-bold">Built on Trust</h2>
          <p className="text-lg text-muted-foreground">
            Every provider is verified by the community. We prioritize trust, 
            transparency, and local connections over everything else.
          </p>
        </div>
      </motion.section>
    </div>
  )
}
