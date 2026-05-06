"use client";

import React, { useState } from "react";
import JoinScreen from "@/app/components/meeting/JoinScreen";
import MeetingRoom from "@/app/components/meeting/MeetingRoom";

interface MeetingPageClientProps {
  meetingId: string;
}

export default function MeetingPageClient({ meetingId }: MeetingPageClientProps) {
  const [hasJoined, setHasJoined] = useState(false);

  if (!hasJoined) {
    return (
      <JoinScreen 
        meetingTitle="Consultation Session" 
        onJoin={() => setHasJoined(true)} 
      />
    );
  }

  return <MeetingRoom meetingId={meetingId} />;
}
