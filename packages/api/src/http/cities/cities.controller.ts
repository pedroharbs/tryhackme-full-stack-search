import type { Context } from "src/types/common";
import { OK } from "../_utils/statuses";
import { CityService } from "./cities.service";
import { NotFoundError } from "../_utils/http-errors";

export class CityController {
  constructor(private readonly service: CityService) {}

  async listCities({ req, res, next }: Context) {
    try {
      const { name } = req.query;
      const cities = await this.service.listCities(name?.toString());

      if (!cities.length) {
        throw new NotFoundError("no cities found.");
      }

      res.status(OK).json({ cities });
    } catch (error) {
      next(error);
    }
  }
}
