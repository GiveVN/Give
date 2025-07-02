"use client"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

import DonationForm from "./DonationForm"

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: number
  projectTitle: string
  projectType?: "give" | "back"
  currentFunding?: number
  fundingGoal?: number
  currency?: string
  rewardId?: number
  rewardAmount?: number
}

export default function DonationModal({
  isOpen,
  onClose,
  projectId,
  projectTitle,
  projectType,
  currentFunding,
  fundingGoal,
  currency,
  rewardId,
  rewardAmount,
}: DonationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <VisuallyHidden>
          <DialogTitle>
            {projectType === "give" ? "❤️ Support" : "🚀 Back"} {projectTitle}
          </DialogTitle>
        </VisuallyHidden>
        <DonationForm
          projectId={projectId}
          projectTitle={projectTitle}
          projectType={projectType}
          currentFunding={currentFunding}
          fundingGoal={fundingGoal}
          currency={currency}
          rewardId={rewardId}
          rewardAmount={rewardAmount}
          onSuccess={onClose}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}
