// lib/openWhatsAppGroup.js

export function joinGroup() {
  
  const groupLink = "https://forms.cloud.microsoft/r/JvnEd9Pap3";
  // const groupLink = "https://chat.whatsapp.com/KwTZ8DO9KEODtY4HTSQsIp?mode=wwt";
  if (typeof window !== "undefined") {
    window.open(groupLink, "_blank");
  }
}
