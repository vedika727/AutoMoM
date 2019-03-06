export class CreateMeetingPostData { 
    participantEmail: Array<string>;
    organizerEmail: string;
    meetingDate: string;
    startTime: string;
    endTime: string;
    agenda: string;
    location: string;
}