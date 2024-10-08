import type { Context } from "src/types/common";
import { OK } from "../_utils/statuses";
import { HotelService } from "./hotels.service";
import { NotFoundError } from "../_utils/http-errors";

export class HotelController {
  constructor(private readonly service: HotelService) {}

  async listHotels({ req, res, next }: Context) {
    try {
      const { search } = req.query;
      const hotels = await this.service.listHotels(search?.toString());

      if (!hotels.length) {
        throw new NotFoundError("no hotels found.");
      }

      res.status(OK).json({ hotels });
    } catch (error) {
      next(error);
    }
  }

  async getHotel({ req, res, next }: Context) {
    try {
      const { id } = req.params;
      const hotel = await this.service.getHotel(id);

      if (!hotel) {
        throw new NotFoundError("hotel not found.");
      }

      res.status(OK).json({ hotel });
    } catch (error) {
      next(error);
    }
  }
}
