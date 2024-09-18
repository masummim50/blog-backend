//['page','limit','sortBy','sortOrder']

// const pick = <T extends Record<string, unknown>, k extends keyof T>(
//   obj: T,
//   keys: k[]
// ): Partial<T> => {
//   const finalObj: Partial<T> = {};

//   for (const key of keys) {
//     if (obj && Object.hasOwnProperty.call(obj, key)) {
//       finalObj[key] = obj[key];
//     }
//   }
//   return finalObj;
// };

// export default pick;

// const pick = <T extends Record<string, unknown>>(
//   obj: T,
//   keys: string[]
// ): Record<string, unknown> => {
//   const finalObj: Record<string, unknown> = {};

//   for (const key of keys) {
//     const lowerKey = key.toLowerCase();
//     const matchingKey = Object.keys(obj).find(
//       objKey => objKey.toLowerCase() === lowerKey
//     );

//     if (matchingKey) {
//       finalObj[matchingKey] = obj[matchingKey];
//     }
//   }

//   return finalObj;
// };

// export default pick;

const pick = <T extends Record<string, unknown>>(
  obj: T,
  keys: string[]
): Record<string, unknown> => {
  const finalObj: Record<string, unknown> = {};

  for (const key of keys) {
    const lowerKey = key.toLowerCase();
    const matchingKey = Object.keys(obj).find(
      objKey => objKey.toLowerCase() === lowerKey
    );

    if (matchingKey) {
      if (lowerKey === 'sortorder') {
        finalObj['sortOrder'] = obj[matchingKey];
      } else if (lowerKey === 'sortby') {
        finalObj['sortBy'] = obj[matchingKey];
      } else {
        finalObj[lowerKey] = obj[matchingKey];
      }
    }
  }

  return finalObj;
};

export default pick;
