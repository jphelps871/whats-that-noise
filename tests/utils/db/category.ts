// Do not use in application, just for testing to create fake ID
function generateTestId() {
    return [...Array(5)].map((value) => (Math.random() * 1000000).toString(36).replace('.', '')).join('');
}

const createPrismaRecordFields = () => ({
  id: generateTestId(), 
  createdAt: new Date(),
  updatedAt: new Date(),
})

type PrismaFields = ReturnType<typeof createPrismaRecordFields>

const createPrismaRecords = <T>(data: T[]): (T & PrismaFields)[] => {
  const currentData = data.reduce((record, item) => {
    record.push({...createPrismaRecordFields(), ...item})

    return record
  }, [] as (T & PrismaFields)[])

  return currentData;
}

export { createPrismaRecords }