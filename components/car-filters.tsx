"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Filter } from 'lucide-react'

interface CarFiltersProps {
  onFilterChange?: (filters: any) => void
}

export function CarFilters({ onFilterChange }: CarFiltersProps) {
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    minYear: 2015,
    maxYear: 2024,
    minPrice: 0,
    maxPrice: 100000,
    maxMileage: 100000,
    bodyType: "",
    transmission: "",
    fuelType: ""
  })

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const resetFilters = () => {
    const defaultFilters = {
      make: "",
      model: "",
      minYear: 2015,
      maxYear: 2024,
      minPrice: 0,
      maxPrice: 100000,
      maxMileage: 100000,
      bodyType: "",
      transmission: "",
      fuelType: ""
    }
    setFilters(defaultFilters)
    onFilterChange?.(defaultFilters)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
        <CardDescription>
          Narrow down your search results
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Make */}
        <div className="space-y-2">
          <Label htmlFor="make">Make</Label>
          <Select value={filters.make} onValueChange={(value) => handleFilterChange("make", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any make</SelectItem>
              <SelectItem value="toyota">Toyota</SelectItem>
              <SelectItem value="honda">Honda</SelectItem>
              <SelectItem value="ford">Ford</SelectItem>
              <SelectItem value="chevrolet">Chevrolet</SelectItem>
              <SelectItem value="nissan">Nissan</SelectItem>
              <SelectItem value="bmw">BMW</SelectItem>
              <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
              <SelectItem value="audi">Audi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Model */}
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            placeholder="Enter model"
            value={filters.model}
            onChange={(e) => handleFilterChange("model", e.target.value)}
          />
        </div>

        {/* Year Range */}
        <div className="space-y-2">
          <Label>Year Range</Label>
          <div className="px-2">
            <Slider
              value={[filters.minYear, filters.maxYear]}
              onValueChange={([min, max]) => {
                handleFilterChange("minYear", min)
                handleFilterChange("maxYear", max)
              }}
              min={2000}
              max={2024}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>{filters.minYear}</span>
              <span>{filters.maxYear}</span>
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Price Range</Label>
          <div className="px-2">
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={([min, max]) => {
                handleFilterChange("minPrice", min)
                handleFilterChange("maxPrice", max)
              }}
              min={0}
              max={100000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>${filters.minPrice.toLocaleString()}</span>
              <span>${filters.maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Max Mileage */}
        <div className="space-y-2">
          <Label>Max Mileage</Label>
          <div className="px-2">
            <Slider
              value={[filters.maxMileage]}
              onValueChange={([value]) => handleFilterChange("maxMileage", value)}
              min={0}
              max={200000}
              step={5000}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground mt-1">
              Up to {filters.maxMileage.toLocaleString()} miles
            </div>
          </div>
        </div>

        {/* Body Type */}
        <div className="space-y-2">
          <Label htmlFor="bodyType">Body Type</Label>
          <Select value={filters.bodyType} onValueChange={(value) => handleFilterChange("bodyType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any type</SelectItem>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="truck">Truck</SelectItem>
              <SelectItem value="hatchback">Hatchback</SelectItem>
              <SelectItem value="coupe">Coupe</SelectItem>
              <SelectItem value="convertible">Convertible</SelectItem>
              <SelectItem value="wagon">Wagon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transmission */}
        <div className="space-y-2">
          <Label htmlFor="transmission">Transmission</Label>
          <Select value={filters.transmission} onValueChange={(value) => handleFilterChange("transmission", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any transmission</SelectItem>
              <SelectItem value="automatic">Automatic</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="cvt">CVT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fuel Type */}
        <div className="space-y-2">
          <Label htmlFor="fuelType">Fuel Type</Label>
          <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange("fuelType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any fuel type</SelectItem>
              <SelectItem value="gasoline">Gasoline</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <Button variant="outline" onClick={resetFilters} className="w-full">
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  )
}
