import React from 'react';
import PropTypes from 'prop-types';
import MultiGrid from 'react-virtualized/dist/commonjs/MultiGrid';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import { calcColumnWidth } from './utils';

const FOOTER_BORDER_HEIGHT = 1;

const useStyles = makeStyles(theme => ({
  table: {
    boxSizing: 'border-box',

    '& .topLeftGrid': {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'dark' ? 800 : 200],
      borderBottom: `2px solid ${theme.palette.divider}`,
      borderRight: `2px solid ${theme.palette.divider}`,
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(12),

      // Hide scrollbars on Chrome/Safari/IE
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      '-ms-overflow-style': 'none'
    },

    '& .topRightGrid': {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'dark' ? 800 : 200],
      borderBottom: `2px solid ${theme.palette.divider}`,
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(12),

      // Hide scrollbars on Chrome/Safari/IE
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      '-ms-overflow-style': 'none'
    },

    '& .bottomLeftGrid': {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'dark' ? 800 : 200],
      borderRight: `2px solid ${theme.palette.divider}`,
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(13),

      // Hide scrollbars on Chrome/Safari/IE
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      '-ms-overflow-style': 'none'
    },

    '& .bottomRightGrid': {
      color: theme.palette.text.primary,
      fontSize: theme.typography.pxToRem(13),
      outline: 'none' // See: https://github.com/bvaughn/react-virtualized/issues/381
    }
  },
  cell: {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center'
  },
  cellClickable: {
    cursor: 'pointer'
  },
  cellSelected: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'dark' ? 900 : 100]
  },
  cellHovered: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'dark' ? 800 : 200]
  },
  cellDisabled: {
    opacity: 0.5
  },
  cellContents: {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  cellHeader: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.secondary
  },
  cellInLastColumn: {
    paddingRight: theme.spacing(3)
  },
  cellInLastRow: {
    borderBottom: 'none'
  },
  footer: {
    borderTop: `${FOOTER_BORDER_HEIGHT}px solid ${theme.palette.divider}`
  },
  dragHandle: {
    flex: '0 0 16px',
    zIndex: 2,
    cursor: 'col-resize',
    color: '#0085ff'
  },
  DragHandleActive: {
    color: '#0b6fcc',
    zIndex: 3
  },
  DragHandleIcon: {
    flex: '0 0 12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const calculateWidths = ({ resizable, columns: Columns }) => {
  var widths = [];
  if (resizable) {
    var initialWidth = 1;
    var columns = [];
    Columns.forEach(c => {
      if (c.width) {
        widths[c.name] = 0.1;
        initialWidth = initialWidth - 0.1;
      } else {
        columns.push(c);
      }
    });
    columns.forEach(c => {
      widths[c.name] = initialWidth / columns.length;
    });
  }
  return widths;
};

