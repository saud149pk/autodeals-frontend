"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MetropolitanAreaFilterProps {
  areas: Array<{ value: string; label: string }>
  selectedArea: string
  onAreaChange: (value: string) => void
}

export function MetropolitanAreaFilter({ areas, selectedArea, onAreaChange }: MetropolitanAreaFilterProps) {
  return (
    <Select value={selectedArea} onValueChange={onAreaChange}>
      <SelectTrigger className="w-full sm:w-[280px]">
        <SelectValue placeholder="Select Market Area" />
      </SelectTrigger>
      <SelectContent>
        {areas.map((area) => (
          <SelectItem key={area.value} value={area.value}>
            {area.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
