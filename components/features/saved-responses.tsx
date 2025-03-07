"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Save, Copy, FolderPlus } from "lucide-react"

type SavedResponse = {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  createdAt: string
}

export function SavedResponses() {
  const [savedResponses, setSavedResponses] = useState<SavedResponse[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [newResponseOpen, setNewResponseOpen] = useState<boolean>(false)
  const [editingResponse, setEditingResponse] = useState<SavedResponse | null>(null)

  // Form state
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [tags, setTags] = useState<string>("")

  // Load sample data
  useEffect(() => {
    const sampleResponses: SavedResponse[] = [
      {
        id: "1",
        title: "Project Timeline Explanation",
        content:
          "Our project timeline is structured to ensure quality at every stage. We begin with a discovery phase (1-2 weeks), followed by planning and design (2-3 weeks), development (3-4 weeks), testing (1-2 weeks), and launch (1 week). Each phase includes checkpoints for your feedback to ensure we're aligned with your vision.",
        category: "Project Management",
        tags: ["timeline", "process", "planning"],
        createdAt: "2023-11-15T10:30:00Z",
      },
      {
        id: "2",
        title: "Premium Pricing Justification",
        content:
          "Our pricing reflects the comprehensive value we provide. Unlike competitors who offer basic solutions, our service includes in-depth strategy, premium execution, ongoing optimization, and dedicated support. Our clients typically see a 30% higher ROI compared to industry averages, making our service an investment rather than an expense.",
        category: "Pricing",
        tags: ["value", "premium", "roi"],
        createdAt: "2023-12-01T14:45:00Z",
      },
      {
        id: "3",
        title: "Handling Revision Requests",
        content:
          "We welcome revision requests as part of our collaborative process. Our standard package includes two rounds of revisions at no additional cost. For revisions beyond this, we assess the scope and may propose a small additional fee depending on the extent of changes. This approach allows us to maintain quality while ensuring your complete satisfaction.",
        category: "Client Management",
        tags: ["revisions", "feedback", "process"],
        createdAt: "2024-01-10T09:15:00Z",
      },
    ]

    setSavedResponses(sampleResponses)
  }, [])

  const handleSaveResponse = () => {
    if (!title.trim() || !content.trim() || !category.trim()) return

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag)

    if (editingResponse) {
      // Update existing response
      const updatedResponses = savedResponses.map((response) =>
        response.id === editingResponse.id
          ? {
              ...response,
              title,
              content,
              category,
              tags: tagsArray,
            }
          : response,
      )
      setSavedResponses(updatedResponses)
    } else {
      // Create new response
      const newResponse: SavedResponse = {
        id: Date.now().toString(),
        title,
        content,
        category,
        tags: tagsArray,
        createdAt: new Date().toISOString(),
      }
      setSavedResponses([...savedResponses, newResponse])
    }

    resetForm()
    setNewResponseOpen(false)
  }

  const handleEditResponse = (response: SavedResponse) => {
    setEditingResponse(response)
    setTitle(response.title)
    setContent(response.content)
    setCategory(response.category)
    setTags(response.tags.join(", "))
    setNewResponseOpen(true)
  }

  const handleDeleteResponse = (id: string) => {
    setSavedResponses(savedResponses.filter((response) => response.id !== id))
  }

  const resetForm = () => {
    setTitle("")
    setContent("")
    setCategory("")
    setTags("")
    setEditingResponse(null)
  }

  const filteredResponses = savedResponses.filter((response) => {
    const matchesSearch =
      response.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      response.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      response.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = activeCategory === "all" || response.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(savedResponses.map((r) => r.category)))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Saved Responses</h1>
        <p className="text-muted-foreground">Store and organize your best responses for quick access.</p>
      </div>

      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search saved responses..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={newResponseOpen} onOpenChange={setNewResponseOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Response
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingResponse ? "Edit Response" : "Create New Response"}</DialogTitle>
                <DialogDescription>
                  {editingResponse
                    ? "Update your saved response details below."
                    : "Add a new response to your library for future use."}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="E.g., Project Timeline Explanation"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Response Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter your response text here..."
                    className="min-h-[150px]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pricing">Pricing</SelectItem>
                        <SelectItem value="Project Management">Project Management</SelectItem>
                        <SelectItem value="Client Management">Client Management</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Technical">Technical</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      placeholder="E.g., pricing, value, premium"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm()
                    setNewResponseOpen(false)
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveResponse}>
                  <Save className="mr-2 h-4 w-4" />
                  {editingResponse ? "Update Response" : "Save Response"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="flex overflow-x-auto pb-1">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category === "all" ? "All Responses" : category}
              </TabsTrigger>
            ))}
            <TabsTrigger value="new-category" className="flex items-center">
              <FolderPlus className="h-4 w-4 mr-1" />
              New Category
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory} className="mt-6">
            {filteredResponses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResponses.map((response) => (
                  <Card key={response.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{response.title}</CardTitle>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEditResponse(response)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteResponse(response.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription>
                        {new Date(response.createdAt).toLocaleDateString()} · {response.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-3">{response.content}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start pt-0">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {response.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        <Copy className="h-3.5 w-3.5 mr-1.5" />
                        Copy
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Save className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No saved responses found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery
                    ? "No responses match your search criteria. Try a different search term."
                    : "You haven't saved any responses in this category yet."}
                </p>
                <Button onClick={() => setNewResponseOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Response
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

