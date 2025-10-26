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

export const categoryIcons: Record<string, React.ReactNode> = {
  // Give categories
  "disaster-relief": <Home className="h-4 w-4" />,
  "poverty-alleviation": <HandHeart className="h-4 w-4" />,
  healthcare: <Stethoscope className="h-4 w-4" />,
  education: <GraduationCap className="h-4 w-4" />,
  environment: <Trees className="h-4 w-4" />,
  "animal-welfare": <Cat className="h-4 w-4" />,
  "community-development": <Users className="h-4 w-4" />,
  "humanitarian-aid": <Heart className="h-4 w-4" />,

  // Back categories
  technology: <Cpu className="h-4 w-4" />,
  arts: <Palette className="h-4 w-4" />,
  "film-video": <Film className="h-4 w-4" />,
  games: <Gamepad2 className="h-4 w-4" />,
  music: <Music className="h-4 w-4" />,
  publishing: <BookOpen className="h-4 w-4" />,
  "food-craft": <Utensils className="h-4 w-4" />,
  "design-fashion": <Shirt className="h-4 w-4" />,

  // Default
  default: <Heart className="h-4 w-4" />,
}

export function getCategoryIcon(category: string | any): React.ReactNode {
  // If category is an object, get the Slug
  const categorySlug =
    typeof category === "object" && category !== null
      ? (category.Slug || category.Name || "")
          .toLowerCase()
          .replace(/\s+/g, "-")
      : (category || "").toLowerCase().replace(/\s+/g, "-")

  return categoryIcons[categorySlug] || categoryIcons["default"]
}
