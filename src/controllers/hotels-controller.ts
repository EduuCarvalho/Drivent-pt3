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

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const { userId } = req;

    try {
        const hotels = await hotelsService.getHotelByID(Number(id), userId);
        return res.status(httpStatus.OK).send(hotels);
    } catch (err) {
        if (err.name === "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(err.message);
          }
      
          if (err.name === "UnauthorizedError") {
            return res.status(httpStatus.UNAUTHORIZED).send(err.message);
          }
      
          if (err.name === "PaymentError") {
            return res.status(httpStatus.PAYMENT_REQUIRED).send(err.message);
          }
    }
}