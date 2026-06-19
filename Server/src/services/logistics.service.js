// Shiprocket API simulation
// Replace with real Shiprocket API keys in production

const getLogisticsRates = async (fromCity, toCity, weight) => {
  // Simulated courier rates
  const couriers = [
    {
      name: "Delhivery",
      rate: Math.round(200 + weight * 20),
      estimatedDays: 3,
      tracking: true,
    },
    {
      name: "Shiprocket",
      rate: Math.round(180 + weight * 18),
      estimatedDays: 4,
      tracking: true,
    },
    {
      name: "Ecom Express",
      rate: Math.round(220 + weight * 22),
      estimatedDays: 2,
      tracking: true,
    },
    {
      name: "Local Transporter",
      rate: Math.round(150 + weight * 15),
      estimatedDays: 5,
      tracking: false,
    },
  ];

  return couriers.sort((a, b) => a.rate - b.rate);
};

const bookLogistics = async (courierName, orderDetails) => {
  // Simulate booking
  const awbNumber = `AWB${Date.now()}`;
  return {
    awbNumber,
    courier: courierName,
    estimatedDelivery: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000
    ).toISOString(),
    trackingUrl: `https://tracking.${courierName.toLowerCase()}.com/${awbNumber}`,
    status: "booked",
  };
};

module.exports = { getLogisticsRates, bookLogistics };