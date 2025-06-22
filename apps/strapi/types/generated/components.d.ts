import type { Schema, Struct } from "@strapi/strapi"

export interface ElementsFooterItem extends Struct.ComponentSchema {
  collectionName: "components_elements_footer_items"
  info: {
    description: ""
    displayName: "FooterItem"
  }
  attributes: {
    links: Schema.Attribute.Component<"utilities.link", true>
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface FormsContactForm extends Struct.ComponentSchema {
  collectionName: "components_forms_contact_forms"
  info: {
    displayName: "ContactForm"
  }
  attributes: {
    description: Schema.Attribute.Text
    gdpr: Schema.Attribute.Component<"utilities.link", false>
    title: Schema.Attribute.String
  }
}

export interface FormsNewsletterForm extends Struct.ComponentSchema {
  collectionName: "components_forms_newsletter_forms"
  info: {
    displayName: "Newsletter"
  }
  attributes: {
    description: Schema.Attribute.Text
    gdpr: Schema.Attribute.Component<"utilities.link", false>
    title: Schema.Attribute.String
  }
}

export interface ProjectReward extends Struct.ComponentSchema {
  collectionName: "components_project_rewards"
  info: {
    description: "Project reward/perk for backers"
    displayName: "Reward"
  }
  attributes: {
    Amount: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0
        },
        number
      >
    ClaimedQuantity: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>
    Currency: Schema.Attribute.Enumeration<["USD", "EUR", "GBP", "VND"]> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"USD">
    Description: Schema.Attribute.Text & Schema.Attribute.Required
    EstimatedDelivery: Schema.Attribute.Date
    Image: Schema.Attribute.Media<"images">
    IsActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>
    LimitedQuantity: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0
        },
        number
      >
    Title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100
      }>
  }
}

