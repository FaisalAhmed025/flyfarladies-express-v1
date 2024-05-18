import axios from "axios";
import pool from "../../../database/db";
import { generateUUID } from "../../../helper/generateUUID";

export const airSearch = async (
  adultCount,
  childCount,
  infantCount,
  segmentsList,
  vendorPref,
  cabin,
  studentFare,
  umrahFare,
  seamanFare
) => {
  try {
    const authUrl =
      "https://central-api-node-js.de.r.appspot.com/api/v1/search-results";
    const requestBody = {
      adultCount,
      childCount,
      infantCount,
      segmentsList,
      vendorPref,
      cabin,
      studentFare,
      umrahFare,
      seamanFare,
    };
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    const gdsArray = [
      {
        sabre: "system001",
        galileo: "system002",
      },
    ];

    const gdsNameService = (gdsNameOrCode = "") => {
      const entry = gdsArray.find(
        (obj) =>
          Object.values(obj).includes(gdsNameOrCode) ||
          Object.keys(obj).includes(gdsNameOrCode)
      );
      return entry
        ? Object.values(entry).includes(gdsNameOrCode)
          ? Object.keys(entry)[0]
          : entry[gdsNameOrCode]
        : gdsNameOrCode;
    };
    const response = await axios.post(authUrl, requestBody, { headers });
    const result = response.data.data.flat();
    const mainResult = await Promise.all(
      result.map(async (item) => {
        const [commissions] = await pool.query(
          "SELECT commissionValue, `system`, commissionType, routeInfo FROM commission WHERE commissionType= ? AND `system`=?",
          [item.commissionType, item.system]
        );
        const commissionData = commissions.map((commission) => commission);
        const routeInfo = segmentsList[0];
        const determineCommissionType = `${item.carrier}-${routeInfo.departure}-${routeInfo.arrival}-${item.cityCount[0][0].bookingClass}`;
        const determineCommissionRoute = `${item.carrier}-${routeInfo.departure}-${routeInfo.arrival}`;
        const determineCarrier = `${item.carrier}`;
        const determineCarrierRoute = `${item.carrier}-${item.cityCount[0][0].bookingClass}`;

        const matchedCommissions = commissionData
          .filter((commission) => {
            return (
              (commission.system === item.system &&
                commission.routeInfo === determineCommissionType) ||
              (commission.system === item.system &&
                commission.routeInfo === determineCommissionRoute) ||
              (commission.system === item.system &&
                commission.routeInfo === determineCarrierRoute) ||
              (commission.system === item.system &&
                commission.commissionType === item.commissionType &&
                commission.routeInfo === determineCarrier)
            );
          })
          .map((commission) => ({
            routeInfo: commission.routeInfo,
            commission: commission.commissionValue,
            commissionType: commission.commissionType,
          }));

        const basePrice = item.baseFare;
        const taxes = item.taxes;
        const commissionValue = matchedCommissions[0]?.commission ?? 0;
        const ait = commissionValue > 0 ? 0.003 : 0;
        const calculateAgentPrice =
          basePrice * (1 - commissionValue / 100) +
          taxes +
          (basePrice + taxes) * ait;
        const agentPrice = Math.round(calculateAgentPrice);
        const customerPrice = item.totalFare;
        let resultsWithoutCertainProperties = JSON.parse(
          JSON.stringify(item.brands)
        );
        resultsWithoutCertainProperties.forEach((item) => {
          delete item.fareBasisCode;
          delete item.brandCode;
        });
        //  const encryptedData = [resultsWithoutCertainProperties, item.cityCount];
        /// const encrypt = await encryptArray(encryptedData);
        return {
          uuid: generateUUID(),
          system: gdsNameService(item?.system) || "",
          journeyType: item.journeyType || "",
          tripType: item.tripType || "",
          route: item.route || "",
          flightAmenities: item.flightAmenities || [],
          transit: item.transit || "",
          brandCount: item.brandCount || "",
          brands: resultsWithoutCertainProperties || "",
          isGroupFare: false,
          partiallyEligible: false,
          class: item.class || "",
          ait: Number((customerPrice * 0.003).toFixed(2)) || 0,
          basePrice: item.baseFare || 0,
          agentPrice: agentPrice || 0,
          clientPrice: customerPrice || 0,
          commission:
            agentPrice > customerPrice ? 0 : customerPrice - agentPrice || 0,
          commissionType: matchedCommissions[0]?.commissionType ?? "",
          commissionValue: commissionValue || 0,
          taxes: item.taxes || 0,
          baggage: item.baggage || "",
          carrier: item.carrier || "",
          isRefundable: item.isRefundable || "",
          carrierName: item.carrierName || "",
          priceBreakdown: item.priceBreakdown || "",
          cityCount: item.cityCount || "",
        };
      })
    );
    return mainResult.sort((a, b) => a.agentPrice - b.agentPrice);
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};
