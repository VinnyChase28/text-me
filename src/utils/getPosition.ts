const options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: Infinity,
};

export const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};