export interface SectionsAnimatedLogoRow extends Struct.ComponentSchema {
  collectionName: "components_sections_animated_logo_rows"
  info: {
    description: ""
    displayName: "AnimatedLogoRow"
  }
  attributes: {
    logos: Schema.Attribute.Component<"utilities.basic-image", true>
    text: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface SectionsCarousel extends Struct.ComponentSchema {
  collectionName: "components_sections_carousels"
  info: {
    description: ""
    displayName: "Carousel"
  }
  attributes: {
    images: Schema.Attribute.Component<"utilities.image-with-link", true>
    radius: Schema.Attribute.Enumeration<["sm", "md", "lg", "xl", "full"]>
  }
}

export interface SectionsCtaSection extends Struct.ComponentSchema {
  collectionName: "components_sections_cta_sections"
  info: {
    description: "Call-to-action section with title, description, and action buttons"
    displayName: "CTA Section"
  }
  attributes: {
    backgroundColor: Schema.Attribute.Enumeration<
      [
        "gradient-blue-purple",
        "gradient-green-blue",
        "solid-blue",
        "solid-purple",
      ]
    > &
      Schema.Attribute.DefaultTo<"gradient-blue-purple">
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Whether you're an innovator with a groundbreaking idea or a supporter looking to fund change, Give is your platform to make it happen.">
    primaryButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"/start-project">
    primaryButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Launch Your Project">
    secondaryButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"/projects">
    secondaryButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Support a Project">
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Ready to make an impact?">
  }
}

export interface SectionsFaq extends Struct.ComponentSchema {
  collectionName: "components_sections_faqs"
  info: {
    description: ""
    displayName: "Faq"
  }
  attributes: {
    accordions: Schema.Attribute.Component<"utilities.accordions", true>
    subTitle: Schema.Attribute.String
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface SectionsFeaturedProjects extends Struct.ComponentSchema {
  collectionName: "components_sections_featured_projects"
  info: {
    description: "A section displaying featured projects"
    displayName: "Featured Projects"
  }
  attributes: {
    limit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 12
          min: 1
        },
        number
      > &
      Schema.Attribute.DefaultTo<6>
    showViewAllButton: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>
    subtitle: Schema.Attribute.Text
    title: Schema.Attribute.String & Schema.Attribute.Required
    viewAllButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"View all projects">
  }
}

export interface SectionsHeadingWithCtaButton extends Struct.ComponentSchema {
  collectionName: "components_sections_heading_with_cta_buttons"
  info: {
    description: ""
    displayName: "HeadingWithCTAButton"
  }
  attributes: {
    cta: Schema.Attribute.Component<"utilities.link", false>
    subText: Schema.Attribute.String
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: "components_sections_heroes"
  info: {
    description: ""
    displayName: "Hero"
  }
  attributes: {
    bgColor: Schema.Attribute.String &
      Schema.Attribute.CustomField<"plugin::color-picker.color">
    image: Schema.Attribute.Component<"utilities.basic-image", false>
    links: Schema.Attribute.Component<"utilities.link", true>
    steps: Schema.Attribute.Component<"utilities.text", true>
    subTitle: Schema.Attribute.String
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface SectionsHeroCrowdfunding extends Struct.ComponentSchema {
  collectionName: "components_sections_hero_crowdfundings"
  info: {
    description: "Hero section for crowdfunding platform with title, subtitle, and CTA buttons"
    displayName: "Hero Crowdfunding"
  }
  attributes: {
    backgroundImage: Schema.Attribute.Media<"images">
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"\uD83D\uDE80 Funding Innovation Since 2024">
    primaryButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"/projects">
    primaryButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Explore Projects">
    secondaryButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"/start-project">
    secondaryButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Start a Project">
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Discover groundbreaking projects and support innovators who are solving real-world problems. Join a community of forward-thinking backers making change happen.">
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Give to Change">
  }
}

export interface SectionsHorizontalImages extends Struct.ComponentSchema {
  collectionName: "components_sections_horizontal_images"
  info: {
    description: ""
    displayName: "HorizontalImages"
  }
  attributes: {
    fixedImageHeight: Schema.Attribute.Integer
    fixedImageWidth: Schema.Attribute.Integer
    imageRadius: Schema.Attribute.Enumeration<["sm", "md", "lg", "xl", "full"]>
    images: Schema.Attribute.Component<"utilities.image-with-link", true>
    spacing: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 20
          min: 0
        },
        number
      >
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface SectionsImageWithCtaButton extends Struct.ComponentSchema {
  collectionName: "components_sections_image_with_cta_buttons"
  info: {
    description: ""
    displayName: "ImageWithCTAButton"
  }
  attributes: {
    image: Schema.Attribute.Component<"utilities.basic-image", false>
    link: Schema.Attribute.Component<"utilities.link", false>
    subText: Schema.Attribute.String
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface SectionsStatsSection extends Struct.ComponentSchema {
  collectionName: "components_sections_stats_sections"
  info: {
    description: "A section displaying statistics"
    displayName: "Stats Section"
  }
  attributes: {
    stats: Schema.Attribute.Component<"utilities.stat-item", true>
    subtitle: Schema.Attribute.Text
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface SeoUtilitiesMetaSocial extends Struct.ComponentSchema {
  collectionName: "components_seo_utilities_meta_socials"
  info: {
    displayName: "metaSocial"
    icon: "project-diagram"
  }
  attributes: {
    description: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 65
      }>
    image: Schema.Attribute.Media<"images" | "files" | "videos">
    socialNetwork: Schema.Attribute.Enumeration<["Facebook", "Twitter"]> &
      Schema.Attribute.Required
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60
      }>
  }
}

export interface SeoUtilitiesSeo extends Struct.ComponentSchema {
  collectionName: "components_seo_utilities_seos"
  info: {
    description: ""
    displayName: "seo"
    icon: "search"
  }
  attributes: {
    applicationName: Schema.Attribute.String
    canonicalUrl: Schema.Attribute.String
    email: Schema.Attribute.String
    keywords: Schema.Attribute.Text
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160
      }>
    metaImage: Schema.Attribute.Media<"images">
    metaRobots: Schema.Attribute.Enumeration<
      [
        "all",
        "index",
        "index,follow",
        "noindex",
        "noindex,follow",
        "noindex,nofollow",
        "none",
        "noarchive",
        "nosnippet",
        "max-snippet",
      ]
    > &
      Schema.Attribute.DefaultTo<"all">
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60
      }>
    og: Schema.Attribute.Component<"seo-utilities.seo-og", false>
    siteName: Schema.Attribute.String
    structuredData: Schema.Attribute.JSON
    twitter: Schema.Attribute.Component<"seo-utilities.seo-twitter", false>
  }
}

export interface SeoUtilitiesSeoOg extends Struct.ComponentSchema {
  collectionName: "components_seo_utilities_seo_ogs"
  info: {
    displayName: "SeoOg"
    icon: "oneToMany"
  }
  attributes: {
    description: Schema.Attribute.String
    image: Schema.Attribute.Media<"images">
    title: Schema.Attribute.String
    type: Schema.Attribute.Enumeration<["website", "article"]> &
      Schema.Attribute.DefaultTo<"website">
    url: Schema.Attribute.String
  }
}

export interface SeoUtilitiesSeoTwitter extends Struct.ComponentSchema {
  collectionName: "components_seo_utilities_seo_twitters"
  info: {
    displayName: "SeoTwitter"
    icon: "oneToMany"
  }
  attributes: {
    card: Schema.Attribute.String
    creator: Schema.Attribute.String
    creatorId: Schema.Attribute.String
    description: Schema.Attribute.String
    images: Schema.Attribute.Media<"images", true>
    siteId: Schema.Attribute.String
    title: Schema.Attribute.String
  }
}

export interface SeoUtilitiesSocialIcons extends Struct.ComponentSchema {
  collectionName: "components_seo_utilities_social_icons"
  info: {
    displayName: "SocialIcons"
  }
  attributes: {
    socials: Schema.Attribute.Component<"utilities.image-with-link", true>
    title: Schema.Attribute.String
  }
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: "components_shared_meta_socials"
  info: {
    displayName: "metaSocial"
    icon: "project-diagram"
  }
  attributes: {
    description: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 65
      }>
    image: Schema.Attribute.Media<"images" | "files" | "videos">
    socialNetwork: Schema.Attribute.Enumeration<["Facebook", "Twitter"]> &
      Schema.Attribute.Required
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60
      }>
  }
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: "components_shared_seos"
  info: {
    displayName: "seo"
    icon: "search"
  }
  attributes: {
    canonicalURL: Schema.Attribute.String
    keywords: Schema.Attribute.Text
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160
        minLength: 50
      }>
    metaImage: Schema.Attribute.Media<"images" | "files" | "videos">
    metaRobots: Schema.Attribute.String
    metaSocial: Schema.Attribute.Component<"shared.meta-social", true>
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60
      }>
    metaViewport: Schema.Attribute.String
    structuredData: Schema.Attribute.JSON
  }
}

export interface UtilitiesAccordions extends Struct.ComponentSchema {
  collectionName: "components_utilities_accordions"
  info: {
    description: ""
    displayName: "Accordions"
  }
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required
    question: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface UtilitiesBasicImage extends Struct.ComponentSchema {
  collectionName: "components_utilities_basic_images"
  info: {
    displayName: "BasicImage"
  }
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.Required
    fallbackSrc: Schema.Attribute.String
    height: Schema.Attribute.Integer
    media: Schema.Attribute.Media<"images" | "videos"> &
      Schema.Attribute.Required
    width: Schema.Attribute.Integer
  }
}

export interface UtilitiesCkEditorContent extends Struct.ComponentSchema {
  collectionName: "components_utilities_ck_editor_contents"
  info: {
    displayName: "CkEditorContent"
  }
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        "plugin::ckeditor5.CKEditor",
        {
          preset: "defaultCkEditor"
        }
      >
  }
}

export interface UtilitiesImageWithLink extends Struct.ComponentSchema {
  collectionName: "components_utilities_image_with_links"
  info: {
    description: ""
    displayName: "ImageWithLink"
  }
  attributes: {
    image: Schema.Attribute.Component<"utilities.basic-image", false>
    link: Schema.Attribute.Component<"utilities.link", false>
  }
}

export interface UtilitiesLink extends Struct.ComponentSchema {
  collectionName: "components_utilities_links"
  info: {
    displayName: "Link"
  }
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required
    label: Schema.Attribute.String & Schema.Attribute.Required
    newTab: Schema.Attribute.Boolean
  }
}

export interface UtilitiesLinksWithTitle extends Struct.ComponentSchema {
  collectionName: "components_utilities_links_with_titles"
  info: {
    displayName: "LinksWithTitle"
  }
  attributes: {
    links: Schema.Attribute.Component<"utilities.link", true>
    title: Schema.Attribute.String
  }
}

export interface UtilitiesSocialLink extends Struct.ComponentSchema {
  collectionName: "components_utilities_social_links"
  info: {
    description: "Social media link with icon"
    displayName: "Social Link"
  }
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ["facebook", "instagram", "twitter", "github", "youtube", "linkedin"]
    > &
      Schema.Attribute.Required
    url: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface UtilitiesStatItem extends Struct.ComponentSchema {
  collectionName: "components_utilities_stat_items"
  info: {
    description: "Individual statistic item with title, value, and change percentage"
    displayName: "Stat Item"
  }
  attributes: {
    change: Schema.Attribute.String
    changeType: Schema.Attribute.Enumeration<
      ["positive", "negative", "neutral"]
    > &
      Schema.Attribute.DefaultTo<"positive">
    title: Schema.Attribute.String & Schema.Attribute.Required
    value: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface UtilitiesText extends Struct.ComponentSchema {
  collectionName: "components_utilities_texts"
  info: {
    displayName: "Text"
  }
  attributes: {
    text: Schema.Attribute.String
  }
}

export interface UtilitiesVideoUrl extends Struct.ComponentSchema {
  collectionName: "components_utilities_video_urls"
  info: {
    description: "YouTube video URL with title"
    displayName: "Video URL"
  }
  attributes: {
    title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100
      }>
    url: Schema.Attribute.String & Schema.Attribute.Required
  }
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "elements.footer-item": ElementsFooterItem
      "forms.contact-form": FormsContactForm
      "forms.newsletter-form": FormsNewsletterForm
      "project.reward": ProjectReward
      "sections.animated-logo-row": SectionsAnimatedLogoRow
      "sections.carousel": SectionsCarousel
      "sections.cta-section": SectionsCtaSection
      "sections.faq": SectionsFaq
      "sections.featured-projects": SectionsFeaturedProjects
      "sections.heading-with-cta-button": SectionsHeadingWithCtaButton
      "sections.hero": SectionsHero
      "sections.hero-crowdfunding": SectionsHeroCrowdfunding
      "sections.horizontal-images": SectionsHorizontalImages
      "sections.image-with-cta-button": SectionsImageWithCtaButton
      "sections.stats-section": SectionsStatsSection
      "seo-utilities.meta-social": SeoUtilitiesMetaSocial
      "seo-utilities.seo": SeoUtilitiesSeo
      "seo-utilities.seo-og": SeoUtilitiesSeoOg
      "seo-utilities.seo-twitter": SeoUtilitiesSeoTwitter
      "seo-utilities.social-icons": SeoUtilitiesSocialIcons
      "shared.meta-social": SharedMetaSocial
      "shared.seo": SharedSeo
      "utilities.accordions": UtilitiesAccordions
      "utilities.basic-image": UtilitiesBasicImage
      "utilities.ck-editor-content": UtilitiesCkEditorContent
      "utilities.image-with-link": UtilitiesImageWithLink
      "utilities.link": UtilitiesLink
      "utilities.links-with-title": UtilitiesLinksWithTitle
      "utilities.social-link": UtilitiesSocialLink
      "utilities.stat-item": UtilitiesStatItem
      "utilities.text": UtilitiesText
      "utilities.video-url": UtilitiesVideoUrl
    }
  }
}
