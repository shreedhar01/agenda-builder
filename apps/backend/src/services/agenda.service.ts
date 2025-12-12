import { db, drizzleOrm } from "@repo/database";
import { agendas, memberships } from "@repo/database/schema";
import { ApiError, type ClubMembershipReturn, type GetAllClubsInput } from "@repo/shared-types";

export const getAllAgendaService = async () => {
    const isAgendaExist = await db
        .select()
        .from(agendas)
        .where(
            drizzleOrm.eq(agendas.created_by, 2)
        )
    if(isAgendaExist.length === 0){
        throw new ApiError(400,"Membership doesn't exist")
    }

    const returningAgendas = isAgendaExist.map((agenda) => ({
        agenda_id: agenda.id,
        agenda_title: agenda.agenda_title
    }));

    return returningAgendas
}