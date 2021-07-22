export const updateObjectInArray = (items: any,
                                    itemID: any,
                                    ObjectPropName: any,
                                    newObjProps: any) => {
  return items.map((u: any) => {
    if (u[ObjectPropName] === itemID) {
      return {...u, ...newObjProps}
    }
    return u
  })
}