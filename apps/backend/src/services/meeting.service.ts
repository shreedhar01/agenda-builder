import { db, drizzleOrm } from "@repo/database"
import { meetings, memberships } from "@repo/database/schema"
import { ApiError } from "@repo/shared-types"

interface IMeetingsReturn {
    id: number,
    theme: string,
    meeting_title: string,
    start_time: Date,
    end_time: Date
}


export const getAllMeetingService = async ({ user_name }: { user_name: string }) => {
    const isMembershipExist = await db
        .select()
        .from(memberships)
        .where(drizzleOrm.eq(memberships.user_id, user_name))

    if (isMembershipExist.length === 0) {
        throw new ApiError(400, "You are not in club")
    }

    const clubIds = isMembershipExist.map(member => member.club_id)
    const allMeetings = await db
        .select()
        .from(meetings)
        .where(drizzleOrm.inArray(meetings.club_id, clubIds))

    if (allMeetings.length === 0) {
        throw new ApiError(400, "No meetings found")
    }

    return allMeetings as IMeetingsReturn[]
}

export const getAllMeetingByClubIdService = async (user_name: string, club_id: number) => {
    const isMembershipExist = await db
        .select()
        .from(memberships)
        .where(drizzleOrm.and(
            drizzleOrm.eq(memberships.user_id, user_name),
            drizzleOrm.eq(memberships.club_id, club_id)
        ))

    if (isMembershipExist.length === 0) {
        throw new ApiError(400, "You are not a member of this club")
    }

    const allMeetings = await db
        .select()
        .from(meetings)
        .where(drizzleOrm.eq(meetings.club_id, club_id))

    if (allMeetings.length === 0) {
        throw new ApiError(400, "No meetings found for this club")
    }

    return allMeetings as IMeetingsReturn[]
}