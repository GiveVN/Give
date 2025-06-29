"use client"

import { useState, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { 
  MessageCircle, 
  ThumbsUp, 
  Flag,
  Reply,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  Send,
  User,
  Shield
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Comment {
  id: string
  documentId: string
  Content: string
  IsApproved: boolean
  IsEdited: boolean
  EditedAt?: string
  Likes: number
  createdAt: string
  updatedAt: string
  Author?: {
    id: string
    username: string
    email: string
    avatar?: {
      url: string
    }
  }
  Replies?: Comment[]
  Parent?: {
    id: string
    documentId: string
  }
}

interface ProjectCommentsProps {
  projectId: string
  projectTitle: string
  isAuthenticated?: boolean
  currentUserId?: string
}

export default function ProjectComments({
  projectId,
  projectTitle,
  isAuthenticated = false,
  currentUserId
}: ProjectCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [editingComment, setEditingComment] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  useEffect(() => {
    fetchComments()
  }, [projectId])

  const fetchComments = async () => {
    try {
      setLoading(true)
      
      // Fetch comments for this project
      const queryParams = new URLSearchParams({
        'filters[Project][documentId][$eq]': projectId,
        'filters[Parent][$null]': 'true', // Only get top-level comments
        'populate[Author]': 'true',
        'populate[Replies][populate][Author]': 'true',
        'populate[Replies][populate][Replies][populate][Author]': 'true', // 2 levels deep
        'sort[0]': 'createdAt:desc',
        'pagination[pageSize]': '50'
      })
      
      const response = await fetch(`/api/comments?${queryParams}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch comments')
      }
      
      const data = await response.json()
      setComments(data.data || [])
    } catch (error) {
      console.error("Error fetching comments:", error)
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return
    
    setSubmitting(true)
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Content: newComment.trim(),
          Project: projectId,
          IsApproved: true, // Auto-approve for MVP
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to post comment')
      }
      
      const newCommentData = await response.json()
      
      toast({
        title: "Success",
        description: "Your comment has been posted!",
      })
      
      // Add new comment to the list immediately
      if (newCommentData.data) {
        setComments(prevComments => [newCommentData.data, ...prevComments])
      }
      
      setNewComment("")
      
      // Also fetch to ensure we have the latest data
      setTimeout(() => {
        fetchComments()
      }, 1000)
    } catch (error) {
      console.error("Error posting comment:", error)
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleReply = async (parentId: string) => {
    if (!replyContent.trim()) return
    
    setSubmitting(true)
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Content: replyContent.trim(),
          Project: projectId,
          Parent: parentId,
          IsApproved: true,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to post reply')
      }
      
      const newReplyData = await response.json()
      
      toast({
        title: "Success",
        description: "Your reply has been posted!",
      })
      
      // Add reply to the comment tree immediately
      if (newReplyData.data) {
        const updateCommentsWithReply = (comments: Comment[]): Comment[] => {
          return comments.map(comment => {
            if (comment.documentId === parentId) {
              return {
                ...comment,
                Replies: [...(comment.Replies || []), newReplyData.data]
              }
            }
            if (comment.Replies) {
              return {
                ...comment,
                Replies: updateCommentsWithReply(comment.Replies)
              }
            }
            return comment
          })
        }
        
        setComments(updateCommentsWithReply(comments))
        // Auto-expand the parent comment to show the new reply
        setExpandedComments(prev => new Set(prev).add(parentId))
      }
      
      setReplyContent("")
      setReplyTo(null)
      
      // Also fetch to ensure we have the latest data
      setTimeout(() => {
        fetchComments()
      }, 1000)
    } catch (error) {
      console.error("Error posting reply:", error)
      toast({
        title: "Error",
        description: "Failed to post reply. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleLike = async (commentId: string) => {
    try {
      // For MVP, just update locally
      if (likedComments.has(commentId)) {
        likedComments.delete(commentId)
      } else {
        likedComments.add(commentId)
      }
      setLikedComments(new Set(likedComments))
      
      // Update comment likes count locally
      const updateCommentLikes = (comments: Comment[]): Comment[] => {
        return comments.map(comment => {
          if (comment.documentId === commentId) {
            return {
              ...comment,
              Likes: likedComments.has(commentId) ? comment.Likes - 1 : comment.Likes + 1
            }
          }
          if (comment.Replies) {
            return {
              ...comment,
              Replies: updateCommentLikes(comment.Replies)
            }
          }
          return comment
        })
      }
      
      setComments(updateCommentLikes(comments))
    } catch (error) {
      console.error("Error liking comment:", error)
    }
  }

  const toggleExpanded = (commentId: string) => {
    const newExpanded = new Set(expandedComments)
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId)
    } else {
      newExpanded.add(commentId)
    }
    setExpandedComments(newExpanded)
  }

  const renderComment = (comment: Comment, depth: number = 0) => {
    const isExpanded = expandedComments.has(comment.documentId)
    const isLiked = likedComments.has(comment.documentId)
    const hasReplies = comment.Replies && comment.Replies.length > 0
    const isAuthor = currentUserId && comment.Author?.id === currentUserId
    
    return (
      <div key={comment.documentId} className={cn("", depth > 0 && "ml-8 mt-4")}>
        <Card className={cn(
          "transition-all",
          depth > 0 && "border-l-2 border-l-muted-foreground/20"
        )}>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              {/* Author Avatar */}
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.Author?.avatar?.url} />
                <AvatarFallback>
                  {comment.Author?.username?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              
              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {comment.Author?.username || "Anonymous"}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </span>
                      {comment.IsEdited && (
                        <Badge variant="outline" className="text-xs">
                          Edited
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {isAuthor && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingComment(comment.documentId)
                            setEditContent(comment.Content)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Comment Text */}
                {editingComment === comment.documentId ? (
                  <div className="mt-2 space-y-2">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          // Handle edit save
                          setEditingComment(null)
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingComment(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 whitespace-pre-wrap">{comment.Content}</p>
                )}
                
                {/* Interaction Buttons */}
                <div className="mt-4 flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(isLiked && "text-primary")}
                    onClick={() => handleLike(comment.documentId)}
                  >
                    <ThumbsUp className={cn("h-4 w-4 mr-1", isLiked && "fill-current")} />
                    {comment.Likes > 0 && comment.Likes}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyTo(comment.documentId)}
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                  
                  {hasReplies && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(comment.documentId)}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          Hide {comment.Replies!.length} {comment.Replies!.length === 1 ? 'reply' : 'replies'}
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" />
                          Show {comment.Replies!.length} {comment.Replies!.length === 1 ? 'reply' : 'replies'}
                        </>
                      )}
                    </Button>
                  )}
                </div>
                
                {/* Reply Form */}
                {replyTo === comment.documentId && (
                  <div className="mt-4 space-y-2">
                    <Textarea
                      placeholder="Write your reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleReply(comment.documentId)}
                        disabled={submitting || !replyContent.trim()}
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Post Reply
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setReplyTo(null)
                          setReplyContent("")
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Render Replies */}
        {hasReplies && isExpanded && (
          <div className="mt-2">
            {comment.Replies!.map(reply => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Comments Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Comments ({comments.length})
          </CardTitle>
          <CardDescription>
            Join the conversation about {projectTitle}
          </CardDescription>
        </CardHeader>
        
        {/* New Comment Form */}
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <Button
              onClick={handleSubmitComment}
              disabled={submitting || !newComment.trim()}
              className="w-full sm:w-auto"
            >
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Comments List */}
      {comments.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              No comments yet. Be the first to share your thoughts!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {comments.map(comment => renderComment(comment))}
        </div>
      )}
    </div>
  )
}
