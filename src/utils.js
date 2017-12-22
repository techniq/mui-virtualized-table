export function calcColumnWidth (index, columns, tableWidth) {
  const column = columns[index];

  if (column.width) {
    return column.width;
  } else {
    // TODO: Support column.width as percentage (0.5 or '50%'?) for variable width columns
    const fixedWidthColumns = columns.filter(c => c.width);
    const totalFixedWidth = fixedWidthColumns.reduce((result, item) => result + item.width, 0);

    const variableWidthColumns = columns.filter(c => !c.width);
    const totalDistributedWidth = tableWidth - totalFixedWidth;
    const initialDistributedWidthPerColumn = totalDistributedWidth / variableWidthColumns.length;

    const activeMinWidthColumns = columns.filter(c => c.minWidth > initialDistributedWidthPerColumn ? c.minWidth : 0);
    const allocatedMinWidth = activeMinWidthColumns.reduce((result, c) => result + c.minWidth, 0);
    const remainingWidth = (tableWidth - totalFixedWidth - allocatedMinWidth);

    return Math.max(column.minWidth || 0, remainingWidth / (variableWidthColumns.length - activeMinWidthColumns.length));
  }
}