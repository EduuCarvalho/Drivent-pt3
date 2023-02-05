import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import hotelsService from "@/services/hotes.service";

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {

    try {
        const hotels = await hotelsService.getAllHotels();

        return res.status(httpStatus.OK).send(hotels)
    } catch (err) {
        return res.sendStatus(httpStatus.NO_CONTENT);
    }
}