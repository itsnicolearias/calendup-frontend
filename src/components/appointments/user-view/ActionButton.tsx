import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { Save, Trash2 } from 'lucide-react'
import React from 'react'

function ActionButton({ onSaveChanges, hasChanges, onCancel, disableButton }: { onSaveChanges: () => void, hasChanges: boolean, onCancel: () => void, disableButton: boolean }) {
  return (
    <div>
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={onSaveChanges}
                      disabled={!hasChanges || disableButton}
                      className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold disabled:opacity-50"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          disabled={disableButton}
                          className="flex-1 h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-semibold"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancelar Turno
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white/95 backdrop-blur-sm">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-xl font-bold text-gray-900">
                            ¿Cancelar turno?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-600">
                            Esta acción no se puede deshacer. El turno se cancelará y el profesional será notificado
                            automáticamente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200">Volver</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={onCancel}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                          >
                            Sí, cancelar turno
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
    </div>
  )
}

export default ActionButton