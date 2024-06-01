const calculateExpirationDate = (duration) => {
  const timeUnits = {
    d: 24 * 60 * 60 * 1000, // days in milliseconds
    m: 60 * 1000, // minutes in milliseconds
  };

  const unit = duration.slice(-1); // Extract the unit (last character)
  const value = parseInt(duration.slice(0, -1), 10); // Extract the numeric value

  if (!timeUnits[unit] || isNaN(value)) {
    throw new Error("Invalid duration format");
  }

  return new Date(Date.now() + value * timeUnits[unit]);
};

module.exports = { calculateExpirationDate };
