"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign } from 'lucide-react'

interface Car {
  make: string
  model: string
  year: number
  price: string
  image: string
  mileage: string
  type: string
  engine: string
  financing?: string
}

interface ChatCarCardProps {
  car: Car
}

export default function ChatCarCard({ car }: ChatCarCardProps) {
  return (
    <Card className="w-full max-w-xs shrink-0">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <Image src={car.image || "/placeholder.svg"} alt={`${car.make} ${car.model}`} fill className="object-cover rounded-t-lg" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-base">
          {car.year} {car.make} {car.model}
        </CardTitle>
        <CardDescription className="text-lg font-bold">{car.price}</CardDescription>
        <div className="mt-2 flex flex-wrap gap-1 text-xs">
          <Badge variant="secondary">{car.mileage}</Badge>
          <Badge variant="secondary">{car.type}</Badge>
          <Badge variant="secondary">{car.engine}</Badge>
        </div>
        {car.financing && (
          <div className="mt-3 pt-2 border-t border-dashed">
            <p className="text-xs text-muted-foreground flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              Est. {car.financing}/mo
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
