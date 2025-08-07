"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Heart, Share2, Phone, Mail } from 'lucide-react'
import Image from "next/image"

interface CarDetailsModalProps {
  car: {
    make: string
    model: string
    year: number
    price: string
    image: string
    features: string[]
    mpg?: string
    horsepower?: number
    exteriorColor?: string
    interiorColor?: string
    engine?: string
    driveTrain?: string
    description?: string
  }
  isOpen: boolean
  onClose: () => void
}

export function CarDetailsModal({ car, isOpen, onClose }: CarDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {car.year} {car.make} {car.model}
          </DialogTitle>
          <DialogDescription className="text-xl font-semibold text-primary">
            {car.price}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
            <Image
              src={car.image || `/placeholder.svg?height=320&width=480`}
              alt={`${car.year} ${car.make} ${car.model}`}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-4">
              {car.mpg && (
                <div>
                  <div className="text-sm text-muted-foreground">Fuel Economy</div>
                  <div className="font-semibold">{car.mpg}</div>
                </div>
              )}
              {car.horsepower && (
                <div>
                  <div className="text-sm text-muted-foreground">Horsepower</div>
                  <div className="font-semibold">{car.horsepower} HP</div>
                </div>
              )}
              {car.engine && (
                <div>
                  <div className="text-sm text-muted-foreground">Engine</div>
                  <div className="font-semibold">{car.engine}</div>
                </div>
              )}
              {car.driveTrain && (
                <div>
                  <div className="text-sm text-muted-foreground">Drivetrain</div>
                  <div className="font-semibold">{car.driveTrain}</div>
                </div>
              )}
              {car.exteriorColor && (
                <div>
                  <div className="text-sm text-muted-foreground">Exterior Color</div>
                  <div className="font-semibold">{car.exteriorColor}</div>
                </div>
              )}
              {car.interiorColor && (
                <div>
                  <div className="text-sm text-muted-foreground">Interior Color</div>
                  <div className="font-semibold">{car.interiorColor}</div>
                </div>
              )}
            </div>

            {/* Features */}
            <div>
              <div className="text-sm text-muted-foreground mb-2">Features</div>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call Dealer
              </Button>
              <Button variant="outline">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        {car.description && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{car.description}</p>
            </div>
          </>
        )}

        {/* Contact Information */}
        <Separator />
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Contact Dealer</h3>
          <div className="flex items-center gap-4">
            <Button>
              <Phone className="h-4 w-4 mr-2" />
              (555) 123-4567
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Email Dealer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
