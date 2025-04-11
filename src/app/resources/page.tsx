import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, BookOpenIcon, CheckCircleIcon, ShieldIcon, BookIcon } from "lucide-react"
import Link from "next/link"

const securityResources = [
  {
    title: "Smart Contract Security Guidelines",
    description: "Comprehensive guidelines for writing secure smart contracts on Solana.",
    link: "https://solana.com/docs/security",
    category: "Documentation",
    icon: <BookOpenIcon className="h-6 w-6" />
  },
  {
    title: "Solana Security Auditing Checklist",
    description: "A checklist to verify security of Solana protocols before deployment.",
    link: "https://github.com/superteam-security/audit-checklist",
    category: "Tools",
    icon: <CheckCircleIcon className="h-6 w-6" />
  },
  {
    title: "Common Solana Vulnerabilities",
    description: "Analysis of the most common vulnerabilities found in Solana protocols.",
    link: "https://github.com/superteam-security/vulnerabilities",
    category: "Research",
    icon: <ShieldIcon className="h-6 w-6" />
  },
  {
    title: "Security Best Practices Guide",
    description: "Guide covering security best practices for Solana developers.",
    link: "https://solana.com/security-best-practices",
    category: "Documentation",
    icon: <BookIcon className="h-6 w-6" />
  },
  {
    title: "Secure Transaction Signing",
    description: "Learn how to securely sign transactions in Solana applications.",
    link: "https://docs.solana.com/developing/clients/javascript-api",
    category: "Tutorial",
    icon: <BookOpenIcon className="h-6 w-6" />
  },
  {
    title: "Solana Program Security Review",
    description: "Techniques for reviewing Solana programs for security vulnerabilities.",
    link: "https://github.com/solana-labs/security-reviews",
    category: "Tools",
    icon: <ShieldIcon className="h-6 w-6" />
  }
]

// Add unique ids to the resources
const resourcesWithIds = securityResources.map((resource, index) => ({
  ...resource,
  id: `resource-${index}`
}))

export default function ResourcesPage() {
  return (
    <DashboardLayout>
      <div className="container py-4 sm:py-6">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Security Resources</h1>
          <p className="mt-2 text-muted-foreground">
            Resources and best practices to enhance security in Solana applications
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold">Latest Resources</h2>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {resourcesWithIds.map((resource) => (
              <Card key={resource.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    {resource.icon}
                    <span className="text-sm font-medium">{resource.category}</span>
                  </div>
                  <CardTitle className="text-base sm:text-lg">{resource.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-end">
                  <a href={resource.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="flex items-center">
                      View Resource <ExternalLinkIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional responsive sections */}
      </div>
    </DashboardLayout>
  )
}
