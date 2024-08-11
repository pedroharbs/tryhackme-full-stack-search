import { ObjectId, type Collection, type MongoClient } from "mongodb";
import type { Hotel } from "schemas";

export class HotelService {
  private collection: Collection<Hotel>;

  constructor(
    private readonly dbClient: MongoClient,
    private readonly collectionName = "hotels"
  ) {
    this.collection = this.dbClient.db().collection<Hotel>(this.collectionName);
  }

  async listHotels(search?: string) {
    const regexPattern = new RegExp(search!, "i");

    const query = search
      ? {
          $or: [
            { chainName: { $regex: regexPattern } },
            { hotelName: { $regex: regexPattern } },
            { city: { $regex: regexPattern } },
            { state: { $regex: regexPattern } },
            { zipCode: { $regex: regexPattern } },
            { country: { $regex: regexPattern } },
            { addressLine1: { $regex: regexPattern } },
            { addressLine2: { $regex: regexPattern } },
          ],
        }
      : {};

    return await this.collection.find(query).toArray();
  }

  async getHotel(hotelId: string) {
    return await this.collection.findOne({
      // @ts-ignore
      _id: new ObjectId(hotelId),
    });
  }
}
