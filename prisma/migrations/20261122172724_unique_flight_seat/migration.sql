/*
  Warnings:

  - A unique constraint covering the columns `[flightId,type,seatNumber]` on the table `FlightSeat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "FlightSeat_flightId_idx" ON "FlightSeat"("flightId");

-- CreateIndex
CREATE UNIQUE INDEX "FlightSeat_flightId_type_seatNumber_key" ON "FlightSeat"("flightId", "type", "seatNumber");
