export const updateObjectInArray = (items, itemID, ObjectPropName, newObjProps) => {
   return items.map(u => {
      if (u[ObjectPropName] === itemID) {
         return {...u, ...newObjProps}
      }
      return u;
   })
}