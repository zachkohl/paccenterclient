function sortByStreet(rows) {
        function comparer(a, b) {
          if (a.ResStreet < b.ResStreet) {
            return -1;
          } else if (a.ResStreet > b.ResStreet) {
            return 1;
          } else if (
            parseInt(a.ResHouseNumber) % 2 === 0 &&
            parseInt(b.ResHouseNumber) % 2 != 0
          ) {
            return -1;
          } else if (
            parseInt(a.ResHouseNumber) % 2 != 0 &&
            parseInt(b.ResHouseNumber) % 2 === 0
          ) {
            return 1;
          } else if (
            parseInt(a.ResHouseNumber) % 2 === 0 &&
            parseInt(b.ResHouseNumber) % 2 === 0
          ) {
            if (a.ResHouseNumber < b.ResHouseNumber) {
              return -1;
            } else if (a.ResHouseNumber > b.ResHouseNumber) {
              return 1;
            } else {
              return 0;
            }
          } else if (
            parseInt(a.ResHouseNumber) % 2 != 0 &&
            parseInt(b.ResHouseNumber) % 2 != 0
          ) {
            if (a.ResHouseNumber < b.ResHouseNumber) {
              return 1;
            } else if (a.ResHouseNumber > b.ResHouseNumber) {
              return -1;
            } else {
              return 0;
            }
          }
        }
        const sorted = rows.sort(comparer);
        return sorted;
      }

export default sortByStreet;
