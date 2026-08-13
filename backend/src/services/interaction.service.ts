import { driver } from "../db/driver";

import {
    CREATE_VIEWED_RELATIONSHIP,
    CREATE_LIKED_RELATIONSHIP,
    CREATE_PURCHASED_RELATIONSHIP,
} from "../queries/interaction.queries";

export type InteractionType =
    | "VIEWED"
    | "LIKED"
    | "PURCHASED";

const interactionQueries: Record<
    InteractionType,
    string
> = {
    VIEWED: CREATE_VIEWED_RELATIONSHIP,
    LIKED: CREATE_LIKED_RELATIONSHIP,
    PURCHASED: CREATE_PURCHASED_RELATIONSHIP,
};

export async function createInteraction(
    userId: string,
    productId: string,
    type: InteractionType
) {
    const session = driver.session();

    try {
        const query = interactionQueries[type];

        const result = await session.run(query, {
            userId,
            productId,
        });

        if (result.records.length === 0) {
            throw new Error(
                "User or product not found"
            );
        }

        const record = result.records[0];

        return {
            userId: record.get("userId"),
            productId: record.get("productId"),
            type: record.get("type"),
        };
    } finally {
        await session.close();
    }
}