import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
  LayoutDashboard,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2
} from "lucide-react"

const data = {
  projects: [
    {
      name: "Small GIS - Recruitment",
      logo: Command,
      plan: "Enterprise"
    },
    {
      name: "Small GIS - AI",
      logo: AudioWaveform,
      plan: "Startup"
    }
  ],
  navMain: [
    // {
    //   title: "Search",
    //   url: "#",
    //   icon: Search
    // },
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true
    }
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion
    }
  ],
  favorites: [
    {
      name: "Project Management & Task Tracking",
      url: "#",
      emoji: "📊"
    },
    {
      name: "Family Recipe Collection & Meal Planning",
      url: "#",
      emoji: "🍳"
    },
    {
      name: "Fitness Tracker & Workout Routines",
      url: "#",
      emoji: "💪"
    },
    {
      name: "Book Notes & Reading List",
      url: "#",
      emoji: "📚"
    },
    {
      name: "Sustainable Gardening Tips & Plant Care",
      url: "#",
      emoji: "🌱"
    },
    {
      name: "Language Learning Progress & Resources",
      url: "#",
      emoji: "🗣️"
    },
    {
      name: "Home Renovation Ideas & Budget Tracker",
      url: "#",
      emoji: "🏠"
    },
    {
      name: "Personal Finance & Investment Portfolio",
      url: "#",
      emoji: "💰"
    },
    {
      name: "Movie & TV Show Watchlist with Reviews",
      url: "#",
      emoji: "🎬"
    },
    {
      name: "Daily Habit Tracker & Goal Setting",
      url: "#",
      emoji: "✅"
    }
  ],
  tasks: [
    {
      name: "Small GIS - Recruitment",
      emoji: "🏠",
      url: "#",
      pages: [
        {
          name: "Daily Journal & Reflection",
          url: "#",
          emoji: "📔"
        },
        {
          name: "Health & Wellness Tracker",
          url: "#",
          emoji: "🍏"
        },
        {
          name: "Personal Growth & Learning Goals",
          url: "#",
          emoji: "🌟"
        }
      ]
    },
    {
      name: "Small GIS - AI",
      emoji: "💼",
      url: "#",
      pages: [
        {
          name: "Career Objectives & Milestones",
          url: "#",
          emoji: "🎯"
        },
        {
          name: "Skill Acquisition & Training Log",
          url: "#",
          emoji: "🧠"
        },
        {
          name: "Networking Contacts & Events",
          url: "#",
          emoji: "🤝"
        }
      ]
    },
    {
      name: "Development Tasks",
      emoji: "🎨",
      url: "#",
      pages: [
        {
          name: "Writing Ideas & Story Outlines",
          url: "#",
          emoji: "✍️"
        },
        {
          name: "Art & Design Portfolio",
          url: "#",
          emoji: "🖼️"
        },
        {
          name: "Music Composition & Practice Log",
          url: "#",
          emoji: "🎵"
        }
      ]
    }
  ]
}
export {data};
