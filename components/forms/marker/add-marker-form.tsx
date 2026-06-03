"use client"

import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DateRangeCalendar } from "@/components/ui/date-range-calendar";

export default function AddMarkerForm() {
  const searchParams = useSearchParams(); // Params from inner-map.tsx

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <form action="">
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" placeholder="Fire alarm going off! It's been 2 days." />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="description">Category</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a noise category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Construction</SelectItem>
                <SelectItem value="2">Traffic</SelectItem>
                <SelectItem value="3">Aircraft</SelectItem>
                <SelectItem value="4">Trains / Rail</SelectItem>
                <SelectItem value="5">Industrial</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectItem value="6">People</SelectItem>
                <SelectItem value="7">Neighbours</SelectItem>
                <SelectItem value="8">Music / Events</SelectItem>
                <SelectItem value="9">Nightlife (bars, clubs, etc.)</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectItem value="10">Animals (dogs barking, etc.)</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectItem value="11">Unknown / Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="description">Time</Label>
          <div className="sm:w-1/2">
            <DateRangeCalendar />
          </div>
        </div>

      </div>
    </form>
  )
}