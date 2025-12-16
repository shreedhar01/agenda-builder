import { db, drizzleOrm } from "@repo/database";
import { agendas, meetings, memberships } from "@repo/database/schema";
import { ApiError, type ClubMembershipReturn, type GetAllClubsInput } from "@repo/shared-types";

export const getAllAgendaService = async (user_id: number) => {
    const isAgendaExist = await db
        .select({
            id: agendas.id,
            agenda_title: agendas.agenda_title,
            meeting_id: agendas.meeting_id,
            club_id: meetings.club_id
        })
        .from(agendas)
        .innerJoin(meetings, drizzleOrm.eq(agendas.meeting_id, meetings.id))
        .where(drizzleOrm.eq(agendas.created_by, user_id));

    if (isAgendaExist.length === 0) {
        throw new ApiError(400, "Agenda doesn't exist");
    }

    const returningAgendas = isAgendaExist.map((agenda) => ({
        agenda_id: agenda.id,
        agenda_title: agenda.agenda_title,
        meeting_id: agenda.meeting_id,
        club_id: agenda.club_id
    }));

    return returningAgendas;
};


export const getAllAgendaByClubIdService = async (user_id: string, club_id: number) => {
    const membership = await db
        .select()
        .from(memberships)
        .where(drizzleOrm.and(
            drizzleOrm.eq(memberships.user_id, user_id),
            drizzleOrm.eq(memberships.club_id, club_id)
        ))
        .limit(1) 
    
    if (membership.length === 0) {
        throw new ApiError(403, "User is not a member of this club") 
    }

    const allAgendas = await db
        .select({
            id: agendas.id,
            agenda_title: agendas.agenda_title,
            meeting_id: agendas.meeting_id,
            club_id: meetings.club_id
        })
        .from(agendas)
        .innerJoin(meetings, drizzleOrm.eq(agendas.meeting_id, meetings.id))
        .where(drizzleOrm.eq(meetings.club_id, club_id))

    return allAgendas.map((agenda) => ({
        agenda_id: agenda.id,
        agenda_title: agenda.agenda_title,
        meeting_id: agenda.meeting_id,
        club_id: agenda.club_id
    }))
}