import { db, drizzleOrm } from "@repo/database";
import { agenda_item, agendas, clubs, meetings, memberships, users } from "@repo/database/schema";
import { ApiError, type ClubMembershipReturn, type GetAllAgendaItemByClubIdInput, type GetAllAgendaItemByMeetingIdInput, type GetAllAgendaItemInput, type GetAllClubsInput } from "@repo/shared-types";

export const getAllAgendaItemByUserIdService = async (user: { id: number, name: string }) => {
    const isAgendaItemExist = await db
        .selectDistinct({
            id: agenda_item.id,
            agenda_id: agendas.id,
            title: agenda_item.title,
            start_time: agenda_item.start_time,
            end_time: agenda_item.end_time
        })
        .from(agenda_item)
        .innerJoin(agendas, drizzleOrm.eq(agendas.id, agenda_item.agenda_id))
        .innerJoin(meetings, drizzleOrm.eq(meetings.id, agendas.meeting_id))
        .innerJoin(clubs, drizzleOrm.eq(clubs.id, meetings.club_id))
        .innerJoin(users, drizzleOrm.eq(users.id, user.id))
        .leftJoin(
            memberships,
            drizzleOrm.and(
                drizzleOrm.eq(memberships.club_id, clubs.id),
                drizzleOrm.eq(memberships.user_id, users.name)
            )
        )
        .where(
            drizzleOrm.or(
                drizzleOrm.eq(agendas.created_by, users.id),
                drizzleOrm.isNotNull(memberships.id)
            )
        )
        .orderBy(drizzleOrm.asc(meetings.start_time), drizzleOrm.asc(agenda_item.start_time));

    if (isAgendaItemExist.length === 0) {
        throw new ApiError(400, "AgendaItem doesn't exist in given")
    }

    const returningAgendas = isAgendaItemExist.map((agendaItem) => ({
        id: agendaItem.id,
        agenda_id: agendaItem.agenda_id,
        title: agendaItem.title,
        start_time: agendaItem.start_time,
        end_time: agendaItem.end_time
    }));

    return returningAgendas
}

export const getAgendaItemByAgendaIdService = async (agenda: GetAllAgendaItemInput, user: { id: number, name: string }) => {

    const isAgendaItemExist = await db
        .selectDistinct({
            id: agenda_item.id,
            agenda_id: agenda_item.agenda_id,
            title: agenda_item.title,
            start_time: agenda_item.start_time,
            end_time: agenda_item.end_time,
        })
        .from(agenda_item)
        .innerJoin(agendas, drizzleOrm.eq(agendas.id, agenda_item.agenda_id))
        .innerJoin(meetings, drizzleOrm.eq(meetings.id, agendas.meeting_id))
        .innerJoin(clubs, drizzleOrm.eq(clubs.id, meetings.club_id))
        .leftJoin(
            memberships,
            drizzleOrm.and(
                drizzleOrm.eq(memberships.club_id, clubs.id),
                drizzleOrm.eq(memberships.user_id, user.name)
            )
        )
        .where(
            drizzleOrm.and(
                drizzleOrm.eq(agendas.id, agenda.agenda_id),
                drizzleOrm.or(
                    drizzleOrm.eq(agendas.created_by, user.id),
                    drizzleOrm.isNotNull(memberships.id)
                )
            )
        );
    if (isAgendaItemExist.length === 0) {
        throw new ApiError(400, "AgendaItem doesn't exist in given agenda id")
    }

    const returningAgendas = isAgendaItemExist.map((agendaItem) => ({
        id: agendaItem.id,
        agenda_id: agendaItem.agenda_id,
        title: agendaItem.title,
        start_time: agendaItem.start_time,
        end_time: agendaItem.end_time
    }));

    return returningAgendas
}

export const getAgendaItemByClubIdService = async (club: GetAllAgendaItemByClubIdInput) => {

    const isAgendaItemExist = await db
        .selectDistinct({
            id: agenda_item.id,
            agenda_id: agenda_item.agenda_id,
            title: agenda_item.title,
            start_time: agenda_item.start_time,
            end_time: agenda_item.end_time,
        })
        .from(agenda_item)
        .innerJoin(agendas, drizzleOrm.eq(agendas.id, agenda_item.agenda_id))
        .innerJoin(meetings, drizzleOrm.eq(meetings.id, agendas.meeting_id))
        .innerJoin(clubs, drizzleOrm.eq(clubs.id, meetings.club_id))
        .where(
            drizzleOrm.eq(clubs.id, club.club_id)
        )
        .orderBy(drizzleOrm.asc(meetings.start_time), drizzleOrm.asc(agenda_item.start_time));
    if (isAgendaItemExist.length === 0) {
        throw new ApiError(400, "AgendaItem doesn't exist in given agenda id")
    }

    const returningAgendas = isAgendaItemExist.map((agendaItem) => ({
        id: agendaItem.id,
        agenda_id: agendaItem.agenda_id,
        title: agendaItem.title,
        start_time: agendaItem.start_time,
        end_time: agendaItem.end_time
    }));

    return returningAgendas
}

export const getAgendaItemByMeetingIdService = async (meeting: GetAllAgendaItemByMeetingIdInput) => {

    const isAgendaItemExist = await db
        .selectDistinct({
            id: agenda_item.id,
            agenda_id: agenda_item.agenda_id,
            title: agenda_item.title,
            start_time: agenda_item.start_time,
            end_time: agenda_item.end_time,
        })
        .from(agenda_item)
        .innerJoin(agendas, drizzleOrm.eq(agendas.id, agenda_item.agenda_id))
        .innerJoin(meetings, drizzleOrm.eq(meetings.id, agendas.meeting_id))
        .where(
            drizzleOrm.eq(meetings.id, meeting.meeting_id)
        );
    if (isAgendaItemExist.length === 0) {
        throw new ApiError(400, "AgendaItem doesn't exist in given agenda id")
    }

    const returningAgendas = isAgendaItemExist.map((agendaItem) => ({
        id: agendaItem.id,
        agenda_id: agendaItem.agenda_id,
        title: agendaItem.title,
        start_time: agendaItem.start_time,
        end_time: agendaItem.end_time
    }));

    return returningAgendas
}