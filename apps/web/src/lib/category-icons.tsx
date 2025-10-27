import {
  BookOpen,
  Cat,
  Cpu,
  Film,
  Gamepad2,
  GraduationCap,
  HandHeart,
  Heart,
  Home,
  Music,
  Palette,
  Shirt,
  Stethoscope,
  Trees,
  Users,
  Utensils,
} from "lucide-react"

type IconComponent = typeof Home

export const categoryIcons: Record<string, IconComponent> = {
  // Give categories
  "disaster-relief": Home,
  "poverty-alleviation": HandHeart,
  healthcare: Stethoscope,
  education: GraduationCap,
  environment: Trees,
  "animal-welfare": Cat,
  "community-development": Users,
  "humanitarian-aid": Heart,

  // Back categories
  technology: Cpu,
  arts: Palette,
  "film-video": Film,
  games: Gamepad2,
  music: Music,
  publishing: BookOpen,
  "food-craft": Utensils,
  "design-fashion": Shirt,

  // Default
  default: Heart,
}

export function getCategoryIcon(category: string | any): React.ReactNode {
  // If category is an object, get the Slug
  const categorySlug =
    typeof category === "object" && category !== null
      ? (category.Slug || category.Name || "")
          .toLowerCase()
          .replace(/\s+/g, "-")
      : (category || "").toLowerCase().replace(/\s+/g, "-")

  const IconComponent = categoryIcons[categorySlug] || categoryIcons["default"]
  return <IconComponent className="h-4 w-4" />
}