const useCellRenderer = ({
  recomputeGridSize,
  columns,
  width,
  includeHeaders,
  data,
  columnWidth,
  isCellHovered,
  isCellSelected,
  isCellDisabled,
  classes,
  orderBy,
  orderDirection,
  onHeaderClick,
  onCellClick,
  onCellDoubleClick,
  onCellContextMenu,
  resizable,
  cellProps: defaultCellProps
}) => {
  const [{ hoveredColumn, hoveredRowData }, setHovered] = React.useState({
    hoveredColumn: null,
    hoveredRowData: null
  });

  const [widths, setWidths] = React.useState(
    calculateWidths({ resizable, columns })
  );

  React.useEffect(() => {
    recomputeGridSize();
  }, [recomputeGridSize, hoveredColumn, hoveredRowData, widths]);

  const resizableColumnWidths = React.useCallback(
    (index, columns, tableWidth) => widths[columns[index].name] * tableWidth,
    [widths]
  );

  const getColumnWidth = React.useCallback(
    ({ index }) =>
      typeof columnWidth === 'function'
        ? columnWidth({ index, columns, width })
        : resizable
        ? resizableColumnWidths(index, columns, width)
        : calcColumnWidth(index, columns, width),
    [columnWidth, resizable, columns, width, resizableColumnWidths]
  );

  const resizeRow = React.useCallback(
    ({ dataKey, deltaX }) =>
      setWidths(prev => {
        const delta = deltaX / width;
        const index = columns.findIndex(c => c.name === dataKey);
        const nextDataKey = columns[index + 1].name;
        return {
          ...prev,
          [dataKey]: prev[dataKey] + delta,
          [nextDataKey]: prev[nextDataKey] - delta
        };
      }),
    [setWidths, columns, width]
  );

  const handleDrag = React.useCallback(
    dataKey => (event, { deltaX }) =>
      resizeRow({
        dataKey,
        deltaX
      }),
    [resizeRow]
  );

  const handleMouse = React.useCallback(
    (hoveredColumn, hoveredRowData) => e =>
      setHovered({
        hoveredColumn,
        hoveredRowData
      }),
    [setHovered]
  );

  const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
    const column = columns[columnIndex];
    const isHeader = includeHeaders && rowIndex === 0;
    const headerOffset = includeHeaders ? 1 : 0;
    const rowData = (data && data[rowIndex - headerOffset]) || {};

    const isSelected = isCellSelected && isCellSelected(column, rowData);
    const isDisabled = isCellDisabled && isCellDisabled(column, rowData);

    const isHovered =
      hoveredColumn &&
      hoveredRowData &&
      isCellHovered &&
      isCellHovered(column, rowData, hoveredColumn, hoveredRowData);

    const resolveCellProps = cellProps =>
      typeof cellProps === 'function'
        ? cellProps(column, rowData, hoveredColumn, hoveredRowData)
        : cellProps;
    // TODO: Deep merge (do not override all defaultCellProps styles if column.cellProps.styles defined?)
    const { style: cellStyle, ...cellProps } = {
      ...resolveCellProps(defaultCellProps),
      ...resolveCellProps(column.cellProps)
    };

    const contents = (
      <div className={classes.cellContents}>
        <span style={{ flex: 'auto' }}>
          {isHeader
            ? column.header != null
              ? column.header
              : column.name
            : column.cell
            ? column.cell(rowData)
            : rowData[column.name]}
        </span>
        <span style={{ float: 'right' }}>
          {isHeader && resizable && columnIndex < columns.length - 1 && (
            <Draggable
              axis='x'
              defaultClassName={classes.dragHandle}
              defaultClassNameDragging={classes.DragHandleActive}
              onDrag={handleDrag(column.name)}
              position={{ x: 0 }}
            >
              <span className={classes.DragHandleIcon}>⋮</span>
            </Draggable>
          )}
        </span>
      </div>
    );

    const hasCellClick = !isHeader && onCellClick;
    const hasCellDoubleClick = !isHeader && onCellDoubleClick;
    const hasCellContextMenu = !isHeader && onCellContextMenu;
    const isClickable =
      hasCellClick ||
      hasCellDoubleClick ||
      hasCellContextMenu ||
      column.onClick;

    const className = classNames(classes.cell, {
      [classes.cellClickable]: isClickable,
      [classes.cellHovered]: isHovered,
      [classes.cellSelected]: isSelected,
      [classes.cellDisabled]: isDisabled,
      [classes.cellHeader]: isHeader,
      [classes.cellInLastColumn]: columnIndex === columns.length - 1,
      [classes.cellInLastRow]:
        !isHeader && rowIndex === (data ? data.length : 0)
    });

    return (
      <TableCell
        component='div'
        className={className}
        key={key}
        onMouseEnter={handleMouse(column, rowData)}
        onMouseLeave={handleMouse(null, null)}
        style={{
          ...style,
          ...cellStyle
        }}
        {...(hasCellClick && {
          onClick: event => onCellClick(event, { column, rowData, data })
        })} // Can be overridden by cellProps.onClick on column definition
        {...(hasCellDoubleClick && {
          onDoubleClick: event =>
            onCellDoubleClick(event, { column, rowData, data })
        })} // Can be overridden by cellProps.onDoubleClick on column definition
        {...(hasCellContextMenu && {
          onContextMenu: event =>
            onCellContextMenu(event, { column, rowData, data })
        })} // Can be overridden by cellProps.onContextMenu on column definition
        {...cellProps}
      >
        {isHeader &&
        column.onHeaderClick !== false &&
        (column.onHeaderClick || onHeaderClick) ? (
          <TableSortLabel
            active={
              orderBy &&
              (orderBy === column.name || orderBy === column.orderBy) &&
              rowIndex === 0
            }
            style={{ width: 'inherit' }} // fix text overflowing
            direction={orderDirection}
            onClick={event =>
              column.onHeaderClick
                ? column.onHeaderClick(event, { column })
                : onHeaderClick(event, { column })
            }
          >
            {contents}
          </TableSortLabel>
        ) : isHeader && column.resizable ? (
          <React.Fragment>
            {contents}
            <Draggable
              axis='x'
              defaultClassName='DragHandle'
              defaultClassNameDragging='DragHandleActive'
              onDrag={handleDrag(column.name)}
              position={{ x: 0 }}
            >
              <span className='DragHandleIcon'>⋮</span>
            </Draggable>
          </React.Fragment>
        ) : (
          contents
        )}
      </TableCell>
    );
  };

  return { cellRenderer, columnWidth: getColumnWidth };
};

