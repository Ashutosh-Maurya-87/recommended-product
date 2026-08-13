import { Request, Response } from "express";

import {
    createInteraction,
    InteractionType,
} from "../services/interaction.service";

const allowedTypes: InteractionType[] = [
    "VIEWED",
    "LIKED",
    "PURCHASED",
];

export async function createUserInteraction(
    req: Request,
    res: Response
) {
    try {
        const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;

        const {
            productId,
            type,
        } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "productId is required",
            });
        }

        if (!allowedTypes.includes(type)) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid interaction type",
            });
        }

        const interaction =
            await createInteraction(
                userId,
                productId,
                type
            );

        return res.status(201).json({
            success: true,
            data: interaction,
        });
    } catch (error) {
        console.error(
            "Interaction API Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to create interaction",
        });
    }
}