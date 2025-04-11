"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Loader2, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SubmitHackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSuccess(true)
      // Reset form
      e.currentTarget.reset()
    } catch (err) {
      setError("An error occurred while submitting your report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Submit a Security Incident</CardTitle>
          <CardDescription>
            Help the Solana community by reporting security incidents or vulnerabilities.
            All submissions are reviewed by our security team.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isSuccess && (
            <Alert className="bg-green-50 border-green-500 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your security incident report has been submitted successfully. Our team will review it shortly.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" placeholder="e.g. SolLending Protocol" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="incident-type">Incident Type</Label>
                <Select required>
                  <SelectTrigger id="incident-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flash-loan">Flash Loan Attack</SelectItem>
                    <SelectItem value="reentrancy">Reentrancy</SelectItem>
                    <SelectItem value="access-control">Access Control</SelectItem>
                    <SelectItem value="oracle-manipulation">Oracle Manipulation</SelectItem>
                    <SelectItem value="price-manipulation">Price Manipulation</SelectItem>
                    <SelectItem value="contract-vulnerability">Contract Vulnerability</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="funds-lost">Estimated Funds Lost (USD)</Label>
                <Input id="funds-lost" placeholder="e.g. 1000000" type="number" min="0" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="txid">Transaction ID (Optional)</Label>
              <Input id="txid" placeholder="e.g. 4sMKLPU6..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Please provide details about the incident, how it happened, and any other relevant information..."
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Information (Optional)</Label>
              <Input id="contact" placeholder="Email or Discord handle" />
              <p className="text-xs text-muted-foreground mt-1">
                We may need to contact you for additional information.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
