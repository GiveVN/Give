import { Fragment } from "react"
import Image from "next/image"

import { AppLocale } from "@/types/general"

import { PublicStrapiClient } from "@/lib/strapi-api"
import { cn } from "@/lib/styles"
import { Container } from "@/components/elementary/Container"
import StrapiImageWithLink from "@/components/page-builder/components/utilities/StrapiImageWithLink"
import StrapiLink from "@/components/page-builder/components/utilities/StrapiLink"
import { SocialIcon } from "@/components/page-builder/components/utilities/SocialIcon"

async function fetchData(locale: AppLocale) {
  try {
    const result = await PublicStrapiClient.fetchOne("api::footer.footer", undefined, {
      locale,
      populate: {
        sections: { 
          populate: { 
            links: { 
              populate: "*" 
            } 
          } 
        },
        logoImage: { 
          populate: { 
            image: { 
              populate: {
                media: { populate: "*" }
              }
            }, 
            link: { populate: "*" }
          } 
        },
        links: { populate: "*" },
        socialLinks: { populate: "*" },
      },
    })
    
    console.log("Footer data fetched:", JSON.stringify(result, null, 2))
    return result
  } catch (error) {
    console.error("Error fetching footer data:", error)
    return null
  }
}

// Custom FooterLogo component để handle nested data structure
function FooterLogo({ logoImage }: { logoImage: any }) {
  if (!logoImage?.image?.media) {
    return null
  }

  const { image, link } = logoImage
  const { media, alt } = image
  
  // Sử dụng small format cho footer, fallback to original
  const imageUrl = media.formats?.small?.url || media.url
  const imageWidth = media.formats?.small?.width || media.width
  const imageHeight = media.formats?.small?.height || media.height
  
  const logoElement = (
    <Image
      src={`http://localhost:1338${imageUrl}`}
      alt={alt && alt.trim() ? alt : "Give Logo"}
      width={Math.min(imageWidth, 120)} // Limit max width to 120px for footer
      height={Math.min(imageHeight, 60)} // Limit max height to 60px for footer
      className="h-auto max-h-12 w-auto max-w-[120px] object-contain"
      priority
    />
  )

  if (link?.href) {
    return (
      <a
        href={link.href}
        target={link.newTab ? "_blank" : undefined}
        rel={link.newTab ? "noopener noreferrer" : undefined}
        className="block"
      >
        {logoElement}
      </a>
    )
  }

  return logoElement
}

export async function StrapiFooter({ locale }: { locale: AppLocale }) {
  const data = await fetchData(locale)

  console.log("StrapiFooter render - data:", data)
  console.log("StrapiFooter render - sections:", data?.sections)
  if (!data) {
    console.log("StrapiFooter: No data, returning null")
    return null
  }

  const { sections, logoImage, links, copyRight, socialLinks } = data.data || data

  console.log("StrapiFooter: Extracted data", { sections, logoImage, links, copyRight })

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <FooterLogo logoImage={logoImage} />
            </div>
            

          </div>

          {/* Menu Sections - Reduced gap from gap-8 to gap-6 */}
          {sections && sections.length > 0 && (
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sections.map((section: any) => (
                <div key={section.id}>
                  <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                    {section.title}
                  </h3>
                  {section.links && section.links.length > 0 && (
                    <ul className="space-y-3 list-none">
                      {section.links.map((link: any) => (
                        <li key={link.id}>
                          <StrapiLink
                            component={link}
                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            {copyRight && (
              <p className="text-sm text-gray-500">{copyRight}</p>
            )}

            {/* Additional Links */}
            {links && links.length > 0 && (
                             <div className="flex flex-wrap gap-6">
                 {links.map((link: any) => (
                   <StrapiLink
                     key={link.id}
                     component={link}
                     className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                   />
                 ))}
               </div>
            )}

            {/* Social Links - Commented out until socialLinks field is added to Strapi */}
            {/* {socialLinks && socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map((socialLink: any) => (
                  <SocialIcon
                    key={socialLink.id}
                    platform={socialLink.platform}
                    url={socialLink.url}
                  />
                ))}
              </div>
            )} */}
          </div>
        </div>
      </Container>
    </footer>
  )
}

StrapiFooter.displayName = "StrapiFooter"

export default StrapiFooter
