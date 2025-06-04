"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Star } from "lucide-react"

export function FeedbackForm() {
  const [formData, setFormData] = useState({
    category: "",
    satisfaction: "",
    subject: "",
    file: null as File | null,
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your feedback. We'll review it and get back to you.",
    })
    setFormData({
      category: "",
      satisfaction: "",
      subject: "",
      file: null,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, file }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Share Your Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="category">My feedback is on</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chat">Chat</SelectItem>
                  <SelectItem value="ticker">Ticker</SelectItem>
                  <SelectItem value="settings">Settings</SelectItem>
                  <SelectItem value="bubbles">Bubbles</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>How satisfied are you?</Label>
              <RadioGroup
                value={formData.satisfaction}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, satisfaction: value }))}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-satisfied" id="very-satisfied" />
                  <Label htmlFor="very-satisfied" className="flex items-center space-x-1">
                    <span>Very Satisfied</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium-satisfied" id="medium-satisfied" />
                  <Label htmlFor="medium-satisfied" className="flex items-center space-x-1">
                    <span>Medium Satisfied</span>
                    <div className="flex">
                      {[1, 2, 3].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      {[4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-gray-300" />
                      ))}
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-satisfied" id="not-satisfied" />
                  <Label htmlFor="not-satisfied" className="flex items-center space-x-1">
                    <span>Not Satisfied</span>
                    <div className="flex">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {[2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-gray-300" />
                      ))}
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Textarea
                id="subject"
                placeholder="Write your feedback here..."
                rows={5}
                value={formData.subject}
                onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="file">Attach File (optional)</Label>
              <div className="mt-2">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
              {formData.file && <p className="text-sm text-muted-foreground mt-1">Selected: {formData.file.name}</p>}
            </div>

            <div className="flex space-x-4">
              <Button type="submit" className="flex-1">
                Submit Feedback
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData({ category: "", satisfaction: "", subject: "", file: null })}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
