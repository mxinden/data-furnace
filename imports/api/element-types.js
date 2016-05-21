const types = [
  {
    humanName: 'Reference object',
    name: 'referenceObject',
    possibleChildren: [],
  },
  {
    humanName: 'Hierarchy',
    name: 'hierarchy',
    possibleChildren: ['hierarchy', 'referenceObject'],
  },
  {
    humanName: 'Dimension',
    name: 'dimension',
    possibleChildren: ['referenceObject', 'hierarchy'],
  },
];

types.nameToHumanName = (name) => {
  const returnType = types.find((type) => {
    if (type.name === name) {
      return true;
    }
    return false;
  });
  return returnType.humanName;
};

export default types;
