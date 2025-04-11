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
      <div className="container py-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">Security Resources</h1>
          <p className="mt-2 text-muted-foreground">
            Resources and best practices to enhance security in Solana applications
          </p>
        </div>

        <div className="grid gap-6 mt-8">
          <h2 className="text-2xl font-semibold">Latest Resources</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resourcesWithIds.map((resource) => (
              <Card key={resource.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    {resource.icon}
                    <span className="text-sm font-medium">{resource.category}</span>
                  </div>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button asChild className="w-full">
                    <Link href={resource.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      View Resource
                      <ExternalLinkIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-10">Security Contacts</h2>
          <Card>
            <CardHeader>
              <CardTitle>Report a Vulnerability</CardTitle>
              <CardDescription>
                If you discover a potential security issue in the Solana network or any protocols in the ecosystem, please follow these steps to report it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                For direct security vulnerabilities in the <strong>Solana network</strong>, please contact:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Security team: <strong>security@solana.com</strong></li>
                <li>Bug bounty program: <Link href="https://hackerone.com/solana" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">HackerOne</Link></li>
              </ul>
              <p>
                For vulnerabilities in <strong>projects built on Solana</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact the project directly through their official channels</li>
                <li>If the project has a bug bounty program, submit through the appropriate channel</li>
                <li>For critical issues where projects are unresponsive, report to <strong>ecosystem-security@solana.org</strong></li>
              </ul>
              <p className="text-muted-foreground">
                Always follow responsible disclosure practices and give projects reasonable time to address vulnerabilities before public disclosure.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
