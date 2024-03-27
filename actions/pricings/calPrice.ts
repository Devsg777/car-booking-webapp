export const calPrice = (KmDistance: number, price: number) => {
    return Math.trunc(KmDistance * price);
  };