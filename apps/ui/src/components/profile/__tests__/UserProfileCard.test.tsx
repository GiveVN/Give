import React from "react"
import { render, screen } from "@testing-library/react"

import "@testing-library/jest-dom"

import { UserProfile } from "@/types/user"

import UserProfileCard from "../UserProfileCard"

// Mock Next.js components
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />
  },
}))

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

describe("UserProfileCard", () => {
  const mockUser: UserProfile = {
    id: "1",
    username: "johndoe",
    email: "john@example.com",
    displayName: "John Doe",
    firstName: "John",
    lastName: "Doe",
    bio: "Software developer passionate about open source",
    location: "San Francisco, CA",
    website: "https://johndoe.com",
    avatar: {
      url: "/avatar.jpg",
      alternativeText: "John Doe avatar",
    },
    coverImage: {
      url: "/cover.jpg",
      alternativeText: "Cover image",
    },
    isVerified: true,
    isPublic: true,
    vanityUrl: "johndoe",
    reputation: 100,
    totalRaised: 50000,
    totalDonated: 5000,
    Projects: [],
    socialLinks: [
      {
        platform: "twitter",
        url: "https://twitter.com/johndoe",
        isVerified: true,
        isPublic: true,
      },
      {
        platform: "github",
        url: "https://github.com/johndoe",
        isVerified: false,
        isPublic: true,
      },
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    lastActiveAt: "2024-01-01T00:00:00Z",
  }

  it("renders user profile with all information", () => {
    render(<UserProfileCard user={mockUser} />)

    // Check display name
    expect(screen.getByText("John Doe")).toBeInTheDocument()

    // Check username
    expect(screen.getByText("@johndoe")).toBeInTheDocument()

    // Check bio
    expect(
      screen.getByText("Software developer passionate about open source")
    ).toBeInTheDocument()

    // Check location
    expect(screen.getByText("San Francisco, CA")).toBeInTheDocument()

    // Check website link
    const websiteLink = screen.getByText("Website")
    expect(websiteLink.closest("a")).toHaveAttribute(
      "href",
      "https://johndoe.com"
    )

    // Check join date
    expect(screen.getByText(/Joined/)).toBeInTheDocument()
  })

  it("shows verification badge for verified users", () => {
    render(<UserProfileCard user={mockUser} />)

    // Should have 2 verification badges - one next to name and one in the avatar
    const verificationBadges = screen.getAllByTestId("verification-badge")
    expect(verificationBadges).toHaveLength(2)
  })

  it("displays social links correctly", () => {
    render(<UserProfileCard user={mockUser} />)

    // Check Twitter link
    const twitterLink = screen.getByText("twitter").closest("a")
    expect(twitterLink).toHaveAttribute("href", "https://twitter.com/johndoe")

    // Check GitHub link
    const githubLink = screen.getByText("github").closest("a")
    expect(githubLink).toHaveAttribute("href", "https://github.com/johndoe")
  })

  it("shows statistics when showStats is true", () => {
    render(<UserProfileCard user={mockUser} showStats={true} />)

    // Check projects count
    expect(screen.getByText("0")).toBeInTheDocument()
    expect(screen.getByText("Projects")).toBeInTheDocument()

    // Check total raised
    expect(screen.getByText("$50,000")).toBeInTheDocument()
    expect(screen.getByText("Raised")).toBeInTheDocument()

    // Check total donated
    expect(screen.getByText("$5,000")).toBeInTheDocument()
    expect(screen.getByText("Donated")).toBeInTheDocument()

    // Check reputation
    expect(screen.getByText("100")).toBeInTheDocument()
    expect(screen.getByText("Reputation")).toBeInTheDocument()
  })

  it("hides statistics when showStats is false", () => {
    render(<UserProfileCard user={mockUser} showStats={false} />)

    expect(screen.queryByText("Projects")).not.toBeInTheDocument()
    expect(screen.queryByText("Raised")).not.toBeInTheDocument()
    expect(screen.queryByText("Donated")).not.toBeInTheDocument()
    expect(screen.queryByText("Reputation")).not.toBeInTheDocument()
  })

  it("shows Edit Profile button for own profile", () => {
    render(<UserProfileCard user={mockUser} isOwnProfile={true} />)

    const editButton = screen.getByText("Edit Profile")
    expect(editButton).toBeInTheDocument()
    expect(editButton.closest("a")).toHaveAttribute("href", "/profile/edit")
  })

  it("shows Follow button for other profiles", () => {
    render(<UserProfileCard user={mockUser} isOwnProfile={false} />)

    expect(screen.getByText("Follow")).toBeInTheDocument()
    expect(screen.queryByText("Edit Profile")).not.toBeInTheDocument()
  })

  it("displays default avatar when no avatar is provided", () => {
    const userWithoutAvatar = { ...mockUser, avatar: null }
    render(<UserProfileCard user={userWithoutAvatar} />)

    // Should show initial letter
    expect(screen.getByText("J")).toBeInTheDocument()
  })

  it("handles missing optional fields gracefully", () => {
    const minimalUser: UserProfile = {
      ...mockUser,
      bio: undefined,
      location: undefined,
      website: undefined,
      socialLinks: [],
      coverImage: null,
      isVerified: false,
    }

    render(<UserProfileCard user={minimalUser} />)

    // Should still render without errors
    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.queryByText("Website")).not.toBeInTheDocument()
    expect(screen.queryByText("Social Links")).not.toBeInTheDocument()
  })

  it("filters out non-public social links", () => {
    const userWithPrivateLinks = {
      ...mockUser,
      socialLinks: [
        {
          platform: "twitter",
          url: "https://twitter.com/johndoe",
          isVerified: true,
          isPublic: true,
        },
        {
          platform: "facebook",
          url: "https://facebook.com/johndoe",
          isVerified: false,
          isPublic: false, // This should not be displayed
        },
      ],
    }

    render(<UserProfileCard user={userWithPrivateLinks} />)

    expect(screen.getByText("twitter")).toBeInTheDocument()
    expect(screen.queryByText("facebook")).not.toBeInTheDocument()
  })

  it("shows quick action links for own profile", () => {
    render(<UserProfileCard user={mockUser} isOwnProfile={true} />)

    const manageProjectsLink = screen.getByText("Manage Projects")
    expect(manageProjectsLink.closest("a")).toHaveAttribute(
      "href",
      "/profile/projects"
    )

    const donationHistoryLink = screen.getByText("Donation History")
    expect(donationHistoryLink.closest("a")).toHaveAttribute(
      "href",
      "/profile/donations"
    )
  })
})
