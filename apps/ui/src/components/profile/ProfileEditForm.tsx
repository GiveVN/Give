'use client'

import React, { useState, useEffect } from 'react'
import {
    UserIcon,
    EnvelopeIcon,
    MapPinIcon,
    GlobeAltIcon,
    PlusIcon,
    XMarkIcon,
    PhotoIcon,
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/react/24/outline'
import { UserProfile, SocialLink, UpdateProfileData } from '@/types/user'

interface ProfileEditFormProps {
    user: UserProfile
    onSave: (data: UpdateProfileData) => Promise<void>
    onCancel: () => void
    isLoading?: boolean
}

const socialPlatforms = [
    { value: 'twitter', label: 'Twitter', icon: '🐦' },
    { value: 'facebook', label: 'Facebook', icon: '📘' },
    { value: 'linkedin', label: 'LinkedIn', icon: '💼' },
    { value: 'instagram', label: 'Instagram', icon: '📷' },
    { value: 'youtube', label: 'YouTube', icon: '📺' },
    { value: 'website', label: 'Website', icon: '🌐' },
    { value: 'github', label: 'GitHub', icon: '💻' },
    { value: 'discord', label: 'Discord', icon: '🎮' },
]

export default function ProfileEditForm({
    user,
    onSave,
    onCancel,
    isLoading = false
}: ProfileEditFormProps) {
    const [formData, setFormData] = useState<UpdateProfileData>({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        displayName: user.displayName || '',
        vanityUrl: user.vanityUrl || '',
        bio: user.bio || '',
        website: user.website || '',
        location: user.location || '',
        timezone: user.timezone || '',
        socialLinks: user.socialLinks || [],
        privacySettings: user.privacySettings || {
            showEmail: false,
            showLocation: true,
            showBackedProjects: true,
            showCreatedProjects: true,
            allowMessages: 'all',
            showActivityFeed: true,
            showDonationHistory: false,
            profileVisibility: 'public',
        },
        notificationSettings: user.notificationSettings || {
            emailNotifications: true,
            pushNotifications: true,
            projectUpdates: true,
            newFollowers: true,
            messages: true,
            marketingEmails: false,
            weeklyDigest: true,
            donationReceipts: true,
            projectMilestones: true,
            commentReplies: true,
        },
    })

    const [vanityUrlAvailable, setVanityUrlAvailable] = useState<boolean | null>(null)
    const [vanityUrlChecking, setVanityUrlChecking] = useState(false)
    const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'notifications'>('profile')

    // Check vanity URL availability
    useEffect(() => {
        if (formData.vanityUrl && formData.vanityUrl !== user.vanityUrl) {
            setVanityUrlChecking(true)
            const timeoutId = setTimeout(async () => {
                try {
                    const response = await fetch(`/api/users/check-vanity/${formData.vanityUrl}`)
                    const data = await response.json()
                    setVanityUrlAvailable(data.available)
                } catch (error) {
                    console.error('Failed to check vanity URL:', error)
                } finally {
                    setVanityUrlChecking(false)
                }
            }, 500)

            return () => clearTimeout(timeoutId)
        } else {
            setVanityUrlAvailable(null)
        }
    }, [formData.vanityUrl, user.vanityUrl])

    const handleInputChange = (field: keyof UpdateProfileData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: any) => {
        const updatedLinks = [...(formData.socialLinks || [])]
        updatedLinks[index] = { ...updatedLinks[index], [field]: value }
        handleInputChange('socialLinks', updatedLinks)
    }

    const addSocialLink = () => {
        const newLink: SocialLink = {
            platform: 'twitter' as const,
            url: '',
            username: '',
            isVerified: false,
            isPublic: true,
        }
        handleInputChange('socialLinks', [...(formData.socialLinks || []), newLink])
    }

    const removeSocialLink = (index: number) => {
        const updatedLinks = [...(formData.socialLinks || [])]
        updatedLinks.splice(index, 1)
        handleInputChange('socialLinks', updatedLinks)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (vanityUrlAvailable === false) return

        try {
            await onSave(formData)
        } catch (error) {
            console.error('Failed to save profile:', error)
        }
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
                <p className="text-gray-600 mt-1">Update your profile information and settings</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                    {[
                        { id: 'profile', label: 'Profile', icon: UserIcon },
                        { id: 'privacy', label: 'Privacy', icon: EyeIcon },
                        { id: 'notifications', label: 'Notifications', icon: EnvelopeIcon },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="p-6">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            {/* Basic Information */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.firstName || ''}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter your first name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.lastName || ''}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter your last name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Display Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.displayName || ''}
                                            onChange={(e) => handleInputChange('displayName', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="How should we display your name?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Vanity URL
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 text-sm">give.local/u/</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={formData.vanityUrl || ''}
                                                onChange={(e) => handleInputChange('vanityUrl', e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                                                className={`w-full pl-24 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${vanityUrlAvailable === false ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="your-custom-url"
                                            />
                                            {vanityUrlChecking && (
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                                </div>
                                            )}
                                        </div>
                                        {vanityUrlAvailable === false && (
                                            <p className="text-red-600 text-sm mt-1">This URL is already taken</p>
                                        )}
                                        {vanityUrlAvailable === true && (
                                            <p className="text-green-600 text-sm mt-1">This URL is available</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bio
                                </label>
                                <textarea
                                    value={formData.bio || ''}
                                    onChange={(e) => handleInputChange('bio', e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Tell us about yourself..."
                                    maxLength={500}
                                />
                                <p className="text-gray-500 text-sm mt-1">
                                    {(formData.bio || '').length}/500 characters
                                </p>
                            </div>

                            {/* Location & Website */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPinIcon className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.location || ''}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="City, Country"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Website
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <GlobeAltIcon className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="url"
                                            value={formData.website || ''}
                                            onChange={(e) => handleInputChange('website', e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="https://yourwebsite.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900">Social Links</h2>
                                    <button
                                        type="button"
                                        onClick={addSocialLink}
                                        className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                        Add Link
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {formData.socialLinks?.map((link, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                                            <select
                                                value={link.platform}
                                                onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                {socialPlatforms.map((platform) => (
                                                    <option key={platform.value} value={platform.value}>
                                                        {platform.icon} {platform.label}
                                                    </option>
                                                ))}
                                            </select>

                                            <input
                                                type="url"
                                                value={link.url}
                                                onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="https://..."
                                            />

                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={link.isPublic}
                                                    onChange={(e) => handleSocialLinkChange(index, 'isPublic', e.target.checked)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">Public</span>
                                            </label>

                                            <button
                                                type="button"
                                                onClick={() => removeSocialLink(index)}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <XMarkIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Privacy Tab */}
                    {activeTab === 'privacy' && formData.privacySettings && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-gray-900">Privacy Settings</h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Show Email Address</h3>
                                        <p className="text-sm text-gray-600">Allow others to see your email address</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.privacySettings.showEmail}
                                            onChange={(e) => handleInputChange('privacySettings', {
                                                ...formData.privacySettings,
                                                showEmail: e.target.checked
                                            })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Show Location</h3>
                                        <p className="text-sm text-gray-600">Display your location on your profile</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.privacySettings.showLocation}
                                            onChange={(e) => handleInputChange('privacySettings', {
                                                ...formData.privacySettings,
                                                showLocation: e.target.checked
                                            })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Show Backed Projects</h3>
                                        <p className="text-sm text-gray-600">Display projects you've supported</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.privacySettings.showBackedProjects}
                                            onChange={(e) => handleInputChange('privacySettings', {
                                                ...formData.privacySettings,
                                                showBackedProjects: e.target.checked
                                            })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="p-4 border border-gray-200 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-2">Profile Visibility</h3>
                                    <p className="text-sm text-gray-600 mb-3">Control who can see your profile</p>
                                    <div className="space-y-2">
                                        {[
                                            { value: 'public', label: 'Public', desc: 'Anyone can view your profile' },
                                            { value: 'authenticated', label: 'Authenticated Users', desc: 'Only logged-in users can view' },
                                            { value: 'private', label: 'Private', desc: 'Only you can view your profile' },
                                        ].map((option) => (
                                            <label key={option.value} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="profileVisibility"
                                                    value={option.value}
                                                    checked={formData.privacySettings?.profileVisibility === option.value}
                                                    onChange={(e) => handleInputChange('privacySettings', {
                                                        ...formData.privacySettings,
                                                        profileVisibility: e.target.value as any
                                                    })}
                                                    className="text-blue-600 focus:ring-blue-500"
                                                />
                                                <div>
                                                    <div className="font-medium text-gray-900">{option.label}</div>
                                                    <div className="text-sm text-gray-600">{option.desc}</div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && formData.notificationSettings && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>

                            <div className="space-y-4">
                                {[
                                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications in browser' },
                                    { key: 'projectUpdates', label: 'Project Updates', desc: 'Get notified when projects you support are updated' },
                                    { key: 'newFollowers', label: 'New Followers', desc: 'Get notified when someone follows you' },
                                    { key: 'messages', label: 'Messages', desc: 'Get notified when you receive messages' },
                                    { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive promotional emails and newsletters' },
                                    { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Receive a weekly summary of activity' },
                                    { key: 'donationReceipts', label: 'Donation Receipts', desc: 'Receive receipts for your donations' },
                                    { key: 'projectMilestones', label: 'Project Milestones', desc: 'Get notified when projects reach milestones' },
                                    { key: 'commentReplies', label: 'Comment Replies', desc: 'Get notified when someone replies to your comments' },
                                ].map((setting) => (
                                    <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{setting.label}</h3>
                                            <p className="text-sm text-gray-600">{setting.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.notificationSettings![setting.key as keyof typeof formData.notificationSettings]}
                                                onChange={(e) => handleInputChange('notificationSettings', {
                                                    ...formData.notificationSettings,
                                                    [setting.key]: e.target.checked
                                                })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading || vanityUrlAvailable === false}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    )
}