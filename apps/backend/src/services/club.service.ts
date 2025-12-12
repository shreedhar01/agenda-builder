import { db, drizzleOrm } from "@repo/database";
import { memberships } from "@repo/database/schema";
import { ApiError, type ClubMembershipReturn, type GetAllClubsInput } from "@repo/shared-types";

export const getAllClubsService = async (data: GetAllClubsInput) => {
    const isMembershipExist = await db
        .select()
        .from(memberships)
        .where(
            drizzleOrm.eq(memberships.user_id, data.user_name)
        )
    if(isMembershipExist.length === 0){
        throw new ApiError(400,"Membership doesn't exist")
    }

    const clubs: ClubMembershipReturn[] = isMembershipExist.map((membership) => ({
        club_id: membership.club_id,
        club_name: membership.club_name
    }));

    return clubs
}