import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getAllHotels(userId: number) {
  const enrollmentTicket = await enrollmentRepository.findTicket(userId);

  if (!enrollmentTicket) throw notFoundError();

  if (enrollmentTicket.Ticket.length === 0) throw notFoundError();

  if (enrollmentTicket.Ticket[0].status === "RESERVED")
    throw { name: "PaymentError", message: "Finish the payment before" };

  const checkTciektType = await ticketRepository.findTickeWithTypeById(enrollmentTicket.Ticket[0].id);

  if (checkTciektType.TicketType.isRemote) throw { name: "PaymentError", message: "Finish the payment before" };

  if (!checkTciektType.TicketType.includesHotel) throw { name: "PaymentError", message: "Finish the payment before" };

  const hotels = await hotelRepository.findHotels();

  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

async function getHotelByID(hotelId: number, userId: number) {
  const enrollmentTicket = await enrollmentRepository.findTicket(userId);

  if (!enrollmentTicket) throw notFoundError();

  if (enrollmentTicket.Ticket.length === 0) throw notFoundError();

  if (enrollmentTicket.Ticket[0].status === "RESERVED")
    throw { name: "PaymentError", message: "Finish the payment before" };

  const checkTciektType = await ticketRepository.findTickeWithTypeById(enrollmentTicket.Ticket[0].id);

  if (checkTciektType.TicketType.isRemote) throw { name: "PaymentError", message: "Finish the payment before" };

  if (!checkTciektType.TicketType.includesHotel) throw { name: "PaymentError", message: "Finish the payment before" };

  const hotels = hotelRepository.findHotelById(hotelId);

  if (!hotels) throw notFoundError();

  return hotels;
}

const hotelsService = {
  getAllHotels,
  getHotelByID,
};

export default hotelsService;
