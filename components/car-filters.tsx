"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Filter, X } from 'lucide-react'

interface CarFiltersProps {
  onFilterChange?: (filters: any) => void
}

export function CarFilters({ onFilterChange }: CarFiltersProps) {
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    minPrice: 0,
    maxPrice: 100000,
    bodyType: "",
  })

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value === 'all' ? '' : value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const resetFilters = () => {
    const defaultFilters = {
      make: "",
      model: "",
      minPrice: 0,
      maxPrice: 100000,
      bodyType: "",
    }
    setFilters(defaultFilters)
    onFilterChange?.(defaultFilters)
  }

  return (
    <div className="p-4 border rounded-lg bg-card text-card-foreground">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Filters</h3>
      </div>
      <div className="flex flex-wrap items-end gap-4">
        {/* Make */}
        <div className="flex-1 space-y-2 min-w-[150px]">
          <Label htmlFor="make">Make</Label>
          <Select value={filters.make} onValueChange={(value) => handleFilterChange("make", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any make</SelectItem>
              <SelectItem value="toyota">Toyota</SelectItem>
              <SelectItem value="honda">Honda</SelectItem>
              <SelectItem value="ford">Ford</SelectItem>
              <SelectItem value="chevrolet">Chevrolet</SelectItem>
              <SelectItem value="nissan">Nissan</SelectItem>
              <SelectItem value="bmw">BMW</SelectItem>
              <SelectItem value="mercedes-benz">Mercedes-Benz</SelectItem>
              <SelectItem value="audi">Audi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Model */}
        <div className="flex-1 space-y-2 min-w-[150px]">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            placeholder="e.g. Civic"
            value={filters.model}
            onChange={(e) => handleFilterChange("model", e.target.value)}
          />
        </div>

        {/* Body Type */}
        <div className="flex-1 space-y-2 min-w-[150px]">
          <Label htmlFor="bodyType">Body Type</Label>
          <Select value={filters.bodyType} onValueChange={(value) => handleFilterChange("bodyType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any type</SelectItem>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="truck">Truck</SelectItem>
              <SelectItem value="hatchback">Hatchback</SelectItem>
              <SelectItem value="coupe">Coupe</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="flex-[2] space-y-2 min-w-[250px]">
          <Label>Price Range</Label>
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={([min, max]) => {
              handleFilterChange("minPrice", min)
              handleFilterChange("maxPrice", max)
            }}
            min={0}
            max={100000}
            step={1000}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>${filters.minPrice.toLocaleString()}</span>
            <span>${filters.maxPrice.toLocaleString()}</span>
          </div>
        </div>
        
        <Button variant="ghost" onClick={resetFilters} className="flex items-center gap-2">
          <X className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  )
}
