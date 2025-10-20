"use client"

import { useCallback } from "react"

export function useCelebrationSound() {
  const playSuccess = useCallback(() => {
    // Crear un contexto de audio
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

    // Secuencia de notas para un sonido de éxito
    const notes = [
      { frequency: 523.25, duration: 0.1 }, // C5
      { frequency: 659.25, duration: 0.1 }, // E5
      { frequency: 783.99, duration: 0.2 }, // G5
    ]

    let startTime = audioContext.currentTime

    notes.forEach((note, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = note.frequency
      oscillator.type = "sine"

      // Envelope para suavizar el sonido
      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration)

      oscillator.start(startTime)
      oscillator.stop(startTime + note.duration)

      startTime += note.duration
    })
  }, [])

  return { playSuccess }
}
