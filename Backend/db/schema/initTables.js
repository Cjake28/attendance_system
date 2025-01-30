import createUsersTable from './users.table.js';
import createGravesiteTable from './gravesite.table.js';
import vacanTable from './vacantlot.js'
const initTables = async () => {
  await createUsersTable();
  await createGravesiteTable();
  await vacanTable();
};

export default initTables;