import { db, drizzleOrm } from "@repo/database";
import { agenda_item, agendas, memberships } from "@repo/database/schema";
import { ApiError, type ClubMembershipReturn, type GetAllClubsInput } from "@repo/shared-types";

export const getAllAgendaItemService = async (id: number) => {
    const isAgendaItemExist = await db
        .select()
        .from(agenda_item)
        .where(
            drizzleOrm.eq(agenda_item.agenda_id, id)
        )
    if (isAgendaItemExist.length === 0) {
        throw new ApiError(400, "Membership doesn't exist")
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