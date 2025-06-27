import { 
  Heart, 
  Home, 
  Stethoscope, 
  GraduationCap, 
  Trees, 
  Cat, 
  Users, 
  HandHeart,
  Cpu,
  Palette,
  Film,
  Gamepad2,
  Music,
  BookOpen,
  Utensils,
  Shirt
} from 'lucide-react'

export const categoryIcons: Record<string, React.ReactNode> = {
  // Give categories
  'disaster-relief': <Home className="w-4 h-4" />,
  'poverty-alleviation': <HandHeart className="w-4 h-4" />,
  'healthcare': <Stethoscope className="w-4 h-4" />,
  'education': <GraduationCap className="w-4 h-4" />,
  'environment': <Trees className="w-4 h-4" />,
  'animal-welfare': <Cat className="w-4 h-4" />,
  'community-development': <Users className="w-4 h-4" />,
  'humanitarian-aid': <Heart className="w-4 h-4" />,
  
  // Back categories
  'technology': <Cpu className="w-4 h-4" />,
  'arts': <Palette className="w-4 h-4" />,
  'film-video': <Film className="w-4 h-4" />,
  'games': <Gamepad2 className="w-4 h-4" />,
  'music': <Music className="w-4 h-4" />,
  'publishing': <BookOpen className="w-4 h-4" />,
  'food-craft': <Utensils className="w-4 h-4" />,
  'design-fashion': <Shirt className="w-4 h-4" />,
  
  // Default
  'default': <Heart className="w-4 h-4" />
}

export function getCategoryIcon(category: string | any): React.ReactNode {
  // If category is an object, get the Slug
  const categorySlug = typeof category === 'object' && category !== null 
    ? (category.Slug || category.Name || '').toLowerCase().replace(/\s+/g, '-')
    : (category || '').toLowerCase().replace(/\s+/g, '-')
  
  return categoryIcons[categorySlug] || categoryIcons['default']
} 