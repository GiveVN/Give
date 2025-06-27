"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import DonationForm from "./DonationForm"

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: number
  projectTitle: string
  projectType?: 'give' | 'back'
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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