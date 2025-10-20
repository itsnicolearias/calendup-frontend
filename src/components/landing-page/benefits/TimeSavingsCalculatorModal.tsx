"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import TimeSavingsCalculator from "./TimeSavingCalculator"

interface TimeSavingsCalculatorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function TimeSavingsCalculatorModal({ open, onOpenChange }: TimeSavingsCalculatorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Calculá tu ahorro de tiempo con CalendUp</DialogTitle>
        </DialogHeader>
        <TimeSavingsCalculator />
      </DialogContent>
    </Dialog>
  )
}
