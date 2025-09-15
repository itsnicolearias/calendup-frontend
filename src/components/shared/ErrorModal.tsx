import React from 'react'
import { Card, CardContent } from '../ui/card'
import { CircleAlert } from 'lucide-react'

function ErrorModal({ title, message }: { title: string; message: string }) {
  return (
    <div>
        <div>
         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card className="bg-white/80 backdrop-blur-sm  shadow-2xl  border-red-200 rounded-lg p-6 mb-8">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CircleAlert className="w-12 h-12 text-red-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
              <p className="text-gray-600 mb-8">
               {message}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ErrorModal