export default function MuiTable({
  data,
  columns,
  width,
  height,
  maxHeight = null,
  pagination,
  fitHeightToRows,
  fixedRowCount = 0,
  fixedColumnCount = 0,
  rowHeight = 48,
  style,
  columnWidth,
  includeHeaders = false,
  isCellHovered,
  isCellSelected,
  isCellDisabled,
  classes: Classes,
  orderBy,
  orderDirection,
  onHeaderClick,
  onCellClick,
  onCellDoubleClick,
  onCellContextMenu,
  resizable,
  cellProps,
  ...other
}) {
  const classes = useStyles({ classes: Classes });
  const theme = useTheme();

  const multiGrid = React.useRef(null);

  const recomputeGridSize = React.useCallback(
    () => multiGrid.current && multiGrid.current.recomputeGridSize(),
    [multiGrid]
  );

  React.useEffect(() => {
    recomputeGridSize();
  }, [columns, data, height, width, recomputeGridSize]);

  let calculatedHeight = 0;
  if (height) {
    calculatedHeight = height; // fixed height
  } else if (pagination && pagination.rowsPerPage && !fitHeightToRows) {
    const rowCount =
      pagination.rowsPerPage +
      (fixedRowCount ? fixedRowCount : includeHeaders ? 1 : 0);
    calculatedHeight = rowCount * rowHeight;
  } else if (Array.isArray(data)) {
    const rowCount =
      data.length + (fixedRowCount ? fixedRowCount : includeHeaders ? 1 : 0);
    calculatedHeight = rowCount * rowHeight;
  }

  const paginationHeight =
    theme.mixins.toolbar.minHeight + FOOTER_BORDER_HEIGHT;

  const calculatedHeightWithFooter =
    calculatedHeight + (pagination ? paginationHeight : 0);
  const containerHeight =
    maxHeight != null
      ? Math.min(calculatedHeightWithFooter, maxHeight)
      : calculatedHeightWithFooter;
  const multiGridHeight = containerHeight - (pagination ? paginationHeight : 0);

  return (
    <Table
      component='div'
      style={{ width, height: containerHeight, ...style }}
      className={classes.table}
      {...other}
    >
      <MultiGrid
        {...useCellRenderer({
          recomputeGridSize,
          data,
          columns,
          width,
          classes,
          includeHeaders,
          columnWidth,
          isCellHovered,
          isCellSelected,
          isCellDisabled,
          orderBy,
          orderDirection,
          onHeaderClick,
          onCellClick,
          onCellDoubleClick,
          onCellContextMenu,
          resizable,
          cellProps
        })}
        ref={multiGrid}
        width={width}
        columnCount={Array.isArray(columns) ? columns.length : 0}
        fixedColumnCount={fixedColumnCount}
        enableFixedColumnScroll={fixedColumnCount > 0}
        height={multiGridHeight}
        rowHeight={rowHeight}
        rowCount={
          Array.isArray(data) ? data.length + (includeHeaders ? 1 : 0) : 0
        }
        fixedRowCount={fixedRowCount}
        enableFixedRowScroll={fixedRowCount > 0}
        // TODO: Read these from `classes` without classes.table inheritance?  How to pass props.classes down to override?
        classNameTopLeftGrid={'topLeftGrid'}
        classNameTopRightGrid={'topRightGrid'}
        classNameBottomLeftGrid={'bottomLeftGrid'}
        classNameBottomRightGrid={'bottomRightGrid'}
      />
      {pagination && (
        <TableFooter component='div' className={classes.footer}>
          <TablePagination component='div' {...pagination} />
        </TableFooter>
      )}
    </Table>
  );
}

MuiTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  maxHeight: PropTypes.number,
  pagination: PropTypes.object,
  fitHeightToRows: PropTypes.bool,
  fixedRowCount: PropTypes.number,
  fixedColumnCount: PropTypes.number,
  rowHeight: PropTypes.number,
  columnWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  includeHeaders: PropTypes.bool,
  orderBy: PropTypes.string,
  orderDirection: PropTypes.string,
  onHeaderClick: PropTypes.func,
  onCellClick: PropTypes.func,
  onCellDoubleClick: PropTypes.func,
  onCellContextMenu: PropTypes.func,
  noPointer: PropTypes.bool,
  isCellHovered: PropTypes.func,
  isCellSelected: PropTypes.func,
  isCellDisabled: PropTypes.func,
  classes: PropTypes.object,
  cellProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  style: PropTypes.object
};

