export const parseDataAccordingEntity = (entity: any, data: any) => {
  const formattedEntity = entity;

  for (const key in data) {
    formattedEntity[key] = data[key];
  }

  return formattedEntity;
};
