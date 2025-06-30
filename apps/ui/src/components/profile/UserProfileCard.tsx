'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    MapPinIcon,
    GlobeAltIcon,
    CheckBadgeIcon,
    HeartIcon,
    FolderIcon,
    CalendarIcon
} from '@heroicons/react/24/outline'
import { UserProfile, SocialLink } from '@/types/user'

interface UserProfileCardProps {
    user: UserProfile
    isOwnProfile?: boolean
    showStats?: boolean
    className?: string
}

const socialIcons = {
    twitter: '🐦',
    facebook: '📘',
    linkedin: '💼',
    instagram: '📷',
    youtube: '📺',
    website: '🌐',
    github: '💻',
    discord: '🎮'
}

export default function UserProfileCard({
    user,
    isOwnProfile = false,
    showStats = true,
    className = ''
}: UserProfileCardProps) {
    const displayName = user.displayName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username
    const joinDate = new Date(user.createdAt).toLocaleDateString()

    return (
        <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
            {/* Cover Image */}
            {user.coverImage && (
                <div className="h-32 sm:h-48 relative">
                    <Image
                        src={user.coverImage.url}
                        alt="Cover"
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <div className="p-6">
                {/* Profile Header */}
                <div className="flex items-start gap-4 mb-6">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            {user.avatar ? (
                                <Image
                                    src={user.avatar.url}
                                    alt={displayName}
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                                    {displayName.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        {/* Verification Badge */}
                        {user.isVerified && (
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                                <CheckBadgeIcon className="w-4 h-4 text-white" />
                            </div>
                        )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                                {displayName}
                            </h1>
                            {user.isVerified && (
                                <CheckBadgeIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            )}
                        </div>

                        <p className="text-gray-600 mb-2">@{user.vanityUrl || user.username}</p>

                        {user.bio && (
                            <p className="text-gray-700 text-sm leading-relaxed mb-3">
                                {user.bio}
                            </p>
                        )}

                        {/* Location & Website */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                            {user.location && (
                                <div className="flex items-center gap-1">
                                    <MapPinIcon className="w-4 h-4" />
                                    <span>{user.location}</span>
                                </div>
                            )}

                            {user.website && (
                                <a
                                    href={user.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                >
                                    <GlobeAltIcon className="w-4 h-4" />
                                    <span>Website</span>
                                </a>
                            )}

                            <div className="flex items-center gap-1">
                                <CalendarIcon className="w-4 h-4" />
                                <span>Joined {joinDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                {user.socialLinks && user.socialLinks.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Social Links</h3>
                        <div className="flex flex-wrap gap-2">
                            {user.socialLinks.filter((link: SocialLink) => link.isPublic).map((social: SocialLink, index: number) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                                    title={social.platform}
                                >
                                    <span>{socialIcons[social.platform as keyof typeof socialIcons]}</span>
                                    <span className="capitalize">{social.platform}</span>
                                    {social.isVerified && <CheckBadgeIcon className="w-3 h-3 text-blue-500" />}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Statistics */}
                {showStats && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                        <div className="text-center">
                            <div className="text-xl sm:text-2xl font-bold text-gray-900">
                                {user.Projects?.length || 0}
                            </div>
                            <div className="text-xs text-gray-600">Projects</div>
                        </div>

                        <div className="text-center">
                            <div className="text-xl sm:text-2xl font-bold text-green-600">
                                ${user.totalRaised?.toLocaleString() || '0'}
                            </div>
                            <div className="text-xs text-gray-600">Raised</div>
                        </div>

                        <div className="text-center">
                            <div className="text-xl sm:text-2xl font-bold text-blue-600">
                                ${user.totalDonated?.toLocaleString() || '0'}
                            </div>
                            <div className="text-xs text-gray-600">Donated</div>
                        </div>

                        <div className="text-center">
                            <div className="text-xl sm:text-2xl font-bold text-purple-600">
                                {user.reputation || 0}
                            </div>
                            <div className="text-xs text-gray-600">Reputation</div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                    {isOwnProfile ? (
                        <Link
                            href="/profile/edit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium text-center transition-colors"
                        >
                            Edit Profile
                        </Link>
                    ) : (
                        <>
                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                Follow
                            </button>
                            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors">
                                <HeartIcon className="w-5 h-5 text-gray-600" />
                            </button>
                        </>
                    )}
                </div>

                {/* Quick Actions */}
                {isOwnProfile && (
                    <div className="mt-4 flex gap-2">
                        <Link
                            href="/profile/projects"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <FolderIcon className="w-4 h-4" />
                            Manage Projects
                        </Link>
                        <Link
                            href="/profile/donations"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <HeartIcon className="w-4 h-4" />
                            Donation History
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}