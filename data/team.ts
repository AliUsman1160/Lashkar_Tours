/**
 * Team and guides. Add genuine team members only, with their permission.
 * The About page hides the team section while this list is empty.
 */
export type TeamMember = { name: string; role: string; bio: string; photo?: string };

export const team: TeamMember[] = [];
