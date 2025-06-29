import { NextRequest, NextResponse } from 'next/server'

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1338'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Prepare data for Strapi
    const donationData = {
      data: {
        Amount: body.Amount,
        Currency: body.Currency,
        PaymentMethod: body.PaymentMethod,
        PaymentId: body.PaymentId,
        PaymentStatus: body.PaymentStatus || 'completed',
        IsAnonymous: body.IsAnonymous || false,
        GiverName: body.GiverName || null,
        Message: body.Message || null,
        Project: body.Project,
      }
    }
    
    // Send to Strapi - no auth for public donation creation
    const response = await fetch(`${STRAPI_URL}/api/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationData),
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error('Strapi error:', error)
      return NextResponse.json(
        { error: 'Failed to save donation' },
        { status: response.status }
      )
    }
    
    const result = await response.json()
    
    // Try to update project funding
    try {
      const projectResponse = await fetch(`${STRAPI_URL}/api/projects/${body.Project}`)
      
      if (projectResponse.ok) {
        const projectData = await projectResponse.json()
        const currentFunding = projectData.data?.attributes?.CurrentFunding || 0
        const backersCount = projectData.data?.attributes?.BackersCount || 0
        
        // Update project
        await fetch(`${STRAPI_URL}/api/projects/${body.Project}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              CurrentFunding: currentFunding + body.Amount,
              BackersCount: backersCount + 1
            }
          }),
        })
      }
    } catch (error) {
      console.error('Error updating project:', error)
    }
    
    return NextResponse.json({
      success: true,
      data: result.data
    })
    
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 