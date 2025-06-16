import { PublicStrapiClient } from '../index'
import type { StrapiResponse, StrapiCollectionResponse } from '../types'

export interface ProjectData {
  id: number
  documentId: string
  title: string
  description: string
  shortDescription?: string
  slug: string
  category: 'technology' | 'health' | 'education' | 'environment' | 'arts' | 'community' | 'business' | 'sports' | 'travel' | 'food' | 'fashion' | 'games' | 'film' | 'music' | 'publishing'
  status: 'draft' | 'active' | 'funded' | 'ended' | 'cancelled'
  fundingGoal: number
  currentFunding: number
  currency: 'USD' | 'EUR' | 'GBP' | 'VND'
  backersCount: number
  startDate: string
  endDate: string
  featured: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  images?: {
    data: Array<{
      id: number
      documentId: string
      url: string
      alternativeText?: string
      caption?: string
      width: number
      height: number
      formats?: Record<string, any>
    }>
  }
  video?: {
    data?: {
      id: number
      documentId: string
      url: string
      alternativeText?: string
      caption?: string
    }
  }
  creator?: {
    data: {
      id: number
      documentId: string
      username: string
      email: string
      firstName?: string
      lastName?: string
      avatar?: {
        data: {
          id: number
          documentId: string
          url: string
          alternativeText?: string
        }
      }
    }
  }
  tags?: {
    data: Array<{
      id: number
      documentId: string
      name: string
      slug: string
      color: string
    }>
  }
  rewards?: Array<{
    id: number
    title: string
    description: string
    amount: number
    currency: string
    estimatedDelivery?: string
    limitedQuantity?: number
    claimedQuantity: number
    isActive: boolean
    image?: {
      data: {
        id: number
        documentId: string
        url: string
        alternativeText?: string
      }
    }
  }>
}

export interface ProjectsFilters {
  category?: string
  status?: string
  featured?: boolean
  locale?: string
}

export interface ProjectsSort {
  field: 'createdAt' | 'updatedAt' | 'title' | 'fundingGoal' | 'currentFunding' | 'endDate'
  order: 'asc' | 'desc'
}

/**
 * Fetch all projects with optional filters and pagination
 * Note: Since we don't have a Project content type in Strapi yet, this will return mock data
 */
