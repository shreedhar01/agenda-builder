import { db, drizzleOrm } from "@repo/database";
import { agenda_item, agendas, clubs, meetings, memberships } from "@repo/database/schema";
import { ApiError, type CreateAgendaInput, type CreateClubInput, type CreateMeetingInput } from "@repo/shared-types";

export const creatClubUserService = async (clubData: CreateClubInput, user_name: string) => {
    const clubCreated = await db.insert(clubs)
        .values({
            name: clubData.name,
            region: clubData.region,
            district: clubData.district,
            division: clubData.division,
            area: clubData.area
        }).returning();

    const isClubCreated = clubCreated[0];
    if (!isClubCreated) {
        throw new ApiError(400, "Club not created")
    }

    const membershipsCreated = await db.insert(memberships)
        .values({
            user_id: user_name,
            club_id: isClubCreated.id,
            role_in_club: clubData.role_in_club,
            club_name: clubData.name
        }).returning();
    const isMembershipsCreated = membershipsCreated[0];
    if (!isMembershipsCreated) {
        throw new ApiError(400, "Club not created")
    }

    return { isClubCreated, isMembershipsCreated }
}

export const createMeetingService = async (meetingData: CreateMeetingInput) => {
    const isClubExist = await db.select().from(clubs).where(drizzleOrm.eq(clubs.id, meetingData.club_id))
    const club = isClubExist[0]
    if (!club) {
        throw new ApiError(400, "Club doesn't exist.")
    }

    const meetingCreated = await db
        .insert(meetings)
        .values({
            club_id: meetingData.club_id,
            theme: meetingData.theme,
            meeting_title: meetingData.meeting_title,
            start_time: new Date(meetingData.start_time),
            end_time: new Date(meetingData.end_time)
        }).returning();
    const meeting = meetingCreated[0]
    if (!meeting) {
        throw new ApiError(400, "Meeting not Created")
    }

    return meeting
}

export const createAgendaService = async (agendaData: CreateAgendaInput, user_id: number) => {
    const isMeetingExist = await db.select().from(meetings).where(drizzleOrm.eq(meetings.id, agendaData.meeting_id))
    const meeting = isMeetingExist[0]
    if (!meeting) {
        throw new ApiError(400, "Meeting doesn't exist")
    }

    const isAgendasCreated = await db
        .insert(agendas)
        .values({
            meeting_id: agendaData.meeting_id,
            created_by: user_id,
            agenda_title: agendaData.agenda_title
        }).returning();
    const isAgendas = isAgendasCreated[0];
    if (!isAgendas) {
        throw new ApiError(400, "Agenda not created")
    }

    if (agendaData.agenda_items.length > 0) {
        const agendaItemsToInsert = agendaData.agenda_items.map(item => ({
            agenda_id: isAgendas.id,
            title: item.title,
            start_time: item.start_time,
            end_time: item.end_time,
        }));

        await db.insert(agenda_item).values(agendaItemsToInsert);
    }
}