import {
  ic_analytic,
  ic_calender,
  ic_chat_bubble,
  ic_devices_other,
  ic_featured_play,
  ic_library_books,
  ic_people,
  ic_person,
  ic_reply,
  ic_rss_feed,
  ic_setting,
  ic_settings,
  ic_templat,
} from "@/styles/icons";

export const navItems = [
  {
    type: "DASHBOARD",
    nav: [
      {
        name: "Overview",
        icon: ic_people,
        pathName: "/",
      },
      {
        name: "Analytics",
        icon: ic_analytic,
        pathName: "/analytics",
      },
    ],
  },
  {
    type: "DEVICES",
    nav: [
      {
        name: "Attached Devices",
        icon: ic_devices_other,
        pathName: "/attached-devices",
      },
      {
        name: "Customer Devices",
        icon: ic_people,
        pathName: "/customer",
      },
    ],
  },

  {
    type: "MESSAGING",
    nav: [
      {
        name: "Templating",
        icon: ic_templat,
        pathName: "/templating",
      },
      {
        name: "Send Message",
        icon: ic_chat_bubble,
        pathName: "/send-message",
      },
      {
        name: "Auto Reply",
        icon: ic_reply,
        pathName: "/reply",
      },
      {
        name: "Broadcast",
        icon: ic_rss_feed,
        pathName: "/broadcast",
      },
      {
        name: "Scheduler",
        icon: ic_calender,
        pathName: "/sheculer",
      },
    ],
  },
  {
    type: "MEMBER",
    nav: [
      {
        name: "Member Plan",
        icon: ic_featured_play,
        pathName: "/member-plan",
      },
      {
        name: "Invoices",
        icon: ic_library_books,
        pathName: "/invoices",
      },
    ],
  },

  {
    type: "PROFILE",
    nav: [
      {
        name: "Profile",
        icon: ic_person,
        pathName: "/profile",
      },
      {
        name: "Settings",
        icon: ic_setting,
        pathName: "/settings",
      },
    ],
  },
  {
    type: "API DOCUMENTATION",
    nav: [
      {
        name: "API Documentation",
        icon: ic_settings,
        pathName: "/api-documentation",
      },
    ],
  },
];
