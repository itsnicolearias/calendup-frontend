import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, Save } from 'lucide-react'
import React from 'react'

function ChangesIndicator({onDraftChange, onSaveChanges}: { onDraftChange: () => void, onSaveChanges: () => void }) {
  return (
    <div>
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="text-yellow-800 font-medium">Tienes cambios sin guardar</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={onDraftChange}
                          className="bg-white/80 hover:bg-white"
                        >
                          Descartar
                        </Button>
                        <Button
                          size="sm"
                          onClick={onSaveChanges}
                          className="bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#79022b] hover:to-[#02455f] text-white"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Guardar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
    </div>
  )
}

export default ChangesIndicator