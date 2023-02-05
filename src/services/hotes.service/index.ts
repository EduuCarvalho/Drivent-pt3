import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository"


async function getAllHotels() {
    const hotels = await hotelRepository.findHotels();

    if (!hotels) {
        throw notFoundError();
    }
    return hotels;
}

async function getHotelByID(hotelId: number, userId: number) {
    const hotels = hotelRepository.findHotelById(hotelId);

    return hotels;
}

const hotelsService = {
    getAllHotels,
    getHotelByID
};

export default hotelsService;
