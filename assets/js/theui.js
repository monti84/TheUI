var TheUI = TheUI || {};

TheUI.Utils = {
    SearchInArray (list, key, value, returnOnFirstMatch) {
        console.log('SearchInArray', list, key, value, returnOnFirstMatch);
        let results;
        if (returnOnFirstMatch) results = false;
        if (!list || list.length < 1) return results;

        for (var x = 0; x < list.length; x++) {
          console.log(list[x][key] == value);
            if (list[x][key] == value) {
            if (returnOnFirstMatch === true) return list[x];
            else results.push(list[x]);
          }
        }
        return results;
    }
}