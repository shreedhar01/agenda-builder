import { db, drizzleOrm } from "@repo/database";
import { clubs, memberships } from "@repo/database/schema";
import {
    ApiError,
    ClubRole,
    type ClubMembershipReturn,
    type GetAllClubsInput,
    type JoinClubInput
} from "@repo/shared-types";

export const getAllClubsService = async (data: GetAllClubsInput) => {
    const isMembershipExist = await db
        .select()
        .from(memberships)
        .where(
            drizzleOrm.eq(memberships.user_id, data.user_name)
        )
    if (isMembershipExist.length === 0) {
        throw new ApiError(400, "Membership doesn't exist")
    }
    // console.log(isMembershipExist)

    const clubs: ClubMembershipReturn[] = isMembershipExist.map((membership) => ({
        club_id: membership.club_id,
        club_name: membership.club_name
    }));

    return clubs
}

export const joinClubService = async (data: JoinClubInput, user_name: string) => {
    const isClubExist = await db.select().from(clubs).where(drizzleOrm.eq(clubs.id, data.club_id))
    const club = isClubExist[0]
    if (!club) {
        throw new ApiError(400, "Club doesn't exist");
    }

    const isUserAlredyJoinClub = await db
        .select()
        .from(memberships)
        .where(
            drizzleOrm.and(
                drizzleOrm.eq(memberships.club_id, data.club_id),
                drizzleOrm.eq(memberships.user_id, user_name)
            )
        )
        
    const userAlredyJoinClub = isUserAlredyJoinClub[0]
    if (userAlredyJoinClub) {
        throw new ApiError(400, "You have already join club")
    }

    const membershipData = {
        user_id: user_name,
        club_id: club.id,
        club_name: club.name,
        role_in_club: ClubRole.VISITOR
    }

    const isMembershipCreated = await db.insert(memberships).values(membershipData).returning();
    const membership = isMembershipCreated[0]
    if (!membership) {
        throw new ApiError(400, "Membership not created")
    }

    return membership
}