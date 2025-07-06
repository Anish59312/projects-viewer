"use client"

import { useState, useMemo } from "react"
import { Search, ExternalLink, Github, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import projectsData from "@/data/projects.json"

interface Project {
  id: string
  name: string
  description: string
  hostedLink: string
  githubLink: string
  tags: string[]
}

export default function ProjectShowcase() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { toast } = useToast()

  const projects: Project[] = projectsData.projects

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects

    const query = searchQuery.toLowerCase()
    return projects.filter(
      (project) =>
        project.tags.some((tag) => tag.toLowerCase().includes(query)) || project.name.toLowerCase().includes(query),
    )
  }, [projects, searchQuery])

  const copyCloneCommand = async (githubLink: string, projectName: string) => {
    const cloneCommand = `git clone ${githubLink}`
    try {
      await navigator.clipboard.writeText(cloneCommand)
      toast({
        title: "Copied to clipboard!",
        description: `Clone command for ${projectName} copied successfully.`,
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the command manually.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Demo Projects</h1>
              <p className="text-muted-foreground mt-2">A collection of my latest projects and experiments</p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by tags or project name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="container mx-auto px-4 py-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No projects found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-border/50 hover:border-border flex flex-col h-full"
                onClick={() => setSelectedProject(project)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {project.name}
                      </CardTitle>
                      <CardDescription className="mt-1 line-clamp-2">
                        {project.description.substring(0, 100)}...
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 flex flex-col flex-grow justify-end">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                   
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">

                    {project.hostedLink ?
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.hostedLink, "_blank")
                          }}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Demo
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.githubLink, "_blank")
                          }}
                        >
                          <Github className="h-3 w-3" />
                        </Button>

                      </> :
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.githubLink, "_blank")
                          }}
                        >
                          {/* <ExternalLink className="h-3 w-3 mr-1" />
                           */}
                          <Github className="h-3 w-3" />
                          Github
                        </Button>
                      </>
                    }
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        copyCloneCommand(project.githubLink, project.name)
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <DialogTitle className="text-2xl">{selectedProject.name}</DialogTitle>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {selectedProject.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <DialogDescription className="text-base leading-relaxed mt-4">
                {selectedProject.description}
              </DialogDescription>

              <div className="flex gap-3 mt-6">
                <Button onClick={() => window.open(selectedProject.hostedLink, "_blank")} className="flex-1">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Demo
                </Button>
                <Button variant="outline" onClick={() => window.open(selectedProject.githubLink, "_blank")}>
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  onClick={() => copyCloneCommand(selectedProject.githubLink, selectedProject.name)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Clone
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
