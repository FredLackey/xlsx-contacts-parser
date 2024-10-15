const _ = require('cleaner-node');

const getFirstRow = rows => {

  const validRows = [].concat(rows).filter(x => (x && x.cells.length > 0));
  if (validRows.length === 0) {
    return {};
  }

  const ids = validRows.map(x => x.id);  
  ids.sort((a, b) => a - b);
  const firstId = ids[0];
  
  return validRows.find(x => x.id === firstId);

}
const getHeaderPositions = firstRow => {

  // Header cannot have actual values
  const cellWithEmailAddress = firstRow.cells.find(x => _.isEmail(x.value));
  if (cellWithEmailAddress) {
    return {};
  }

  const emailCell = firstRow.cells.find(x => x?.value && x.value.toLowerCase().includes('email'));
  const nameCell = firstRow.cells.find(x => x?.value && x.value.toLowerCase().includes('name'));

  return {
    email: emailCell?.id,
    name: nameCell?.id
  };

}
const getDataRows = (rows, firstRow) => {
  return [].concat(rows).filter(x => (x && x.cells.length > 0 && x !== firstRow));
}

const rowToContact = ({ cells, positions }) => {

  const contact = {};

  Object.keys(positions).forEach(key => {
    const position = positions[key];
    const cell = cells.find(x => (x && x.id === position));
    if (cell) {
      contact[key] = cell.value.trim();
    }
  });

  return contact;

};
const rowsToContacts = rows => {

  const firstRow = getFirstRow(rows);
  const positions = getHeaderPositions(firstRow);
  const dataRows = getDataRows(rows, firstRow);

  const contacts = [];

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];
    const contact = rowToContact({ cells: row.cells, positions });
    contacts.push(contact);
  }

  return contacts;

};

const sheetToList = sheet => {
  const list = {
    name: sheet.name,
    contacts: rowsToContacts(sheet.rows)
  };
  return list;
};
const sheetsToLists = sheets => {

  const lists = sheets.map(sheetToList);
  return lists.filter(x => (x && x.contacts.length > 0));

};

const convert = workbook => {

  return {
    path: workbook.path,
    lists: sheetsToLists(workbook.sheets)
  }

};

module.exports = {
  convert
};