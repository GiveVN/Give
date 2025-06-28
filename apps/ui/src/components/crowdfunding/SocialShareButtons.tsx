"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Share2, Facebook, Twitter, Linkedin, Link, Mail, MessageCircle, Check } from "lucide-react"
import { toast } from "sonner"

interface SocialShareButtonsProps {
  projectTitle: string
  projectDescription: string
  projectUrl: string
  currentFunding: number
  fundingGoal: number
  currency: string
  milestoneTitle?: string
  milestoneReached?: boolean
  imageUrl?: string
}

export function SocialShareButtons({
  projectTitle,
  projectDescription,
  projectUrl,
  currentFunding,
  fundingGoal,
  currency,
  milestoneTitle,
  milestoneReached,
  imageUrl
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [customMessage, setCustomMessage] = useState("")
  
  const shareUrl = typeof window !== 'undefined' ? window.location.origin + projectUrl : projectUrl
  const percentageComplete = Math.round((currentFunding / fundingGoal) * 100)
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }
  
  // Default share messages
  const defaultMessage = milestoneReached 
    ? `🎉 ${projectTitle} just reached ${milestoneTitle}! ${percentageComplete}% funded with ${formatCurrency(currentFunding)} raised. Support this amazing project:`
    : `Check out ${projectTitle} - ${percentageComplete}% funded! Help them reach their ${formatCurrency(fundingGoal)} goal:`
    
  const shareMessage = customMessage || defaultMessage

  // Share functions
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareMessage)}`
    window.open(url, '_blank', 'width=600,height=400')
    trackShare('facebook')
  }
  
  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
    trackShare('twitter')
  }
  
  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
    trackShare('linkedin')
  }
  
  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareMessage + ' ' + shareUrl)}`
    window.open(url, '_blank')
    trackShare('whatsapp')
  }
  
  const shareByEmail = () => {
    const subject = milestoneReached 
      ? `${projectTitle} reached ${milestoneTitle}!`
      : `Check out ${projectTitle}`
    const body = `${shareMessage}\n\n${shareUrl}\n\n${projectDescription}`
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    trackShare('email')
  }
  
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
      trackShare('copy')
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }
  
  // Track share events
  const trackShare = async (platform: string) => {
    try {
      // You can implement analytics tracking here
      console.log(`Shared on ${platform}:`, projectTitle)
      
      // Optional: Track in backend
      await fetch('/api/analytics/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: projectUrl.split('/').pop(),
          platform,
          milestoneReached,
          percentageComplete
        })
      })
    } catch (error) {
      console.error('Failed to track share:', error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Project</DialogTitle>
          <DialogDescription>
            {milestoneReached 
              ? "Celebrate this milestone achievement with your network!"
              : "Help spread the word about this project"
            }
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="quick" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quick">Quick Share</TabsTrigger>
            <TabsTrigger value="custom">Custom Message</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quick" className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="gap-2"
                onClick={shareOnFacebook}
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>
              
              <Button
                variant="outline"
                className="gap-2"
                onClick={shareOnTwitter}
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              
              <Button
                variant="outline"
                className="gap-2"
                onClick={shareOnLinkedIn}
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
              
              <Button
                variant="outline"
                className="gap-2"
                onClick={shareOnWhatsApp}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
              
              <Button
                variant="outline"
                className="gap-2"
                onClick={shareByEmail}
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
              
              <Button
                variant="outline"
                className="gap-2"
                onClick={copyLink}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Link className="h-4 w-4" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>
            
            <div className="rounded-lg bg-muted p-3">
              <p className="text-sm text-muted-foreground mb-2">Preview:</p>
              <p className="text-sm">{shareMessage}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="custom-message">Your Message</Label>
              <textarea
                id="custom-message"
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Write your custom message..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                The project link will be automatically added
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="gap-2"
                onClick={shareOnFacebook}
                disabled={!customMessage}
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>
              
              <Button
                variant="outline"
                className="gap-2"
                onClick={shareOnTwitter}
                disabled={!customMessage}
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {milestoneReached && (
          <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-3 mt-4">
            <p className="text-sm text-green-800 dark:text-green-200 font-medium">
              🎉 Milestone Achievement!
            </p>
            <p className="text-xs text-green-700 dark:text-green-300 mt-1">
              Sharing milestone achievements can boost engagement by up to 3x
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 