export async function fetchProjects({
  filters = {},
  sort = { field: 'createdAt', order: 'desc' },
  pagination = { page: 1, pageSize: 10 },
  populate = ['images', 'creator', 'tags']
}: {
  filters?: ProjectsFilters
  sort?: ProjectsSort
  pagination?: { page: number; pageSize: number }
  populate?: string[]
} = {}): Promise<StrapiCollectionResponse<ProjectData>> {
  try {
    // Since we don't have Project content type yet, return mock data
    console.log('Fetching projects with filters:', filters, 'sort:', sort, 'pagination:', pagination)
    
    // Mock data for development
    const mockProjects: ProjectData[] = [
      {
        id: 1,
        documentId: 'project-1',
        title: 'Smart Water Purifier',
        description: 'Revolutionary water purification system using AI and IoT technology to provide clean drinking water in remote areas.',
        shortDescription: 'AI-powered water purification for remote communities',
        slug: 'smart-water-purifier',
        category: 'technology',
        status: 'active',
        fundingGoal: 50000,
        currentFunding: 32500,
        currency: 'USD',
        backersCount: 127,
        startDate: '2025-01-01T00:00:00.000Z',
        endDate: '2025-03-01T00:00:00.000Z',
        featured: true,
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-15T00:00:00.000Z',
        publishedAt: '2025-01-01T00:00:00.000Z',
        locale: 'en'
      },
      {
        id: 2,
        documentId: 'project-2',
        title: 'Community Garden Initiative',
        description: 'Building sustainable community gardens to promote local food production and environmental education.',
        shortDescription: 'Sustainable community gardens for local food production',
        slug: 'community-garden-initiative',
        category: 'environment',
        status: 'active',
        fundingGoal: 25000,
        currentFunding: 18750,
        currency: 'USD',
        backersCount: 89,
        startDate: '2025-01-15T00:00:00.000Z',
        endDate: '2025-04-15T00:00:00.000Z',
        featured: true,
        createdAt: '2025-01-15T00:00:00.000Z',
        updatedAt: '2025-01-20T00:00:00.000Z',
        publishedAt: '2025-01-15T00:00:00.000Z',
        locale: 'en'
      },
      {
        id: 3,
        documentId: 'project-3',
        title: 'Educational VR Platform',
        description: 'Immersive virtual reality platform for interactive learning experiences in schools and universities.',
        shortDescription: 'VR platform for immersive educational experiences',
        slug: 'educational-vr-platform',
        category: 'education',
        status: 'active',
        fundingGoal: 75000,
        currentFunding: 45000,
        currency: 'USD',
        backersCount: 203,
        startDate: '2025-02-01T00:00:00.000Z',
        endDate: '2025-05-01T00:00:00.000Z',
        featured: true,
        createdAt: '2025-02-01T00:00:00.000Z',
        updatedAt: '2025-02-10T00:00:00.000Z',
        publishedAt: '2025-02-01T00:00:00.000Z',
        locale: 'en'
      }
    ]

    // Apply filters
    let filteredProjects = mockProjects
    if (filters.category) {
      filteredProjects = filteredProjects.filter(p => p.category === filters.category)
    }
    if (filters.status) {
      filteredProjects = filteredProjects.filter(p => p.status === filters.status)
    }
    if (filters.featured !== undefined) {
      filteredProjects = filteredProjects.filter(p => p.featured === filters.featured)
    }

    // Apply sorting
    filteredProjects.sort((a, b) => {
      const aValue = a[sort.field]
      const bValue = b[sort.field]
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      return sort.order === 'desc' ? -comparison : comparison
    })

    // Apply pagination
    const startIndex = (pagination.page - 1) * pagination.pageSize
    const endIndex = startIndex + pagination.pageSize
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex)

    return {
      data: paginatedProjects,
      meta: {
        pagination: {
          page: pagination.page,
          pageSize: pagination.pageSize,
          pageCount: Math.ceil(filteredProjects.length / pagination.pageSize),
          total: filteredProjects.length
        }
      }
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 0,
          total: 0
        }
      }
    }
  }
}

/**
 * Fetch featured projects
 */
export async function fetchFeaturedProjects(limit: number = 6): Promise<ProjectData[]> {
  try {
    const response = await fetchProjects({
      filters: { featured: true },
      pagination: { page: 1, pageSize: limit }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

/**
 * Fetch project by ID
 */
export async function fetchProjectById(id: string): Promise<ProjectData | null> {
  try {
    const response = await fetchProjects()
    return response.data.find(project => project.documentId === id) || null
  } catch (error) {
    console.error('Error fetching project by ID:', error)
    return null
  }
}

/**
 * Fetch project statistics
 */
export async function fetchProjectStats(): Promise<{
  totalFunded: number
  activeProjects: number
  totalBackers: number
  successRate: number
}> {
  try {
    const response = await fetchProjects()
    const projects = response.data

    const totalFunded = projects.reduce((sum, project) => sum + project.currentFunding, 0)
    const activeProjects = projects.filter(project => project.status === 'active').length
    const totalBackers = projects.reduce((sum, project) => sum + project.backersCount, 0)
    const fundedProjects = projects.filter(project => project.status === 'funded').length
    const successRate = projects.length > 0 ? (fundedProjects / projects.length) * 100 : 0

    return {
      totalFunded,
      activeProjects,
      totalBackers,
      successRate
    }
  } catch (error) {
    console.error('Error fetching project stats:', error)
    return {
      totalFunded: 0,
      activeProjects: 0,
      totalBackers: 0,
      successRate: 0
    }
  }
} 